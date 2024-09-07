import { useState, useEffect } from "react";
import { fetchCategories, addProduct } from "../utils/api";
import axios from "axios";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting Product:", product); // Log to check the product data
    try {
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", product.image);
      formData.append("upload_preset", "product_uploads");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dthjn2xqz/image/upload`,
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      // Submit the product data to your backend API
      const newProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        image: imageUrl, // Use the uploaded image URL from Cloudinary
      };

      await addProduct(newProduct);
      alert("Product added successfully");
      setProduct({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        image: null,
      });
      setImagePreview("");
    } catch (error) {
      setError("Failed to add product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input w-full"
          required
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-40 w-40 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AddProductForm;
