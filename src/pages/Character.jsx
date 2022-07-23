import { useQuery } from "@apollo/client";
import { Fragment, useState } from "react";
import Favorite from "../components/Favorite";
import { queryByName, queryCharacter } from "../lib/query/queryCharacter";
import { useFav } from "../localStorage/useFav";
import Lottie from "react-lottie";
import data from "../animation/load.json";

const Character = () => {
  const [filter, setFilter] = useState("");

  return (
    <div className="">
      <div className="transition-all text-center text-2xl">
        Rick & Morty Characters
      </div>
      <div className="mt-4 flex justify-center">
        <input
          onKey={(e) => {
            e.preventDefault();
          }}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          defaultValue={filter}
          type="text"
          className="px-5 py-1 w-[15rem] rounded-full text-sm"
          placeholder="Search for characters ..."
        ></input>
      </div>

      <CharacterRender filter={filter} />
    </div>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: data,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const CharacterRender = ({ filter }) => {
  const { favs, addFav } = useFav();
  // const { loading, data } = useQuery(filter ? queryByName : queryCharacter, {
  //   variables: { filter },
  // });

  const { loading, data } = useQuery(queryCharacter);

  if (loading) {
    return (
      <div className="inset-0 flex justify-center items-center fixed">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  console.log(data.characters.results.length);

  // if (data.characters.results.length === 0) {
  //   return (
  //     <div className="p-5">
  //       <div className="relative min-h-[6rem] bg-black text-white rounded-xl shadow-2xl py-3 px-10 flex items-center justify-between">
  //         <div className="w-full text-sm font-bold text-center">
  //           No Character Found
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  var flag = 0;

  return (
    <div className="flex flex-col p-5 space-y-3 ">
      {data &&
        Object.values(data.characters.results).map(({ name, image, id }) => {
          if (
            name.toLowerCase().includes(filter.toLowerCase()) ||
            filter === ""
          ) {
            flag = 1;
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
          }
        })}
      {flag === 0 && (
        <div className="p-5">
          <div className="relative min-h-[6rem] bg-black text-white rounded-xl shadow-2xl py-3 px-10 flex items-center justify-between">
            <div className="w-full text-sm font-bold text-center">
              No Character Found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
