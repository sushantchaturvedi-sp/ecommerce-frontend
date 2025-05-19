// // // // import React, { useEffect, useState, useContext } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { getProducts } from '../../../services/api';
// // // // import { SearchContext } from '../../../context/SearchContext';
// // // // import './ProductList.scss';

// // // // function UserProductList() {
// // // //   const [products, setProducts] = useState([]);
// // // //   const [totalProducts, setTotalProducts] = useState(0);
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const productsPerPage = 10;

// // // //   const { searchQuery } = useContext(SearchContext);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchProducts(currentPage);
// // // //   }, [currentPage]);

// // // //   useEffect(() => {
// // // //     if (searchQuery) {
// // // //       fetchProducts(1);
// // // //       setCurrentPage(1);
// // // //     }
// // // //   }, [searchQuery]);

// // // //   const fetchProducts = async (page) => {
// // // //     try {
// // // //       const res = await getProducts(page, productsPerPage);
// // // //       let fetchedProducts = res.data.products || [];

// // // //       if (searchQuery) {
// // // //         const lower = searchQuery.toLowerCase();
// // // //         fetchedProducts = fetchedProducts.filter(
// // // //           (p) =>
// // // //             p.name.toLowerCase().includes(lower) ||
// // // //             p.description.toLowerCase().includes(lower)
// // // //         );
// // // //       }

// // // //       setProducts(fetchedProducts);
// // // //       setTotalProducts(res.data.total || 0);
// // // //     } catch (error) {
// // // //       console.error('Failed to load products:', error);
// // // //     }
// // // //   };

// // // //   const handleClick = (id) => {
// // // //     navigate(`/product/${id}`);
// // // //   };

// // // //   const totalPages = Math.ceil(totalProducts / productsPerPage);

// // // //   return (
// // // //     <div className="product-list-container">
// // // //       <h2>Browse Products</h2>

// // // //       {products.length === 0 ? (
// // // //         <p className="no-results">No products match your search.</p>
// // // //       ) : (
// // // //         <>
// // // //           <div className="product-grid">
// // // //             {products.map((product) => (
// // // //               <div
// // // //                 className="product-card"
// // // //                 key={product._id}
// // // //                 onClick={() => handleClick(product._id)}
// // // //               >
// // // //                 <div
// // // //                   className="product-card"
// // // //                   key={product._id}
// // // //                   onClick={() => handleClick(product._id)}
// // // //                 >
// // // //                   <img
// // // //                     src={`http://localhost:4000/${product?.images[0]}`}
// // // //                     alt={product.name}
// // // //                   />
// // // //                   <div className="product-details">
// // // //                     {' '}
// // // //                     <h3>{product.name}</h3>
// // // //                     <p className="price">₹ {product.price}</p>
// // // //                     <p className="description">
// // // //                       {product.description.length > 330
// // // //                         ? product.description.slice(0, 330) + '...'
// // // //                         : product.description}
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Pagination */}
// // // //           {totalPages > 1 && (
// // // //             <div className="pagination">
// // // //               <button
// // // //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// // // //                 disabled={currentPage === 1}
// // // //               >
// // // //                 Prev
// // // //               </button>

// // // //               {[...Array(totalPages)].map((_, i) => (
// // // //                 <button
// // // //                   key={i}
// // // //                   className={currentPage === i + 1 ? 'active' : ''}
// // // //                   onClick={() => setCurrentPage(i + 1)}
// // // //                 >
// // // //                   {i + 1}
// // // //                 </button>
// // // //               ))}

// // // //               <button
// // // //                 onClick={() =>
// // // //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// // // //                 }
// // // //                 disabled={currentPage === totalPages}
// // // //               >
// // // //                 Next
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default UserProductList;

// // // import React, { useEffect, useState, useContext } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { getProducts } from '../../../services/api';
// // // import { SearchContext } from '../../../context/SearchContext';
// // // import { useCart } from '../../../context/CartContext';
// // // import { AuthContext } from '../../../context/AuthContext';
// // // import ProductCard from '../../../components/ProductCard';
// // // import './ProductList.scss';

