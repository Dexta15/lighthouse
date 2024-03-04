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
  getBytesDecoder,
  getBytesEncoder,
  getDataEnumDecoder,
  getDataEnumEncoder,
  getStructDecoder,
  getStructEncoder,
} from '@solana/codecs-data-structures';
import { getU32Decoder, getU32Encoder } from '@solana/codecs-numbers';

export type MerkleTreeAssertion = {
  __kind: 'VerifyLeaf';
  leafIndex: number;
  leafHash: Uint8Array;
};

export type MerkleTreeAssertionArgs = MerkleTreeAssertion;

export function getMerkleTreeAssertionEncoder(): Encoder<MerkleTreeAssertionArgs> {
  return getDataEnumEncoder([
    [
      'VerifyLeaf',
      getStructEncoder([
        ['leafIndex', getU32Encoder()],
        ['leafHash', getBytesEncoder({ size: 32 })],
      ]),
    ],
  ]);
}

export function getMerkleTreeAssertionDecoder(): Decoder<MerkleTreeAssertion> {
  return getDataEnumDecoder([
    [
      'VerifyLeaf',
      getStructDecoder([
        ['leafIndex', getU32Decoder()],
        ['leafHash', getBytesDecoder({ size: 32 })],
      ]),
    ],
  ]);
}

export function getMerkleTreeAssertionCodec(): Codec<
  MerkleTreeAssertionArgs,
  MerkleTreeAssertion
> {
  return combineCodec(
    getMerkleTreeAssertionEncoder(),
    getMerkleTreeAssertionDecoder()
  );
}

// Data Enum Helpers.
export function merkleTreeAssertion(
  kind: 'VerifyLeaf',
  data: GetDataEnumKindContent<MerkleTreeAssertionArgs, 'VerifyLeaf'>
): GetDataEnumKind<MerkleTreeAssertionArgs, 'VerifyLeaf'>;
export function merkleTreeAssertion<
  K extends MerkleTreeAssertionArgs['__kind']
>(kind: K, data?: any): Extract<MerkleTreeAssertionArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isMerkleTreeAssertion<K extends MerkleTreeAssertion['__kind']>(
  kind: K,
  value: MerkleTreeAssertion
): value is MerkleTreeAssertion & { __kind: K } {
  return value.__kind === kind;
}
