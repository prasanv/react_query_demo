/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Text, Stack, Box } from "@chakra-ui/react";
import { useQuery } from 'react-query';

export default function dependentQueries({email="prasan.venkatb@gmail.com"}) {

  const fetchUsersData = async (key) => {
    const email = key.queryKey[1]
    const res = await fetch(`http://localhost:4000/users/${email}`)
    const data = await res.json();
    return data;
  }
  const userDataResult = useQuery(['getUser', email], fetchUsersData);
  const channelId = userDataResult.data?.channelName;

  const fetchChannelData = async (key) => {
    const channelName = key.queryKey[1]
    const res = await fetch(`http://localhost:4000/channels/${channelName}`)
    const data = await res.json();
    return data;
  }
  const { data } = useQuery(['getChannel', channelId], fetchChannelData, {
    enabled: !!channelId,
  });

  // console.log(data?.courseTaken);

  return (
    <div>
      <Text fontSize="3xl">Dependent Queries</Text>
      <Stack>
        <p>Query 1: </p>
        <Box borderWidth="2px" borderRadius="lg" p={2}> 
        <p>User: {userDataResult.data?.user}</p>
        <p>Channel Name: {userDataResult.data?.channelName}</p>
      </Box>
      <p>Query 2 (i.e.Dependent on Query 1): </p>
      <Box borderWidth="2px" borderRadius="lg" p={2}>
        <span>Courses Taken: {data?.courseTaken.map(item => {
          return <span key={item}>{item}, </span>
        })}</span><span>etc.</span>
      </Box>
      </Stack>
    </div>
  )
}
