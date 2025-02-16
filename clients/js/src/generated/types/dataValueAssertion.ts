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
  getI128Decoder,
  getI128Encoder,
  getI16Decoder,
  getI16Encoder,
  getI32Decoder,
  getI32Encoder,
  getI64Decoder,
  getI64Encoder,
  getI8Decoder,
  getI8Encoder,
  getU128Decoder,
  getU128Encoder,
  getU16Decoder,
  getU16Encoder,
  getU32Decoder,
  getU32Encoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
} from '@solana/codecs-numbers';
import {
  BytesOperator,
  BytesOperatorArgs,
  EquatableOperator,
  EquatableOperatorArgs,
  IntegerOperator,
  IntegerOperatorArgs,
  getBytesOperatorDecoder,
  getBytesOperatorEncoder,
  getEquatableOperatorDecoder,
  getEquatableOperatorEncoder,
  getIntegerOperatorDecoder,
  getIntegerOperatorEncoder,
} from '.';

export type DataValueAssertion =
  | { __kind: 'Bool'; value: boolean; operator: EquatableOperator }
  | { __kind: 'U8'; value: number; operator: IntegerOperator }
  | { __kind: 'I8'; value: number; operator: IntegerOperator }
  | { __kind: 'U16'; value: number; operator: IntegerOperator }
  | { __kind: 'I16'; value: number; operator: IntegerOperator }
  | { __kind: 'U32'; value: number; operator: IntegerOperator }
  | { __kind: 'I32'; value: number; operator: IntegerOperator }
  | { __kind: 'U64'; value: bigint; operator: IntegerOperator }
  | { __kind: 'I64'; value: bigint; operator: IntegerOperator }
  | { __kind: 'U128'; value: bigint; operator: IntegerOperator }
  | { __kind: 'I128'; value: bigint; operator: IntegerOperator }
  | { __kind: 'Bytes'; value: Uint8Array; operator: BytesOperator }
  | { __kind: 'Pubkey'; value: Address; operator: EquatableOperator };

export type DataValueAssertionArgs =
  | { __kind: 'Bool'; value: boolean; operator: EquatableOperatorArgs }
  | { __kind: 'U8'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'I8'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'U16'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'I16'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'U32'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'I32'; value: number; operator: IntegerOperatorArgs }
  | { __kind: 'U64'; value: number | bigint; operator: IntegerOperatorArgs }
  | { __kind: 'I64'; value: number | bigint; operator: IntegerOperatorArgs }
  | { __kind: 'U128'; value: number | bigint; operator: IntegerOperatorArgs }
  | { __kind: 'I128'; value: number | bigint; operator: IntegerOperatorArgs }
  | { __kind: 'Bytes'; value: Uint8Array; operator: BytesOperatorArgs }
  | { __kind: 'Pubkey'; value: Address; operator: EquatableOperatorArgs };

