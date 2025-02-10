import React from "react";
import { DataProvider } from "./DataContext";

function DataGetter({ children }: { children: React.ReactNode }) {
    return <DataProvider>{children}</DataProvider>;
}

export default DataGetter;
