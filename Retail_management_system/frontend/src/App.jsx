
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Footer from "./components/Footer";


function Home() {

    return (
        <>

            {/* =====================================================
                HOME
            ===================================================== */}

            <section id="home">

                <div className="hero">

                    <h1>
                        Welcome to RetailStore
                    </h1>

                    <p>
                        Discover quality products at great prices.
                    </p>

                </div>

            </section>


            {/* =====================================================
                PRODUCTS
            ===================================================== */}

            <Products />


            {/* =====================================================
                ABOUT
            ===================================================== */}

            <About />


            {/* =====================================================
                CONTACT
            ===================================================== */}

            <section
                id="contact"
                className="contact-section"
            >

                <div className="contact-container">

                    {/* =================================================
                        CONTACT HEADER
                    ================================================= */}

                    <div className="contact-header">

                        <span className="section-label">
                            GET IN TOUCH
                        </span>

                        <h2>
                            Contact Us
                        </h2>

                        <p>
                            Have a question, need help, or want to
                            learn more about our products?
                            Our team is here to help.
                        </p>

                    </div>


                    {/* =================================================
                        CONTACT CONTENT
                    ================================================= */}

                    <div className="contact-content">


                        {/* =================================================
                            CONTACT INFORMATION
                        ================================================= */}

                        <div className="contact-info">

                            <h3>
                                Let's talk
                            </h3>

                            <p className="contact-description">
                                We would love to hear from you.
                                Send us a message and our team
                                will get back to you as soon as possible.
                            </p>


                            {/* EMAIL */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    ✉
                                </div>

                                <div>

                                    <h4>
                                        Email
                                    </h4>

                                    <p>
                                        support@retailstore.com
                                    </p>

                                </div>

                            </div>


                            {/* PHONE */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    ☎
                                </div>

                                <div>

                                    <h4>
                                        Phone
                                    </h4>

                                    <p>
                                        +27 00 000 0000
                                    </p>

                                </div>

                            </div>


                            {/* LOCATION */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    📍
                                </div>

                                <div>

                                    <h4>
                                        Location
                                    </h4>

                                    <p>
                                        Cape Town, South Africa
                                    </p>

                                </div>

                            </div>


                            {/* BUSINESS HOURS */}

                            <div className="contact-info-item">

                                <div className="contact-icon">
                                    🕒
                                </div>

                                <div>

                                    <h4>
                                        Business Hours
                                    </h4>

                                    <p>
                                        Monday – Friday
                                    </p>

                                    <p>
                                        08:00 – 17:00
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            CONTACT FORM
                        ================================================= */}

                        <div className="contact-form-container">

                            <h3>
                                Send us a message
                            </h3>

                            <p>
                                Fill in the form below and we'll
                                get back to you.
                            </p>


                            <form
                                className="contact-form"
                                onSubmit={(event) => {
                                    event.preventDefault();

                                    alert(
                                        "Thank you! Your message has been received."
                                    );
                                }}
                            >

                                {/* NAME */}

                                <div className="form-group">

                                    <label htmlFor="contact-name">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        required
                                    />

                                </div>


                                {/* EMAIL */}

                                <div className="form-group">

                                    <label htmlFor="contact-email">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        required
                                    />

                                </div>


                                {/* SUBJECT */}

                                <div className="form-group">

                                    <label htmlFor="contact-subject">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        id="contact-subject"
                                        name="subject"
                                        placeholder="What can we help you with?"
                                        required
                                    />

                                </div>


                                {/* MESSAGE */}

                                <div className="form-group">

                                    <label htmlFor="contact-message">
                                        Message
                                    </label>

                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        rows="6"
                                        placeholder="Write your message here..."
                                        required
                                    ></textarea>

                                </div>


                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    className="contact-submit-button"
                                >
                                    Send Message
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </>
    );
}


function App() {

    return (

        <BrowserRouter>

            {/* =====================================================
                HEADER
            ===================================================== */}

            <Header />


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <main>

                <Routes>

                    {/* =================================================
                        HOME
                    ================================================= */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    <Route
                        path="/products"
                        element={<Products />}
                    />


                    {/* =================================================
                        LOGIN
                    ================================================= */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Routes>

            </main>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </BrowserRouter>
    );
}


export default App;


