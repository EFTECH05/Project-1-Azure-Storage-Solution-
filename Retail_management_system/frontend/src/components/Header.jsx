function Header() {
    return (
        <header className="header">

            <div className="header-container">

                {/* Logo */}
                <a href="#home" className="logo">

                    <div className="logo-icon">
                        ABC
                    </div>

                    <div className="logo-name">
                        Retail<span>Store</span>
                    </div>

                </a>


                {/* Navigation */}
                <nav className="navigation">

                    <a href="#home" className="active">
                        Home
                    </a>

                    <a href="#products">
                        Products
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <a href="#contact">
                        Contact
                    </a>

                </nav>


                {/* Actions */}
                <div className="header-actions">

                    <a href="#login" className="login-button">
                        Login
                    </a>

                    <a href="#register" className="register-button">
                        Register
                    </a>

                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span>Cart</span>
                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;