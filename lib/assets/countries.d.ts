/**
 * Country ISO 3166 Alpha 2 code
 *
 * @public
 */
export type Country = 'af' | 'al' | 'aq' | 'dz' | 'as' | 'ad' | 'ao' | 'ag' | 'az' | 'ar' | 'au' | 'at' | 'bs' | 'bh' | 'bd' | 'am' | 'bb' | 'be' | 'bm' | 'bt' | 'bo' | 'ba' | 'bw' | 'bv' | 'br' | 'bz' | 'io' | 'sb' | 'vg' | 'bn' | 'bg' | 'mm' | 'bi' | 'by' | 'kh' | 'cm' | 'ca' | 'cv' | 'ky' | 'cf' | 'lk' | 'td' | 'cl' | 'cn' | 'tw' | 'cx' | 'cc' | 'co' | 'km' | 'yt' | 'cg' | 'cd' | 'ck' | 'cr' | 'hr' | 'cu' | 'cy' | 'cz' | 'bj' | 'dk' | 'dm' | 'do' | 'ec' | 'sv' | 'gq' | 'et' | 'er' | 'ee' | 'fo' | 'fk' | 'gs' | 'fj' | 'fi' | 'ax' | 'fr' | 'gf' | 'pf' | 'tf' | 'dj' | 'ga' | 'ge' | 'gm' | 'ps' | 'de' | 'gh' | 'gi' | 'ki' | 'gr' | 'gl' | 'gd' | 'gp' | 'gu' | 'gt' | 'gn' | 'gy' | 'ht' | 'hm' | 'va' | 'hn' | 'hk' | 'hu' | 'is' | 'in' | 'id' | 'ir' | 'iq' | 'ie' | 'il' | 'it' | 'ci' | 'jm' | 'jp' | 'kz' | 'jo' | 'ke' | 'kp' | 'kr' | 'kw' | 'kg' | 'la' | 'lb' | 'ls' | 'lv' | 'lr' | 'ly' | 'li' | 'lt' | 'lu' | 'mo' | 'mg' | 'mw' | 'my' | 'mv' | 'ml' | 'mt' | 'mq' | 'mr' | 'mu' | 'mx' | 'mc' | 'mn' | 'md' | 'me' | 'ms' | 'ma' | 'mz' | 'om' | 'na' | 'nr' | 'np' | 'nl' | 'cw' | 'aw' | 'sx' | 'bq' | 'nc' | 'vu' | 'nz' | 'ni' | 'ne' | 'ng' | 'nu' | 'nf' | 'no' | 'mp' | 'um' | 'fm' | 'mh' | 'pw' | 'pk' | 'pa' | 'pg' | 'py' | 'pe' | 'ph' | 'pn' | 'pl' | 'pt' | 'gw' | 'tl' | 'pr' | 'qa' | 're' | 'ro' | 'ru' | 'rw' | 'bl' | 'sh' | 'kn' | 'ai' | 'lc' | 'mf' | 'pm' | 'vc' | 'sm' | 'st' | 'sa' | 'sn' | 'rs' | 'sc' | 'sl' | 'sg' | 'sk' | 'vn' | 'si' | 'so' | 'za' | 'zw' | 'es' | 'ss' | 'sd' | 'eh' | 'sr' | 'sj' | 'sz' | 'se' | 'ch' | 'sy' | 'tj' | 'th' | 'tg' | 'tk' | 'to' | 'tt' | 'ae' | 'tn' | 'tr' | 'tm' | 'tc' | 'tv' | 'ug' | 'ua' | 'mk' | 'eg' | 'gb' | 'gg' | 'je' | 'im' | 'tz' | 'us' | 'vi' | 'bf' | 'uy' | 'uz' | 've' | 'wf' | 'ws' | 'ye' | 'zm';
/**
 * Country UN M49 number
 *
 * @public
 */
export type CountryNum = '4' | '8' | '10' | '12' | '16' | '20' | '24' | '28' | '31' | '32' | '36' | '40' | '44' | '48' | '50' | '51' | '52' | '56' | '60' | '64' | '68' | '70' | '72' | '74' | '76' | '84' | '86' | '90' | '92' | '96' | '100' | '104' | '108' | '112' | '116' | '120' | '124' | '132' | '136' | '140' | '144' | '148' | '152' | '156' | '158' | '162' | '166' | '170' | '174' | '175' | '178' | '180' | '184' | '188' | '191' | '192' | '196' | '203' | '204' | '208' | '212' | '214' | '218' | '222' | '226' | '231' | '232' | '233' | '234' | '238' | '239' | '242' | '246' | '248' | '250' | '254' | '258' | '260' | '262' | '266' | '268' | '270' | '275' | '276' | '288' | '292' | '296' | '300' | '304' | '308' | '312' | '316' | '320' | '324' | '328' | '332' | '334' | '336' | '340' | '344' | '348' | '352' | '356' | '360' | '364' | '368' | '372' | '376' | '380' | '384' | '388' | '392' | '398' | '400' | '404' | '408' | '410' | '414' | '417' | '418' | '422' | '426' | '428' | '430' | '434' | '438' | '440' | '442' | '446' | '450' | '454' | '458' | '462' | '466' | '470' | '474' | '478' | '480' | '484' | '492' | '496' | '498' | '499' | '500' | '504' | '508' | '512' | '516' | '520' | '524' | '528' | '531' | '533' | '534' | '535' | '540' | '548' | '554' | '558' | '562' | '566' | '570' | '574' | '578' | '580' | '581' | '583' | '584' | '585' | '586' | '591' | '598' | '600' | '604' | '608' | '612' | '616' | '620' | '624' | '626' | '630' | '634' | '638' | '642' | '643' | '646' | '652' | '654' | '659' | '660' | '662' | '663' | '666' | '670' | '674' | '678' | '682' | '686' | '688' | '690' | '694' | '702' | '703' | '704' | '705' | '706' | '710' | '716' | '724' | '728' | '729' | '732' | '740' | '744' | '748' | '752' | '756' | '760' | '762' | '764' | '768' | '772' | '776' | '780' | '784' | '788' | '792' | '795' | '796' | '798' | '800' | '804' | '807' | '818' | '826' | '831' | '832' | '833' | '834' | '840' | '850' | '854' | '858' | '860' | '862' | '876' | '882' | '887' | '894';
/**
 * Maps ISO 3166 Alpha 2 codes to UN M49 numbers
 *
 * @remarks
 * [UN M49 to ISO 3166 information](https://unstats.un.org/unsd/methodology/m49/)
 *
 * @public
 */
export declare const COUNTRIES: Record<Country, CountryNum>;
/**
 * Maps UN M49 numbers to ISO 3166 Alpha 2 codes
 *
 * @remarks
 * @see {@link COUNTRIES}
 *
 * @public
 */
declare const REV_COUNTRIES: Record<CountryNum, Country>;
export { REV_COUNTRIES };
