import React, { useState, useEffect } from "react";
import styled from "styled-components";

type DataItem = {
  [key: string]: string | number | boolean;
};

type TableCustomProps = {
  columns: { key: string; hidden: boolean }[];
  data: DataItem[];
};

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
  text-align: left;

  th {
    text-transform: uppercase;
    font-weight: bold;
    color: #fff;
    background-color: #4285f4;
    border: 1px solid #ddd;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #3c78d8;
    }

    @media (max-width: 600px) {
      font-size: 12px;
      padding: 5px;
    }
  }

  td {
    border: none;
    padding: 10px;
}

    @media (max-width: 600px) {
      font-size: 12px;
      padding: 5px;
    }
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  /* Adiciona regras de responsividade para mobile */
  @media (max-width: 600px) {
    th,
    td {
      display: block;
      width: 100%;
    }

    td {
      text-align: inherit;
    }

    td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const SortIcon = styled.span<{ sortDir: string }>`
  display: inline-block;
  margin-left: 5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  ${props =>
    props.sortDir === "asc" &&
    `
    border-bottom: 5px solid #333;
  `}

  ${props =>
    props.sortDir === "desc" &&
    `
    border-top: 5px solid #333;
  `}
`;

const TableCustom: React.FC<TableCustomProps> = ({ columns, data }) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSort = (column: string) => {
    let direction = "asc";
    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    setSortColumn(column);
    setSortDirection(direction);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) {
      return 0;
    }
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal === bVal) {
      return 0;
    }
    if (sortDirection === "asc") {
      return aVal < bVal ? -1 : 1;
    }
    return aVal < bVal ? 1 : -1;
  });

  return (
    <Table>
      <thead>
        <tr>
          {columns.map(column => (
            !column.hidden && (
              <th key={column.key} onClick={() => handleSort(column.key)}>
                <div>
                  <span>{column.key}</span>
                  {sortColumn === column.key && (
                    <SortIcon sortDir={sortDirection} />
                  )}
                </div>
              </th>
            )
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map(column => (
              !column.hidden && (
                <td key={column.key}>
                  <div>
                    {isMobile &&
                    <span style={{textTransform: 'capitalize'}}>{`${column.key}:`}&nbsp;&nbsp;</span>}
                    <span>{item[column.key]}</span>
                  </div>
                </td>
              )
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableCustom;
