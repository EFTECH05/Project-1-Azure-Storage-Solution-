import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-container">

                <div className="hero-content">

                    <div className="hero-badge">
                        ✦ NEW COLLECTION 2026
                    </div>

                    <h1>
                        Everything you need.
                        <br />
                        <span>All in one place.</span>
                    </h1>

                    <p>
                        Discover quality products at great prices.
                        Simple shopping, fast service and everything
                        you need in one convenient place.
                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="primary-button"
                        >
                            Explore Products
                            <span>→</span>
                        </Link>

                        <Link
                            to="/products"
                            className="secondary-button"
                        >
                            View Collection
                        </Link>

                    </div>

                    <div className="hero-stats">

                        <div>
                            <strong>500+</strong>
                            <span>Products</span>
                        </div>

                        <div>
                            <strong>10K+</strong>
                            <span>Customers</span>
                        </div>

                        <div>
                            <strong>4.9/5</strong>
                            <span>Customer Rating</span>
                        </div>

                    </div>

                </div>

                <div className="hero-visual">

                    <div className="hero-circle"></div>

                    <div className="hero-product">

                        <div className="floating-card card-one">

                            <span>⭐</span>

                            <div>
                                <strong>
                                    Top Rated
                                </strong>

                                <small>
                                    Customer favourite
                                </small>
                            </div>

                        </div>

                        <div className="floating-card card-two">

                            <span>🚚</span>

                            <div>
                                <strong>
                                    Fast Delivery
                                </strong>

                                <small>
                                    Quick & reliable
                                </small>
                            </div>

                        </div>

                        <div className="showcase-box">

                            <div className="showcase-icon">
                                🛍️
                            </div>

                            <div className="showcase-lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;