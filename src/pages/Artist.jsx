import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import Favorite from "../components/Favorite";
import { queryCharacter } from "../lib/query/queryCharacter";

const Artist = () => {
  const { loading, error, data } = useQuery(queryCharacter);

  if (loading) {
    return;
  }

  console.log(data);

  return (
    <div className="overflow-y-scroll">
      <div className="transition-all text-center">Rick & Morty Characters</div>

      <div className="flex flex-col p-5 space-y-3">
        {
          data &&
            Object.values(data.characters.results).map(({ name, image }) => {
              return (
                <div
                  className="relative bg-black text-white rounded-xl shadow-2xl py-3 px-10 flex items-center justify-between"
                  key={name}
                >
                  <div className="w-1/2 text-sm">
                    {name}
                    <div
                      className="mt-2 w-1/2 py-1 text-center rounded p-0.5 text-xs text-gray-500"
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
                  <Favorite />
                </div>
              );
            })

          // data.products.map(({ name, image }) => {
          //   return (
          //     <>
          //       {name}
          //       <div
          //         className="w-[5rem] h-[5rem] bg-cover bg-center"
          //         style={{ backgroundImage: `url(${image})` }}
          //       />
          //     </>
          //   );
          // })
        }
      </div>
    </div>
  );
};

export default Artist;
