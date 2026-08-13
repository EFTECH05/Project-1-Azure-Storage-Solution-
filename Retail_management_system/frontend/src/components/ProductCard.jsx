import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (
        <div className="product-card">

            <div className="product-image">

                {product.imageUrl ? (

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                    />

                ) : (

                    <div className="product-placeholder">
                        🛍️
                    </div>

                )}

                {product.stockQuantity <= 0 && (
                    <span className="out-of-stock">
                        OUT OF STOCK
                    </span>
                )}

                <button className="heart">
                    ♡
                </button>

            </div>

            <div className="product-details">

                <span className="product-category">
                    {product.category}
                </span>

                <h3>
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <div className="product-bottom">

                    <strong>
                        R{Number(product.price).toFixed(2)}
                    </strong>

                    <Link
                        to={`/products/${product.rowKey}`}
                        className="quick-add"
                    >
                        →
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;