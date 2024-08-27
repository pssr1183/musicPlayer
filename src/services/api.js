// src/services/api.js
import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items/songs'; // Replace with your actual API endpoint

export const fetchSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Assuming your API response has this structure
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
