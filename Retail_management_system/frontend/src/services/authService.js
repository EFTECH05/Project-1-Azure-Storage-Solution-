// =====================================================
// AUTH API SERVICE
// =====================================================

const API_URL =
    "https://retailmanagementsystem20260813213958-geeffwavcrbrfjhc.southafricanorth-01.azurewebsites.net/api/auth";


// =====================================================
// REGISTER USER
// =====================================================

export async function registerUser(user) {

    console.log(
        "Registering user:",
        user.email
    );

    try {

        const response = await fetch(
            `${API_URL}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            }
        );


        console.log(
            "Registration response:",
            response.status
        );


        // Try to read the response

        const data = await response.json().catch(() => null);


        if (!response.ok) {

            throw new Error(
                data?.message ||
                data?.error ||
                `Registration failed. Server returned ${response.status}.`
            );
        }


        console.log(
            "Registration successful:",
            data
        );


        return data;

    } catch (error) {

        console.error(
            "REGISTRATION API ERROR:",
            error
        );

        throw new Error(
            error.message ||
            "Unable to connect to the registration server.",
            {
                cause: error
            }
        );
    }
}


// =====================================================
// LOGIN USER
// =====================================================

export async function loginUser(email, password) {

    console.log(
        "Logging in:",
        email
    );

    try {

        const response = await fetch(
            `${API_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        console.log(
            "Login response:",
            response.status
        );


        const data = await response.json().catch(() => null);


        if (!response.ok) {

            throw new Error(
                data?.message ||
                data?.error ||
                `Login failed. Server returned ${response.status}.`
            );
        }


        console.log(
            "Login successful:",
            data
        );


        return data;

    } catch (error) {

        console.error(
            "LOGIN API ERROR:",
            error
        );

        throw new Error(
            error.message ||
            "Unable to connect to the login server.",
            {
                cause: error
            }
        );
    }
}