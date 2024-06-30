import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useRegister } from "@/app/lib/auth";
import { registerInputSchema, RegisterInput } from "@/app/lib/auth.type";
import { Layout } from "@/components/layouts/auth-layout";
import { Form, FormChildrenProps } from "@/components/ui/form";

const RegisterFormChildren = ({
  register,
  formState,
}: FormChildrenProps<RegisterInput>) => {
  return (
    <>
      <label htmlFor={"First Name"}>First Name: </label>
      <input
        {...register("firstName")}
        type="text"
        id="First Name"
        placeholder="First Name"
      />
      <p>{formState.errors.firstName?.message}</p>
      <label htmlFor={"Last Name"}>Last Name: </label>
      <input
        {...register("lastName")}
        type="text"
        id="Last Name"
        placeholder="First Name"
      />
      <p>{formState.errors.lastName?.message}</p>
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
      <button type="submit">Register</button>
    </>
  );
};

export const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();
  const registering = useRegister({
    onSuccess: () => {
      return navigate(`${redirectTo ? `${redirectTo}` : "/app"}`, {
        replace: true,
      });
    },
  });
  return (
    <Layout title="Register">
      <Form
        schema={registerInputSchema}
        onSubmit={(values) => {
          registering.mutate(values);
        }}
      >
        {RegisterFormChildren}
      </Form>
      <Link
        to={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
      >
        Log In
      </Link>
    </Layout>
  );
};
