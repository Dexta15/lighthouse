/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  mapEncoder,
} from '@solana/codecs-core';
import {
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import {
  getU16Decoder,
  getU16Encoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/codecs-numbers';
import {
  AccountRole,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  WritableAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import {
  ResolvedAccount,
  accountMetaWithDefault,
  getAccountMetasWithSigners,
} from '../shared';
import {
  WriteType,
  WriteTypeArgs,
  getWriteTypeDecoder,
  getWriteTypeEncoder,
} from '../types';

export type WriteInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TAccountLighthouseProgram extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountMemoryAccount extends string | IAccountMeta<string> = string,
  TAccountSourceAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountLighthouseProgram extends string
        ? ReadonlyAccount<TAccountLighthouseProgram>
        : TAccountLighthouseProgram,
      TAccountPayer extends string
        ? ReadonlySignerAccount<TAccountPayer>
        : TAccountPayer,
      TAccountMemoryAccount extends string
        ? WritableAccount<TAccountMemoryAccount>
        : TAccountMemoryAccount,
      TAccountSourceAccount extends string
        ? ReadonlyAccount<TAccountSourceAccount>
        : TAccountSourceAccount,
      ...TRemainingAccounts
    ]
  >;

export type WriteInstructionWithSigners<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TAccountLighthouseProgram extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountMemoryAccount extends string | IAccountMeta<string> = string,
  TAccountSourceAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountLighthouseProgram extends string
        ? ReadonlyAccount<TAccountLighthouseProgram>
        : TAccountLighthouseProgram,
      TAccountPayer extends string
        ? ReadonlySignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountMemoryAccount extends string
        ? WritableAccount<TAccountMemoryAccount>
        : TAccountMemoryAccount,
      TAccountSourceAccount extends string
        ? ReadonlyAccount<TAccountSourceAccount>
        : TAccountSourceAccount,
      ...TRemainingAccounts
    ]
  >;

export type WriteInstructionData = {
  discriminator: number;
  memoryIndex: number;
  memoryAccountBump: number;
  memoryOffset: number;
  writeType: WriteType;
};

export type WriteInstructionDataArgs = {
  memoryIndex: number;
  memoryAccountBump: number;
  memoryOffset: number;
  writeType: WriteTypeArgs;
};

export function getWriteInstructionDataEncoder(): Encoder<WriteInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['memoryIndex', getU8Encoder()],
      ['memoryAccountBump', getU8Encoder()],
      ['memoryOffset', getU16Encoder()],
      ['writeType', getWriteTypeEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 1 })
  );
}

export function getWriteInstructionDataDecoder(): Decoder<WriteInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['memoryIndex', getU8Decoder()],
    ['memoryAccountBump', getU8Decoder()],
    ['memoryOffset', getU16Decoder()],
    ['writeType', getWriteTypeDecoder()],
  ]);
}

export function getWriteInstructionDataCodec(): Codec<
  WriteInstructionDataArgs,
  WriteInstructionData
> {
  return combineCodec(
    getWriteInstructionDataEncoder(),
    getWriteInstructionDataDecoder()
  );
}

export type WriteInput<
  TAccountLighthouseProgram extends string,
  TAccountPayer extends string,
  TAccountMemoryAccount extends string,
  TAccountSourceAccount extends string
> = {
  /** Lighthouse program */
  lighthouseProgram: Address<TAccountLighthouseProgram>;
  /** Payer account */
  payer: Address<TAccountPayer>;
  /** Memory account */
  memoryAccount: Address<TAccountMemoryAccount>;
  /** System program */
  sourceAccount: Address<TAccountSourceAccount>;
  memoryIndex: WriteInstructionDataArgs['memoryIndex'];
  memoryAccountBump: WriteInstructionDataArgs['memoryAccountBump'];
  memoryOffset: WriteInstructionDataArgs['memoryOffset'];
  writeType: WriteInstructionDataArgs['writeType'];
};

export type WriteInputWithSigners<
  TAccountLighthouseProgram extends string,
  TAccountPayer extends string,
  TAccountMemoryAccount extends string,
  TAccountSourceAccount extends string
> = {
  /** Lighthouse program */
  lighthouseProgram: Address<TAccountLighthouseProgram>;
  /** Payer account */
  payer: TransactionSigner<TAccountPayer>;
  /** Memory account */
  memoryAccount: Address<TAccountMemoryAccount>;
  /** System program */
  sourceAccount: Address<TAccountSourceAccount>;
  memoryIndex: WriteInstructionDataArgs['memoryIndex'];
  memoryAccountBump: WriteInstructionDataArgs['memoryAccountBump'];
  memoryOffset: WriteInstructionDataArgs['memoryOffset'];
  writeType: WriteInstructionDataArgs['writeType'];
};

