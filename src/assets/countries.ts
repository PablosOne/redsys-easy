export type Country =
  | 'af'
  | 'al'
  | 'aq'
  | 'dz'
  | 'as'
  | 'ad'
  | 'ao'
  | 'ag'
  | 'az'
  | 'ar'
  | 'au'
  | 'at'
  | 'bs'
  | 'bh'
  | 'bd'
  | 'am'
  | 'bb'
  | 'be'
  | 'bm'
  | 'bt'
  | 'bo'
  | 'ba'
  | 'bw'
  | 'bv'
  | 'br'
  | 'bz'
  | 'io'
  | 'sb'
  | 'vg'
  | 'bn'
  | 'bg'
  | 'mm'
  | 'bi'
  | 'by'
  | 'kh'
  | 'cm'
  | 'ca'
  | 'cv'
  | 'ky'
  | 'cf'
  | 'lk'
  | 'td'
  | 'cl'
  | 'cn'
  | 'tw'
  | 'cx'
  | 'cc'
  | 'co'
  | 'km'
  | 'yt'
  | 'cg'
  | 'cd'
  | 'ck'
  | 'cr'
  | 'hr'
  | 'cu'
  | 'cy'
  | 'cz'
  | 'bj'
  | 'dk'
  | 'dm'
  | 'do'
  | 'ec'
  | 'sv'
  | 'gq'
  | 'et'
  | 'er'
  | 'ee'
  | 'fo'
  | 'fk'
  | 'gs'
  | 'fj'
  | 'fi'
  | 'ax'
  | 'fr'
  | 'gf'
  | 'pf'
  | 'tf'
  | 'dj'
  | 'ga'
  | 'ge'
  | 'gm'
  | 'ps'
  | 'de'
  | 'gh'
  | 'gi'
  | 'ki'
  | 'gr'
  | 'gl'
  | 'gd'
  | 'gp'
  | 'gu'
  | 'gt'
  | 'gn'
  | 'gy'
  | 'ht'
  | 'hm'
  | 'va'
  | 'hn'
  | 'hk'
  | 'hu'
  | 'is'
  | 'in'
  | 'id'
  | 'ir'
  | 'iq'
  | 'ie'
  | 'il'
  | 'it'
  | 'ci'
  | 'jm'
  | 'jp'
  | 'kz'
  | 'jo'
  | 'ke'
  | 'kp'
  | 'kr'
  | 'kw'
  | 'kg'
  | 'la'
  | 'lb'
  | 'ls'
  | 'lv'
  | 'lr'
  | 'ly'
  | 'li'
  | 'lt'
  | 'lu'
  | 'mo'
  | 'mg'
  | 'mw'
  | 'my'
  | 'mv'
  | 'ml'
  | 'mt'
  | 'mq'
  | 'mr'
  | 'mu'
  | 'mx'
  | 'mc'
  | 'mn'
  | 'md'
  | 'me'
  | 'ms'
  | 'ma'
  | 'mz'
  | 'om'
  | 'na'
  | 'nr'
  | 'np'
  | 'nl'
  | 'cw'
  | 'aw'
  | 'sx'
  | 'bq'
  | 'nc'
  | 'vu'
  | 'nz'
  | 'ni'
  | 'ne'
  | 'ng'
  | 'nu'
  | 'nf'
  | 'no'
  | 'mp'
  | 'um'
  | 'fm'
  | 'mh'
  | 'pw'
  | 'pk'
  | 'pa'
  | 'pg'
  | 'py'
  | 'pe'
  | 'ph'
  | 'pn'
  | 'pl'
  | 'pt'
  | 'gw'
  | 'tl'
  | 'pr'
  | 'qa'
  | 're'
  | 'ro'
  | 'ru'
  | 'rw'
  | 'bl'
  | 'sh'
  | 'kn'
  | 'ai'
  | 'lc'
  | 'mf'
  | 'pm'
  | 'vc'
  | 'sm'
  | 'st'
  | 'sa'
  | 'sn'
  | 'rs'
  | 'sc'
  | 'sl'
  | 'sg'
  | 'sk'
  | 'vn'
  | 'si'
  | 'so'
  | 'za'
  | 'zw'
  | 'es'
  | 'ss'
  | 'sd'
  | 'eh'
  | 'sr'
  | 'sj'
  | 'sz'
  | 'se'
  | 'ch'
  | 'sy'
  | 'tj'
  | 'th'
  | 'tg'
  | 'tk'
  | 'to'
  | 'tt'
  | 'ae'
  | 'tn'
  | 'tr'
  | 'tm'
  | 'tc'
  | 'tv'
  | 'ug'
  | 'ua'
  | 'mk'
  | 'eg'
  | 'gb'
  | 'gg'
  | 'je'
  | 'im'
  | 'tz'
  | 'us'
  | 'vi'
  | 'bf'
  | 'uy'
  | 'uz'
  | 've'
  | 'wf'
  | 'ws'
  | 'ye'
  | 'zm';

