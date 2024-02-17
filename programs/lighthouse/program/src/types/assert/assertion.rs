#![allow(non_snake_case)]

// use anchor_lang::{
//     prelude::borsh::{self, BorshDeserialize, BorshSerialize},
//     Key, Lamports, Result,
// };
use solana_program::{account_info::AccountInfo, clock::Clock, keccak, sysvar::Sysvar};

use crate::types::{
    operator::{EvaluationResult, Operator},
    AccountInfoDataField, ClockField, DataValue, MintAccountField, TokenAccountField,
};
use crate::utils::Result;
use borsh::{BorshDeserialize, BorshSerialize};

pub trait Assert<T> {
    fn evaluate(
        &self,
        account: &T,
        operator: &Operator,
        include_output: bool,
    ) -> Result<Box<EvaluationResult>>;
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct AssertionConfigV1 {
    pub verbose: bool,
}

///
///     Used to store assertions in a compact form and not require 3 additional vector bytes
///
// #[derive(BorshDeserialize, BorshSerialize, Debug, Clone)]
// pub enum CompactAssertionArray {
//     Size1([Assertion; 1]),
//     Size2([Assertion; 2]),
//     Size3([Assertion; 3]),
//     Size4([Assertion; 4]),
//     Size5([Assertion; 5]),
//     Size6([Assertion; 6]),
//     Size7([Assertion; 7]),
//     Size8([Assertion; 8]),
//     Size9([Assertion; 9]),
//     Size10([Assertion; 10]),
//     Size11([Assertion; 11]),
//     Size12([Assertion; 12]),
//     Size13([Assertion; 13]),
//     Size14([Assertion; 14]),
//     Size15([Assertion; 15]),
//     Size16([Assertion; 16]),
// }

#[derive(BorshDeserialize, BorshSerialize, Clone, Debug)]
pub enum Assertion {
    AccountInfoField(AccountInfoDataField, Operator),

    // Account data offset, Borsh type, Operator
    AccountData(u16, Operator, DataValue),
    AccountDataHash([u8; 32], Operator, Option<u16>, Option<u16>),

    TokenAccountField(TokenAccountField, Operator),
    MintAccountField(MintAccountField, Operator),
    ClockField(ClockField, Operator),
}

impl Assertion {
    pub fn format(&self) -> String {
        match self {
            Assertion::AccountData(offset, operator, value) => {
                format!("AccountData[{}|{:?}|{:?}]", offset, operator, value)
            }
            Assertion::AccountDataHash(hash, operator, start, end) => {
                format!(
                    "AccountDataHash[{:?}|{:?}|({:?},{:?})]",
                    hash, operator, start, end
                )
            }
            Assertion::TokenAccountField(field, operator) => {
                format!("TokenAccountField[{:?}|{:?}]", field, operator)
            }
            Assertion::MintAccountField(field, operator) => {
                format!("MintAccountField[{:?}|{:?}]", field, operator)
            }
            Assertion::ClockField(field, operator) => {
                format!("ClockField[{:?}|{:?}]", field, operator)
            }
            Assertion::AccountInfoField(fields, operator) => {
                format!("AccountInfoField[{:?}|{:?}]", fields, operator)
            }
        }
    }

