use std::fmt::Display;

use crate::utils::BanksResult;

use super::{
    clone_keypair, digital_asset::DigitalAsset, tree::Tree, DirtyClone, Error, LeafArgs, Result,
};
use mpl_bubblegum::state::metaplex_adapter::{
    Collection, Creator, MetadataArgs, TokenProgramVersion, TokenStandard as MetadataTokenStandard,
};
use mpl_token_metadata::{
    accounts::CollectionAuthorityRecord,
    instructions::ApproveCollectionAuthorityBuilder,
    types::{CollectionDetails, TokenStandard},
};
use solana_program::pubkey::Pubkey;
use solana_program_test::{BanksClient, ProgramTestContext, ProgramTestError};
use solana_sdk::{
    signature::{Keypair, Signer},
    system_instruction,
    transaction::Transaction,
};

pub struct BubblegumTestContext<'info> {
    program_context: &'info mut ProgramTestContext,
    pub default_creators: Vec<Keypair>,
    pub default_collection: DigitalAsset,
}

pub const DEFAULT_LAMPORTS_FUND_AMOUNT: u64 = 1_000_000_000;

#[allow(deprecated)]
impl<'info> BubblegumTestContext<'info> {
    pub fn test_context(&self) -> &ProgramTestContext {
        self.program_context
    }

    pub fn mut_test_context(&mut self) -> &mut ProgramTestContext {
        self.program_context
    }

    // pub fn owned_test_context(self) -> ProgramTestContext {
    //     self.program_context
    // }

    pub fn warp_to_slot(&mut self, slot: u64) -> std::result::Result<(), ProgramTestError> {
        self.program_context.warp_to_slot(slot)
    }

    pub async fn new(program_context: &'info mut ProgramTestContext) -> Result<Self> {
        let mut ctx = BubblegumTestContext {
            program_context,
            default_creators: Vec::new(),
            default_collection: DigitalAsset::new(),
        };

        let default_creators = vec![
            Keypair::new(),
            Keypair::new(),
            Keypair::new(),
            Keypair::new(),
        ];

        for creator in default_creators.iter() {
            ctx.fund_account(creator.pubkey(), DEFAULT_LAMPORTS_FUND_AMOUNT)
                .await?;
        }

        ctx.default_creators = default_creators;

        ctx.default_collection
            .create_and_mint_collection_parent(
                ctx.program_context,
                TokenStandard::NonFungible,
                None,
                None,
                1,
                Some(CollectionDetails::V1 { size: 0 }),
            )
            .await
            .map_err(Error::BanksClient)?;

        Ok(ctx)
    }

    pub fn client(&self) -> BanksClient {
        self.program_context.banks_client.clone()
    }

    // TODO: implement this based on stuff from `mpl-testing-utils` after we can add it
    // as a dev-dependency without conflicts/issues.
    pub async fn fund_account(&mut self, address: Pubkey, lamports: u64) -> Result<()> {
        let payer = &self.program_context.payer;

        // Create a transaction to send some funds to the `new_owner` account, which is used
        // as a payer in one of the operations below. Having the payer be an account with no
        // funds causes the Banks server to hang. Will find a better way to implement this
        // op.
        let tx = Transaction::new_signed_with_payer(
            &[system_instruction::transfer(
                &payer.pubkey(),
                &address,
                lamports,
            )],
            Some(&payer.pubkey()),
            &[payer],
            self.program_context.last_blockhash,
        );

        self.program_context
            .banks_client
            .process_transaction(tx)
            .await
            .map_err(|err| Box::new(Error::BanksClient(err)))
    }

    pub fn payer(&self) -> Keypair {
        clone_keypair(&self.program_context.payer)
    }

