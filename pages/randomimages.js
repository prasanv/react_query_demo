/* eslint-disable react-hooks/rules-of-hooks */
import styles from '../styles/Home.module.css'
import React from 'react'
import { Text } from "@chakra-ui/react";
import { Image, Box } from "@chakra-ui/react"
import { useRandomImagesQuery } from "../customHooks/useRandomImagesQuery";

export default function randomimages() {

  const transformedData = (data) => {
    const imageURL = data.image;
    return imageURL;
  }

  const useQueryConfig = {
    select: transformedData,
    enabled: false,
    // cacheTime: 30000,
    // staleTime: 1000, 
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true,
  }

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch
  } = useRandomImagesQuery(useQueryConfig)


  if(isLoading) {
    return (<p>Loading...</p>)
  }

  if(isError){
    return (<p>Sorry, {error.message}</p>)
  }

  return (
    <div>
      <Text fontSize="3xl">Random Food Images Page</Text>
      <button onClick={refetch} className={styles.button}>Start Loading</button>
      { data && 
        (<Box boxSize="sm">
          <Image src={data} alt="food" />
        </Box>)
      }
    </div>
  )
}
