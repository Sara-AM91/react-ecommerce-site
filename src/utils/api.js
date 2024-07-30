//src/utils/api.js
export const fetchCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  return response.json();
};
