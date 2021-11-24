import React from "react";
import {
  Flex,
  Tooltip,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

type PaginationProps = {
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageOptions: any;
  pageCount: number;
};

const Pagination = ({
  gotoPage,
  previousPage,
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  nextPage,
  pageCount,
}: PaginationProps) => {
  return (
    <Flex
      justifyContent="space-between"
      m={4}
      alignItems="center"
      direction={{ base: "column", sm: "row" }}
    >
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            aria-label="first-page"
            onClick={() => gotoPage(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="previous-page"
            onClick={previousPage}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex
        my={{ base: 4, md: 0 }}
        alignItems="center"
        justify="center"
        direction={{ base: "column", md: "row" }}
      >
        <Text mr={{ base: 0, md: 8 }} flexShrink="0">
          Page{" "}
          <Text fontWeight="bold" as="span">
            {pageIndex + 1}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageOptions.length}
          </Text>
        </Text>
        <Text alignSelf="center" flexShrink="0">
          Go to page:
        </Text>{" "}
        <NumberInput
          ml={{ base: 0, sm: 8 }}
          mr={{ base: 0, sm: 8 }}
          w={28}
          min={1}
          max={pageOptions.length}
          onChange={(value: any) => {
            const page = value ? value - 1 : 0;
            gotoPage(page);
          }}
          defaultValue={pageIndex + 1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            aria-label="next-page"
            onClick={nextPage}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            aria-label="last-page"
            onClick={() => gotoPage(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
