import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProducts = async () => {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load products.");

            } finally {

                setLoading(false);
            }
        };

        loadProducts();

    }, []);


    if (loading) {
        return (
            <section className="products">
                <h2>Featured Products</h2>
                <p>Loading products...</p>
            </section>
        );
    }


    if (error) {
        return (
            <section className="products">
                <h2>Featured Products</h2>
                <p>{error}</p>
            </section>
        );
    }


    return (
        <section className="products" id="products">

            <div className="products-header">

                <span className="section-label">
                    OUR PRODUCTS
                </span>

                <h2>Featured Products</h2>

                <p>
                    Discover our latest products available
                    in the TechStore collection.
                </p>

            </div>


            {products.length === 0 ? (

                <p className="products-message">
                    No products available.
                </p>

            ) : (

                <div className="product-grid">

                    {products.map((product) => (

                        <ProductCard
                            key={product.rowKey}
                            image={product.imageUrl}
                            name={product.name}
                            price={product.price}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default Products;