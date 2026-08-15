function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-brand">

                        <div className="footer-logo">

                            <div className="footer-logo-icon">
                                ABC
                            </div>

                            <div className="footer-logo-name">
                                Retail<span>Store</span>
                            </div>

                        </div>

                        <p className="footer-description">
                            Your trusted destination for modern technology
                            and quality electronics. Discover great products,
                            competitive prices and reliable service.
                        </p>

                    </div>


                    {/* Shop */}
                    <div className="footer-column">

                        <h4>SHOP</h4>

                        <a href="#home">
                            Home
                        </a>

                        <a href="#products">
                            Products
                        </a>

                        <a href="#about">
                            About Us
                        </a>

                        <a href="#contact">
                            Contact
                        </a>

                    </div>


                    {/* Information */}
                    <div className="footer-column">

                        <h4>INFORMATION</h4>

                        <a href="#">
                            Privacy Policy
                        </a>

                        <a href="#">
                            Terms & Conditions
                        </a>

                        <a href="#">
                            Shipping Information
                        </a>

                        <a href="#">
                            Returns & Refunds
                        </a>

                    </div>


                    {/* Contact */}
                    <div className="footer-column">

                        <h4>CONTACT</h4>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                ✉
                            </span>

                            support@techstore.com
                        </div>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                ☎
                            </span>

                            +27 00 000 0000
                        </div>

                        <div className="footer-contact-item">
                            <span className="footer-contact-icon">
                                📍
                            </span>

                            Cape Town, South Africa
                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="footer-bottom">

                    <span>
                        © 2026 franklin ngangu . All rights reserved.
                    </span>

                    <div className="footer-bottom-right">

                        <span className="footer-status"></span>

                        Secure online shopping

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;