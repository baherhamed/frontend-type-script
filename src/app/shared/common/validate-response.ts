import { IResponse } from '..';

export async function validateResponse(res: IResponse) {
  const success = res?.success || res?.body?.success;
  const data = res?.data || res?.body?.data;
  const message = res?.message || res?.body?.message;

  return {
    message,
    data,
    success,
  };
}
