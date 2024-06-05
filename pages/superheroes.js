/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Text } from "@chakra-ui/react";

export default function superheroes() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:4000/superheroes')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data)
        setLoading(false)
      })
  }, [])

  if(loading){
    return (<p>Loading...</p>)
  }

  return (
    <div>
      <Text fontSize="3xl">Superheroes Page</Text>
      {data && 
        data.map(ind => (<p key={ind.id}>{ind.name}</p>))
      }
    </div>
  )
}
