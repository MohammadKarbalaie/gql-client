export const setToken = (newToken: string) => {
  window.localStorage.setItem(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string,
    newToken
  );
};

export const getToken = () => {
  return window.localStorage.getItem(
    process.env.NEXT_PUBLIC_TOKEN_NAME as string
  );
};

export const isAuth = () => Boolean(getToken());
