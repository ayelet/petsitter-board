import "./ProvidersPage";

import React from "react";
import Filter from "../../Filter/Filter";

export const ProvidersPage = () => {
  return (
    <div>
      <aside>
        <Filter name="Filter 1" />
        <Filter name="Filter 2" />
        <Filter name="Filter 3" />
      </aside>
      <main></main>
    </div>
  );
};
