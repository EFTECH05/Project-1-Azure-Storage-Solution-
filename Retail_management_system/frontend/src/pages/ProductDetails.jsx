import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProduct } from "../services/productService";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadProduct() {

            try {

                const data = await getProduct(id);

                setProduct(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        }

        loadProduct();

    }, [id]);

    if (loading) {

        return (
            <section className="page">
                <div className="loading">
                    Loading product...
                </div>
            </section>
        );
    }

    if (!product) {

        return (
            <section className="page">

                <h1>
                    Product not found
                </h1>

                <Link
                    to="/products"
                    className="primary-button"
                >
                    Back to Products
                </Link>

            </section>
        );
    }

    return (
        <section className="product-details-page">

            <div className="details-image">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                />

            </div>

            <div className="details-content">

                <span className="eyebrow">
                    {product.category}
                </span>

                <h1>
                    {product.name}
                </h1>

                <p className="details-description">
                    {product.description}
                </p>

                <div className="details-price">
                    R{Number(product.price).toFixed(2)}
                </div>

                <p>
                    Stock available:
                    {" "}
                    <strong>
                        {product.stockQuantity}
                    </strong>
                </p>

                <button
                    className="primary-button"
                    disabled={product.stockQuantity <= 0}
                >
                    Add to Cart
                    <span>+</span>
                </button>

            </div>

        </section>
    );
}

export default ProductDetails;