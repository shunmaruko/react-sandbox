import { Layout } from "@/components/layouts/AuthLayout";
import { Form } from "@/components/ui/form";
import { LabeledInput } from "@/components/ui/form/Input";

export const RegisterRoute = () => {
  return (
    <Layout title="Register">
      <Form>
        <>
          <LabeledInput
            type="text"
            label="Email"
            placeholder="react@example.com"
          />
        </>
        <>
          <LabeledInput type="text" label="Password" placeholder="P@ssw0rd" />
        </>
      </Form>
    </Layout>
  );
};
