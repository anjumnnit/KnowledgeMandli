/**
 * Auth Class: Handles user authentication (Login, Signup, Logout, Token Management).
 * Uses localStorage for session persistence and communicates with the backend API.
 */
class Auth {
    /**
     * Constructor sets the base API URL.
     * @property {string} baseURL - The API endpoint for authentication.
     */
    constructor() {
        this.baseURL = "http://localhost:5000"; // Replace with actual API URL
    }

    /**
     * Logs in the user by sending credentials to the backend.
     * Stores the received authentication token in localStorage.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @returns {Promise<Object>} - Returns user data on success.
     * @throws {Error} - Throws an error if login fails.
     */
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                // Store token in localStorage for session persistence
                localStorage.setItem("token", data.token);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error; // Propagate error to be handled in UI
        }
    }

    /**
     * Signs up a new user by sending email and password to the backend.
     * @param {string} email - New user's email address.
     * @param {string} password - New user's password.
     * @returns {Promise<Object>} - Returns user data or error message.
     * @throws {Error} - Throws an error if signup fails.
     */
    async signup(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            return await response.json(); // Return API response
        } catch (error) {
            throw error; // Propagate error for handling in UI
        }
    }

    /**
     * Logs out the user by removing the stored authentication token.
     */
    logout() {
        localStorage.removeItem("token"); // Clear token from localStorage
    }

    /**
     * Retrieves the authentication token from localStorage.
     * @returns {string|null} - Returns token if exists, otherwise null.
     */
    getToken() {
        return localStorage.getItem("token");
    }

    /**
     * Checks if the user is authenticated based on the presence of a token.
     * @returns {boolean} - Returns true if a token exists, otherwise false.
     */
    isAuthenticated() {
        return !!this.getToken();
    }
}

// Export a singleton instance of the Auth class for use in components
export default new Auth();
