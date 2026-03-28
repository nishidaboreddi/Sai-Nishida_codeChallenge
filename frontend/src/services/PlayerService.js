import axios from 'axios';

const API_URL = 'http://localhost:8080/api/players';

const PlayerService = {
  getAllPlayers: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch players');
    }
  },

  getPlayerById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Player not found');
    }
  },

  createPlayer: async (player) => {
    try {
      const response = await axios.post(API_URL, player);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create player');
    }
  },

  updatePlayer: async (id, player) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, player);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update player');
    }
  },

  deletePlayer: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete player');
    }
  },

  getPlayersByMatchesAsc: async () => {
    try {
      const response = await axios.get(`${API_URL}/matches-asc`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch sorted players');
    }
  },
};

export default PlayerService;
