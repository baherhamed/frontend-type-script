export interface Token {
  user_id: string;
  name: string;
  iat: number;
  exp: number;
  isDeveloper?: boolean;
}
