import { SubmitHandler } from "react-hook-form";

import { Layout } from "@/components/layouts/AuthLayout";
import { Form, FormChildrenProps } from "@/components/ui/form";
import { loginInputSchema, LoginInput } from "@/app/lib/auth.type";

const LoginFormChildren = ({
  register,
  formState,
}: FormChildrenProps<LoginInput>) => {
  return (
    <>
      <label htmlFor={"Email"}>Email</label>
      <input
        {...register("email")}
        type="text"
        id="Email"
        placeholder="react@example.com"
      />
      <p>{formState.errors.email?.message}</p>
      <label htmlFor={"Password"}>Password</label>
      <input
        {...register("password")}
        type="text"
        id="Password"
        placeholder="P@ssw0rd"
      />
      <p>{formState.errors.password?.message}</p>
      <button type="submit">Login</button>
    </>
  );
};

const onSubmit: SubmitHandler<LoginInput> = (data) =>
  alert(`submitted ${data.email} ${data.password}`);

export const LoginRoute = () => {
  return (
    <Layout title="Login">
      <Form schema={loginInputSchema} onSubmit={onSubmit}>
        {LoginFormChildren}
      </Form>
    </Layout>
  );
};
