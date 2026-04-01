import axiosInstance from './axiosInstance';

/**
 * Register a new user
 * @param {object} userData { username, email, password }
 */
export const register = async (userData) => {
  return await axiosInstance.post('/register', userData);
};

/**
 * Login an existing user
 * @param {object} credentials { email, password }
 */
export const login = async (credentials) => {
  return await axiosInstance.post('/login', credentials);
};

/**
 * Forgot password request
 * @param {object} data { email }
 */
export const forgotPassword = async (data) => {
  return await axiosInstance.post('/forgot-password', data);
};

/**
 * Verify email address
 * @param {object} data { token }
 */
export const verifyEmail = async (data) => {
  return await axiosInstance.post('/verify-email', data);
};

/**
 * Get the current user profile
 */
export const getUserProfile = async () => {
  return await axiosInstance.get('/user');
};

/**
 * Update the user profile
 * @param {object} userData - New user data
 */
export const updateUserProfile = async (userData) => {
  return await axiosInstance.put('/user', userData);
};
