import React from "react";
import { useContext } from "react";
import Context from "./Context";

const List = () => {
  const { lists } = useContext(Context);
  return (
    <ul>
      {lists.map((list) => {
        return <li key={list.id}>{list.item}</li>;
      })}
    </ul>
  );
};


export default List;