import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Crew } from "../models/crews";
export const urlCrews = "http://localhost:3001/v1/crews";

export const useCrews = (props: {
  english_name?: string;
  romaji_name?: string;
}): [Crew[], boolean] => {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { english_name, romaji_name } = props;
  const [params, setParams] = useSearchParams();

  const objectToQueryParams = (obj: any) => {
    const params = new URLSearchParams();
    for (let key in obj) {
      if (obj[key]) {
        params.append(key, obj[key]);
      }
    }
    return params.toString();
  };

  useEffect(() => {
    const urlParams = objectToQueryParams({
      english_name: english_name,
      romaji_name: romaji_name,
    });
    
    setParams(urlParams);
    setLoading(true);
    setTimeout(() => {
      axios
        .get<Crew>(`${urlCrews}?${urlParams}`)
        .then((response: any) => {
          setCrews(response.data);
          //console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [english_name, romaji_name, setParams]);
  return [crews, isLoading];
};
