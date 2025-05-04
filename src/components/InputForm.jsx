import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

function InputForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="add-button">
        <FaPlus /> Add
      </button>
    </form>
  );
}

export default InputForm;