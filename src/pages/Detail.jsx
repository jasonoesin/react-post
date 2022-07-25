import { useQuery } from "@apollo/client";
import Lottie from "react-lottie";
import { useParams } from "react-router-dom";
import { queryById } from "../lib/query/queryCharacter";
import json from "../animation/load.json";
import { useState } from "react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: json,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Detail = () => {
  const params = useParams();

  const { loading, data } = useQuery(queryById(params.id));

  if (loading) {
    return (
      <div className="inset-0 flex justify-center items-center fixed">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  console.log(data);

  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="rounded-xl bg-gray-600 min-w-[20rem] min-h-[30rem] text-white p-4 space-y-5">
        <div className="bg-gray-500 min-w-[18rem] rounded-xl min-h-[2rem] flex justify-center items-center">
          {data.character.name}
        </div>
        <div className="min-w-[18rem] rounded-xl min-h-[2rem] flex justify-center items-center">
          <img
            src={data.character.image}
            alt=""
            className="w-[10rem] rounded-xl"
          />
        </div>

        <div className="">
          <div className="flex items-center justify-center w-[full]">
            <div className="w-20">Status :</div>

            {data.character.status === "Alive" ? (
              <>
                <div className="bg-green-500 rounded-full w-5 h-5 mr-2"> </div>
                <div>Alive</div>
              </>
            ) : (
              <>
                <div className="bg-red-500 rounded-full w-5 h-5 mr-2"> </div>
                <div>Dead</div>
              </>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-20">Species :</div>
            <div>{data.character.species}</div>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-20">Gender :</div>
            <div>{data.character.gender}</div>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="w-20">Location :</div>
            <div>{data.character.location.name}</div>
          </div>

          <div className="!mt-5 flex items-center justify-center w-full">
            <div className="">Appeared On Episodes</div>
          </div>

          <div className="space-y-3 mt-2">
            {data.character.episode.slice(0, 3).map((ep) => {
              return (
                <div className="p-2 bg-gray-500 min-w-[18rem] rounded-xl min-h-[2rem] flex justify-center items-center w-[20rem]">
                  {ep.episode + " - " + ep.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
