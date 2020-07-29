import React from "react";

export default function ProfileNav(props) {
  const { role, view, setView } = props;
  console.log(view);
  return (
    <div>
      <button onClick={() => setView("mine")}>my {role}s</button>
      <button onClick={() => setView("matchmake")}>make some matches</button>
      <button onClick={() => setView("matches")}>see matches</button>
    </div>
  );
}
