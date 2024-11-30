export declare const unescapeXML: (str: string) => string;
export declare const escapeXML: (str: string) => string;
type SoapRequest = {
    headers: Record<string, string>;
    body?: string | undefined;
} | {
    headers?: Record<string, string> | undefined;
    body: string;
};
/**
 * Detects the soap version of a HTTP request
 *
 * @public
 */
export declare const detectSoapVersion: (req: SoapRequest) => "1.2" | "1.1";
/**
 * Extracts the body of a SOAP notification from the body of the HTTP request
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export declare const mimicSoapNotificationReceiver: (xml: string) => string;
/**
 * Creates the body of a HTTP response as SOAP 1.1 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export declare const mimicSoap11NotificationResponse: (answer: string) => string;
/**
 * Creates the body of a HTTP response as SOAP 1.2 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
export declare const mimicSoap12NotificationResponse: (answer: string) => string;
export {};
