import { Link, useSearchParams, redirect } from "react-router-dom";

import { Layout } from "@/components/layouts/AuthLayout";
import { Form, FormChildrenProps } from "@/components/ui/form";
import { loginInputSchema, LoginInput } from "@/app/lib/auth.type";
import { useLogin } from "@/app/lib/Auth";

const LoginFormChildren = ({
  register,
  formState,
}: FormChildrenProps<LoginInput>) => {
  return (
    <>
      <label htmlFor={"Email"}>Email: </label>
      <input
        {...register("email")}
        type="text"
        id="Email"
        placeholder="react@example.com"
      />
      <p>{formState.errors.email?.message}</p>
      <label htmlFor={"Password"}>Password: </label>
      <input
        {...register("password")}
        type="text"
        id="Password"
        placeholder="P@ssw0rd"
      />
      <p>{formState.errors.password?.message}</p>
      <button type="submit">Login: </button>
    </>
  );
};

//const onSubmit: SubmitHandler<LoginInput> = (data) =>
//  alert(`submitted ${data.email} ${data.password}`);

export const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const registering = useLogin({
    onSuccess: () => {
      alert(`succeed to login, redirect to ${redirectTo}`);
      return redirect(`${redirectTo ? `${redirectTo}` : "/"}`);
    },
  });
  return (
    <Layout title="Login">
      <Form
        schema={loginInputSchema}
        onSubmit={(values) => {
          registering.mutate(values);
        }}
      >
        {LoginFormChildren}
      </Form>
      <Link
        to={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
      >
        Forget password?
      </Link>
    </Layout>
  );
};
