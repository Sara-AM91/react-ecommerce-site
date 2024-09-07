//src/utils/api.js
// export const fetchCategories = async () => {
//   const response = await fetch("https://fakestoreapi.com/products/categories");
//   return response.json();
// };

// export const fetchProducts = async () => {
//   const response = await fetch("https://fakestoreapi.com/products");
//   return response.json();
// };

// export const fetchProductsByCategory = async (category) => {
//   const response = await fetch(
//     `https://fakestoreapi.com/products/category/${category}`
//   );
//   return response.json();
// };

//03.09.2024:
const API_BASE_URL = "http://localhost:5000/api";

export const addCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error("Failed to delete category");
  } catch (error) {}
};
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?categoryId=${categoryId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
