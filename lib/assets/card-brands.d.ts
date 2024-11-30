/**
 * Card brand name
 *
 * @public
 */
export type CardBrand = 'VISA' | 'MASTERCARD' | 'DINERS' | 'PRIVATE' | 'AMEX' | 'JCB' | 'UPI';
/**
 * Card brand number
 *
 * @public
 */
export type CardBrandNum = '1' | '2' | '6' | '7' | '8' | '9' | '22';
/**
 * Card brand name to number
 *
 * @public
 */
export declare const CARDBRANDS: Record<CardBrand, CardBrandNum>;
/**
 * Card brand number to name
 *
 * @remarks
 * @see {@link CARDBRANDS}
 *
 * @public
 */
declare const REV_CARDBRANDS: Record<CardBrandNum, CardBrand>;
export { REV_CARDBRANDS };
