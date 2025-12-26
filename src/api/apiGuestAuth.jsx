// Guest Authentication API Service
// This file handles all guest authentication endpoints as per the API documentation

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Get the stored authentication token
 * @returns {string|null}
 */
export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Store the authentication token
 * @param {string} token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Remove the authentication token
 */
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Get authorization headers with token
 * @returns {Object}
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

/**
 * Handle API response and extract error messages
 * @param {Response} response
 * @returns {Promise<Object>}
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    // Extract error messages from validation errors
    let errorMessage = data.message || 'An error occurred';
    
    if (data.errors) {
      // Format validation errors
      const errorMessages = Object.entries(data.errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
        .join('\n');
      errorMessage = errorMessages || errorMessage;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
};

/**
 * Guest Signup
 * Register a new guest account (immediate signup, no OTP verification required)
 * 
 * @param {Object} signupData
 * @param {string} signupData.name - Full name
 * @param {string} signupData.email - Email address
 * @param {string} signupData.password - Password (min 8 characters)
 * @param {string} signupData.password_confirmation - Password confirmation
 * @param {string} [signupData.phone] - Phone number (optional)
 * @returns {Promise<Object>} User data and token
 */
export const guestSignup = async ({ name, email, password, password_confirmation, phone = null }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
        ...(phone && { phone }),
      }),
    });

    const data = await handleResponse(response);

    if (data.data && data.data.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    console.error('Guest signup error:', error);
    throw error;
  }
};

/**
 * Guest Signin (Email/Password)
 * Sign in using email and password
 * 
 * @param {string} email - Email address
 * @param {string} password - Password
 * @returns {Promise<Object>} User data and token
 */
export const guestSigninWithEmail = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    if (data.data && data.data.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    console.error('Guest signin error:', error);
    throw error;
  }
};

/**
 * Guest Signin (Phone/Password)
 * Sign in using phone number and password
 * 
 * @param {string} phone - Phone number
 * @param {string} password - Password
 * @returns {Promise<Object>} User data and token
 */
export const guestSigninWithPhone = async (phone, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    });

    const data = await handleResponse(response);

    if (data.data && data.data.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    console.error('Guest signin with phone error:', error);
    throw error;
  }
};

/**
 * Guest Signin (Phone/OTP) - Step 1: Request OTP
 * Request an OTP code to be sent to the phone number
 * 
 * @param {string} phone - Phone number
 * @returns {Promise<Object>} OTP response with expires_at and code (dev only)
 */
export const guestRequestOtp = async (phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Request OTP error:', error);
    throw error;
  }
};

/**
 * Guest Signin (Phone/OTP) - Step 2: Verify OTP
 * Verify the OTP code and complete the login
 * 
 * @param {string} phone - Phone number
 * @param {string} otp - OTP code (4 digits)
 * @returns {Promise<Object>} User data and token
 */
export const guestVerifyOtp = async (phone, otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/guest/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await handleResponse(response);

    if (data.data && data.data.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    console.error('Verify OTP error:', error);
    throw error;
  }
};

/**
 * Get Authenticated User
 * Get the currently authenticated guest user information
 * 
 * @returns {Promise<Object>} User data
 */
export const getAuthenticatedUser = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Get authenticated user error:', error);
    throw error;
  }
};

/**
 * Logout
 * Logout the currently authenticated guest user
 * 
 * @returns {Promise<Object>} Logout response
 */
export const guestLogout = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      return { message: 'Already logged out' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    removeAuthToken();
    return data;
  } catch (error) {
    // Even if logout fails on server, remove token locally
    removeAuthToken();
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Complete Guest Authentication Class
 * Provides a convenient interface for all guest authentication operations
 */
export class GuestAuth {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/guest`;
  }

  /**
   * Signup
   */
  async signup(name, email, password, phone = null) {
    return await guestSignup({
      name,
      email,
      password,
      password_confirmation: password,
      phone,
    });
  }

  /**
   * Login with email/password
   */
  async loginWithEmail(email, password) {
    return await guestSigninWithEmail(email, password);
  }

  /**
   * Login with phone/password
   */
  async loginWithPhone(phone, password) {
    return await guestSigninWithPhone(phone, password);
  }

  /**
   * Request OTP
   */
  async requestOtp(phone) {
    return await guestRequestOtp(phone);
  }

  /**
   * Verify OTP and login
   */
  async verifyOtp(phone, otp) {
    return await guestVerifyOtp(phone, otp);
  }

  /**
   * Get current user
   */
  async getCurrentUser() {
    return await getAuthenticatedUser();
  }

  /**
   * Logout
   */
  async logout() {
    return await guestLogout();
  }

  /**
   * Check if authenticated
   */
  isAuthenticated() {
    return isAuthenticated();
  }
}

export default {
  guestSignup,
  guestSigninWithEmail,
  guestSigninWithPhone,
  guestRequestOtp,
  guestVerifyOtp,
  getAuthenticatedUser,
  guestLogout,
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  GuestAuth,
};

