type ErrorRecord = {
    code: number;
    sisCode: null;
    text: string;
} | {
    code: null;
    sisCode: string;
    text: string;
} | {
    code: number;
    sisCode: string;
    text: string;
};
export declare const ALL_ERRORS: ErrorRecord[];
declare const ERROR_CODES: Record<string, string>;
declare const SIS_ERROR_CODES: Record<string, string>;
export { ERROR_CODES, SIS_ERROR_CODES };
