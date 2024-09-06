import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchProducts, deleteCategory } from "../utils/api";
import ProductCard from "../components/ProductCard";
import AddCategoryForm from "../components/AddCategoryForm";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        console.log("categoriesData", categoriesData);

        //Adjust filtering to use category.name
        // const filteredCategories = categoriesData.filter((category) =>
        //   [
        //     "electronics",
        //     "jewelery",
        //     "men's clothing",
        //     "women's clothing",
        //   ].includes(category.name)
        // );
        setCategories(categoriesData);

        const productsData = await fetchProducts();
        console.log("productsData", productsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  //Function to handle category deletion
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(categoryId);
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
        alert("Category deleted successfully");
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Failed to delete category");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>

      <div className="flex flex-wrap mb-8">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center m-2 relative">
            <Link
              to={`/category/${category._id}`}
              className="btn btn-outline mr-2"
            >
              {category.name}
            </Link>
            {/* Delete button is placed outside the Link */}
            <button
              onClick={() => handleDeleteCategory(category._id)}
              className="delete-btn ml-2 text-red-500"
              aria-label="Delete category"
            >
              &#10006; {/* Unicode for "X" symbol */}
            </button>
          </div>
        ))}
      </div>
      {/*  3- Update HomePage.jsx to Pass setCategories*/}
      <AddCategoryForm setCategories={setCategories} />
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
