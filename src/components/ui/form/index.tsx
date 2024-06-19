import {
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element
//export type FormProps = React.ComponentPropsWithoutRef<"form">;

export type FormChildrenProps<TFormValues extends FieldValues> = Pick<
  UseFormReturn<TFormValues>,
  "register" | "formState"
>;

export type FormProps<
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  children: (methods: FormChildrenProps<TFormValues>) => React.ReactNode;
};

export const Form = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  onSubmit,
  schema,
  children,
}: FormProps<Schema, TFormValues>) => {
  const { handleSubmit, register, formState } = useForm<TFormValues>({
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ register, formState })}
    </form>
  );
};
