//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::BytesOperator;
use crate::generated::types::EquatableOperator;
use crate::generated::types::IntegerOperator;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;
use solana_program::pubkey::Pubkey;

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum DataValueAssertion {
    Bool {
        value: bool,
        operator: EquatableOperator,
    },
    U8 {
        value: u8,
        operator: IntegerOperator,
    },
    I8 {
        value: i8,
        operator: IntegerOperator,
    },
    U16 {
        value: u16,
        operator: IntegerOperator,
    },
    I16 {
        value: i16,
        operator: IntegerOperator,
    },
    U32 {
        value: u32,
        operator: IntegerOperator,
    },
    I32 {
        value: i32,
        operator: IntegerOperator,
    },
    U64 {
        value: u64,
        operator: IntegerOperator,
    },
    I64 {
        value: i64,
        operator: IntegerOperator,
    },
    U128 {
        value: u128,
        operator: IntegerOperator,
    },
    I128 {
        value: i128,
        operator: IntegerOperator,
    },
    Bytes {
        value: Vec<u8>,
        operator: BytesOperator,
    },
    Pubkey {
        #[cfg_attr(
            feature = "serde",
            serde(with = "serde_with::As::<serde_with::DisplayFromStr>")
        )]
        value: Pubkey,
        operator: EquatableOperator,
    },
}
