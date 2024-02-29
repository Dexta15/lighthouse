/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Codec, Decoder, Encoder, combineCodec } from '@solana/codecs-core';
import {
  GetDataEnumKind,
  GetDataEnumKindContent,
  getDataEnumDecoder,
  getDataEnumEncoder,
  getStructDecoder,
  getStructEncoder,
  getTupleDecoder,
  getTupleEncoder,
} from '@solana/codecs-data-structures';
import { getU8Decoder, getU8Encoder } from '@solana/codecs-numbers';
import {
  ComparableOperator,
  ComparableOperatorArgs,
  IntegerOperator,
  IntegerOperatorArgs,
  MetaAssertion,
  MetaAssertionArgs,
  StakeAssertion,
  StakeAssertionArgs,
  getComparableOperatorDecoder,
  getComparableOperatorEncoder,
  getIntegerOperatorDecoder,
  getIntegerOperatorEncoder,
  getMetaAssertionDecoder,
  getMetaAssertionEncoder,
  getStakeAssertionDecoder,
  getStakeAssertionEncoder,
} from '.';

export type StakeAccountAssertion =
  | { __kind: 'State'; value: number; operator: ComparableOperator }
  | { __kind: 'MetaAssertion'; fields: [MetaAssertion] }
  | { __kind: 'StakeAssertion'; fields: [StakeAssertion] }
  | { __kind: 'StakeFlags'; value: number; operator: IntegerOperator };

export type StakeAccountAssertionArgs =
  | { __kind: 'State'; value: number; operator: ComparableOperatorArgs }
  | { __kind: 'MetaAssertion'; fields: [MetaAssertionArgs] }
  | { __kind: 'StakeAssertion'; fields: [StakeAssertionArgs] }
  | { __kind: 'StakeFlags'; value: number; operator: IntegerOperatorArgs };

export function getStakeAccountAssertionEncoder(): Encoder<StakeAccountAssertionArgs> {
  return getDataEnumEncoder([
    [
      'State',
      getStructEncoder([
        ['value', getU8Encoder()],
        ['operator', getComparableOperatorEncoder()],
      ]),
    ],
    [
      'MetaAssertion',
      getStructEncoder([
        ['fields', getTupleEncoder([getMetaAssertionEncoder()])],
      ]),
    ],
    [
      'StakeAssertion',
      getStructEncoder([
        ['fields', getTupleEncoder([getStakeAssertionEncoder()])],
      ]),
    ],
    [
      'StakeFlags',
      getStructEncoder([
        ['value', getU8Encoder()],
        ['operator', getIntegerOperatorEncoder()],
      ]),
    ],
  ]);
}

export function getStakeAccountAssertionDecoder(): Decoder<StakeAccountAssertion> {
  return getDataEnumDecoder([
    [
      'State',
      getStructDecoder([
        ['value', getU8Decoder()],
        ['operator', getComparableOperatorDecoder()],
      ]),
    ],
    [
      'MetaAssertion',
      getStructDecoder([
        ['fields', getTupleDecoder([getMetaAssertionDecoder()])],
      ]),
    ],
    [
      'StakeAssertion',
      getStructDecoder([
        ['fields', getTupleDecoder([getStakeAssertionDecoder()])],
      ]),
    ],
    [
      'StakeFlags',
      getStructDecoder([
        ['value', getU8Decoder()],
        ['operator', getIntegerOperatorDecoder()],
      ]),
    ],
  ]);
}

export function getStakeAccountAssertionCodec(): Codec<
  StakeAccountAssertionArgs,
  StakeAccountAssertion
> {
  return combineCodec(
    getStakeAccountAssertionEncoder(),
    getStakeAccountAssertionDecoder()
  );
}

// Data Enum Helpers.
export function stakeAccountAssertion(
  kind: 'State',
  data: GetDataEnumKindContent<StakeAccountAssertionArgs, 'State'>
): GetDataEnumKind<StakeAccountAssertionArgs, 'State'>;
export function stakeAccountAssertion(
  kind: 'MetaAssertion',
  data: GetDataEnumKindContent<
    StakeAccountAssertionArgs,
    'MetaAssertion'
  >['fields']
): GetDataEnumKind<StakeAccountAssertionArgs, 'MetaAssertion'>;
export function stakeAccountAssertion(
  kind: 'StakeAssertion',
  data: GetDataEnumKindContent<
    StakeAccountAssertionArgs,
    'StakeAssertion'
  >['fields']
): GetDataEnumKind<StakeAccountAssertionArgs, 'StakeAssertion'>;
export function stakeAccountAssertion(
  kind: 'StakeFlags',
  data: GetDataEnumKindContent<StakeAccountAssertionArgs, 'StakeFlags'>
): GetDataEnumKind<StakeAccountAssertionArgs, 'StakeFlags'>;
export function stakeAccountAssertion<
  K extends StakeAccountAssertionArgs['__kind']
>(kind: K, data?: any): Extract<StakeAccountAssertionArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isStakeAccountAssertion<
  K extends StakeAccountAssertion['__kind']
>(
  kind: K,
  value: StakeAccountAssertion
): value is StakeAccountAssertion & { __kind: K } {
  return value.__kind === kind;
}
