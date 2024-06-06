/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { useSuperHeroData } from "../../customHooks/useSuperHeroData";

export default function rqsuperhero() {
  const router = useRouter();
  const id = router.query?.superhero;
  // console.log({ router });

  const { data, isLoading } = useSuperHeroData(["rqsuperhero", id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Text fontSize="3xl">Superhero Details</Text>
      <p>{data?.name + " - " + data?.alterEgo}</p>
    </div>
  );
}