// // // function UserProductList() {
// // //   const [products, setProducts] = useState([]);
// // //   const [totalProducts, setTotalProducts] = useState(0);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const productsPerPage = 10;

// // //   const { searchQuery } = useContext(SearchContext);
// // //   const { addToCart } = useCart();
// // //   const { user } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchProducts(currentPage);
// // //   }, [currentPage]);

// // //   useEffect(() => {
// // //     if (searchQuery) {
// // //       fetchProducts(1);
// // //       setCurrentPage(1);
// // //     }
// // //   }, [searchQuery]);

// // //   const fetchProducts = async (page) => {
// // //     try {
// // //       const res = await getProducts(page, productsPerPage);
// // //       let fetchedProducts = res.data.products || [];

// // //       if (searchQuery) {
// // //         const lower = searchQuery.toLowerCase();
// // //         fetchedProducts = fetchedProducts.filter(
// // //           (p) =>
// // //             p.name.toLowerCase().includes(lower) ||
// // //             p.description.toLowerCase().includes(lower)
// // //         );
// // //       }

// // //       setProducts(fetchedProducts);
// // //       setTotalProducts(res.data.total || 0);
// // //     } catch (error) {
// // //       console.error('Failed to load products:', error);
// // //     }
// // //   };

// // //   const handleAddToCart = (product, e) => {
// // //     e.stopPropagation(); // Prevent triggering navigation
// // //     if (!user?._id) {
// // //       alert('Please log in to add items to your cart.');
// // //       return;
// // //     }

// // //     const cartItem = [
// // //       {
// // //         productId: product._id,
// // //         quantity: 1,
// // //       },
// // //     ];

// // //     addToCart(cartItem);
// // //     alert('Item added to cart!');
// // //   };

// // //   const handleClick = (id) => {
// // //     navigate(`/product/${id}`);
// // //   };

// // //   const totalPages = Math.ceil(totalProducts / productsPerPage);

// // //   return (
// // //     <div className="product-list-container">
// // //       <h2>Browse Products</h2>

// // //       {products.length === 0 ? (
// // //         <p className="no-results">No products match your search.</p>
// // //       ) : (
// // //         <>
// // //           <div className="product-grid">
// // //             {products.map((product) => (
// // //               <div
// // //                 key={product._id}
// // //                 onClick={() => handleClick(product._id)}
// // //                 className="product-card-wrapper"
// // //               >
// // //                 <ProductCard
// // //                   product={product}
// // //                   onAddToCart={(e) => handleAddToCart(product, e)}
// // //                 />
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Pagination */}
// // //           {totalPages > 1 && (
// // //             <div className="pagination">
// // //               <button
// // //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// // //                 disabled={currentPage === 1}
// // //               >
// // //                 Prev
// // //               </button>

// // //               {[...Array(totalPages)].map((_, i) => (
// // //                 <button
// // //                   key={i}
// // //                   className={currentPage === i + 1 ? 'active' : ''}
// // //                   onClick={() => setCurrentPage(i + 1)}
// // //                 >
// // //                   {i + 1}
// // //                 </button>
// // //               ))}

// // //               <button
// // //                 onClick={() =>
// // //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// // //                 }
// // //                 disabled={currentPage === totalPages}
// // //               >
// // //                 Next
// // //               </button>
// // //             </div>
// // //           )}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default UserProductList;

// // import React, { useEffect, useState, useContext, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getProducts } from '../../../services/api';
// // import { SearchContext } from '../../../context/SearchContext';
// // import './ProductList.scss';

// // function UserProductList() {
// //   const [products, setProducts] = useState([]);
// //   const [totalProducts, setTotalProducts] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 10;

// //   const { searchQuery } = useContext(SearchContext);
// //   const navigate = useNavigate();
// //   const productGridRef = useRef(null); // Reference to the product grid

// //   useEffect(() => {
// //     fetchProducts(currentPage);
// //   }, [currentPage]);

// //   useEffect(() => {
// //     if (searchQuery) {
// //       fetchProducts(1);
// //       setCurrentPage(1);
// //     }
// //   }, [searchQuery]);

