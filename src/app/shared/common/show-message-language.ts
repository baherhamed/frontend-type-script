/* eslint-disable @typescript-eslint/no-explicit-any */
import { site } from './site';
export async function showMessageInLanguage(msg: any): Promise<{
  message: any;
  error: any;
  success: any;
  info: any;
  warning: any;
}> {
  let message;
  let error;
  let success;
  let info;
  let warning;
  const currenLanguage = localStorage.getItem(site.currentLangValue);

  if (currenLanguage === site.language.en) {
    message = msg;
    error = site.messageTitle.error.en;
    success = site.messageTitle.success.en;
    info = site.messageTitle.info.en;
    warning = site.messageTitle.warning.en;
  } else if (!currenLanguage || currenLanguage === site.language.ar) {
    message = msg;
    error = site.messageTitle.error.ar;
    success = site.messageTitle.success.ar;
    info = site.messageTitle.info.ar;
    warning = site.messageTitle.warning.ar;
  }

  return { message, error, success, info, warning };
}
