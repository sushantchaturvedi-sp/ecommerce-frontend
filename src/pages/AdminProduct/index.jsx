import React, { useEffect, useState } from "react";
import ProductList from "../../components/productList";
import ProductForm from "../../components/productForm";
import { useToast } from "../../context/ToastContext";
import axios from "axios";
import {createProduct, getAllProducts, deleteProduct } from "../../services/api"

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Fetch Error:", error);
        showToast("Failed to load products", "error");
      }
    };

    fetchProducts();
  }, []);

  const handleAddOrUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category", data.category);
      if (data.imageFile) {
        formData.append("image", data.imageFile);
      }

      let response;
      
        response = await createProduct(formData);
        showToast("Product added successfully");
      

      
    } catch (error) {
      console.error("Save Error:", error);
      showToast("Failed to save product", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      showToast("Product deleted");
    } catch (error) {
      console.error("Delete Error:", error);
      showToast("Failed to delete product", "error");
    }
  };

  return (
    <div className="admin-products">
      <ProductForm product={editingProduct} onSubmit={handleAddOrUpdate} />
      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminProduct;
