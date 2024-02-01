import React from "react";

import { useGo, useShow } from "@refinedev/core";

export const SchemaBuilderShow: React.FC = () => {
  // We're inferring the resource and the id from the route params
  // So we can call useShow hook without any arguments.
  // const result = useShow({ resource: "products", id: "xxx" })
  const result = useShow();

  const {
    queryResult: { data, isLoading },
  } = result;

  const go = useGo();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1>{data?.data?.name}</h1>
        <p>Material: {data?.data?.material}</p>
        <small>ID: {data?.data?.id}</small>
      </div>
      <button
        onClick={() => {
          go({
            to: {
              resource: "products",
              action: "list",
            },
          });
        }}
      >
        Go to Products list
      </button>
    </>
  );
};