import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
        setSearchOpen(false);
    };

    return (
        <header className="navbar">

            <div className="nav-container">

                {/* LOGO */}

                <Link
                    to="/"
                    className="brand"
                    onClick={closeMenu}
                >

                    <div className="brand-mark">
                        R
                    </div>

                    <div className="brand-name">
                        Retail<span>Store</span>
                    </div>

                </Link>


                {/* DESKTOP / MOBILE NAVIGATION */}

                <nav
                    className={`nav-links ${menuOpen ? "nav-open" : ""
                        }`}
                >

                    <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        onClick={closeMenu}
                    >
                        Products
                    </NavLink>

                    <a
                        href="/#categories"
                        onClick={closeMenu}
                    >
                        Categories
                    </a>

                    <a
                        href="/#about"
                        onClick={closeMenu}
                    >
                        About
                    </a>

                </nav>


                {/* SEARCH */}

                <div
                    className={`nav-search ${searchOpen ? "search-active" : ""
                        }`}
                >

                    <button
                        type="button"
                        className="search-icon"
                        onClick={() =>
                            setSearchOpen(!searchOpen)
                        }
                        aria-label="Search"
                    >
                        🔍
                    </button>

                    <input
                        type="text"
                        placeholder="Search products..."
                    />

                </div>


                {/* ACTIONS */}

                <div className="nav-actions">

                    {/* WISHLIST */}

                    <button
                        type="button"
                        className="nav-icon"
                        aria-label="Wishlist"
                    >
                        ♡
                    </button>


                    {/* CART */}

                    <Link
                        to="/cart"
                        className="nav-icon cart-button"
                        aria-label="Shopping cart"
                        onClick={closeMenu}
                    >

                        🛒

                        <span className="cart-count">
                            0
                        </span>

                    </Link>


                    {/* MOBILE MENU BUTTON */}

                    <button
                        type="button"
                        className={`menu-button ${menuOpen ? "open" : ""
                            }`}
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                        aria-label={
                            menuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                        aria-expanded={menuOpen}
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;