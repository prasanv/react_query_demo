/* eslint-disable react-hooks/rules-of-hooks */
import { Text, Button, Spinner } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'

export default function infiniteQueries() {

  const fetchData = async ({pageParam=1}) => {
    const res = await fetch(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
    const data = await res.json();
    return data;
  }

  const result = useInfiniteQuery(['infiniteQueries'], fetchData, {
    // According to react query lastPage parameter is mandatory but not sure why
    getNextPageParam: (lastPage, pages) => { 
      if(pages.length < 4){
        return pages.length + 1
      }else{
        return undefined;
      }
    },
  })
 
  const fetchNextPage = result.fetchNextPage;

  return (
    <div>
      <Text fontSize='3xl' fontWeight='600'>Infinite Queries</Text>
      {
        result.data?.pages?.map(x => {
          return x.map(item => {
            return (
              <Fragment key={item.id}>
                <Text fontSize='2xl' p={3}>{item.id}. {item.label}</Text>
              </Fragment>
            )
          }) 
        })
      }
      {result.isFetching || result.isFetchingNextPage ? (<p><Spinner></Spinner></p>) : null }
      <Button onClick={() => fetchNextPage()} disabled={!result.hasNextPage}>Load Content</Button>
    </div>
  )
}
