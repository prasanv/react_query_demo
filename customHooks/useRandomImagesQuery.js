import { useQuery } from "react-query";

const fetchRqsuperheros = async ()=> {
  const res = await fetch("https://api.nekosapi.com/v3/images/random");
  const data = await res.json();
  console.log(data)
  return data;
}

export const useRandomImagesQuery = (useQueryConfig) => {
  return useQuery('randomimages', fetchRqsuperheros, useQueryConfig)
}
