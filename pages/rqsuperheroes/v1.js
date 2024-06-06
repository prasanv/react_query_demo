/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function rqsuperheroesV1() {
  const [refetchinterval, setRefetchinterval] = useState(false);

  const onSuccess = (data) => {
    console.log("Query was success = ", {data});
    if (data.length > 3) {
      setRefetchinterval(3000);
    }
  };

  const onError = (error) => {
    console.log("query has errored = ", {error});
    if (error) {
      setRefetchinterval(5000);
    }
  };

  const useQueryConfig = {
    onSuccess,
    onError,
    // NOTE: `useQueryConfig.refetchInterval` used for polling data = `milliseconds | true | false`
    // refetchInterval: refetchinterval,
    // NOTE: `useQueryConfig.enabled` used for disabling fetch on mount,
    enabled: false, // fetch on mount
    // cacheTime: 5000,
    // staleTime: 30000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  };

  const fetchRqsuperheros = async () => {
    const res = await axios.get("http://localhost:4000/superheroes1");
    console.log({axiosRes: res});
    return res.data;
  };

  // NOTE: `refetch` used along with `useQueryConfig.enabled` to fetch data onClick
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
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
      <Text fontSize="3xl">RQSuperheroes Page</Text>
      <Button className={styles.button} onClick={refetch}>
        Fetch Heros
      </Button>
      {data &&
        data?.map((ind) => (
          <p key={ind.id}>
            <Link href={`/rqsuperheroes/${ind.id}`}>{ind.name}</Link>
          </p>
        ))}
    </div>
  );
}
