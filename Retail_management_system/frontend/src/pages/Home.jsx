import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://localhost:7230/Products/api";

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // LOAD PRODUCTS FROM ASP.NET CORE API
    // ==========================================

    useEffect(() => {

        const loadProducts = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(
                        `API request failed: ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("Products received from API:", data);

                if (!Array.isArray(data)) {
                    throw new Error("API did not return a product list.");
                }

                setProducts(data);

            } catch (error) {

                console.error("Product API error:", error);

                setError(
                    "Unable to load products. Please make sure the ASP.NET backend is running."
                );

            } finally {

                setLoading(false);

            }
        };


        loadProducts();

    }, []);


    // ==========================================
    // FIRST 4 PRODUCTS
    // ==========================================

    const featuredProducts = products.slice(0, 4);


    return (

        <div className="home-page">


            {/* ==========================================
                HERO
            ========================================== */}

            <section className="hero">

                <div className="hero-container">


                    {/* HERO CONTENT */}

                    <div className="hero-content fade-up">

                        <span className="hero-label">
                            WELCOME TO RETAILSTORE
                        </span>


                        <h1>
                            Shop better.
                            <br />
                            <span>Live better.</span>
                        </h1>


                        <p>
                            Discover quality products at great prices.
                            Everything you need, all in one place.
                        </p>


                        <div className="hero-buttons">

                            <Link
                                to="/products"
                                className="primary-button"
                            >
                                Shop Now
                                <span>→</span>
                            </Link>


                            <Link
                                to="/products"
                                className="secondary-button"
                            >
                                Explore Products
                            </Link>

                        </div>


                        {/* HERO STATISTICS */}

                        <div className="hero-trust">

                            <div>

                                <strong>
                                    {products.length}+
                                </strong>

                                <span>
                                    Products
                                </span>

                            </div>


                            <div>

                                <strong>
                                    10K+
                                </strong>

                                <span>
                                    Customers
                                </span>

                            </div>


                            <div>

                                <strong>
                                    4.9/5
                                </strong>

                                <span>
                                    Rating
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        HERO PRODUCT
                    ========================================== */}

                    <div className="hero-card-wrapper fade-right">

                        {featuredProducts.length > 0 ? (

                            <div className="hero-card">


                                {/* TOP */}

                                <div className="hero-card-top">

                                    <span className="featured-label">
                                        FEATURED
                                    </span>


                                    <button
                                        className="hero-heart"
                                        type="button"
                                        aria-label="Add to wishlist"
                                    >
                                        ♡
                                    </button>

                                </div>


                                {/* IMAGE */}

                                <div className="hero-product-image">

                                    {getImageUrl(
                                        featuredProducts[0]
                                    ) ? (

                                        <img
                                            src={getImageUrl(
                                                featuredProducts[0]
                                            )}
                                            alt={
                                                featuredProducts[0].name ||
                                                "Product"
                                            }
                                        />

                                    ) : (

                                        <span>
                                            🛍️
                                        </span>

                                    )}

                                </div>


                                {/* INFORMATION */}

                                <div className="hero-product-info">

                                    <small>
                                        {featuredProducts[0].category ||
                                            "Product"}
                                    </small>


                                    <h3>
                                        {featuredProducts[0].name}
                                    </h3>


                                    <p>
                                        {featuredProducts[0].description ||
                                            "Discover this great product from RetailStore."}
                                    </p>


                                    <div className="hero-product-footer">

                                        <strong>
                                            {formatPrice(
                                                featuredProducts[0].price
                                            )}
                                        </strong>


                                        <Link
                                            to={`/products/${featuredProducts[0].rowKey}`}
                                        >
                                            View →
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            /* DEFAULT HERO */

                            <div className="hero-card">

                                <div className="hero-product-image">
                                    🛍️
                                </div>


                                <div className="hero-product-info">

                                    <small>
                                        RETAILSTORE
                                    </small>


                                    <h3>
                                        Discover our products
                                    </h3>


                                    <p>
                                        Explore our latest collection
                                        and find something you love.
                                    </p>


                                    <div className="hero-product-footer">

                                        <Link to="/products">
                                            Shop Products →
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* FLOATING BADGES */}

                        <div className="floating-badge badge-one">
                            ✓ Quality Products
                        </div>


                        <div className="floating-badge badge-two">
                            ★ 4.9 Rating
                        </div>

                    </div>

                </div>

            </section>



            {/* ==========================================
                CATEGORIES
            ========================================== */}

            <section
                className="section"
                id="categories"
            >

                <div className="section-title">

                    <div>

                        <span>
                            CATEGORIES
                        </span>


                        <h2>
                            Shop by category
                        </h2>


                        <p>
                            Explore our collection and find exactly
                            what you're looking for.
                        </p>

                    </div>


                    <Link to="/products">
                        View all →
                    </Link>

                </div>


                <div className="category-grid">

                    <Category
                        icon="💻"
                        title="Electronics"
                        text="Smart devices and technology"
                    />


                    <Category
                        icon="👕"
                        title="Fashion"
                        text="Style for every occasion"
                    />


                    <Category
                        icon="🏠"
                        title="Home & Living"
                        text="Make your home better"
                    />


                    <Category
                        icon="🎒"
                        title="Accessories"
                        text="Complete your everyday style"
                    />

                </div>

            </section>



            {/* ==========================================
                FEATURED PRODUCTS
            ========================================== */}

            <section
                className="section products-section"
                id="products"
            >

                <div className="section-title">

                    <div>

                        <span>
                            FEATURED PRODUCTS
                        </span>


                        <h2>
                            Popular products
                        </h2>


                        <p>
                            Discover some of our latest products.
                        </p>

                    </div>


                    <Link to="/products">
                        View all →
                    </Link>

                </div>



                {/* ==========================================
                    LOADING
                ========================================== */}

                {loading && (

                    <div className="products-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Loading products...
                        </p>

                    </div>

                )}



                {/* ==========================================
                    ERROR
                ========================================== */}

                {!loading && error && (

                    <div className="products-error">

                        <div>
                            ⚠️
                        </div>


                        <h3>
                            Products unavailable
                        </h3>


                        <p>
                            {error}
                        </p>


                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>

                    </div>

                )}



                {/* ==========================================
                    PRODUCTS
                ========================================== */}

                {!loading &&
                    !error &&
                    featuredProducts.length > 0 && (

                        <div className="products-grid">

                            {featuredProducts.map((product) => (

                                <Product
                                    key={
                                        product.rowKey ||
                                        product.id
                                    }
                                    product={product}
                                />

                            ))}

                        </div>

                    )}



                {/* ==========================================
                    NO PRODUCTS
                ========================================== */}

                {!loading &&
                    !error &&
                    products.length === 0 && (

                        <div className="no-products">

                            <div className="no-products-icon">
                                🛍️
                            </div>


                            <h3>
                                No products available
                            </h3>


                            <p>
                                Products will appear here once they
                                are added to the store.
                            </p>


                            <Link
                                to="/products"
                                className="primary-button"
                            >
                                Browse Products
                            </Link>

                        </div>

                    )}

            </section>



            {/* ==========================================
                WHY SHOP
            ========================================== */}

            <section
                className="why-section"
                id="about"
            >

                <div className="section">

                    <div className="section-title centered">

                        <div>

                            <span>
                                WHY RETAILSTORE
                            </span>


                            <h2>
                                Shopping made simple
                            </h2>


                            <p>
                                We make online shopping convenient,
                                secure and enjoyable.
                            </p>

                        </div>

                    </div>


                    <div className="benefits">

                        <Benefit
                            icon="🚚"
                            title="Fast Delivery"
                            text="Quick and reliable delivery straight to your door."
                        />


                        <Benefit
                            icon="🔒"
                            title="Secure Payment"
                            text="Shop with confidence using a secure checkout."
                        />


                        <Benefit
                            icon="↩"
                            title="Easy Returns"
                            text="Simple returns when something isn't right."
                        />

                    </div>

                </div>

            </section>



            {/* ==========================================
                NEWSLETTER
            ========================================== */}

            <section className="newsletter">

                <div className="newsletter-container">

                    <div>

                        <span>
                            STAY UPDATED
                        </span>


                        <h2>
                            Don't miss our latest deals.
                        </h2>


                        <p>
                            Subscribe to receive new products,
                            offers and exclusive deals.
                        </p>

                    </div>


                    <form
                        className="newsletter-form"
                        onSubmit={(event) =>
                            event.preventDefault()
                        }
                    >

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                        />


                        <button type="submit">
                            Subscribe
                        </button>

                    </form>

                </div>

            </section>

        </div>
    );
}


/* ==================================================
   CATEGORY COMPONENT
================================================== */

function Category({
    icon,
    title,
    text
}) {

    return (

        <Link
            to={`/products?category=${encodeURIComponent(title)}`}
            className="category-card"
        >

            <div className="category-icon">
                {icon}
            </div>


            <div className="category-content">

                <h3>
                    {title}
                </h3>


                <p>
                    {text}
                </p>

            </div>


            <span className="category-arrow">
                →
            </span>

        </Link>

    );
}


/* ==================================================
   PRODUCT COMPONENT
================================================== */

function Product({ product }) {

    const imageUrl = getImageUrl(product);

    return (

        <div className="product-card">


            {/* PRODUCT IMAGE */}

            <div className="product-image">

                <span className="product-badge">
                    Featured
                </span>


                <button
                    className="wishlist"
                    aria-label="Add to wishlist"
                    type="button"
                >
                    ♡
                </button>


                {imageUrl ? (

                    <img
                        src={imageUrl}
                        alt={product.name || "Product"}
                    />

                ) : (

                    <span className="product-icon">
                        🛍️
                    </span>

                )}

            </div>



            {/* PRODUCT DETAILS */}

            <div className="product-content">

                <small>
                    {product.category || "Product"}
                </small>


                <h3>
                    {product.name}
                </h3>


                <div className="product-rating">

                    <span>
                        ★★★★★
                    </span>

                    <small>
                        4.8
                    </small>

                </div>


                <div className="product-bottom">

                    <strong>
                        {formatPrice(product.price)}
                    </strong>


                    <Link
                        to={`/products/${product.rowKey}`}
                        className="add-cart"
                    >
                        View
                    </Link>

                </div>

            </div>

        </div>

    );
}


/* ==================================================
   BENEFIT COMPONENT
================================================== */

function Benefit({
    icon,
    title,
    text
}) {

    return (

        <div className="benefit">

            <div className="benefit-icon">
                {icon}
            </div>


            <div>

                <h3>
                    {title}
                </h3>


                <p>
                    {text}
                </p>

            </div>

        </div>

    );
}


/* ==================================================
   IMAGE URL
================================================== */

function getImageUrl(product) {

    if (!product) {
        return "";
    }


    // If Azure Blob URL is publicly accessible
    if (product.imageUrl) {
        return product.imageUrl;
    }


    // If backend returns a blob name instead
    if (product.blobName) {

        return `https://localhost:7230/Products/Image?blobName=${encodeURIComponent(
            product.blobName
        )}`;

    }


    return "";
}


/* ==================================================
   PRICE FORMATTER
================================================== */

function formatPrice(price) {

    const numericPrice = Number(price);


    if (Number.isNaN(numericPrice)) {
        return `R${price ?? "0"}`;
    }


    return `R${numericPrice.toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}


export default Home;