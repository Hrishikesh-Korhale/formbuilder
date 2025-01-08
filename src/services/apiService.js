const API_URL = 'https://form-builder-backend-git-master-hrishikesh-korhales-projects.vercel.app';

const apiService = {
  // Get all forms
  getForms: async () => {
    const response = await fetch(`${API_URL}/api/forms`);
    if (!response.ok) {
      throw new Error(`Error fetching forms: ${response.statusText}`);
    }
    return response.json();
  },

  // Get a specific form by ID
  getFormById: async (id) => {
    const response = await fetch(`${API_URL}/api/forms/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching form with ID ${id}: ${response.statusText}`);
    }
    return response.json();
  },

  // Create a new form
  createForm: async (form) => {
    const response = await fetch(`${API_URL}/api/forms/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      throw new Error(`Error creating form: ${response.statusText}`);
    }
    return response.json();
  },

  // update a form by ID
  updateFormById: async (id, updatedForm) => {
    const response = await fetch(`${API_URL}/api/forms/${id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedForm),
    });
    if (!response.ok) {
      throw new Error(`Error updating form with ID ${id}: ${response.statusText}`);
    }
    return response.json();
  },

  // Delete a form by ID
  deleteFormById: async (id) => {
    const response = await fetch(`${API_URL}/api/forms/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting form with ID ${id}: ${response.statusText}`);
    }
    return response.json();
  },
};

export default apiService;
