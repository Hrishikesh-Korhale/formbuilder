const API_URL = 'http://localhost:5000/api';

const apiService = {
  getForms: async () => {
    const response = await fetch(`${API_URL}/forms`);
    return response.json();
  },
  createForm: async (form) => {
    await fetch(`${API_URL}/forms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  },
};

export default apiService;
