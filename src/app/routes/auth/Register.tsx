import { SubmitHandler } from "react-hook-form";

import { Layout } from "@/components/layouts/AuthLayout";
import { Form, FormChildrenProps } from "@/components/ui/form";
import { registerInputSchema, RegisterInput } from "@/app/lib/auth.type";

const LoginFormChildren = ({
  register,
  formState,
}: FormChildrenProps<RegisterInput>) => {
  return (
    <>
      <label htmlFor={"First Name"}>First Name</label>
      <input
        {...register("firstName")}
        type="text"
        id="First Name"
        placeholder="First Name"
      />
      <p>{formState.errors.firstName?.message}</p>
      <label htmlFor={"Last Name"}>Last Name</label>
      <input
        {...register("lastName")}
        type="text"
        id="Last Name"
        placeholder="First Name"
      />
      <p>{formState.errors.lastName?.message}</p>
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
      <button type="submit">Register</button>
    </>
  );
};

const onSubmit: SubmitHandler<RegisterInput> = (data) =>
  alert(
    `submitted ${data.email} ${data.firstName} ${data.lastName} ${data.password}`,
  );

export const RegisterRoute = () => {
  return (
    <Layout title="Register">
      <Form schema={registerInputSchema} onSubmit={onSubmit}>
        {LoginFormChildren}
      </Form>
    </Layout>
  );
};
