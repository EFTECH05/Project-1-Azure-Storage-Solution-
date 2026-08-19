import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD PRODUCTS
    // =====================================================

    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");

            console.log(
                "Starting Azure product request..."
            );

            const data =
                await getProducts();

            console.log(
                "Products component received:",
                data
            );

            setProducts(data);

        } catch (err) {

            console.error(
                "PRODUCT COMPONENT ERROR:",
                err
            );

            setError(
                err?.message ||
                "Something went wrong while retrieving the products."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // LOAD PRODUCTS WHEN COMPONENT OPENS
    // =====================================================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getProducts();

                setProducts(data);

            } catch (err) {

                console.error(
                    "PRODUCT LOAD ERROR:",
                    err
                );

                setError(
                    err?.message ||
                    "Unable to load products."
                );

            } finally {

                setLoading(false);
            }
        };

        fetchProducts();

    }, []);


    return (

        <section
            className="products"
            id="products"
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="products-header">

                <span className="section-label">
                    OUR PRODUCTS
                </span>

                <h2>
                    Featured Products
                </h2>

                <p>
                    Discover our latest products available
                    in the TechStore collection.
                </p>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="products-message">

                    <p>
                        Loading products...
                    </p>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!loading && error && (

                <div
                    className="products-message error-message"
                >

                    <span className="error-icon">
                        !
                    </span>

                    <h3>
                        Unable to load products
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={loadProducts}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* =================================================
                NO PRODUCTS
            ================================================= */}

            {!loading &&
                !error &&
                products.length === 0 && (

                    <div className="products-message">

                        <p>
                            No products available.
                        </p>

                    </div>

                )
            }


            {/* =================================================
                PRODUCTS
            ================================================= */}

            {!loading &&
                !error &&
                products.length > 0 && (

                    <div className="product-grid">

                        {products.map((product) => (

                            <ProductCard
                                key={product.rowKey}
                                image={product.imageUrl}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                category={product.category}
                                stockQuantity={
                                    product.stockQuantity
                                }
                            />

                        ))}

                    </div>

                )
            }

        </section>
    );
}

export default Products;