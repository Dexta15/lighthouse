//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::WriteTypeParameter;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;

/// Accounts.
pub struct Write {
    /// Lighthouse program
    pub lighthouse_program: solana_program::pubkey::Pubkey,
    /// Payer account
    pub payer: solana_program::pubkey::Pubkey,
    /// Memory account
    pub memory_account: solana_program::pubkey::Pubkey,
    /// System program
    pub source_account: solana_program::pubkey::Pubkey,
}

impl Write {
    pub fn instruction(
        &self,
        args: WriteInstructionArgs,
    ) -> solana_program::instruction::Instruction {
        self.instruction_with_remaining_accounts(args, &[])
    }
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction_with_remaining_accounts(
        &self,
        args: WriteInstructionArgs,
        remaining_accounts: &[solana_program::instruction::AccountMeta],
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(4 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.lighthouse_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.payer, true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.memory_account,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.source_account,
            false,
        ));
        accounts.extend_from_slice(remaining_accounts);
        let mut data = WriteInstructionData::new().try_to_vec().unwrap();
        let mut args = args.try_to_vec().unwrap();
        data.append(&mut args);

        solana_program::instruction::Instruction {
            program_id: crate::LIGHTHOUSE_ID,
            accounts,
            data,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
struct WriteInstructionData {
    discriminator: u8,
}

impl WriteInstructionData {
    fn new() -> Self {
        Self { discriminator: 1 }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub struct WriteInstructionArgs {
    pub memory_index: u8,
    pub memory_account_bump: u8,
    pub write_type: WriteTypeParameter,
}

/// Instruction builder for `Write`.
///
/// ### Accounts:
///
///   0. `[]` lighthouse_program
///   1. `[signer]` payer
///   2. `[writable]` memory_account
///   3. `[]` source_account
#[derive(Default)]
pub struct WriteBuilder {
    lighthouse_program: Option<solana_program::pubkey::Pubkey>,
    payer: Option<solana_program::pubkey::Pubkey>,
    memory_account: Option<solana_program::pubkey::Pubkey>,
    source_account: Option<solana_program::pubkey::Pubkey>,
    memory_index: Option<u8>,
    memory_account_bump: Option<u8>,
    write_type: Option<WriteTypeParameter>,
    __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl WriteBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    /// Lighthouse program
    #[inline(always)]
    pub fn lighthouse_program(
        &mut self,
        lighthouse_program: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.lighthouse_program = Some(lighthouse_program);
        self
    }
    /// Payer account
    #[inline(always)]
    pub fn payer(&mut self, payer: solana_program::pubkey::Pubkey) -> &mut Self {
        self.payer = Some(payer);
        self
    }
    /// Memory account
    #[inline(always)]
    pub fn memory_account(&mut self, memory_account: solana_program::pubkey::Pubkey) -> &mut Self {
        self.memory_account = Some(memory_account);
        self
    }
    /// System program
    #[inline(always)]
    pub fn source_account(&mut self, source_account: solana_program::pubkey::Pubkey) -> &mut Self {
        self.source_account = Some(source_account);
        self
    }
    #[inline(always)]
    pub fn memory_index(&mut self, memory_index: u8) -> &mut Self {
        self.memory_index = Some(memory_index);
        self
    }
    #[inline(always)]
    pub fn memory_account_bump(&mut self, memory_account_bump: u8) -> &mut Self {
        self.memory_account_bump = Some(memory_account_bump);
        self
    }
    #[inline(always)]
    pub fn write_type(&mut self, write_type: WriteTypeParameter) -> &mut Self {
        self.write_type = Some(write_type);
        self
    }
    /// Add an aditional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: solana_program::instruction::AccountMeta,
    ) -> &mut Self {
        self.__remaining_accounts.push(account);
        self
    }
    /// Add additional accounts to the instruction.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[solana_program::instruction::AccountMeta],
    ) -> &mut Self {
        self.__remaining_accounts.extend_from_slice(accounts);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        let accounts = Write {
            lighthouse_program: self
                .lighthouse_program
                .expect("lighthouse_program is not set"),
            payer: self.payer.expect("payer is not set"),
            memory_account: self.memory_account.expect("memory_account is not set"),
            source_account: self.source_account.expect("source_account is not set"),
        };
        let args = WriteInstructionArgs {
            memory_index: self.memory_index.clone().expect("memory_index is not set"),
            memory_account_bump: self
                .memory_account_bump
                .clone()
                .expect("memory_account_bump is not set"),
            write_type: self.write_type.clone().expect("write_type is not set"),
        };

        accounts.instruction_with_remaining_accounts(args, &self.__remaining_accounts)
    }
}

/// `write` CPI accounts.
pub struct WriteCpiAccounts<'a, 'b> {
    /// Lighthouse program
    pub lighthouse_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Payer account
    pub payer: &'b solana_program::account_info::AccountInfo<'a>,
    /// Memory account
    pub memory_account: &'b solana_program::account_info::AccountInfo<'a>,
    /// System program
    pub source_account: &'b solana_program::account_info::AccountInfo<'a>,
}

/// `write` CPI instruction.
pub struct WriteCpi<'a, 'b> {
    /// The program to invoke.
    pub __program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Lighthouse program
    pub lighthouse_program: &'b solana_program::account_info::AccountInfo<'a>,
    /// Payer account
    pub payer: &'b solana_program::account_info::AccountInfo<'a>,
    /// Memory account
    pub memory_account: &'b solana_program::account_info::AccountInfo<'a>,
    /// System program
    pub source_account: &'b solana_program::account_info::AccountInfo<'a>,
    /// The arguments for the instruction.
    pub __args: WriteInstructionArgs,
}

impl<'a, 'b> WriteCpi<'a, 'b> {
    pub fn new(
        program: &'b solana_program::account_info::AccountInfo<'a>,
        accounts: WriteCpiAccounts<'a, 'b>,
        args: WriteInstructionArgs,
    ) -> Self {
        Self {
            __program: program,
            lighthouse_program: accounts.lighthouse_program,
            payer: accounts.payer,
            memory_account: accounts.memory_account,
            source_account: accounts.source_account,
            __args: args,
        }
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], &[])
    }
    #[inline(always)]
    pub fn invoke_with_remaining_accounts(
        &self,
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
    }
    #[inline(always)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed_with_remaining_accounts(
        &self,
        signers_seeds: &[&[&[u8]]],
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(4 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.lighthouse_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.payer.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.memory_account.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.source_account.key,
            false,
        ));
        remaining_accounts.iter().for_each(|remaining_account| {
            accounts.push(solana_program::instruction::AccountMeta {
                pubkey: *remaining_account.0.key,
                is_signer: remaining_account.1,
                is_writable: remaining_account.2,
            })
        });
        let mut data = WriteInstructionData::new().try_to_vec().unwrap();
        let mut args = self.__args.try_to_vec().unwrap();
        data.append(&mut args);

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::LIGHTHOUSE_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(4 + 1 + remaining_accounts.len());
        account_infos.push(self.__program.clone());
        account_infos.push(self.lighthouse_program.clone());
        account_infos.push(self.payer.clone());
        account_infos.push(self.memory_account.clone());
        account_infos.push(self.source_account.clone());
        remaining_accounts
            .iter()
            .for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// Instruction builder for `Write` via CPI.
