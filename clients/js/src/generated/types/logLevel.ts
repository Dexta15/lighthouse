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

export enum LogLevel {
  Silent,
  PlaintextLog,
  EventLog,
  CpiLog,
}

export type LogLevelArgs = LogLevel;

export function getLogLevelEncoder(): Encoder<LogLevelArgs> {
  return getScalarEnumEncoder(LogLevel);
}

export function getLogLevelDecoder(): Decoder<LogLevel> {
  return getScalarEnumDecoder(LogLevel);
}

export function getLogLevelCodec(): Codec<LogLevelArgs, LogLevel> {
  return combineCodec(getLogLevelEncoder(), getLogLevelDecoder());
}
