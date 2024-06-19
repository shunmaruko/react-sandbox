import { Helmet, HelmetData } from "react-helmet-async";

import viteLogo from "/vite.svg";

const helmetData = new HelmetData({});

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps) => {
  return (
    <Helmet helmetData={helmetData} title={`My Project : ${title}`}>
      <meta name="description" content={description} />
      <meta name="author" content="shunmaruko" />
      <link rel="icon" type="image/svg+xml" href={viteLogo} sizes="16x16" />
    </Helmet>
  );
};
