import React from "react";
import { render } from "@testing-library/react";
import TableCustom from "./TableCustom";
import { data } from "./api/data";

describe("TableCustom", () => {
  it("renders table with correct data", () => {
    const columns = [
      { key: "id", hidden: false },
      { key: "name", hidden: false },
      { key: "type", hidden: false },
      { key: "hp", hidden: false },
      { key: "attack", hidden: true },
      { key: "defense", hidden: true },
      { key: "special-attack", hidden: true },
      { key: "special-defense", hidden: true },
      { key: "speed", hidden: false },
    ];

    const { getByText } = render(<TableCustom columns={columns} data={data} />);

    data.forEach(pokemon => {
      const { name, type, hp, speed } = pokemon;

      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(type)).toBeInTheDocument();
      expect(getByText(`${hp}`)).toBeInTheDocument();
      expect(getByText(`${speed}`)).toBeInTheDocument();
    });
  });
});
