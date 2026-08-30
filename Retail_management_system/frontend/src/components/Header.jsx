import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {

    const location = useLocation();
    const navigate = useNavigate();


    // =====================================================
    // GO TO ABOUT
    // =====================================================

    const handleAboutClick = (event) => {

        event.preventDefault();

        if (location.pathname !== "/") {

            navigate("/");

            // Wait for Home page to render
            setTimeout(() => {

                const section =
                    document.getElementById("about");

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }

            }, 100);

        } else {

            const section =
                document.getElementById("about");

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }
        }
    };


    // =====================================================
    // GO TO CONTACT
    // =====================================================

    const handleContactClick = (event) => {

        event.preventDefault();

        if (location.pathname !== "/") {

            navigate("/");

            // Wait for Home page to render
            setTimeout(() => {

                const section =
                    document.getElementById("contact");

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }, 100);

        } else {

            const section =
                document.getElementById("contact");

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });

            }
        }
    };


    return (
        <header className="header">

            <div className="header-container">


                {/* =====================================================
                    LOGO
                ===================================================== */}

                <Link
                    to="/"
                    className="logo"
                >

                    <div className="logo-icon">
                        ABC
                    </div>

                    <div className="logo-name">
                        Retail<span>Store</span>
                    </div>

                </Link>


                {/* =====================================================
                    NAVIGATION
                ===================================================== */}

                <nav className="navigation">

                    <Link to="/">
                        Home
                    </Link>


                    <Link to="/products">
                        Products
                    </Link>


                    <a
                        href="#about"
                        onClick={handleAboutClick}
                    >
                        About
                    </a>


                    <a
                        href="#contact"
                        onClick={handleContactClick}
                    >
                        Contact
                    </a>

                </nav>


                {/* =====================================================
                    ACTIONS
                ===================================================== */}

                <div className="header-actions">


                    {/* LOGIN */}

                    <Link
                        to="/login"
                        className="login-button"
                    >
                        Login
                    </Link>


                    {/* REGISTER */}

                    <Link
                        to="/register"
                        className="register-button"
                    >
                        Register
                    </Link>


                    {/* CART */}

                    <button
                        type="button"
                        className="cart-button"
                        onClick={() => {
                            alert("Cart coming soon.");
                        }}
                    >

                        <span className="cart-icon">
                            🛒
                        </span>

                        <span>
                            Cart
                        </span>

                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;