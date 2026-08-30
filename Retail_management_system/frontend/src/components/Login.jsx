import { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            const result = await loginUser(
                email,
                password
            );

            setMessage(
                result.message ||
                "Login successful."
            );

            // Store basic user information
            // for the current browser session.
            localStorage.setItem(
                "customerId",
                result.customerId
            );

            localStorage.setItem(
                "customerName",
                result.name
            );

            localStorage.setItem(
                "customerEmail",
                result.email
            );

            // Clear password
            setPassword("");

        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );

            setError(
                error.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <section
            id="login"
            className="auth-section"
        >

            <div className="auth-container">

                <h2>
                    Login
                </h2>

                <p>
                    Login to your RetailStore account.
                </p>


                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Login;