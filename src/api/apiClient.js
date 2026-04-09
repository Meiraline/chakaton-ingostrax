const API_BASE_URL = 'http://109.174.15.54:22241/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getHeaders(isFormUrlencoded = false) {
    const headers = {};
    
    if (isFormUrlencoded) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async handleResponse(response) {
    const text = await response.text();
    let data;

    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      data = { message: text };
    }

    if (!response.ok) {
      const error = new Error(data.message || data.error || 'API Error');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  async get(endpoint) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('[API GET]', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
      mode: 'cors',
    });

    return this.handleResponse(response);
  }

  async post(endpoint, payload, isFormUrlencoded = false) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('[API POST]', url);
    let body;
    if (isFormUrlencoded) {
      body = new URLSearchParams();
      Object.keys(payload).forEach(key => {
        body.append(key, payload[key]);
      });
    } else {
      body = JSON.stringify(payload);
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(isFormUrlencoded),
      body,
      mode: 'cors',
    });

    return this.handleResponse(response);
  }

  async delete(endpoint) {
    const url = `${this.baseURL}${endpoint}`;
    console.log('[API DELETE]', url);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
      mode: 'cors',
    });

    return this.handleResponse(response);
  }
}

export default new ApiClient();
