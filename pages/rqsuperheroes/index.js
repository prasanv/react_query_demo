/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";

export default function rqsuperheroes() {
  const useQueryConfig = {
    // cacheTime: 5000,
    staleTime: 3000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  };

  const fetchRqsuperheros = async () => {
    const res = await axios.get("http://localhost:4000/superheroes");
    console.log({ axiosRes: res });
    return res.data;
  };

  // NOTE: `refetch` used along with `useQueryConfig.enabled` to fetch data onClick
  const { data, isLoading, isError, error, isFetching } = useQuery(
    "rqsuperheroes",
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
        data?.map(({ id, name }) => (
          <p key={id}>
            <Link href={`/rqsuperheroes/${id}`}>{name}</Link>
          </p>
        ))}
    </div>
  );
}
