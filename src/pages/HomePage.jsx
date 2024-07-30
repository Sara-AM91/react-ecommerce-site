import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const filteredCategories = categoriesData.filter((category) =>
          [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing",
          ].includes(category)
        );
        setCategories(filteredCategories);

        const productsData = await fetchProducts();
        console.log("productsData", productsData);
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="flex flex-wrap mb-8">
        {categories.map((category) => (
          <Link
            to={`/category/${category}`}
            key={category}
            className="btn btn-outline m-2"
          >
            {category}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
