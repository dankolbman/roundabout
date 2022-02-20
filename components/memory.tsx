import { useRouter } from "next/router";
import Image from "next/Image";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";

const Memory = ({ memory }) => {
  const rotations = ["-rotate-2", "-rotate-1", "rotate-1", "rotate-2"];
  const rotate = rotations[Math.floor(Math.random() * rotations.length)];

  const dateOptions = {
    year: "numeric",
    month: "long",
    weekDay: "long",
    day: "numeric",
  };

  return (
    <li
      key={memory.id}
      className="flex odd:flex-row-reverse space-x-8"
    >
      {memory.image && (
        <img
          src={`http://localhost:5005${memory.image}`}
          width="400"
          height="400"
          className={`rounded-md ${rotate} max-h-96`}
        />
      )}
      <div className="flex-grow">
        <div className="font-medium text-lg text-stone-900">{memory.title}</div>
        <div className="space-x-2">
          <span className="text-stone-700 text-sm font-light">
            {new Date(memory.time).toLocaleString("en-us", dateOptions)}
          </span>
          {memory.location && (
            <span className="text-stone-700 text-sm">{memory.location}</span>
          )}
        </div>

        <p className="font-light text-stone-700">{memory.description}</p>
      </div>
    </li>
  );
};

export default Memory;
