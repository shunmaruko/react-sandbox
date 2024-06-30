import { Head } from "@/components/head";

type LayoutProps = {
  children: React.ReactNode;
};

//TODO: make this more fancy
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head description="Root page" />
      {children}
    </>
  );
};
