import React from "react";
import HomeCard from "./HomeCard";

export default function HomeDisplay(props) {
  const { homes } = props;

  return (
    <div className="myDisplay">
      {homes.map((home) => (
        <HomeCard home={home} />
      ))}
    </div>
  );
}
