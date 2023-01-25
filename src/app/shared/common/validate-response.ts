import { IResponse } from '..';

export async function validateResponse(res: IResponse) {
  let message;
  let data;
  let success;

  success = res?.success || res?.body?.success;
  data = res?.data || res?.body?.data;
  message = res?.message || res?.body?.message;

  return {
    message,
    data,
    success,
  };
}
