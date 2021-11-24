import React from "react";
import { useTable, usePagination } from "react-table";
import Pagination from "./Pagination";
import { Table, Thead, Tbody, Tr, Th, Td, Flex } from "@chakra-ui/react";

type CustomTableProps = {
  columns: any;
  data: any;
};

const CustomTable = ({ columns, data }: CustomTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <Flex direction="column" w={{ base: "100%", lg: "75%" }}>
      <Flex maxWidth="100%" overflow="auto">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr  {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td py={3} borderColor="gray.600" {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageOptions={pageOptions}
      />
    </Flex>
  );
};

export default CustomTable;
