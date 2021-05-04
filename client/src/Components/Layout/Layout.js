import React from "react";
import Footer from "../Footer/Footer";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="page">
      <NavigationMenu/>
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
