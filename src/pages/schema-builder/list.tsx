import React from "react";

import { useGo, useList } from "@refinedev/core";

export const SchemaBuilder: React.FC = () => {
  // We're inferring the resource from the route
  // So we call `useList` hook without any arguments.
  // const { ... } = useList({ resource: "products" })
  const { data, isLoading } = useList();

  const go = useGo();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.data?.map((product) => (
        <li key={product.id}>
          <span>{product.name}</span>
          <button
            onClick={() => {
              go({
                to: {
                  resource: "products",
                  action: "show",
                  id: product.id,
                },
              });
            }}
          >
            show
          </button>
        </li>
      ))}
    </ul>
  );
};
