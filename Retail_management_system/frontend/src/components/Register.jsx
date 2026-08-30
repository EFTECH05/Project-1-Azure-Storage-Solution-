import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =====================================================
    // HANDLE INPUT CHANGES
    // =====================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
    };


    // =====================================================
    // REGISTER
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const result = await registerUser(form);

            setMessage(
                result.message || "Registration successful."
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                address: "",
                password: ""
            });

        } catch (error) {

            console.error(
                "REGISTRATION ERROR:",
                error
            );

            setError(
                error.message ||
                "Registration failed."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
        <section
            id="register"
            className="auth-section"
        >

            <div className="auth-container">

                <h2>
                    Create Account
                </h2>

                <p>
                    Register to start shopping.
                </p>


                {/* SUCCESS MESSAGE */}

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}


                {/* ERROR MESSAGE */}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* REGISTER FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />


                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                    />


                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        minLength={6}
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Register;