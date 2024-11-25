
import axios from 'axios';
import { HTTPError, GatewayError } from '../errors';

import type {
  CommonRawRequestParams,
  CommonRawResponseParams,
  ResponseJSONSuccess,
  ResponseJSONError
} from '../types/api';

import {
  serializeAndSignJSONRequest,
  deserializeAndVerifyJSONResponse
} from './json';

export const jsonRequest = async <
  RequestParams extends CommonRawRequestParams,
  ResponseParams extends CommonRawResponseParams
>(
  url: string,
  merchantKey: string,
  rawRequestParams: RequestParams
): Promise<ResponseParams> => {
  const payload = serializeAndSignJSONRequest(merchantKey, rawRequestParams);

  try {
    const response = await axios.post<ResponseJSONSuccess | ResponseJSONError>(
      url,
      payload,
      {
        headers: {
          'Content-Type': false,
          // 'Access-Control-Allow-Origin': '*' // Ensure to match your CORS policy
        }
      }
    );
    const responseData = response.data;
    if ('errorCode' in responseData) {
      throw new GatewayError({
        code: responseData.errorCode,
        response: responseData
      });
    }

    return deserializeAndVerifyJSONResponse<ResponseParams>(
      merchantKey,
      responseData
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response?.data as
        | ResponseJSONSuccess
        | ResponseJSONError
        | undefined;

      throw new HTTPError({
        code: error.response?.status ?? 500,
        response
      });
    }

    throw error; // Rethrow unexpected errors
  }
};