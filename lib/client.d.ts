import type { ResponseJSONSuccess, RedirectForm } from './types/api';
import type { RestIniciaPeticionInputParams, RestTrataPeticionInputParams, RedirectInputParams } from './types/input-params';
import type { RestIniciaPeticionOutputParams, RestTrataPeticionOutputParams, RestNotificationOutputParams, SoapNotificationOutputParams } from './types/output-params';
/**
 * URLs to configure the API
 *
 * @public
 */
export interface UrlsConfig {
    redirect: string;
    restTrataPeticion: string;
    restIniciaPeticion: string;
}
/**
 * Redsys production urls
 *
 * @public
 */
export declare const PRODUCTION_URLS: UrlsConfig;
/**
 * Redsys sandbox urls
 *
 * @public
 */
export declare const SANDBOX_URLS: UrlsConfig;
/**
 * Redsys API settings
 *
 * @public
 */
export interface RedsysConfig {
    secretKey: string;
    urls: UrlsConfig;
}
/**
 * Sends a iniciaPeticion request using REST interface
 *
 * @public
 */
export type RestIniciaPeticion = (paramsInput: RestIniciaPeticionInputParams) => Promise<RestIniciaPeticionOutputParams>;
/**
 * Sends a trataPeticion request using REST interface
 *
 * @public
 */
export type RestTrataPeticion = (paramsInput: RestTrataPeticionInputParams) => Promise<RestTrataPeticionOutputParams>;
/**
 * Creates the parameters needed for a redirect form
 *
 * @public
 */
export type CreateRedirectForm = (paramsInput: RedirectInputParams) => RedirectForm;
/**
 * Processes a JSON REST notification
 *
 * @public
 */
export type ProcessRestNotification = (
/** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
body: ResponseJSONSuccess) => RestNotificationOutputParams;
/**
 * Parses and verifies the body of a SOAP notification
 *
 * @public
 */
export type ProcessSoapNotification = (
/** SOAP notification as a XML string */
xml: string) => SoapNotificationOutputParams;
/**
 * Creates an answer for a SOAP notification, serializes and signs it
 *
 * @public
 */
export type CreateSoapNotificationAnswer = (
/** Order identifier */
order: string, 
/** Indicates if the payment is allowed to proceed */
allow: boolean) => string;
/**
 * Redsys API
 *
 * @public
 */
export interface RedsysAPI {
    restIniciaPeticion: RestIniciaPeticion;
    restTrataPeticion: RestTrataPeticion;
    createRedirectForm: CreateRedirectForm;
    processRestNotification: ProcessRestNotification;
    processSoapNotification: ProcessSoapNotification;
    createSoapNotificationAnswer: CreateSoapNotificationAnswer;
}
/**
 * Creates Redsys API functions
 *
 * @remarks
 * These API functions are anonymous and can be wrapped by formatters and processors
 *
 * @public
 */
export declare const createRedsysAPI: (config: RedsysConfig) => {
    restIniciaPeticion: (paramsInput: RestIniciaPeticionInputParams) => Promise<RestIniciaPeticionOutputParams>;
    restTrataPeticion: (paramsInput: RestTrataPeticionInputParams) => Promise<RestTrataPeticionOutputParams>;
    createRedirectForm: (paramsInput: RedirectInputParams) => RedirectForm;
    processRestNotification: (body: ResponseJSONSuccess) => RestNotificationOutputParams;
    processSoapNotification: (xml: string) => SoapNotificationOutputParams;
    createSoapNotificationAnswer: (order: string, allow: boolean) => string;
};
