import React from "react";
import { useContext } from "react";
import Context from "./Context";


const Form = () => {
  const { inputValue, setInputValue, lists, setLists } = useContext(Context);
  const submitHandler = (e) => {
    e.preventDefault();
    setLists([...lists, { id: Math.random().toString(), item: inputValue }]);
    setInputValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};


export default Form;