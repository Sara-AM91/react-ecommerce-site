import { useState } from "react";
import { addCategory } from "../utils/api";
import { Form } from "react-router-dom";

const AddCategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name });
      alert("Category added successfully");
      //Clear the input field:
      setName("");
    } catch (error) {
      alert("Failed to add category");
    }
  };
  return (
    <form onSubmit={handleSubmit()} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="input unput-bordered mb-2"
        required
      />
      <button type="submit" className="btn btn-primary">
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;
