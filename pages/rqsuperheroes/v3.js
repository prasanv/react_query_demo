// NOTE: Transform default data returned by query function
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

export default function rqsuperheroesV3() {
  const [refetchinterval, setRefetchinterval] = useState(false);

  const onSuccess = (data) => {
    console.log("Query was success = ", {data});
  };

  const onError = (error) => {
    console.log("query has errored = ", {error});
  };

  const useQueryConfig = {
    onSuccess,
    onError,
    // NOTE: Transform default data returned by query function
    select: (data) => {
      const updatedData = data.map(item => `${item.name} - ${item.alterEgo}`)
      // console.log(updatedData);
      return updatedData
    }
  };

  const fetchRqsuperheros = async () => {
    const res = await axios.get("http://localhost:4000/superheroes");
    console.log({axiosRes: res});
    return res.data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery(
    "rqsuperheroesV3",
    fetchRqsuperheros,
    useQueryConfig
  );

  console.log({ data, isLoading, isFetching });

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Sorry, {error.message}</p>;
  }

  return (
    <div>
      <Text fontSize="3xl">RQSuperheroes Page</Text>
      {data &&
        data?.map((item, index) => (
          <p key={index}>
            {item}
          </p>
        ))}
    </div>
  );
}
