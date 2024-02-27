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
import { getU8Decoder, getU8Encoder } from '@solana/codecs-numbers';
import {
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
} from '@solana/instructions';
import {
  SysvarClockAssertion,
  SysvarClockAssertionArgs,
  getSysvarClockAssertionDecoder,
  getSysvarClockAssertionEncoder,
} from '../types';

export type AssertSysvarClockInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type AssertSysvarClockInstructionWithSigners<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<TRemainingAccounts>;

export type AssertSysvarClockInstructionData = {
  discriminator: number;
  sysvarClockAssertion: SysvarClockAssertion;
};

export type AssertSysvarClockInstructionDataArgs = {
  sysvarClockAssertion: SysvarClockAssertionArgs;
};

export function getAssertSysvarClockInstructionDataEncoder(): Encoder<AssertSysvarClockInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['sysvarClockAssertion', getSysvarClockAssertionEncoder()],
    ]),
    (value) => ({ ...value, discriminator: 10 })
  );
}

export function getAssertSysvarClockInstructionDataDecoder(): Decoder<AssertSysvarClockInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['sysvarClockAssertion', getSysvarClockAssertionDecoder()],
  ]);
}

export function getAssertSysvarClockInstructionDataCodec(): Codec<
  AssertSysvarClockInstructionDataArgs,
  AssertSysvarClockInstructionData
> {
  return combineCodec(
    getAssertSysvarClockInstructionDataEncoder(),
    getAssertSysvarClockInstructionDataDecoder()
  );
}

export type AssertSysvarClockInput = {
  sysvarClockAssertion: AssertSysvarClockInstructionDataArgs['sysvarClockAssertion'];
};

export type AssertSysvarClockInputWithSigners = {
  sysvarClockAssertion: AssertSysvarClockInstructionDataArgs['sysvarClockAssertion'];
};

export function getAssertSysvarClockInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(
  input: AssertSysvarClockInputWithSigners
): AssertSysvarClockInstructionWithSigners<TProgram>;
export function getAssertSysvarClockInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(input: AssertSysvarClockInput): AssertSysvarClockInstruction<TProgram>;
export function getAssertSysvarClockInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
>(input: AssertSysvarClockInput): IInstruction {
  // Program address.
  const programAddress =
    'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK' as Address<'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'>;

  // Original args.
  const args = { ...input };

  const instruction = getAssertSysvarClockInstructionRaw(
    args as AssertSysvarClockInstructionDataArgs,
    programAddress
  );

  return instruction;
}

export function getAssertSysvarClockInstructionRaw<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK',
  TRemainingAccounts extends Array<IAccountMeta<string>> = []
>(
  args: AssertSysvarClockInstructionDataArgs,
  programAddress: Address<TProgram> = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK' as Address<TProgram>,
  remainingAccounts?: TRemainingAccounts
) {
  return {
    accounts: remainingAccounts ?? [],
    data: getAssertSysvarClockInstructionDataEncoder().encode(args),
    programAddress,
  } as AssertSysvarClockInstruction<TProgram, TRemainingAccounts>;
}

export type ParsedAssertSysvarClockInstruction<
  TProgram extends string = 'L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK'
> = {
  programAddress: Address<TProgram>;
  data: AssertSysvarClockInstructionData;
};

export function parseAssertSysvarClockInstruction<TProgram extends string>(
  instruction: IInstruction<TProgram> & IInstructionWithData<Uint8Array>
): ParsedAssertSysvarClockInstruction<TProgram> {
  return {
    programAddress: instruction.programAddress,
    data: getAssertSysvarClockInstructionDataDecoder().decode(instruction.data),
  };
}
