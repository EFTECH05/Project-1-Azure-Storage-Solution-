import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-grid">

                    <div>

                        <div className="brand">
                            <div className="brand-mark">
                                R
                            </div>

                            RetailStore
                        </div>

                        <p className="footer-description">
                            A simple and convenient online shopping
                            experience. Discover quality products,
                            great prices and reliable service.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>
                            SHOP
                        </h4>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/products">
                            Products
                        </Link>

                        <Link to="/cart">
                            Cart
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            INFORMATION
                        </h4>

                        <a href="#">
                            About Us
                        </a>

                        <a href="#">
                            Contact
                        </a>

                        <a href="#">
                            Privacy Policy
                        </a>

                    </div>


                    <div className="footer-column">

                        <h4>
                            CONTACT
                        </h4>

                        <a href="mailto:support@retailstore.com">
                            support@retailstore.com
                        </a>

                        <a href="tel:+27000000000">
                            +27 00 000 0000
                        </a>

                    </div>

                </div>


                <div className="footer-bottom">

                    <span>
                        © 2026 RetailStore. All rights reserved.
                    </span>

                    <span>
                        Secure online shopping
                    </span>

                </div>

            </div>

        </footer>
    );
}

export default Footer;