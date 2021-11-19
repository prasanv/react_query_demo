import { useQuery } from "react-query";

const fetchRqsuperheros = async ()=> {
  const res = await fetch("https://foodish-api.herokuapp.com/api/");
  const data = await res.json();
  return data;
}

export const useRandomImagesQuery = (useQueryConfig) => {
  return useQuery('randomimages', fetchRqsuperheros, useQueryConfig)
}
