import axiosInstance from './axiosInstance';

/**
 * React to a video (Like or Dislike)
 * @param {string} videoId
 * @param {object} reactionData { type: 'like' | 'dislike' }
 */
export const reactToVideo = async (videoId, reactionData) => {
  return await axiosInstance.post(`/videos/${videoId}/react`, reactionData);
};
