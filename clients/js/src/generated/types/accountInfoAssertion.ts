/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  getAddressDecoder,
  getAddressEncoder,
} from '@solana/addresses';
import { Codec, Decoder, Encoder, combineCodec } from '@solana/codecs-core';
import {
  GetDataEnumKind,
  GetDataEnumKindContent,
  getBooleanDecoder,
  getBooleanEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getDataEnumDecoder,
  getDataEnumEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import {
  getU16Decoder,
  getU16Encoder,
  getU64Decoder,
  getU64Encoder,
} from '@solana/codecs-numbers';
import {
  Option,
  OptionOrNullable,
  getOptionDecoder,
  getOptionEncoder,
} from '@solana/options';
import {
  ComparableOperator,
  ComparableOperatorArgs,
  EquatableOperator,
  EquatableOperatorArgs,
  KnownProgram,
  KnownProgramArgs,
  getComparableOperatorDecoder,
  getComparableOperatorEncoder,
  getEquatableOperatorDecoder,
  getEquatableOperatorEncoder,
  getKnownProgramDecoder,
  getKnownProgramEncoder,
} from '.';

export type AccountInfoAssertion =
  | { __kind: 'Key'; value: Address; operator: EquatableOperator }
  | { __kind: 'Lamports'; value: bigint; operator: ComparableOperator }
  | { __kind: 'DataLength'; value: bigint; operator: ComparableOperator }
  | { __kind: 'Owner'; value: Address; operator: EquatableOperator }
  | { __kind: 'KnownOwner'; value: KnownProgram; operator: EquatableOperator }
  | { __kind: 'RentEpoch'; value: bigint; operator: ComparableOperator }
  | { __kind: 'IsSigner'; value: boolean; operator: EquatableOperator }
  | { __kind: 'IsWritable'; value: boolean; operator: EquatableOperator }
  | { __kind: 'Executable'; value: boolean; operator: EquatableOperator }
  | {
      __kind: 'VerifyDatahash';
      expectedHash: Uint8Array;
      start: Option<number>;
      length: Option<number>;
    };

export type AccountInfoAssertionArgs =
  | { __kind: 'Key'; value: Address; operator: EquatableOperatorArgs }
  | {
      __kind: 'Lamports';
      value: number | bigint;
      operator: ComparableOperatorArgs;
    }
  | {
      __kind: 'DataLength';
      value: number | bigint;
      operator: ComparableOperatorArgs;
    }
  | { __kind: 'Owner'; value: Address; operator: EquatableOperatorArgs }
  | {
      __kind: 'KnownOwner';
      value: KnownProgramArgs;
      operator: EquatableOperatorArgs;
    }
  | {
      __kind: 'RentEpoch';
      value: number | bigint;
      operator: ComparableOperatorArgs;
    }
  | { __kind: 'IsSigner'; value: boolean; operator: EquatableOperatorArgs }
  | { __kind: 'IsWritable'; value: boolean; operator: EquatableOperatorArgs }
  | { __kind: 'Executable'; value: boolean; operator: EquatableOperatorArgs }
  | {
      __kind: 'VerifyDatahash';
      expectedHash: Uint8Array;
      start: OptionOrNullable<number>;
      length: OptionOrNullable<number>;
    };

export function getAccountInfoAssertionEncoder(): Encoder<AccountInfoAssertionArgs> {
  return getDataEnumEncoder([
    [
      'Key',
      getStructEncoder([
        ['value', getAddressEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'Lamports',
      getStructEncoder([
        ['value', getU64Encoder()],
        ['operator', getComparableOperatorEncoder()],
      ]),
    ],
    [
      'DataLength',
      getStructEncoder([
        ['value', getU64Encoder()],
        ['operator', getComparableOperatorEncoder()],
      ]),
    ],
    [
      'Owner',
      getStructEncoder([
        ['value', getAddressEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'KnownOwner',
      getStructEncoder([
        ['value', getKnownProgramEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'RentEpoch',
      getStructEncoder([
        ['value', getU64Encoder()],
        ['operator', getComparableOperatorEncoder()],
      ]),
    ],
    [
      'IsSigner',
      getStructEncoder([
        ['value', getBooleanEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'IsWritable',
      getStructEncoder([
        ['value', getBooleanEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'Executable',
      getStructEncoder([
        ['value', getBooleanEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'VerifyDatahash',
      getStructEncoder([
        ['expectedHash', getBytesEncoder({ size: 32 })],
        ['start', getOptionEncoder(getU16Encoder())],
        ['length', getOptionEncoder(getU16Encoder())],
      ]),
    ],
  ]);
}

export function getAccountInfoAssertionDecoder(): Decoder<AccountInfoAssertion> {
  return getDataEnumDecoder([
    [
      'Key',
      getStructDecoder([
        ['value', getAddressDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'Lamports',
      getStructDecoder([
        ['value', getU64Decoder()],
        ['operator', getComparableOperatorDecoder()],
      ]),
    ],
    [
      'DataLength',
      getStructDecoder([
        ['value', getU64Decoder()],
        ['operator', getComparableOperatorDecoder()],
      ]),
    ],
    [
      'Owner',
      getStructDecoder([
        ['value', getAddressDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'KnownOwner',
      getStructDecoder([
        ['value', getKnownProgramDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'RentEpoch',
      getStructDecoder([
        ['value', getU64Decoder()],
        ['operator', getComparableOperatorDecoder()],
      ]),
    ],
    [
      'IsSigner',
      getStructDecoder([
        ['value', getBooleanDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'IsWritable',
      getStructDecoder([
        ['value', getBooleanDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'Executable',
      getStructDecoder([
        ['value', getBooleanDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'VerifyDatahash',
      getStructDecoder([
        ['expectedHash', getBytesDecoder({ size: 32 })],
        ['start', getOptionDecoder(getU16Decoder())],
        ['length', getOptionDecoder(getU16Decoder())],
      ]),
    ],
  ]);
}

export function getAccountInfoAssertionCodec(): Codec<
  AccountInfoAssertionArgs,
  AccountInfoAssertion
> {
  return combineCodec(
    getAccountInfoAssertionEncoder(),
    getAccountInfoAssertionDecoder()
  );
}

// Data Enum Helpers.
export function accountInfoAssertion(
  kind: 'Key',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'Key'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'Key'>;
export function accountInfoAssertion(
  kind: 'Lamports',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'Lamports'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'Lamports'>;
export function accountInfoAssertion(
  kind: 'DataLength',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'DataLength'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'DataLength'>;
export function accountInfoAssertion(
  kind: 'Owner',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'Owner'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'Owner'>;
export function accountInfoAssertion(
  kind: 'KnownOwner',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'KnownOwner'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'KnownOwner'>;
export function accountInfoAssertion(
  kind: 'RentEpoch',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'RentEpoch'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'RentEpoch'>;
export function accountInfoAssertion(
  kind: 'IsSigner',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'IsSigner'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'IsSigner'>;
export function accountInfoAssertion(
  kind: 'IsWritable',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'IsWritable'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'IsWritable'>;
export function accountInfoAssertion(
  kind: 'Executable',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'Executable'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'Executable'>;
export function accountInfoAssertion(
  kind: 'VerifyDatahash',
  data: GetDataEnumKindContent<AccountInfoAssertionArgs, 'VerifyDatahash'>
): GetDataEnumKind<AccountInfoAssertionArgs, 'VerifyDatahash'>;
export function accountInfoAssertion<
  K extends AccountInfoAssertionArgs['__kind']
>(kind: K, data?: any): Extract<AccountInfoAssertionArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isAccountInfoAssertion<
  K extends AccountInfoAssertion['__kind']
>(
  kind: K,
  value: AccountInfoAssertion
): value is AccountInfoAssertion & { __kind: K } {
  return value.__kind === kind;
}
