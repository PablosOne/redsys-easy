/**
 * Node JS client and utilities for implementing a redsys payment gateway
 *
 * @packageDocumentation
 */

export {
  randomTransactionId,
  assertSuccessfulResponseCode,
  isResponseCodeOk
} from './utils/misc';

export {
  getResponseCodeMessage,
  getSISErrorCodeMessage
} from './utils/codes';

export {
  RedsysError,
  ValidationError,
  ParseError,
  HTTPError,
  GatewayError,
  ResponseError
} from './errors';

export {
  detectSoapVersion,
  mimicSoapNotificationReceiver,
  mimicSoap11NotificationResponse,
  mimicSoap12NotificationResponse
} from './soap/utils';

export type {
  RedirectInputParams,
  RestIniciaPeticionInputParams,
  RestTrataPeticionInputParams
} from './types/input-params';

export type {
  RestIniciaPeticionOutputParams,
  RestTrataPeticionOutputParams,
  RestNotificationOutputParams,
  SoapNotificationOutputParams
} from './types/output-params';

export type {
  ResponseJSONSuccess,
  RedirectForm,
  ThreeDSv2MethodNotificationBody,
  ThreeDSv1ChallengeNotificationBody,
  ThreeDSv2ChallengeNotificationBody
} from './types/api';

export {
  createRedirectInputFormatter,
  createRequestInputFormatter,
  requestOutputFormatter,
  restNotificationOutputFormatter,
  soapNotificationOutputFormatter
} from './formatters';

export type {
  RequestFormattedInput,
  RequestFormattedOutput,
  RedirectFormattedInput,
  NotificationFormattedOutput
} from './formatters';

export {
  useInputFormatter,
  useOutputFormatter,
  usePromiseOutputFormatter
} from './formatter-utils';

export { default as TRANSACTION_TYPES } from './assets/transaction-types';
export { CURRENCIES, REV_CURRENCIES } from './assets/currencies';
export type { Currency } from './assets/currencies';
export type { Language } from './assets/lang-codes';
export type { Country } from './assets/countries';
export type { CardBrand } from './assets/card-brands';
export type { TransactionType } from './assets/transaction-types';

export {
  createRedsysAPI,
  PRODUCTION_URLS,
  SANDBOX_URLS
} from './client';

export type {
  UrlsConfig,
  RedsysConfig
} from './client';

export {
  create3DSMethodForm,
  create3DSv1ChallengeForm,
  create3DSv2ChallengeForm,
  deserializeThreeDSMethodData,
  deserializeCres
} from './rest/3ds';

export type {
  ThreeDSBrowserClientInfo,
  ThreeDSMethodForm,
  ThreeDSv1ChallengeForm,
  ThreeDSv2ChallengeForm,
  ThreeDSMethodData,
  ThreeDSCres
} from './types/3ds-params';
