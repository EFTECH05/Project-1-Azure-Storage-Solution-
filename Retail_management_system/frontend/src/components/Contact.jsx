
function Contact() {

    return (

        <section
            className="contact-section"
            id="contact"
        >

            {/* =====================================================
                CONTACT HEADER
            ===================================================== */}

            <div className="contact-header">

                <span className="contact-label">
                    GET IN TOUCH
                </span>

                <h2>
                    Contact Us
                </h2>

                <p>
                    Have a question, need help, or want to learn
                    more about our products? We would love to hear
                    from you.
                </p>

            </div>


            {/* =====================================================
                CONTACT CONTENT
            ===================================================== */}

            <div className="contact-container">


                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <div className="contact-information">

                    <h3>
                        Let's talk
                    </h3>

                    <p className="contact-description">
                        Our team is here to help you with your
                        questions, orders, products, and any other
                        information you may need.
                    </p>


                    {/* EMAIL */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            ✉
                        </div>

                        <div>

                            <span>
                                Email
                            </span>

                            <a
                                href="mailto:support@retailstore.com"
                            >
                                support@retailstore.com
                            </a>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            ☎
                        </div>

                        <div>

                            <span>
                                Phone
                            </span>

                            <a
                                href="tel:+27000000000"
                            >
                                +27 00 000 0000
                            </a>

                        </div>

                    </div>


                    {/* LOCATION */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            📍
                        </div>

                        <div>

                            <span>
                                Location
                            </span>

                            <p>
                                South Africa
                            </p>

                        </div>

                    </div>


                    {/* BUSINESS HOURS */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            🕒
                        </div>

                        <div>

                            <span>
                                Business Hours
                            </span>

                            <p>
                                Monday - Friday
                                <br />
                                08:00 - 17:00
                            </p>

                        </div>

                    </div>


                    {/* SOCIAL */}

                    <div className="contact-social">

                        <span>
                            Follow us
                        </span>

                        <div className="social-links">

                            <a
                                href="#"
                                aria-label="Facebook"
                            >
                                f
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                            >
                                ◎
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                            >
                                𝕏
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CONTACT FORM
                ================================================= */}

                <div className="contact-form-container">

                    <form className="contact-form">

                        <div className="form-row">

                            {/* NAME */}

                            <div className="form-group">

                                <label htmlFor="name">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>

                        </div>


                        {/* PHONE */}

                        <div className="form-group">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                            />

                        </div>


                        {/* SUBJECT */}

                        <div className="form-group">

                            <label htmlFor="subject">
                                Subject
                            </label>

                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="What can we help you with?"
                                required
                            />

                        </div>


                        {/* MESSAGE */}

                        <div className="form-group">

                            <label htmlFor="message">
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder="Write your message here..."
                                required
                            ></textarea>

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="contact-submit"
                        >

                            Send Message

                            <span>
                                →
                            </span>

                        </button>

                    </form>

                </div>

            </div>

        </section>

    );

}


export default Contact;

