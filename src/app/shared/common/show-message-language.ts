import { definitions } from './definitions';
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
  const currenLanguage = localStorage.getItem(definitions.currentLangValue);

  if (currenLanguage === definitions.language.en) {
    message = msg;
    error = definitions.messageTitle.error.en;
    success = definitions.messageTitle.success.en;
    info = definitions.messageTitle.info.en;
    warning = definitions.messageTitle.warning.en;
  } else if (!currenLanguage || currenLanguage === definitions.language.ar) {
    message = msg;
    error = definitions.messageTitle.error.ar;
    success = definitions.messageTitle.success.ar;
    info = definitions.messageTitle.info.ar;
    warning = definitions.messageTitle.warning.ar;
  }

  return { message, error, success, info, warning };
}
