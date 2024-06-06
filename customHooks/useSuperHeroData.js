import { useQuery, useQueryClient } from "react-query";

const fetchData = async ({ queryKey }) => {
  const [rqsuperhero, id] = queryKey;
  const res = await fetch(`http://localhost:4000/superheroes/${id}`);
  const data = await res.json();
  return data;
};

export const useSuperHeroData = (queryDetails) => {
  const [rqsuperhero, id] = queryDetails;
  const queryClient = new useQueryClient();

  return useQuery([rqsuperhero, id], fetchData, {
    // NOTE: Data will used fetchData gets resolved `queryClient.initialData`
    initialData: () => {
      const hero = queryClient
        .getQueryData("rqsuperheroes")
        ?.find((item) => item.id === parseInt(id));
      console.log({ hero });

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
