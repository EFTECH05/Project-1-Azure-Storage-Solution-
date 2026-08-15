function About() {
    return (
        <section className="about" id="about">

            <div className="about-container">

                {/* Section Heading */}
                <div className="about-header">

                    <span className="about-label">
                        ABOUT RETAILSTORE
                    </span>

                    <h2>
                        Shopping Made
                        <span> Simple.</span>
                    </h2>

                    <p>
                        At RetailStore, we believe online shopping
                        should be simple, affordable and enjoyable.
                        We bring quality products directly to you,
                        making it easier to find what you need at
                        prices you can trust.
                    </p>

                </div>


                {/* Features */}
                <div className="about-features">

                    <div className="about-card">

                        <div className="about-icon">
                            🛍️
                        </div>

                        <h3>
                            Quality Products
                        </h3>

                        <p>
                            We carefully select our products to
                            ensure you receive reliable and
                            high-quality items.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-icon">
                            💰
                        </div>

                        <h3>
                            Great Prices
                        </h3>

                        <p>
                            Enjoy competitive prices and great
                            deals without compromising on quality.
                        </p>

                    </div>


                    <div className="about-card">

                        <div className="about-icon">
                            🚚
                        </div>

                        <h3>
                            Reliable Service
                        </h3>

                        <p>
                            We are committed to providing a smooth
                            and convenient shopping experience.
                        </p>

                    </div>

                </div>


                {/* Bottom CTA */}
                <div className="about-bottom">

                    <div>
                        <h3>
                            Ready to start shopping?
                        </h3>

                        <p>
                            Explore our collection and discover
                            something you'll love.
                        </p>
                    </div>

                    <a
                        href="#products"
                        className="about-button"
                    >
                        Explore Products
                    </a>

                </div>

            </div>

        </section>
    );
}

export default About;