import React from "react";

const JoinedMembers = () => {
  const users = [
    {
      name: "MA",
      color: "#9dd862",
    },
    {
      name: "ZS",
      color: "#eb4263",
    },
    {
      name: "GT",
      color: "#1ab8de",
    },
    {
      name: "TA",
      color: "#05843e",
    },
    {
      name: "RA",
      color: "#9dd862",
    },
  ];
  return (
    <>
      {users.map((u) => (
        <div key={u.name}>
          <div
            className="avatar w-8 h-8 p-2 flex items-center justify-center rounded-full"
            style={{
              background: u.color,
            }}
          >
            <p className="m-0 text-white">{u.name}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default JoinedMembers;
