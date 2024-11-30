import type { CommonRawRequestParams, CommonRawResponseParams } from '../types/api';
/**
 * Generates a random order ID following redsys requirements
 *
 * @public
 */
export declare const randomTransactionId: () => string;
export declare const extractAndAssertOrderFromRequestParams: (requestParams: CommonRawRequestParams) => string;
export declare const extractAndAssertOrderFromResponseParams: (responseParams: CommonRawResponseParams) => string;
/**
 * Indicates if a response code signals success
 *
 * @public
 */
export declare const isResponseCodeOk: (responseCode: string | number) => boolean;
/**
 * Asserts that a response code indicates success
 *
 * @public
 */
export declare const assertSuccessfulResponseCode: (responseCode: string | number | undefined) => void;
/**
 * Asserts that response has a code indicating success
 *
 * @public
 */
export declare const assertSuccessfulResponse: (responseParams: {
    Ds_Response?: string | undefined;
}) => void;
export declare const isStringNotEmpty: <T extends string>(str: T | undefined) => str is T;
/**
 * Map over maybe monad
 *
 * If value is defined apply function and return output, otherwise return undefined.
 */
export declare const mapMaybeMonad: <V, Out>(value: V | undefined, fn: (value: V) => Out) => Out | undefined;
