/**
 * ISO 4217 currency code
 *
 * @public
 */
export type Currency = 'ALL' | 'DZD' | 'ARS' | 'AUD' | 'BSD' | 'BHD' | 'BDT' | 'AMD' | 'BBD' | 'BMD' | 'BTN' | 'BOB' | 'BWP' | 'BZD' | 'SBD' | 'BND' | 'MMK' | 'BIF' | 'KHR' | 'CAD' | 'CVE' | 'KYD' | 'LKR' | 'CLP' | 'CNY' | 'COP' | 'KMF' | 'CRC' | 'HRK' | 'CUP' | 'CZK' | 'DKK' | 'DOP' | 'SVC' | 'ETB' | 'ERN' | 'FKP' | 'FJD' | 'DJF' | 'GMD' | 'GIP' | 'GTQ' | 'GNF' | 'GYD' | 'HTG' | 'HNL' | 'HKD' | 'HUF' | 'ISK' | 'INR' | 'IDR' | 'IRR' | 'IQD' | 'ILS' | 'JMD' | 'JPY' | 'KZT' | 'JOD' | 'KES' | 'KPW' | 'KRW' | 'KWD' | 'KGS' | 'LAK' | 'LBP' | 'LSL' | 'LRD' | 'LYD' | 'MOP' | 'MWK' | 'MYR' | 'MVR' | 'MUR' | 'MXN' | 'MNT' | 'MDL' | 'MAD' | 'OMR' | 'NAD' | 'NPR' | 'ANG' | 'AWG' | 'VUV' | 'NZD' | 'NIO' | 'NGN' | 'NOK' | 'PKR' | 'PAB' | 'PGK' | 'PYG' | 'PEN' | 'PHP' | 'QAR' | 'RUB' | 'RWF' | 'SHP' | 'SAR' | 'SCR' | 'SLL' | 'SGD' | 'VND' | 'SOS' | 'ZAR' | 'SSP' | 'SZL' | 'SEK' | 'CHF' | 'SYP' | 'THB' | 'TOP' | 'TTD' | 'AED' | 'TND' | 'UGX' | 'MKD' | 'EGP' | 'GBP' | 'TZS' | 'USD' | 'UYU' | 'UZS' | 'WST' | 'YER' | 'TWD' | 'TMT' | 'GHS' | 'RSD' | 'MZN' | 'AZN' | 'RON' | 'TRY' | 'XAF' | 'XCD' | 'XOF' | 'XPF' | 'ZMW' | 'SRD' | 'AFN' | 'TJS' | 'AOA' | 'BGN' | 'CDF' | 'BAM' | 'EUR' | 'UAH' | 'GEL' | 'PLN' | 'BRL';
/**
 * ISO 4217 currency number
 *
 * @public
 */
export type CurrencyNum = '8' | '12' | '32' | '36' | '44' | '48' | '50' | '51' | '52' | '60' | '64' | '68' | '72' | '84' | '90' | '96' | '104' | '108' | '116' | '124' | '132' | '136' | '144' | '152' | '156' | '170' | '174' | '188' | '191' | '192' | '203' | '208' | '214' | '222' | '230' | '232' | '238' | '242' | '262' | '270' | '292' | '320' | '324' | '328' | '332' | '340' | '344' | '348' | '352' | '356' | '360' | '364' | '368' | '376' | '388' | '392' | '398' | '400' | '404' | '408' | '410' | '414' | '417' | '418' | '422' | '426' | '430' | '434' | '446' | '454' | '458' | '462' | '480' | '484' | '496' | '498' | '504' | '512' | '516' | '524' | '532' | '533' | '548' | '554' | '558' | '566' | '578' | '586' | '590' | '598' | '600' | '604' | '608' | '634' | '643' | '646' | '654' | '682' | '690' | '694' | '702' | '704' | '706' | '710' | '728' | '748' | '752' | '756' | '760' | '764' | '776' | '780' | '784' | '788' | '800' | '807' | '818' | '826' | '834' | '840' | '858' | '860' | '882' | '886' | '901' | '934' | '936' | '941' | '943' | '944' | '946' | '949' | '950' | '951' | '952' | '953' | '967' | '968' | '971' | '972' | '973' | '975' | '976' | '977' | '978' | '980' | '981' | '985' | '986';
interface CurrencyData {
    num: CurrencyNum;
    decimals: number;
}
/**
 * Maps a ISO 4217 code to a ISO 4217 currency number and decimal positions
 *
 * @public
 */
export declare const CURRENCIES: Record<Currency, CurrencyData>;
interface RevCurrencyData {
    code: Currency;
    decimals: number;
}
/**
 * Maps a ISO 4217 number to a ISO 4217 currency code and decimal positions
 *
 * @remarks
 * @see {@link CURRENCIES}
 *
 * @public
 */
declare const REV_CURRENCIES: Record<CurrencyNum, RevCurrencyData>;
export { REV_CURRENCIES };
