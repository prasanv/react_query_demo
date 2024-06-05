/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function rqsuperheroes() {
  const [refetchinterval, setRefetchinterval] = useState(true);

  const fetchRqsuperheros = async () => {
    const res = await fetch("http://localhost:4000/superheroes");
    const data = res.json();
    return data;
  };

  const onSuccess = (data) => {
    console.log("Query was success, data.length = ", data.length);
    if (data.length > 3) {
      setRefetchinterval(false);
    }
  };

  const onError = (error) => {
    console.log("query has errored ", error);
    if (error) {
      setRefetchinterval(false);
    }
  };

  const useQueryConfig = {
    onSuccess,
    onError,
    refetchInterval: true,
    // enabled: false,
    // cacheTime: 50000,
    // staleTime: 0,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  };

  const { data, isLoading, isError, error, isFetching } = useQuery(
    "rqsuperheroes",
    fetchRqsuperheros,
    useQueryConfig
  );

  // console.log({isLoading, isFetching});

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
        data.map((ind) => (
          <p key={ind.id}>
            <Link href={`/rqsuperheroes/${ind.id}`}>{ind.name}</Link>
          </p>
        ))}
    </div>
  );
}