export function getWriteInstruction<
  TAccountLighthouseProgram extends string,
  TAccountPayer extends string,
  TAccountMemoryAccount extends string,
  TAccountSourceAccount extends string,
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(
  input: WriteInputWithSigners<
    TAccountLighthouseProgram,
    TAccountPayer,
    TAccountMemoryAccount,
    TAccountSourceAccount
  >
): WriteInstructionWithSigners<
  TProgram,
  TAccountLighthouseProgram,
  TAccountPayer,
  TAccountMemoryAccount,
  TAccountSourceAccount
>;
export function getWriteInstruction<
  TAccountLighthouseProgram extends string,
  TAccountPayer extends string,
  TAccountMemoryAccount extends string,
  TAccountSourceAccount extends string,
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(
  input: WriteInput<
    TAccountLighthouseProgram,
    TAccountPayer,
    TAccountMemoryAccount,
    TAccountSourceAccount
  >
): WriteInstruction<
  TProgram,
  TAccountLighthouseProgram,
  TAccountPayer,
  TAccountMemoryAccount,
  TAccountSourceAccount
>;
export function getWriteInstruction<
  TAccountLighthouseProgram extends string,
  TAccountPayer extends string,
  TAccountMemoryAccount extends string,
  TAccountSourceAccount extends string,
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(
  input: WriteInput<
    TAccountLighthouseProgram,
    TAccountPayer,
    TAccountMemoryAccount,
    TAccountSourceAccount
  >
): IInstruction {
  // Program address.
  const programAddress =
    'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK' as Address<'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'>;

  // Original accounts.
  type AccountMetas = Parameters<
    typeof getWriteInstructionRaw<
      TProgram,
      TAccountLighthouseProgram,
      TAccountPayer,
      TAccountMemoryAccount,
      TAccountSourceAccount
    >
  >[0];
  const accounts: Record<keyof AccountMetas, ResolvedAccount> = {
    lighthouseProgram: {
      value: input.lighthouseProgram ?? null,
      isWritable: false,
    },
    payer: { value: input.payer ?? null, isWritable: false },
    memoryAccount: { value: input.memoryAccount ?? null, isWritable: true },
    sourceAccount: { value: input.sourceAccount ?? null, isWritable: false },
  };

  // Original args.
  const args = { ...input };

  // Get account metas and signers.
  const accountMetas = getAccountMetasWithSigners(
    accounts,
    'programId',
    programAddress
  );

  const instruction = getWriteInstructionRaw(
    accountMetas as Record<keyof AccountMetas, IAccountMeta>,
    args as WriteInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getWriteInstructionRaw<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TAccountLighthouseProgram extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountMemoryAccount extends string | IAccountMeta<string> = string,
  TAccountSourceAccount extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  accounts: {
    lighthouseProgram: TAccountLighthouseProgram extends string
      ? Address<TAccountLighthouseProgram>
      : TAccountLighthouseProgram;
    payer: TAccountPayer extends string
      ? Address<TAccountPayer>
      : TAccountPayer;
    memoryAccount: TAccountMemoryAccount extends string
      ? Address<TAccountMemoryAccount>
      : TAccountMemoryAccount;
    sourceAccount: TAccountSourceAccount extends string
      ? Address<TAccountSourceAccount>
      : TAccountSourceAccount;
  },
  args: WriteInstructionDataArgs,
  programAddress: Address<TProgram> = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: [
      accountMetaWithDefault(accounts.lighthouseProgram, AccountRole.READONLY),
      accountMetaWithDefault(accounts.payer, AccountRole.READONLY_SIGNER),
      accountMetaWithDefault(accounts.memoryAccount, AccountRole.WRITABLE),
      accountMetaWithDefault(accounts.sourceAccount, AccountRole.READONLY),
      ...(remainingAccounts ?? []),
    ],
    data: getWriteInstructionDataEncoder().encode(args),
    programAddress,
  } as WriteInstruction<
    TProgram,
    TAccountLighthouseProgram,
    TAccountPayer,
    TAccountMemoryAccount,
    TAccountSourceAccount,
    TRemainingAccounts
  >;
}

export type ParsedWriteInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[]
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Lighthouse program */
    lighthouseProgram: TAccountMetas[0];
    /** Payer account */
    payer: TAccountMetas[1];
    /** Memory account */
    memoryAccount: TAccountMetas[2];
    /** System program */
    sourceAccount: TAccountMetas[3];
  };
  data: WriteInstructionData;
};

export function parseWriteInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[]
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedWriteInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      lighthouseProgram: getNextAccount(),
      payer: getNextAccount(),
      memoryAccount: getNextAccount(),
      sourceAccount: getNextAccount(),
    },
    data: getWriteInstructionDataDecoder().decode(instruction.data),
  };
}
