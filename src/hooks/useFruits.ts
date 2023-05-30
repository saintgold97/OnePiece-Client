import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Fruit } from "../models/fruit";
export const urlFruits = "http://localhost:3001/v1/fruits";

export const useFruits = (props: {
  type?: string;
}): [Fruit[], boolean] => {
  const [fruit, setFruit] = useState<Fruit[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { type } = props;
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
      tpe: type,
    });
    
    setParams(urlParams);
    setLoading(true);
    setTimeout(() => {
      axios
        .get<Fruit>(`${urlFruits}?${urlParams}`)
        .then((response: any) => {
          setFruit(response.data);
          //console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [type, setParams]);
  return [fruit, isLoading];
};
