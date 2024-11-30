/**
 * Error superclass for all redsys-easy specific errors
 *
 * @public
 */
export declare class RedsysError extends Error {
    constructor(message: string);
}
/**
 * Invalid input provided
 *
 * @public
 */
export declare class ValidationError extends RedsysError {
    value: unknown;
    parameters: object;
    constructor(message: string, parameters: object);
}
/**
 * Response cannot be parsed
 *
 * @public
 */
export declare class ParseError extends RedsysError {
    value: unknown;
    location: unknown | undefined;
    description: string | undefined;
    constructor(message: string, value?: unknown | undefined, location?: unknown | undefined);
}
interface HTTPErrorOptions {
    message?: string | undefined;
    code: number;
    response?: unknown | undefined;
}
/**
 * HTTP Error
 *
 * @public
 */
export declare class HTTPError extends RedsysError {
    code: number | undefined;
    response: unknown | undefined;
    constructor({ message, code, response }: HTTPErrorOptions);
}
interface GatewayErrorOptions {
    message?: string | undefined;
    code: string;
    response?: unknown | undefined;
}
/**
 * Request could not be processed by Redsys
 *
 * @public
 */
export declare class GatewayError extends RedsysError {
    code: string | undefined;
    response: unknown | undefined;
    constructor({ message, code, response }: GatewayErrorOptions);
}
interface ResponseErrorOptions {
    message?: string | undefined;
    code: number;
    response?: unknown | undefined;
}
/**
 * Response contained an error code
 *
 * @public
 */
export declare class ResponseError extends RedsysError {
    code: number | undefined;
    response: unknown | undefined;
    constructor({ message, code, response }: ResponseErrorOptions);
}
export {};
