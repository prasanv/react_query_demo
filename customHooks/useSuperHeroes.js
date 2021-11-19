/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "react-query"

const fetchData = async () => {
  const response = await fetch('http://localhost:4000/superheroes')
  const data = await response.json();
  return data;
}

export const getSuperHeroes = () => {
  return useQuery(['getSuperHeroes'], fetchData, {});
}

const addData = async (addNewHero={}) => {
  const response = await fetch('http://localhost:4000/superheroes', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addNewHero)
  })
  const data = await response.json();
  return data;
}

export const addSuperHeroes = () => {
  const queryClient = new useQueryClient();
  
  return useMutation(addData, {
    onSuccess: () => {
      queryClient.invalidateQueries('getSuperHeroes')
    }
  })
}

export const addSuperHeroesFromMutationResponse = () => {
  const queryClient = new useQueryClient();
  
  return useMutation(addData, {
    onSuccess: (mutationResponseData) => {
      const updaterFunction = (oldData) => {
        const newData = [...oldData, mutationResponseData]
        return newData;
      }
      queryClient.setQueryData('getSuperHeroes', updaterFunction) 
    },
    //onError is not of much use in here, I just used for checking
    onError: (error, variables, context) => { 
      console.log(error);
      console.log(variables);
      console.log(context);
    },
  })
}

export const addOptimisticSuperHeroes = () => {
  const queryClient = new useQueryClient();
  
  return useMutation(addData, {
    onMutate: async (Data) => {
      await queryClient.cancelQueries('getSuperHeroes')
      const previousData = queryClient.getQueryData('getSuperHeroes')
      const newObject = {...Data, id: previousData.length+1}
      const newData = [...previousData, newObject ]
      queryClient.setQueryData('getSuperHeroes', newData)
      return {
        previousData 
      }
    },
    onError: (error, variables, context) => { 
      console.log(error);
      console.log(variables);
      console.log(context);
      queryClient.setQueryData('getSuperHeroes',context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('getSuperHeroes');
    }
  })
}