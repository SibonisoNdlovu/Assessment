interface SuccessResponseType {
  code: string;
  payload: any;
  status: boolean;
}

interface FailResponseType {
  code: string;
  error: string;
  status: boolean;
}

export const successResponse = (message: string, payload: any): SuccessResponseType => {
  let response: SuccessResponseType = {
    code: message,
    payload: payload,
    status: true,
  };

  return response;
};

export const failResponse = (code: string, message: string, payload: any = null): FailResponseType => {
  let response: FailResponseType = {
    code: code,
    error: message,
    status: false,
  };
  
  return response;
};

export const notFoundResponse: FailResponseType = {
  code: 'not_found',
  error: 'Unable to find the requested resource!',
  status: false,
};
