import React, { useState } from "react";
import Auth from "../Auth/Auth"; // Import Auth class for authentication
import "./Login.css"; // Import corresponding CSS file for styling

/**
 * Login Component - Handles user login functionality.
 * Uses React state for form handling and integrates with Auth class.
 */
const Login = () => {
    // State to manage form input values
    const [formData, setFormData] = useState({ email: "", password: "" });

    // State to manage error messages
    const [error, setError] = useState("");

    /**
     * Handles input changes and updates state.
     * @param {Event} e - The change event from input fields.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Handles form submission for user login.
     * Calls the Auth.login() method and stores the user session.
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt to log in with provided credentials
            const user = await Auth.login(formData.email, formData.password);
            alert(`Welcome, ${user.name}!`); // Display success message
        } catch (err) {
            setError(err.message); // Handle errors (e.g., incorrect credentials)
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

export default Login;
