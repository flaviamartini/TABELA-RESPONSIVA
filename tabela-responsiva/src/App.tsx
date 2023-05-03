import React from "react";
import TableCustom from "./components/TableCustom/TableCustom";
import { columns, data } from "../src/components/TableCustom/api/data";

const App: React.FC = () => {
  
  <TableCustom columns={columns} data={data} />

  return (
    <div className="container">
      <TableCustom columns={columns} data={data} />
    </div>
  );
};

export default App;
