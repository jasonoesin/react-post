import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Favorite from "../components/Favorite";
import { queryById, queryCharacter } from "../lib/query/queryCharacter";
import { useFav } from "../localStorage/useFav";

const FavoritePage = () => {
  const nav = useNavigate();
  const { favs, addFav } = useFav();
  const { loading, data } = useQuery(queryCharacter);

  if (loading) {
    return;
  }

  console.log(data);

  return (
    <div className="">
      <div className="text-gray-700 font-medium transition-all text-center text-2xl">
        Favorited Characters
      </div>

      <div className="flex flex-col p-5 space-y-3 ">
        {data &&
          Object.values(data.characters.results).map(({ name, image, id }) => {
            if (favs.includes(id))
              return (
                <div
                  className="relative bg-black text-white rounded-xl shadow-2xl py-3 px-10 flex items-center justify-between"
                  key={name}
                >
                  <div className="w-1/2 text-sm">
                    {name}
                    <div
                      onClick={() => {
                        nav("/detail/" + id);
                      }}
                      className="cursor-pointer mt-2 w-1/2 py-1 text-center rounded p-0.5 text-xs text-gray-500"
                      style={{
                        background: "rgb(165,240,243)",
                        background:
                          "linear-gradient(90deg, rgba(165,240,243,1) 7%, rgba(186,229,171,1) 100%)",
                      }}
                    >
                      Detail
                    </div>
                  </div>
                  <div
                    className="w-[5rem] h-[5rem] bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <Favorite id={id} addFav={addFav} />
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default FavoritePage;
