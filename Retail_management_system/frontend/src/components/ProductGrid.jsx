import ProductCard from "./ProductCard";

function ProductGrid({ products = [] }) {

    if (products.length === 0) {

        return (
            <div className="no-products">
                <div>🛍️</div>

                <h3>
                    No products available
                </h3>

                <p>
                    Products will appear here once
                    they are added to the store.
                </p>
            </div>
        );
    }

    return (
        <div className="products-grid">

            {products.map((product) => (

                <ProductCard
                    key={product.rowKey}
                    product={product}
                />

            ))}

        </div>
    );
}

export default ProductGrid;