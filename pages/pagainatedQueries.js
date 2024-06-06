/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styles from "../styles/Home.module.css";

export default function paginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async (pageNumber) => {
    const res = await fetch(
      `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
    );
    const data = await res.json();
    return data;
  };

  const result = useQuery(
    ["paginatedQueries", pageNumber],
    () => {
      return fetchData(pageNumber);
    },
    { keepPreviousData: true }
  );

  return (
    <div>
      <Text fontSize="3xl"> Paginated Queries</Text>
      {result.isLoading ? (
        <div> Loading... </div>
      ) : result.isError ? (
        <div> {result.error.message}</div>
      ) : (
        <Box p={3}>
          {result.data?.map((item) => {
            return (
              <p key={item.id}>
                {item.id}. {item.label}
              </p>
            );
          })}
        </Box>
      )}
      {/* NOTE: Throttle the network speed to view isFetching result */}
      {result.isFetching ? <div> Data is fetched </div> : null}
      <Button
        m={3}
        onClick={() =>
          setPageNumber((old) => {
            return old - 1;
          })
        }
        disabled={pageNumber === 1}
      >
        Previous Page
      </Button>
      {pageNumber}
      <Button
        m={3}
        onClick={() =>
          setPageNumber((old) => {
            return old + 1;
          })
        }
        disabled={pageNumber === 5}
      >
        Next Page
      </Button>
    </div>
  );
}
