import axiosInstance from './axiosInstance';

/**
 * Get all available videos
 */
export const getVideos = async () => {
  return await axiosInstance.get('/videos/');
};

/**
 * Get a specific video by ID
 * @param {string} id
 */
export const getVideoById = async (id) => {
  return await axiosInstance.get(`/videos/${id}`);
};

/**
 * Admin: Create a new video
 * @param {object} videoData
 */
export const createVideo = async (videoData) => {
  return await axiosInstance.post('/videos/', videoData);
};

/**
 * Admin: Update video details
 * @param {string} id
 * @param {object} videoData
 */
export const updateVideo = async (id, videoData) => {
  return await axiosInstance.put(`/videos/${id}`, videoData);
};

/**
 * Admin: Patch video title
 * @param {string} id
 * @param {object} titleData { title }
 */
export const patchVideoTitle = async (id, titleData) => {
  return await axiosInstance.patch(`/videos/${id}/title`, titleData);
};

/**
 * Admin: Toggle video availability
 * @param {string} id
 * @param {object} availabilityData { availability }
 */
export const patchVideoAvailability = async (id, availabilityData) => {
  return await axiosInstance.patch(`/videos/${id}/availability`, availabilityData);
};
