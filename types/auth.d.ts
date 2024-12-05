interface IAuthInput {
  email: string!;
  password: string!;
}

interface ISigninResDto {
  signin: {
    id: string;
    token: string;
  };
}
interface ICreateDto {
  createUser: {
    token: string;
  };
}
