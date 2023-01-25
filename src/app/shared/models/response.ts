export interface IResponse {
  status: number;
  success: boolean;
  message: string;
  data?: {};
  paginationInfo?: {} | undefined;
  body?: {
    status: number;
    success: boolean;
    message: string;
    data: {};
    paginationInfo?: {} | undefined;
  };
}
