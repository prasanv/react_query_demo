/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Text } from "@chakra-ui/react";
import { useSuperHeroData } from "../../customHooks/useSuperHeroData";

export default function rqsuperhero() {
  const pathname = window.location.pathname
  const superheroId = pathname.substr(-1,1); 
  
  const { data, isLoading } = useSuperHeroData(['rqsuperhero', superheroId])

  if(isLoading) {
    return (<p>Loading...</p>)
  }

  return (
    <div>
      <Text fontSize="3xl">Superhero Details</Text>
      <p>{data?.name +" - "+ data?.alterEgo}</p>
    </div>
  )
}
