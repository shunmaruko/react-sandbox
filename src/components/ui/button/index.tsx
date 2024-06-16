export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  children: React.ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} type="button">
      {children}
    </button>
  );
};

export default Button;
