/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";

export default function rqsuperheroesV1() {
  const [refetchinterval, setRefetchinterval] = useState(false);

  const onSuccess = (data) => {
    console.log("Query was success = ", {data});
    if (data.length > 3) {
      setRefetchinterval(6000);
    }
  };

  const onError = (error) => {
    console.log("query has errored = ", {error});
    if (error) {
      setRefetchinterval(3000);
    }
  };

  const useQueryConfig = {
    onSuccess,
    onError,
    // NOTE: `useQueryConfig.refetchInterval` used for polling data = `milliseconds | true | false`
    refetchInterval: refetchinterval,
  };

  const fetchRqsuperheros = async () => {
    const res = await axios.get("http://localhost:4000/superheroes");
    console.log({axiosRes: res});
    return res.data;
  };

  const { data, isLoading, isError, error, isFetching } = useQuery(
    "rqsuperheroesV1",
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
      <Text fontSize="3xl">RQSuperheroes - useQueryConfig.refetchInterval</Text>
      {data &&
        data?.map((ind) => (
          <p key={ind.id}>
            <Link href={`/rqsuperheroes/${ind.id}`}>{ind.name}</Link>
          </p>
        ))}
    </div>
  );
}
