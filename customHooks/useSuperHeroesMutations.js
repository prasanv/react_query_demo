/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchData = async () => {
  const res = await axios.get("http://localhost:4000/superheroes");
    // console.log({ axiosRes: res });
  return res.data;
};

export const getSuperHeroes = () => {
  return useQuery(["getSuperHeroes"], fetchData, {});
};

const addData = async (addNewHero) => {
  // NOTE: Axios automatically stringify's the `addNewHero` 
  const res = await axios.post("http://localhost:4000/superheroes1", addNewHero, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log({ axiosRes: res });
  return res.data;
};

export const addSuperHeroes = () => {
  const queryClient = new useQueryClient();

  // NOTE: unlike `useQuery` hook, `useMutation` hook does not require queryKey
  return useMutation(addData, {
    onSuccess: () => {
      // NOTE: `queryClient.invalidateQueries(queryKey)` refetch's the provided queryKey
      // Comment the below line to view the difference
      queryClient.invalidateQueries("getSuperHeroes");
    },
  });
};

export const addSuperHeroesFromMutationResponse = () => {
  const queryClient = new useQueryClient();

  return useMutation(addData, {
    onSuccess: (mutationResponseData) => {
      // NOTE: Rather than making a network call to refetch the queryKey,
      // we can use `queryClient.setQueryData` to update the query cache with the mutation ResponseData
      const updaterFunction = (oldData) => {
        const newData = [...oldData, mutationResponseData];
        return newData;
      };
      queryClient.setQueryData("getSuperHeroes", updaterFunction);
    },
    // onError is not of much use in here, I just used for checking
    onError: (error, variables, context) => {
      console.log(error);
      console.log(variables);
      console.log(context);
    },
  });
};

export const addOptimisticSuperHeroes = () => {
  const queryClient = new useQueryClient();

  return useMutation(addData, {
    // NOTE: Update the state before performing the mutation under the assumption that nothing to go wrong
    // You need to take into account that the mutation can go wrong here
    // Throttle network to see the difference
    onMutate: async (Data) => {
      // NOTE: cancel ay refetch that will over write our optimistic update
      await queryClient.cancelQueries("getSuperHeroes");
      const previousData = queryClient.getQueryData("getSuperHeroes");
      const newObject = { ...Data, id: previousData.length + 1 };
      const newData = [...previousData, newObject];
      queryClient.setQueryData("getSuperHeroes", newData);
      return {
        previousData,
      };
    },
    // NOTE: `context` returns the previousData
    onError: (error, variables, context) => {
      console.log(error);
      console.log(variables);
      console.log(context);
      queryClient.setQueryData("getSuperHeroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("getSuperHeroes");
    },
  });
};