///
/// ### Accounts:
///
///   0. `[]` lighthouse_program
///   1. `[signer]` payer
///   2. `[writable]` memory_account
///   3. `[]` source_account
pub struct WriteCpiBuilder<'a, 'b> {
    instruction: Box<WriteCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> WriteCpiBuilder<'a, 'b> {
    pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(WriteCpiBuilderInstruction {
            __program: program,
            lighthouse_program: None,
            payer: None,
            memory_account: None,
            source_account: None,
            memory_index: None,
            memory_account_bump: None,
            write_type: None,
            __remaining_accounts: Vec::new(),
        });
        Self { instruction }
    }
    /// Lighthouse program
    #[inline(always)]
    pub fn lighthouse_program(
        &mut self,
        lighthouse_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.lighthouse_program = Some(lighthouse_program);
        self
    }
    /// Payer account
    #[inline(always)]
    pub fn payer(&mut self, payer: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.payer = Some(payer);
        self
    }
    /// Memory account
    #[inline(always)]
    pub fn memory_account(
        &mut self,
        memory_account: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.memory_account = Some(memory_account);
        self
    }
    /// System program
    #[inline(always)]
    pub fn source_account(
        &mut self,
        source_account: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.source_account = Some(source_account);
        self
    }
    #[inline(always)]
    pub fn memory_index(&mut self, memory_index: u8) -> &mut Self {
        self.instruction.memory_index = Some(memory_index);
        self
    }
    #[inline(always)]
    pub fn memory_account_bump(&mut self, memory_account_bump: u8) -> &mut Self {
        self.instruction.memory_account_bump = Some(memory_account_bump);
        self
    }
    #[inline(always)]
    pub fn write_type(&mut self, write_type: WriteTypeParameter) -> &mut Self {
        self.instruction.write_type = Some(write_type);
        self
    }
    /// Add an additional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: &'b solana_program::account_info::AccountInfo<'a>,
        is_writable: bool,
        is_signer: bool,
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .push((account, is_writable, is_signer));
        self
    }
    /// Add additional accounts to the instruction.
    ///
    /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
    /// and a `bool` indicating whether the account is a signer or not.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .extend_from_slice(accounts);
        self
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let args = WriteInstructionArgs {
            memory_index: self
                .instruction
                .memory_index
                .clone()
                .expect("memory_index is not set"),
            memory_account_bump: self
                .instruction
                .memory_account_bump
                .clone()
                .expect("memory_account_bump is not set"),
            write_type: self
                .instruction
                .write_type
                .clone()
                .expect("write_type is not set"),
        };
        let instruction = WriteCpi {
            __program: self.instruction.__program,

            lighthouse_program: self
                .instruction
                .lighthouse_program
                .expect("lighthouse_program is not set"),

            payer: self.instruction.payer.expect("payer is not set"),

            memory_account: self
                .instruction
                .memory_account
                .expect("memory_account is not set"),

            source_account: self
                .instruction
                .source_account
                .expect("source_account is not set"),
            __args: args,
        };
        instruction.invoke_signed_with_remaining_accounts(
            signers_seeds,
            &self.instruction.__remaining_accounts,
        )
    }
}

struct WriteCpiBuilderInstruction<'a, 'b> {
    __program: &'b solana_program::account_info::AccountInfo<'a>,
    lighthouse_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    payer: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    memory_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    source_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    memory_index: Option<u8>,
    memory_account_bump: Option<u8>,
    write_type: Option<WriteTypeParameter>,
    /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
    __remaining_accounts: Vec<(
        &'b solana_program::account_info::AccountInfo<'a>,
        bool,
        bool,
    )>,
}