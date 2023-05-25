import { useState, useEffect } from "react";
import axios from "axios";
import { Character } from "../models/character";
import { useSearchParams } from "react-router-dom";
export const urlCharacters = "http://localhost:3001/v1/characters";

export const useCharacters = (props: {
  name?: string;
  role?: string;
  crew?: string;
}): [Character[], boolean] => {
  const [character, setCharacter] = useState<Character[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { name, role, crew } = props;
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
      name: name,
      role: role,
      crew: crew,
    });
    
    setParams(urlParams);
    setLoading(true);
    setTimeout(() => {
      axios
        .get<Character>(`${urlCharacters}?${urlParams}`)
        .then((response: any) => {
          setCharacter(response.data);
          console.log(response.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [name, role, crew, setParams]);
  return [character, isLoading];
};