// //   const fetchProducts = async (page) => {
// //     try {
// //       const res = await getProducts(page, productsPerPage);
// //       let fetchedProducts = res.data.products || [];

// //       if (searchQuery) {
// //         const lower = searchQuery.toLowerCase();
// //         fetchedProducts = fetchedProducts.filter(
// //           (p) =>
// //             p.name.toLowerCase().includes(lower) ||
// //             p.description.toLowerCase().includes(lower)
// //         );
// //       }

// //       setProducts(fetchedProducts);
// //       setTotalProducts(res.data.total || 0);
// //     } catch (error) {
// //       console.error('Failed to load products:', error);
// //     }
// //   };

// //   const handleClick = (id) => {
// //     navigate(`/product/${id}`);
// //   };

// //   const handleScrollRight = () => {
// //     if (productGridRef.current) {
// //       productGridRef.current.scrollBy({
// //         left: 300, // Scroll by 300px, you can adjust this value
// //         behavior: 'smooth',
// //       });
// //     }
// //   };

// //   const totalPages = Math.ceil(totalProducts / productsPerPage);

// //   return (
// //     <div className="product-list-container">
// //       <h2>Browse Products</h2>

// //       {products.length === 0 ? (
// //         <p className="no-results">No products match your search.</p>
// //       ) : (
// //         <>
// //           <div className="product-grid" ref={productGridRef}>
// //             {products.map((product) => (
// //               <div
// //                 className="product-card-wrapper"
// //                 key={product._id}
// //                 onClick={() => handleClick(product._id)}
// //               >
// //                 <div className="product-card">
// //                   <img
// //                     src={`http://localhost:4000/${product?.images[0]}`}
// //                     alt={product.name}
// //                     className="product-img"
// //                   />
// //                   <h3>{product.name}</h3>
// //                   <p className="price">₹ {product.price}</p>
// //                   <p className="description">
// //                     {product.description.length > 100
// //                       ? product.description.slice(0, 100) + '...'
// //                       : product.description}
// //                   </p>
// //                   <button className="add-to-cart">Add to Cart</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Scroll Arrow Button */}
// //           <button className="scroll-arrow" onClick={handleScrollRight}>
// //             ➡️
// //           </button>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //                 disabled={currentPage === 1}
// //               >
// //                 Prev
// //               </button>

// //               {[...Array(totalPages)].map((_, i) => (
// //                 <button
// //                   key={i}
// //                   className={currentPage === i + 1 ? 'active' : ''}
// //                   onClick={() => setCurrentPage(i + 1)}
// //                 >
// //                   {i + 1}
// //                 </button>
// //               ))}

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// //                 }
// //                 disabled={currentPage === totalPages}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default UserProductList;

// // import React, { useEffect, useState, useContext, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getProducts } from '../../../services/api';
// // import { SearchContext } from '../../../context/SearchContext';
// // import { ArrowRight, ArrowLeft } from 'lucide-react';
// // import './ProductList.scss';

// // function UserProductList() {
// //   const [products, setProducts] = useState([]);
// //   const [totalProducts, setTotalProducts] = useState(0);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 10;

// //   const { searchQuery } = useContext(SearchContext);
// //   const navigate = useNavigate();
// //   const productGridRef = useRef(null); // Reference to the product grid

// //   useEffect(() => {
// //     fetchProducts(currentPage);
// //   }, [currentPage]);

// //   useEffect(() => {
// //     if (searchQuery) {
// //       fetchProducts(1);
// //       setCurrentPage(1);
// //     }
// //   }, [searchQuery]);

// //   const fetchProducts = async (page) => {
// //     try {
// //       const res = await getProducts(page, productsPerPage);
// //       let fetchedProducts = res.data.products || [];

// //       if (searchQuery) {
// //         const lower = searchQuery.toLowerCase();
// //         fetchedProducts = fetchedProducts.filter(
// //           (p) =>
// //             p.name.toLowerCase().includes(lower) ||
// //             p.description.toLowerCase().includes(lower)
// //         );
// //       }

// //       setProducts(fetchedProducts);
// //       setTotalProducts(res.data.total || 0);
// //     } catch (error) {
// //       console.error('Failed to load products:', error);
// //     }
// //   };

