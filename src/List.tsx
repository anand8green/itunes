import React from "react";

interface Iprop {
  name: string;
}

const List: React.FC<Iprop> = ({ name }) => {
  return <div>{name}</div>;
};

export default List;
