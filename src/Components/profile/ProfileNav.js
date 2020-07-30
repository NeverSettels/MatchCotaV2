import React from "react";

export default function ProfileNav(props) {
  const { role, view, setView } = props;
  console.log(view);
  return (
    <div className="profile-nav">
      <button
        className={view === "mine" ? "nav-button active" : "nav-button"}
        onClick={() => setView("mine")}
      >
        my {role}s
      </button>
      <button
        className={view === "matchmake" ? "nav-button active" : "nav-button"}
        onClick={() => setView("matchmake")}
      >
        make some matches
      </button>
      <button
        className={view === "matches" ? "nav-button active" : "nav-button"}
        onClick={() => setView("matches")}
      >
        see matches
      </button>
    </div>
  );
}
