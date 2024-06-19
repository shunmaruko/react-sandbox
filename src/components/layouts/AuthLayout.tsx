import { Head } from "@/components/Head";

type Title = "Register" | "Login" | "Logout";

type LayoutProps = {
  children: React.ReactNode;
  title: Title;
};

//TODO: make this more fancy
export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
};
