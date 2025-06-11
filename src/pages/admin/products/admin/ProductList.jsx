import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../../services/api';
import { Link } from 'react-router-dom';
import './index.scss';
import { PenLine, Trash2 } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 10;

  const fetchProducts = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, productsPerPage);
      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.total / productsPerPage));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts(currentPage);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="productContainer">
      <div className="header">
        <h2>Products</h2>
        <div className="actionGroup">
          <Link to="/admin/products/add" className="addButton">
            Add Product
          </Link>
          {/* <Link to="/admin/banners" className="bannerButton">
            Create Banner
          </Link> */}
        </div>
      </div>

      {isLoading ? (
        <p>...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="productTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>
                  <img
                    className="productImage"
                    src={`${prod?.images[0]}`}
                    alt={prod.name}
                  />
                </td>
                <td>{prod.name}</td>
                <td>₹ {prod.price}</td>
                <td>{prod.category}</td>
                <td>
                  {prod.description.length > 20
                    ? prod.description.slice(0, 40) + '...'
                    : prod.description}
                </td>
                <td>
                  <div className="actionbtn">
                    <Link
                      to={`/admin/products/edit/${prod._id}`}
                      className="editButton"
                    >
                      <PenLine size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="deleteButton"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
