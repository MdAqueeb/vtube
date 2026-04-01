import axiosInstance from './axiosInstance';

/**
 * Add a comment to a video
 * @param {string} videoId
 * @param {object} commentData { content }
 */
export const addComment = async (videoId, commentData) => {
  return await axiosInstance.post(`/videos/${videoId}/comments`, commentData);
};

/**
 * Get all comments for a specific video
 * @param {string} videoId
 */
export const getCommentsByVideoId = async (videoId) => {
  return await axiosInstance.get(`/videos/${videoId}/comments`);
};
