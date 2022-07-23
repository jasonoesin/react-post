import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const FavContext = ({ children }) => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem("fav");
      setFavs(item ? JSON.parse(item) : []);
    } catch (error) {}
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favs));
  }, [favs]);

  const addFav = (id) => {
    setFavs([...favs, id]);
  };

  const delFav = (id) => {
    const newArr = favs.filter((e) => e !== id.toString());
    setFavs(newArr);
  };

  return (
    <Context.Provider value={{ favs, addFav, delFav }}>
      {children}
    </Context.Provider>
  );
};

export const useFav = () => {
  return useContext(Context);
};
