/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Codec, Decoder, Encoder, combineCodec } from '@solana/codecs-core';
import {
  getScalarEnumDecoder,
  getScalarEnumEncoder,
} from '@solana/codecs-data-structures';

export enum BytesOperator {
  Equal,
  NotEqual,
}

export type BytesOperatorArgs = BytesOperator;

export function getBytesOperatorEncoder(): Encoder<BytesOperatorArgs> {
  return getScalarEnumEncoder(BytesOperator);
}

export function getBytesOperatorDecoder(): Decoder<BytesOperator> {
  return getScalarEnumDecoder(BytesOperator);
}

export function getBytesOperatorCodec(): Codec<
  BytesOperatorArgs,
  BytesOperator
> {
  return combineCodec(getBytesOperatorEncoder(), getBytesOperatorDecoder());
}
