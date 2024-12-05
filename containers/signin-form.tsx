"use client";

import React from "react";

import { Button } from "@/components/btn";
import { Input } from "@/components/input";
import { classNames } from "@/utils/classname";
import { signinMutation } from "@/gql/mutations/signin";
import { useMutation } from "@apollo/client";
import { setToken } from "@/utils/token";
import { useRouter } from "next/navigation";

export const SigninForm: React.FC = () => {
  const [values, setValues] = React.useState<IAuthInput>({
    email: "",
    password: "",
  });
  const { push } = useRouter();
  const [signin, { loading }] = useMutation<ISigninResDto>(signinMutation);

  const onChange: (
    _: keyof IAuthInput
  ) => React.ChangeEventHandler<HTMLInputElement> = (field) => {
    return (event) => {
      const value = event.target.value;
      const newValues: IAuthInput = { ...values };
      newValues[field] = value;
      setValues(newValues);
    };
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({ variables: { input: values } });
      if (!response.data?.signin.token) return;
      setToken(response.data.signin.token);
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classNames(
        "bg-white border border-slate-300 rounded-xl px-4 py-5 shadow-lg",
        "max-w-[500px] w-full space-y-4"
      )}
    >
      <p className="text-lg font-semibold">Signin</p>
      <Input label="Email" onChange={onChange("email")} />
      <Input type="password" label="Password" onChange={onChange("password")} />
      <Button disabled={loading} type="submit">
        Signin
      </Button>
    </form>
  );
};
