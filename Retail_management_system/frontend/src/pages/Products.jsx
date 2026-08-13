import { useEffect, useState } from "react";

import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Unable to load products."
                );

            } finally {

                setLoading(false);

            }
        }

        loadProducts();

    }, []);

    return (
        <section className="page">

            <span className="eyebrow">
                SHOP
            </span>

            <h1>
                All Products
            </h1>

            <p>
                Explore our complete collection.
            </p>

            {loading && (
                <div className="loading">
                    Loading products...
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <ProductGrid
                    products={products}
                />
            )}

        </section>
    );
}

export default Products;