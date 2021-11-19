import { useQuery, useQueryClient } from 'react-query';

const fetchData = async ({queryKey}) => {
  const id = queryKey[1];
  const res = await fetch(`http://localhost:4000/superheroes/${id}`);
  const data = await res.json();
  return data;
}

export const useSuperHeroData = (queryDetails) => {
  const queryClient = new useQueryClient();
  return useQuery(queryDetails, fetchData, {
    initialData: () => {
      const hero = queryClient.getQueryData('rqsuperheroes')?.find(item => item.id === parseInt(queryDetails[1]))
      // console.log(hero);
      if(hero){
        return {data: hero}
      } else {
        return undefined
      }
    }
  })
}
