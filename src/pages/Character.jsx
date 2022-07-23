import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import Favorite from "../components/Favorite";
import { queryByName, queryCharacter } from "../lib/query/queryCharacter";
import { useFav } from "../localStorage/useFav";

const Character = () => {
  const [filter, setFilter] = useState("");

  console.log(filter);

  return (
    <div className="">
      <div className="transition-all text-center text-2xl">
        Rick & Morty Characters
      </div>
      <div className="mt-4 flex justify-center">
        <form action="">
          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            defaultValue={filter}
            type="text"
            className="px-5 py-1 w-[15rem] rounded-full text-sm"
            placeholder="Search for characters ..."
          ></input>
        </form>
      </div>

      <CharacterRender filter={filter} />
    </div>
  );
};

const CharacterRender = ({ filter }) => {
  const { favs, addFav } = useFav();
  const { loading, data } = useQuery(filter ? queryByName : queryCharacter, {
    variables: { filter },
  });
  if (loading) {
    return;
  }

  return (
    <div className="flex flex-col p-5 space-y-3 ">
      {data &&
        Object.values(data.characters.results).map(({ name, image, id }) => {
          return (
            <div
              className="relative bg-black text-white rounded-xl shadow-2xl py-3 px-10 flex items-center justify-between"
              key={id}
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
              <Favorite id={id} addFav={addFav} />
            </div>
          );
        })}
    </div>
  );
};

export default Character;
