import React, { useState } from "react";
import Auth from "../Auth/Auth"; // Import Auth class for authentication
import "./Signup.css"; // Import corresponding CSS file for styling

/**
 * Signup Component - Handles user registration.
 * Uses React state for form input handling and integrates with Auth class.
 */
const Signup = () => {
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
     * Handles form submission for user signup.
     * Calls the Auth.signup() method and provides user details.
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt to register the user
            await Auth.signup(formData.email, formData.password);
            alert("Signup successful! Please login."); // Success message
        } catch (err) {
            setError(err.message); // Handle errors (e.g., email already exists)
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
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
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
