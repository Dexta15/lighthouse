/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

export const enum LighthouseProgramErrorCode {
  /** InvalidInstructionData: Invalid instruction */
  INVALID_INSTRUCTION_DATA = 0x1770, // 6000
  /** AssertionFailed: AssertionFailed */
  ASSERTION_FAILED = 0x1771, // 6001
  /** NotEnoughAccounts: NotEnoughAccounts */
  NOT_ENOUGH_ACCOUNTS = 0x1772, // 6002
  /** BumpNotFound: BumpNotFound */
  BUMP_NOT_FOUND = 0x1773, // 6003
  /** AccountBorrowFailed: AccountBorrowFailed */
  ACCOUNT_BORROW_FAILED = 0x1774, // 6004
  /** RangeOutOfBounds: RangeOutOfBounds */
  RANGE_OUT_OF_BOUNDS = 0x1775, // 6005
  /** IndexOutOfBounds: IndexOutOfBounds */
  INDEX_OUT_OF_BOUNDS = 0x1776, // 6006
  /** FailedToDeserialize: FailedToDeserialize */
  FAILED_TO_DESERIALIZE = 0x1777, // 6007
  /** FailedToSerialize: FailedToSerialize */
  FAILED_TO_SERIALIZE = 0x1778, // 6008
  /** AccountOwnerMismatch: AccountOwnerMismatch */
  ACCOUNT_OWNER_MISMATCH = 0x1779, // 6009
  /** AccountKeyMismatch: AccountKeyMismatch */
  ACCOUNT_KEY_MISMATCH = 0x177a, // 6010
  /** AccountNotInitialized: AccountNotInitialized */
  ACCOUNT_NOT_INITIALIZED = 0x177b, // 6011
  /** AccountOwnerValidationFailed: AccountOwnerValidationFailed */
  ACCOUNT_OWNER_VALIDATION_FAILED = 0x177c, // 6012
  /** AccountFundedValidationFailed: AccountFundedValidationFailed */
  ACCOUNT_FUNDED_VALIDATION_FAILED = 0x177d, // 6013
  /** AccountDiscriminatorValidationFailed: AccountDiscriminatorValidationFailed */
  ACCOUNT_DISCRIMINATOR_VALIDATION_FAILED = 0x177e, // 6014
  /** AccountValidationFailed: AccountValidaitonFailed */
  ACCOUNT_VALIDATION_FAILED = 0x177f, // 6015
  /** CrossProgramInvokeViolation: CrossProgramInvokeViolation */
  CROSS_PROGRAM_INVOKE_VIOLATION = 0x1780, // 6016
}

export class LighthouseProgramError extends Error {
  override readonly name = 'LighthouseProgramError';

  readonly code: LighthouseProgramErrorCode;

  readonly cause: Error | undefined;

  constructor(
    code: LighthouseProgramErrorCode,
    name: string,
    message: string,
    cause?: Error
  ) {
    super(`${name} (${code}): ${message}`);
    this.code = code;
    this.cause = cause;
  }
}

let lighthouseProgramErrorCodeMap:
  | Record<LighthouseProgramErrorCode, [string, string]>
  | undefined;
if (__DEV__) {
  lighthouseProgramErrorCodeMap = {
    [LighthouseProgramErrorCode.INVALID_INSTRUCTION_DATA]: [
      'InvalidInstructionData',
      `Invalid instruction`,
    ],
    [LighthouseProgramErrorCode.ASSERTION_FAILED]: [
      'AssertionFailed',
      `AssertionFailed`,
    ],
    [LighthouseProgramErrorCode.NOT_ENOUGH_ACCOUNTS]: [
      'NotEnoughAccounts',
      `NotEnoughAccounts`,
    ],
    [LighthouseProgramErrorCode.BUMP_NOT_FOUND]: [
      'BumpNotFound',
      `BumpNotFound`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_BORROW_FAILED]: [
      'AccountBorrowFailed',
      `AccountBorrowFailed`,
    ],
    [LighthouseProgramErrorCode.RANGE_OUT_OF_BOUNDS]: [
      'RangeOutOfBounds',
      `RangeOutOfBounds`,
    ],
    [LighthouseProgramErrorCode.INDEX_OUT_OF_BOUNDS]: [
      'IndexOutOfBounds',
      `IndexOutOfBounds`,
    ],
    [LighthouseProgramErrorCode.FAILED_TO_DESERIALIZE]: [
      'FailedToDeserialize',
      `FailedToDeserialize`,
    ],
    [LighthouseProgramErrorCode.FAILED_TO_SERIALIZE]: [
      'FailedToSerialize',
      `FailedToSerialize`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_OWNER_MISMATCH]: [
      'AccountOwnerMismatch',
      `AccountOwnerMismatch`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_KEY_MISMATCH]: [
      'AccountKeyMismatch',
      `AccountKeyMismatch`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_NOT_INITIALIZED]: [
      'AccountNotInitialized',
      `AccountNotInitialized`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_OWNER_VALIDATION_FAILED]: [
      'AccountOwnerValidationFailed',
      `AccountOwnerValidationFailed`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_FUNDED_VALIDATION_FAILED]: [
      'AccountFundedValidationFailed',
      `AccountFundedValidationFailed`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_DISCRIMINATOR_VALIDATION_FAILED]: [
      'AccountDiscriminatorValidationFailed',
      `AccountDiscriminatorValidationFailed`,
    ],
    [LighthouseProgramErrorCode.ACCOUNT_VALIDATION_FAILED]: [
      'AccountValidationFailed',
      `AccountValidaitonFailed`,
    ],
    [LighthouseProgramErrorCode.CROSS_PROGRAM_INVOKE_VIOLATION]: [
      'CrossProgramInvokeViolation',
      `CrossProgramInvokeViolation`,
    ],
  };
}

export function getLighthouseProgramErrorFromCode(
  code: LighthouseProgramErrorCode,
  cause?: Error
): LighthouseProgramError {
  if (__DEV__) {
    return new LighthouseProgramError(
      code,
      ...(
        lighthouseProgramErrorCodeMap as Record<
          LighthouseProgramErrorCode,
          [string, string]
        >
      )[code],
      cause
    );
  }

  return new LighthouseProgramError(
    code,
    'Unknown',
    'Error message not available in production bundles. Compile with __DEV__ set to true to see more information.',
    cause
  );
}
