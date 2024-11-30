/**
 * Transaction type code
 *
 * @public
 */
export type TransactionType = '0' | '1' | '2' | '3' | '5' | '6' | '7' | '8' | '9' | '15' | '17' | '34' | '37' | '44' | 'O' | 'F' | 'P' | 'Q' | 'R' | 'S' | 'A';
/**
 * Transaction type enum
 *
 * @public
 */
export declare const TRANSACTION_TYPES: {
    /** Autorización */
    readonly AUTHORIZATION: "0";
    /** Preautorización */
    readonly PRE_AUTHORIZATION: "1";
    /** Confirmación de preautorización */
    readonly CONFIRMATION: "2";
    /** Devolución Automática */
    readonly AUTO_REFUND: "3";
    /** Transacción Recurrente */
    readonly RECURRING_TRANSACTION: "5";
    /** Transacción Sucesiva */
    readonly SUCCESSIVE_TRANSACTION: "6";
    /** Pre-autenticación */
    readonly PRE_AUTHENTICATION: "7";
    /** Confirmación de pre-autenticación */
    readonly PRE_AUTHENTICATION_CONFIRMATION: "8";
    /** Anulación de Preautorización */
    readonly PRE_AUTHORIZATION_CANCEL: "9";
    /** Autorización en diferido */
    readonly DEFERRED_AUTHORIZATION: "O";
    /** Paygold */
    readonly PAYGOLD: "15";
    /** Autenticación Puce */
    readonly PUCE_AUTH: "17";
    /** Devolución sin original */
    readonly RETURN_WITHOUT_ORIGINAL: "34";
    /** Premio de apuestas */
    readonly BETTING_PAYOUT: "37";
    /** Eliminar referencia */
    readonly DELETE_REFERENCE: "44";
    /** Operaciones sin autenticacíon */
    readonly NO_AUTHENTICATION: "A";
    /** Paygold */
    readonly PAYLINK: "F";
    /** Confirmación de autorización en diferido */
    readonly DEFERRED_AUTHORIZATION_CONFIRMATION: "P";
    /** Anulación de autorización en diferido */
    readonly DEFERRED_AUTHORIZATION_CANCEL: "Q";
    /** Cuota inicial diferido */
    readonly DEFERRED_INITIAL_FEE: "R";
    /** Cuota sucesiva diferido */
    readonly DEFERRED_SUCCESSIVE_FEE: "S";
};
export default TRANSACTION_TYPES;
