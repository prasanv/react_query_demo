/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { useQueries } from "react-query";
import { Text } from "@chakra-ui/react";

export default function dynamicParallelQueries({ superheroIds = [1, 3] }) {
  const fetchData = async ({ queryKey }) => {
    const id = queryKey[1];
    const res = await fetch(`http://localhost:4000/superheroes/${id}`);
    const data = await res.json();
    return data;
  };

  //-Static  way of writing the Parallel queries using useQueries Hook
  // const queryResult = useQueries([
  //   { queryKey: ['dynamicParallelQueries-1', 1], queryFn: fetchData },
  //   { queryKey: ['dynamicParallelQueries-3', 3], queryFn: fetchData },
  // ])

  //-Dynamic way of writing the Parallel queries using useQueries Hook
  const queryResult = useQueries(
    superheroIds.map((id) => {
      return {
        queryKey: ["dynamicParallelQueries", id],
        queryFn: fetchData,
      };
    })
  );

  // NOTE: Array of queryResult is returned
  const dataArray = queryResult.map((ind) => ind?.data);
  // NOTE: Array of data is returned
  const individualObj = dataArray.map((item) => item?.name);

  if (queryResult.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Text fontSize="3xl">Dynamic Parallel Queries</Text>
      {individualObj.map((item, i) => {
        return (
          <Fragment key={i}>
            <p>{item}</p>
          </Fragment>
        );
      })}
    </div>
  );
}
