import AddProductForm from "../components/AddProductForm";

const AddProductPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add a New Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
