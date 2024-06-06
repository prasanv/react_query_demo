/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function rqsuperheroesV2() {

  const useQueryConfig = {
    // NOTE: `useQueryConfig.enabled` used for disabling fetch on mount, until its set to true it will not fetch the data
    enabled: false, // fetch on mount
  };

  const fetchRqsuperheros = async () => {
    const res = await axios.get("http://localhost:4000/superheroes1");
    console.log({axiosRes: res});
    return res.data;
  };

  // NOTE: `refetch` used along with `useQueryConfig.enabled` to fetch data onClick
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    "rqsuperheroesV2",
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
      <Text fontSize="3xl">RQSuperheroes - useQueryConfig.enabled</Text>
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
