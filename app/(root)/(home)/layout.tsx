import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata:Metadata = {
  title: "QuirkCart | Home",
  description: "New Arrival | Products",
};

const Layout = ({
  headSection,
  newProducts,
  recommendateProducts
}: {
  headSection: ReactNode,
  newProducts: ReactNode,
  recommendateProducts: ReactNode,
}) => {
  return (
    <div>
      {headSection}
      {newProducts}
      {recommendateProducts}
    </div>
  );
};

export default Layout;
