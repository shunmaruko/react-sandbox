//https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element
export type FormProps = React.ComponentPropsWithoutRef<"form">;

export const Form = (props: FormProps) => {
  // do something with specialProp
  return <form {...props} />;
};
