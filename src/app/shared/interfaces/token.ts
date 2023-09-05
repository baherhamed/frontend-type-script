export interface Token {
  userId: string;
  name: string;
  iat: number;
  exp: number;
  isDeveloper?: boolean;
}
