use crate::utils::context::TestContext;
use crate::utils::create_user_with_balance;
use crate::utils::utils::{process_transaction_assert_success, set_account_from_rpc};
use lighthouse_client::instructions::AssertStakeAccountBuilder;
use lighthouse_client::types::{
    EquatableOperator, MetaAssertion, StakeAccountAssertion, StakeStateType,
};
use solana_client::nonblocking::rpc_client::RpcClient;
use solana_program_test::tokio;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::pubkey::Pubkey;
use solana_sdk::signer::EncodableKeypair;
use solana_sdk::stake;
use solana_sdk::stake::instruction::{delegate_stake, initialize};
use solana_sdk::stake::state::Lockup;
use solana_sdk::system_instruction::create_account_with_seed;
use solana_sdk::transaction::Transaction;
use std::str::FromStr;

///
/// Tests all data types using the `StakeAccount` assertion.
///
#[tokio::test]
async fn test_borsh_account_data() {
    let context = &mut TestContext::new().await.unwrap();
    let user = create_user_with_balance(context, 10e9 as u64)
        .await
        .unwrap();

    // Clone a vote account from devnet.
    let connection = RpcClient::new_with_commitment(
        String::from("https://api.devnet.solana.com"),
        CommitmentConfig::confirmed(),
    );

    let vote_pubkey =
        solana_sdk::pubkey::Pubkey::from_str("HRACkkKxJHZ22QRfky7QEsSRgxiskQVdK23XS13tjEGM")
            .unwrap();

    set_account_from_rpc(context, &connection, &vote_pubkey).await;

    let derived_account =
        Pubkey::create_with_seed(&user.encodable_pubkey(), "stake:0", &stake::program::id())
            .unwrap();

    let tx = Transaction::new_signed_with_payer(
        &[
            create_account_with_seed(
                &user.encodable_pubkey(),
                &derived_account,
                &user.encodable_pubkey(),
                "stake:0",
                2e9 as u64,
                200,
                &stake::program::id(),
            ),
            initialize(
                &derived_account,
                &stake::state::Authorized {
                    staker: user.encodable_pubkey(),
                    withdrawer: user.encodable_pubkey(),
                },
                &Lockup {
                    epoch: 0,
                    unix_timestamp: 0,
                    custodian: user.encodable_pubkey(),
                },
            ),
            delegate_stake(&derived_account, &user.encodable_pubkey(), &vote_pubkey),
        ],
        Some(&user.encodable_pubkey()),
        &[&user],
        context.get_blockhash().await,
    );

    process_transaction_assert_success(context, tx)
        .await
        .unwrap();

    let tx: Transaction = Transaction::new_signed_with_payer(
        &[
            AssertStakeAccountBuilder::new()
                .target_account(derived_account)
                .log_level(lighthouse_client::types::LogLevel::PlaintextMsgLog)
                .assertion(StakeAccountAssertion::State {
                    value: StakeStateType::Stake,
                    operator: EquatableOperator::Equal,
                })
                .instruction(),
            AssertStakeAccountBuilder::new()
                .target_account(derived_account)
                .log_level(lighthouse_client::types::LogLevel::PlaintextMsgLog)
                .assertion(StakeAccountAssertion::MetaAssertion(
                    MetaAssertion::AuthorizedStaker {
                        value: user.encodable_pubkey(),
                        operator: EquatableOperator::Equal,
                    },
                ))
                .instruction(),
        ],
        Some(&user.encodable_pubkey()),
        &[&user],
        context.get_blockhash().await,
    );

    process_transaction_assert_success(context, tx)
        .await
        .unwrap();
}

// TODO: Test all states of a stake account