// UN M49 === ISO 3166 Num => ISO 3166 Alpha 2
export const REV_COUNTRIES: Record<string, Country> = {
  4: 'af',
  8: 'al',
  10: 'aq',
  12: 'dz',
  16: 'as',
  20: 'ad',
  24: 'ao',
  28: 'ag',
  31: 'az',
  32: 'ar',
  36: 'au',
  40: 'at',
  44: 'bs',
  48: 'bh',
  50: 'bd',
  51: 'am',
  52: 'bb',
  56: 'be',
  60: 'bm',
  64: 'bt',
  68: 'bo',
  70: 'ba',
  72: 'bw',
  74: 'bv',
  76: 'br',
  84: 'bz',
  86: 'io',
  90: 'sb',
  92: 'vg',
  96: 'bn',
  100: 'bg',
  104: 'mm',
  108: 'bi',
  112: 'by',
  116: 'kh',
  120: 'cm',
  124: 'ca',
  132: 'cv',
  136: 'ky',
  140: 'cf',
  144: 'lk',
  148: 'td',
  152: 'cl',
  156: 'cn',
  158: 'tw',
  162: 'cx',
  166: 'cc',
  170: 'co',
  174: 'km',
  175: 'yt',
  178: 'cg',
  180: 'cd',
  184: 'ck',
  188: 'cr',
  191: 'hr',
  192: 'cu',
  196: 'cy',
  203: 'cz',
  204: 'bj',
  208: 'dk',
  212: 'dm',
  214: 'do',
  218: 'ec',
  222: 'sv',
  226: 'gq',
  231: 'et',
  232: 'er',
  233: 'ee',
  234: 'fo',
  238: 'fk',
  239: 'gs',
  242: 'fj',
  246: 'fi',
  248: 'ax',
  250: 'fr',
  254: 'gf',
  258: 'pf',
  260: 'tf',
  262: 'dj',
  266: 'ga',
  268: 'ge',
  270: 'gm',
  275: 'ps',
  276: 'de',
  288: 'gh',
  292: 'gi',
  296: 'ki',
  300: 'gr',
  304: 'gl',
  308: 'gd',
  312: 'gp',
  316: 'gu',
  320: 'gt',
  324: 'gn',
  328: 'gy',
  332: 'ht',
  334: 'hm',
  336: 'va',
  340: 'hn',
  344: 'hk',
  348: 'hu',
  352: 'is',
  356: 'in',
  360: 'id',
  364: 'ir',
  368: 'iq',
  372: 'ie',
  376: 'il',
  380: 'it',
  384: 'ci',
  388: 'jm',
  392: 'jp',
  398: 'kz',
  400: 'jo',
  404: 'ke',
  408: 'kp',
  410: 'kr',
  414: 'kw',
  417: 'kg',
  418: 'la',
  422: 'lb',
  426: 'ls',
  428: 'lv',
  430: 'lr',
  434: 'ly',
  438: 'li',
  440: 'lt',
  442: 'lu',
  446: 'mo',
  450: 'mg',
  454: 'mw',
  458: 'my',
  462: 'mv',
  466: 'ml',
  470: 'mt',
  474: 'mq',
  478: 'mr',
  480: 'mu',
  484: 'mx',
  492: 'mc',
  496: 'mn',
  498: 'md',
  499: 'me',
  500: 'ms',
  504: 'ma',
  508: 'mz',
  512: 'om',
  516: 'na',
  520: 'nr',
  524: 'np',
  528: 'nl',
  531: 'cw',
  533: 'aw',
  534: 'sx',
  535: 'bq',
  540: 'nc',
  548: 'vu',
  554: 'nz',
  558: 'ni',
  562: 'ne',
  566: 'ng',
  570: 'nu',
  574: 'nf',
  578: 'no',
  580: 'mp',
  581: 'um',
  583: 'fm',
  584: 'mh',
  585: 'pw',
  586: 'pk',
  591: 'pa',
  598: 'pg',
  600: 'py',
  604: 'pe',
  608: 'ph',
  612: 'pn',
  616: 'pl',
  620: 'pt',
  624: 'gw',
  626: 'tl',
  630: 'pr',
  634: 'qa',
  638: 're',
  642: 'ro',
  643: 'ru',
  646: 'rw',
  652: 'bl',
  654: 'sh',
  659: 'kn',
  660: 'ai',
  662: 'lc',
  663: 'mf',
  666: 'pm',
  670: 'vc',
  674: 'sm',
  678: 'st',
  682: 'sa',
  686: 'sn',
  688: 'rs',
  690: 'sc',
  694: 'sl',
  702: 'sg',
  703: 'sk',
  704: 'vn',
  705: 'si',
  706: 'so',
  710: 'za',
  716: 'zw',
  724: 'es',
  728: 'ss',
  729: 'sd',
  732: 'eh',
  740: 'sr',
  744: 'sj',
  748: 'sz',
  752: 'se',
  756: 'ch',
  760: 'sy',
  762: 'tj',
  764: 'th',
  768: 'tg',
  772: 'tk',
  776: 'to',
  780: 'tt',
  784: 'ae',
  788: 'tn',
  792: 'tr',
  795: 'tm',
  796: 'tc',
  798: 'tv',
  800: 'ug',
  804: 'ua',
  807: 'mk',
  818: 'eg',
  826: 'gb',
  831: 'gg',
  832: 'je',
  833: 'im',
  834: 'tz',
  840: 'us',
  850: 'vi',
  854: 'bf',
  858: 'uy',
  860: 'uz',
  862: 've',
  876: 'wf',
  882: 'ws',
  887: 'ye',
  894: 'zm'
};

const COUNTRIES: Partial<Record<Country, string>> = {};

for (const [key, value] of Object.entries(REV_COUNTRIES)) {
  COUNTRIES[value] = key;
}

export { COUNTRIES };
