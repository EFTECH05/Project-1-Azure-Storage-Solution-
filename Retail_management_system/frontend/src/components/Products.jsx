
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

    useEffect(() => {

        async function loadProducts() {

            console.log("=================================");
            console.log("LOADING PRODUCTS");
            console.log("=================================");

            try {

                setLoading(true);
                setError("");

                const data = await getProducts();

                console.log("API DATA:", data);
                console.log("IS ARRAY:", Array.isArray(data));
                console.log("PRODUCT COUNT:", data?.length);


                if (!Array.isArray(data)) {

                    throw new Error(
                        "API did not return a product array."
                    );

                }


                setProducts(data);

            } catch (err) {

                console.error(
                    "PRODUCT ERROR:",
                    err
                );

                setError(
                    err?.message ||
                    "Unable to load products."
                );

            } finally {

                setLoading(false);

            }
        }


        loadProducts();

    }, []);


    // =====================================================
    // RETRY
    // =====================================================

    const handleRetry = () => {

        window.location.reload();

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <section
                className="products"
                id="products"
            >

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


                <div className="products-message">

                    <p>
                        Loading products...
                    </p>

                </div>

            </section>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <section
                className="products"
                id="products"
            >

                <div className="products-header">

                    <span className="section-label">
                        OUR PRODUCTS
                    </span>

                    <h2>
                        Featured Products
                    </h2>

                </div>


                <div className="products-message error-message">

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
                        onClick={handleRetry}
                    >
                        Try Again
                    </button>

                </div>

            </section>

        );

    }


    // =====================================================
    // NO PRODUCTS
    // =====================================================

    if (products.length === 0) {

        return (

            <section
                className="products"
                id="products"
            >

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


                <div className="products-message">

                    <p>
                        No products available.
                    </p>

                </div>

            </section>

        );

    }


    // =====================================================
    // PRODUCTS
    // =====================================================

    return (

        <section
            className="products"
            id="products"
        >

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


            <div className="product-grid">

                {products.map((product) => {

                    console.log(
                        "RENDERING PRODUCT:",
                        product
                    );


                    return (

                        <ProductCard
                            key={product.rowKey}

                            image={product.imageUrl}

                            name={product.name}

                            description={product.description}

                            price={product.price}

                            category={product.category}

                            stockQuantity={product.stockQuantity}
                        />

                    );

                })}

            </div>

        </section>

    );

}


export default Products;