// //   const handleClick = (id) => {
// //     navigate(`/product/${id}`);
// //   };

// //   // Scroll functions for left and right
// //   const handleScrollLeft = () => {
// //     if (productGridRef.current) {
// //       productGridRef.current.scrollBy({
// //         left: -300, // Scroll left by 300px
// //         behavior: 'smooth',
// //       });
// //     }
// //   };

// //   const handleScrollRight = () => {
// //     if (productGridRef.current) {
// //       productGridRef.current.scrollBy({
// //         left: 300, // Scroll right by 300px
// //         behavior: 'smooth',
// //       });
// //     }
// //   };

// //   const totalPages = Math.ceil(totalProducts / productsPerPage);

// //   return (
// //     <div className="product-list-container">
// //       <h2>Browse Products</h2>

// //       {products.length === 0 ? (
// //         <p className="no-results">No products match your search.</p>
// //       ) : (
// //         <>
// //           <div className="product-grid" ref={productGridRef}>
// //             {products.map((product) => (
// //               <div
// //                 className="product-card-wrapper"
// //                 key={product._id}
// //                 onClick={() => handleClick(product._id)}
// //               >
// //                 <div className="product-card">
// //                   <img
// //                     src={`http://localhost:4000/${product?.images[0]}`}
// //                     alt={product.name}
// //                     className="product-img"
// //                   />
// //                   <h3>{product.name}</h3>
// //                   <p className="price">₹ {product.price}</p>
// //                   <p className="description">
// //                     {product.description.length > 100
// //                       ? product.description.slice(0, 100) + '...'
// //                       : product.description}
// //                   </p>
// //                   <button className="add-to-cart">Add to Cart</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Left Arrow Button */}
// //           <button className="scroll-arrow left" onClick={handleScrollLeft}>
// //             <<ArrowLeft /> />
// //           </button>

// //           {/* Right Arrow Button */}
// //           <button className="scroll-arrow right" onClick={handleScrollRight}>
// //             <<ArrowRight /> />
// //           </button>

// //           {/* Pagination */}
// //           {totalPages > 1 && (
// //             <div className="pagination">
// //               <button
// //                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //                 disabled={currentPage === 1}
// //               >
// //                 Prev
// //               </button>

// //               {[...Array(totalPages)].map((_, i) => (
// //                 <button
// //                   key={i}
// //                   className={currentPage === i + 1 ? 'active' : ''}
// //                   onClick={() => setCurrentPage(i + 1)}
// //                 >
// //                   {i + 1}
// //                 </button>
// //               ))}

// //               <button
// //                 onClick={() =>
// //                   setCurrentPage((p) => Math.min(p + 1, totalPages))
// //                 }
// //                 disabled={currentPage === totalPages}
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default UserProductList;

// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getProducts } from '../../../services/api';
// import { SearchContext } from '../../../context/SearchContext';
// import { ArrowRight, ArrowLeft } from 'lucide-react';
// import './ProductList.scss';

