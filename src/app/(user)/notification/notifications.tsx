import React from "react";

export default function Notifications() {
  return Array(10)
    .fill(undefined)
    .map((_, index) => (
      <div
        key={index}
        className="!p-4 w-full border shadow rounded-sm"
        style={{ backgroundColor: "#f4f4f5" }}
      >
        <h3 className="text-xl font-semibold">Title</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga totam
          veniam quis, unde corrupti perspiciatis est minima sapiente! Non quod
          fugit necessitatibus dolorem doloribus ea autem aliquid at amet
          aspernatur!
        </p>
      </div>
    ));
}