    pub fn default_metadata_args<T, U>(&self, name: T, symbol: U) -> MetadataArgs
    where
        T: Display,
        U: Display,
    {
        MetadataArgs {
            name: name.to_string(),
            symbol: symbol.to_string(),
            uri: "https://www.bubblegum-nfts.com/".to_owned(),
            seller_fee_basis_points: 0,
            primary_sale_happened: false,
            is_mutable: false,
            edition_nonce: None,
            token_standard: Some(MetadataTokenStandard::NonFungible),
            token_program_version: TokenProgramVersion::Original,
            collection: Some(Collection {
                verified: false,
                key: self.default_collection.mint.pubkey(),
            }),
            uses: None,
            creators: vec![
                Creator {
                    address: self.default_creators[0].pubkey(),
                    verified: false,
                    share: 20,
                },
                Creator {
                    address: self.default_creators[1].pubkey(),
                    verified: false,
                    share: 20,
                },
                Creator {
                    address: self.default_creators[2].pubkey(),
                    verified: false,
                    share: 20,
                },
                Creator {
                    address: self.default_creators[3].pubkey(),
                    verified: false,
                    share: 40,
                },
            ],
        }
    }

    pub async fn default_create_tree<const MAX_DEPTH: usize, const MAX_BUFFER_SIZE: usize>(
        &self,
    ) -> Result<Tree<MAX_DEPTH, MAX_BUFFER_SIZE>> {
        let payer = self.payer();
        let mut tree = Tree::<MAX_DEPTH, MAX_BUFFER_SIZE>::with_creator(&payer, self.client());
        tree.alloc(&payer).await?;
        tree.create(&payer).await?;
        Ok(tree)
    }

    pub async fn create_public_tree<const MAX_DEPTH: usize, const MAX_BUFFER_SIZE: usize>(
        &self,
    ) -> Result<Tree<MAX_DEPTH, MAX_BUFFER_SIZE>> {
        let payer = self.payer();
        let mut tree = Tree::<MAX_DEPTH, MAX_BUFFER_SIZE>::with_creator(&payer, self.client());
        tree.alloc(&payer).await?;
        tree.create_public(&payer).await?;
        Ok(tree)
    }

    // The owner of the tree and leaves is `self.payer()`.
    pub async fn default_create_and_mint<const MAX_DEPTH: usize, const MAX_BUFFER_SIZE: usize>(
        &self,
        num_mints: u64,
    ) -> Result<(Tree<MAX_DEPTH, MAX_BUFFER_SIZE>, Vec<LeafArgs>)> {
        let mut tree = self
            .default_create_tree::<MAX_DEPTH, MAX_BUFFER_SIZE>()
            .await?;

        let payer = self.payer();

        let mut leaves = Vec::new();

        for i in 0..num_mints {
            let name = format!("test{}", i);
            let symbol = format!("tst{}", i);
            let mut args = LeafArgs::new(&payer, self.default_metadata_args(name, symbol));

            tree.mint_v1(&payer, &mut args).await?;
            assert_eq!(args.index, u32::try_from(i).unwrap());
            assert_eq!(args.nonce, i);

            leaves.push(args);
        }

        Ok((tree, leaves))
    }

    pub async fn set_collection_authority_delegate(
        &mut self,
        authority: Keypair,
        delegate: Pubkey,
    ) -> BanksResult<Pubkey> {
        let payer = self.payer().dirty_clone();

        let collection_asset = &self.default_collection;

        let (record, _) =
            CollectionAuthorityRecord::find_pda(&collection_asset.mint.pubkey(), &delegate);

        let ix = ApproveCollectionAuthorityBuilder::default()
            .collection_authority_record(record)
            .new_collection_authority(delegate)
            .update_authority(authority.pubkey())
            .payer(payer.pubkey())
            .metadata(collection_asset.metadata)
            .mint(collection_asset.mint.pubkey())
            .instruction();

        let tx = Transaction::new_signed_with_payer(
            &[ix],
            Some(&payer.pubkey()),
            &[&payer],
            self.program_context.last_blockhash,
        );

        self.program_context
            .banks_client
            .process_transaction(tx)
            .await
            .unwrap();

        Ok(record)
    }
}
