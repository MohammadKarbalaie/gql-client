interface IUser {
  id: string | number;
  email: string;
  createdAt?: string;
  token?: string | null;
  issues?: Array<Issue>;
}
