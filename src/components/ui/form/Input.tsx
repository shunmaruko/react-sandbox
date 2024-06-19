import { nanoid } from "nanoid";
//https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring-a-html-element
export type InputProps = React.ComponentPropsWithRef<"input"> & {
  label: string;
};

export const LabeledInput = ({ label, ...props }: InputProps) => {
  const id = nanoid();
  // do something with specialProp
  return (
    <>
      <label htmlFor={id}>{`${label} : `}</label>
      <input {...props} id={id} />
    </>
  );
};
