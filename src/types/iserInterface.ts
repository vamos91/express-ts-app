export interface IUser {
  email: string;
  password: string;
  isValidated: boolean;
  role: ["admin", "basic_user"];
}
