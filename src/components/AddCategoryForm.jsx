import { useState } from "react";
import { addCategory } from "../utils/api";
import { Form } from "react-router-dom";

const AddCategoryForm = ({ setCategories }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await addCategory({ name });
      console.log("New Category Response:", newCategory); // Log the response

      if (newCategory && newCategory._id) {
        //Update the categories list in the HomePage component:
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        alert("Category added successfully");

        //Clear the input field:
        setName("");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