export function getDataValueAssertionEncoder(): Encoder<DataValueAssertionArgs> {
  return getDataEnumEncoder([
    [
      'Bool',
      getStructEncoder([
        ['value', getBooleanEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
    [
      'U8',
      getStructEncoder([
        ['value', getU8Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'I8',
      getStructEncoder([
        ['value', getI8Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'U16',
      getStructEncoder([
        ['value', getU16Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'I16',
      getStructEncoder([
        ['value', getI16Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'U32',
      getStructEncoder([
        ['value', getU32Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'I32',
      getStructEncoder([
        ['value', getI32Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'U64',
      getStructEncoder([
        ['value', getU64Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'I64',
      getStructEncoder([
        ['value', getI64Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'U128',
      getStructEncoder([
        ['value', getU128Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'I128',
      getStructEncoder([
        ['value', getI128Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
    [
      'Bytes',
      getStructEncoder([
        ['value', getBytesEncoder({ size: getU32Encoder() })],
        ['operator', getBytesOperatorEncoder()],
      ]),
    ],
    [
      'Pubkey',
      getStructEncoder([
        ['value', getAddressEncoder()],
        ['operator', getEquatableOperatorEncoder()],
      ]),
    ],
  ]);
}

export function getDataValueAssertionDecoder(): Decoder<DataValueAssertion> {
  return getDataEnumDecoder([
    [
      'Bool',
      getStructDecoder([
        ['value', getBooleanDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
    [
      'U8',
      getStructDecoder([
        ['value', getU8Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'I8',
      getStructDecoder([
        ['value', getI8Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'U16',
      getStructDecoder([
        ['value', getU16Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'I16',
      getStructDecoder([
        ['value', getI16Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'U32',
      getStructDecoder([
        ['value', getU32Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'I32',
      getStructDecoder([
        ['value', getI32Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'U64',
      getStructDecoder([
        ['value', getU64Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'I64',
      getStructDecoder([
        ['value', getI64Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'U128',
      getStructDecoder([
        ['value', getU128Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'I128',
      getStructDecoder([
        ['value', getI128Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
    [
      'Bytes',
      getStructDecoder([
        ['value', getBytesDecoder({ size: getU32Decoder() })],
        ['operator', getBytesOperatorDecoder()],
      ]),
    ],
    [
      'Pubkey',
      getStructDecoder([
        ['value', getAddressDecoder()],
        ['operator', getEquatableOperatorDecoder()],
      ]),
    ],
  ]);
}

export function getDataValueAssertionCodec(): Codec<
  DataValueAssertionArgs,
  DataValueAssertion
> {
  return combineCodec(
    getDataValueAssertionEncoder(),
    getDataValueAssertionDecoder()
  );
}

// Data Enum Helpers.
export function dataValueAssertion(
  kind: 'Bool',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'Bool'>
): GetDataEnumKind<DataValueAssertionArgs, 'Bool'>;
export function dataValueAssertion(
  kind: 'U8',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'U8'>
): GetDataEnumKind<DataValueAssertionArgs, 'U8'>;
export function dataValueAssertion(
  kind: 'I8',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'I8'>
): GetDataEnumKind<DataValueAssertionArgs, 'I8'>;
export function dataValueAssertion(
  kind: 'U16',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'U16'>
): GetDataEnumKind<DataValueAssertionArgs, 'U16'>;
export function dataValueAssertion(
  kind: 'I16',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'I16'>
): GetDataEnumKind<DataValueAssertionArgs, 'I16'>;
export function dataValueAssertion(
  kind: 'U32',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'U32'>
): GetDataEnumKind<DataValueAssertionArgs, 'U32'>;
export function dataValueAssertion(
  kind: 'I32',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'I32'>
): GetDataEnumKind<DataValueAssertionArgs, 'I32'>;
export function dataValueAssertion(
  kind: 'U64',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'U64'>
): GetDataEnumKind<DataValueAssertionArgs, 'U64'>;
export function dataValueAssertion(
  kind: 'I64',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'I64'>
): GetDataEnumKind<DataValueAssertionArgs, 'I64'>;
export function dataValueAssertion(
  kind: 'U128',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'U128'>
): GetDataEnumKind<DataValueAssertionArgs, 'U128'>;
export function dataValueAssertion(
  kind: 'I128',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'I128'>
): GetDataEnumKind<DataValueAssertionArgs, 'I128'>;
export function dataValueAssertion(
  kind: 'Bytes',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'Bytes'>
): GetDataEnumKind<DataValueAssertionArgs, 'Bytes'>;
export function dataValueAssertion(
  kind: 'Pubkey',
  data: GetDataEnumKindContent<DataValueAssertionArgs, 'Pubkey'>
): GetDataEnumKind<DataValueAssertionArgs, 'Pubkey'>;
export function dataValueAssertion<K extends DataValueAssertionArgs['__kind']>(
  kind: K,
  data?: any
): Extract<DataValueAssertionArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isDataValueAssertion<K extends DataValueAssertion['__kind']>(
  kind: K,
  value: DataValueAssertion
): value is DataValueAssertion & { __kind: K } {
  return value.__kind === kind;
}