    pub fn evaluate(
        &self,
        target_account: &AccountInfo,
        include_output: bool,
    ) -> Result<Box<EvaluationResult>> {
        match &self {
            Assertion::AccountData(account_offset, operator, memory_value) => {
                let account_data = target_account.try_borrow_data().unwrap();

                Ok(memory_value.evaluate_from_data_slice(
                    account_data,
                    (*account_offset) as usize,
                    operator,
                    include_output,
                )?)
            }
            Assertion::AccountDataHash(account_hash_value, operator, start, end) => {
                let account_data = target_account.try_borrow_data().unwrap();

                let start = start.unwrap_or(0);
                let end = end.unwrap_or(account_data.len() as u16);

                let account_data = &account_data[start as usize..end as usize];
                let account_hash = keccak::hashv(&[&account_data]).0;

                Ok(operator.evaluate(&account_hash, account_hash_value, include_output))
            }
            Assertion::TokenAccountField(token_account_field, operator) => {
                let result = token_account_field
                    .evaluate(target_account, operator, include_output)
                    .unwrap();

                Ok(result)
            }
            Assertion::MintAccountField(mint_account_field, operator) => {
                let result = mint_account_field
                    .evaluate(target_account, operator, include_output)
                    .unwrap();

                Ok(result)
            }
            Assertion::ClockField(clock_field, operator) => {
                let result = clock_field
                    .evaluate(&Clock::get().unwrap(), operator, include_output)
                    .unwrap();

                Ok(result)
            }
            Assertion::AccountInfoField(account_info_field, operator) => {
                let operator_result = match account_info_field {
                    AccountInfoDataField::Key(pubkey) => {
                        operator.evaluate(target_account.unsigned_key(), pubkey, include_output)
                    }
                    AccountInfoDataField::Owner(pubkey) => {
                        operator.evaluate(target_account.owner, pubkey, include_output)
                    }
                    AccountInfoDataField::Lamports(lamports) => operator.evaluate(
                        &target_account.try_lamports().unwrap(),
                        lamports,
                        include_output,
                    ),
                    AccountInfoDataField::DataLength(data_length) => operator.evaluate(
                        &(target_account.data_len() as u64),
                        data_length,
                        include_output,
                    ),
                    AccountInfoDataField::Executable(executable) => {
                        operator.evaluate(&target_account.executable, executable, include_output)
                    }
                    AccountInfoDataField::IsSigner(is_signer) => {
                        operator.evaluate(&target_account.is_signer, is_signer, include_output)
                    }
                    AccountInfoDataField::IsWritable(is_writable) => {
                        operator.evaluate(&target_account.is_writable, is_writable, include_output)
                    }
                    AccountInfoDataField::RentEpoch(rent_epoch) => operator.evaluate(
                        &target_account.rent_epoch as &u64,
                        rent_epoch,
                        include_output,
                    ),
                };

                Ok(operator_result)
            }
        }
    }
}

// #[cfg(test)]
// mod tests {
//     use solana_program::{
//         account_info::AccountInfo, keccak, program_error::ProgramError, pubkey::Pubkey,
//     };
//     use solana_sdk::{signature::Keypair, signer::Signer};
//     use std::{cell::RefCell, rc::Rc};

//     use crate::{
//         error::{assert_is_anchor_error, assert_is_program_error, LighthouseError},
//         AccountInfoDataField, Assertion, DataValue, Operator,
//     };

//     #[test]
//     fn evaluate__data_hash() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let account_data: &mut [u8] = &mut [69u8; 10];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(account_data));

//         let data_hash = keccak::hashv(&[&[69u8; 10]]).0;

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion = Assertion::AccountDataHash(data_hash, Operator::Equal, None, None);
//         let result = assertion.evaluate(&account_info, false).unwrap();
//         assert!(result.passed);
//     }

//     #[test]
//     fn evaluate__out_of_range() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion = Assertion::AccountData(0, Operator::Equal, DataValue::U64(0));
//         let result = assertion.evaluate(&account_info, false);

//         assert_is_anchor_error(result.err().unwrap(), LighthouseError::OutOfRange);
//     }

//     #[test]
//     fn evaluate__fail_borrow_account_info() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 10];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };

//         let borrowed = account_info.try_borrow_mut_data().unwrap();

//         let assertion = Assertion::AccountData(0, Operator::Equal, DataValue::U64(0));
//         let result = assertion.evaluate(&account_info, false);

//         drop(borrowed);

//         assert_is_program_error(result.err().unwrap(), ProgramError::AccountBorrowFailed)
//     }

//     #[test]
//     fn evaluate__account_data() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [69u8; 1];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion = Assertion::AccountData(0, Operator::Equal, DataValue::U8(69));
//         let result = assertion.evaluate(&account_info, false).unwrap();
//         assert!(result.passed);

//         let assertion = Assertion::AccountData(0, Operator::Equal, DataValue::U8(70));
//         let result = assertion.evaluate(&account_info, false).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_key() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let key = Keypair::new().pubkey();

//         let account_info = AccountInfo {
//             key: &key,
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Key(key), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion = Assertion::AccountInfoField(
//             AccountInfoDataField::Key(Pubkey::default()),
//             Operator::Equal,
//         );
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_owner() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let key = Keypair::new().pubkey();

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &key,
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Owner(key), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion = Assertion::AccountInfoField(
//             AccountInfoDataField::Owner(Pubkey::default()),
//             Operator::Equal,
//         );
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_lamports() {
//         let lamports_data: &mut u64 = &mut 69;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Lamports(69), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Lamports(1), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_data_length() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 128];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::DataLength(128), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::DataLength(129), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_executable() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: true,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Executable(true), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::Executable(false), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_is_signer() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: true,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::IsSigner(true), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::IsSigner(false), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_is_writable() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: true,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 0,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::IsWritable(true), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::IsWritable(false), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }

//     #[test]
//     fn evaluate__account_info_rent_epoch() {
//         let lamports_data: &mut u64 = &mut 0;
//         let lamports: RefCell<&mut u64> = RefCell::new(lamports_data);

//         let data_data: &mut [u8] = &mut [0u8; 0];
//         let data: Rc<RefCell<&mut [u8]>> = Rc::new(RefCell::new(data_data));

//         let account_info = AccountInfo {
//             key: &Pubkey::default(),
//             is_signer: false,
//             is_writable: false,
//             owner: &Pubkey::default(),
//             lamports: Rc::new(lamports),
//             rent_epoch: 69,
//             data,
//             executable: false,
//         };
//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::RentEpoch(69), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(result.passed);

//         let assertion =
//             Assertion::AccountInfoField(AccountInfoDataField::RentEpoch(1), Operator::Equal);
//         let result = assertion.evaluate(&account_info, true).unwrap();
//         assert!(!result.passed);
//     }
// }

// // Evaluate tests for each assertion type

// // AccountData

// // AccountDataOption
// // TokenAccountField
// // AccountInfoField
// // AccountInfoField::Key
// // AccountInfoField::Owner
// // AccountInfoField::Lamports
// // AccountInfoField::DataLength
// // AccountInfoField::Executable
// // AccountInfoField::IsSigner
// // AccountInfoField::IsWritable
// // AccountInfoField::RentEpoch

// // Test edge cases
// // AccountDataOption does not exist
// // AccountDataOption does exist

// // Test exceptions
