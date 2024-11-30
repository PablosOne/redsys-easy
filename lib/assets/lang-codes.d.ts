/**
 * ISO 639-1 language code
 *
 * @public
 */
export type Language = 'es' | 'en' | 'ca' | 'fr' | 'de' | 'nl' | 'it' | 'sv' | 'pt' | 'pl' | 'gl' | 'eu' | 'bg' | 'zh' | 'hr' | 'cs' | 'da' | 'et' | 'fi' | 'el' | 'hu' | 'ja' | 'lv' | 'lt' | 'mt' | 'ro' | 'ru' | 'sk' | 'sl' | 'tr';
/**
 * Redsys language code
 *
 * @public
 */
export type LanguageNum = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '100' | '156' | '191' | '203' | '208' | '233' | '246' | '300' | '348' | '392' | '428' | '440' | '470' | '642' | '643' | '703' | '705' | '792';
/**
 * Maps an ISO 639-1 language code to redsys language number
 *
 * @remarks
 * Some ISO 639-1 language codes may include more more than one redsys language number. In such cases the main redsys language number is used.
 *
 * @public
 */
export declare const LANGUAGES: Record<Language, LanguageNum>;
/**
 * Maps a redsys language code to an ISO 639-1 language code
 *
 * @remarks
 * @see {@link LANGUAGES}
 *
 * @public
 */
declare const REV_LANGUAGES: Record<LanguageNum, Language>;
export { REV_LANGUAGES };