// function UserProductList() {
//   const [products, setProducts] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   const { searchQuery } = useContext(SearchContext);
//   const navigate = useNavigate();
//   const productGridRef = useRef(null); // Reference to the product grid

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     if (searchQuery) {
//       fetchProducts(1);
//       setCurrentPage(1);
//     }
//   }, [searchQuery]);

//   const fetchProducts = async (page) => {
//     try {
//       const res = await getProducts(page, productsPerPage);
//       let fetchedProducts = res.data.products || [];

//       if (searchQuery) {
//         const lower = searchQuery.toLowerCase();
//         fetchedProducts = fetchedProducts.filter(
//           (p) =>
//             p.name.toLowerCase().includes(lower) ||
//             p.description.toLowerCase().includes(lower)
//         );
//       }

//       setProducts(fetchedProducts);
//       setTotalProducts(res.data.total || 0);
//     } catch (error) {
//       console.error('Failed to load products:', error);
//     }
//   };

//   const handleClick = (id) => {
//     navigate(`/product/${id}`);
//   };

//   // Scroll functions for left and right
//   const handleScrollLeft = () => {
//     if (productGridRef.current) {
//       productGridRef.current.scrollBy({
//         left: -300, // Scroll left by 300px
//         behavior: 'smooth',
//       });
//     }
//   };

//   const handleScrollRight = () => {
//     if (productGridRef.current) {
//       productGridRef.current.scrollBy({
//         left: 300, // Scroll right by 300px
//         behavior: 'smooth',
//       });
//     }
//   };

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   return (
//     <div className="product-list-container">
//       <h2>Browse Products</h2>

//       {products.length === 0 ? (
//         <p className="no-results">No products match your search.</p>
//       ) : (
//         <>
//           <div className="product-grid" ref={productGridRef}>
//             {products.map((product) => (
//               <div
//                 className="product-card-wrapper"
//                 key={product._id}
//                 onClick={() => handleClick(product._id)}
//               >
//                 <div className="product-card">
//                   <img
//                     src={
//                       product?.images?.[0]
//                         ? `http://localhost:4000/${product.images[0]}`
//                         : 'fallback-image-url.jpg' // Use a fallback image if no image is available
//                     }
//                     alt={product.name}
//                     className="product-img"
//                   />
//                   <h3>{product.name}</h3>
//                   <p className="price">₹ {product.price}</p>
//                   {/* <p className="description">
//                     {product.description.length > 20
//                       ? product.description.slice(0, 20) + '...'
//                       : product.description}
//                   </p> */}
//                   <button className="add-to-cart">Add to Cart</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Left Arrow Button */}
//           <button className="scroll-arrow left" onClick={handleScrollLeft}>
//             <ArrowLeft />
//           </button>

//           {/* Right Arrow Button */}
//           <button className="scroll-arrow right" onClick={handleScrollRight}>
//             <ArrowRight />
//           </button>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button
//                 onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>

//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   className={currentPage === i + 1 ? 'active' : ''}
//                   onClick={() => setCurrentPage(i + 1)}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() =>
//                   setCurrentPage((p) => Math.min(p + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default UserProductList;

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../../services/api';
import { SearchContext } from '../../../context/SearchContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import './ProductList.scss';

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const productsPerPage = 10;
  const { searchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const productGridRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetchProducts = async (page) => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, productsPerPage);
      let fetchedProducts = res.data.products || [];

      if (searchQuery) {
        const lower = searchQuery.toLowerCase();
        fetchedProducts = fetchedProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            p.description.toLowerCase().includes(lower)
        );
      }

      setProducts((prev) =>
        page === 1 ? fetchedProducts : [...prev, ...fetchedProducts]
      );
      setTotalProducts(res.data.total || 0);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    setProducts([]);
    fetchProducts(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage !== 1) {
      fetchProducts(currentPage);
    }
  }, [currentPage]);

  // Observe sentinel at the end of scroll
  const handleIntersection = useCallback(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isLoading &&
        products.length < totalProducts
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isLoading, products, totalProducts]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: productGridRef.current,
      threshold: 1.0,
    });

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleScrollLeft = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="product-list-container">
      <h2>Browse Products</h2>

      {products.length === 0 && !isLoading ? (
        <p className="no-results">No products match your search.</p>
      ) : (
        <>
          {/* Scroll Buttons */}
          <button className="scroll-arrow left" onClick={handleScrollLeft}>
            <ArrowLeft />
          </button>

          <div className="product-grid horizontal-scroll" ref={productGridRef}>
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card-wrapper"
                onClick={() => handleClick(product._id)}
              >
                <div className="product-card">
                  <img
                    src={
                      product?.images?.[0]
                        ? `http://localhost:4000/${product.images[0]}`
                        : 'fallback-image-url.jpg'
                    }
                    alt={product.name}
                    className="product-img"
                  />
                  <h3>{product.name}</h3>
                  <p className="price">₹ {product.price}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}

            {/* Sentinel div to detect end of scroll */}
            <div ref={sentinelRef} className="sentinel" />
          </div>

          <button className="scroll-arrow right" onClick={handleScrollRight}>
            <ArrowRight />
          </button>

          {isLoading && <p className="loading">Loading more products...</p>}
        </>
      )}
    </div>
  );
}

export default UserProductList;
