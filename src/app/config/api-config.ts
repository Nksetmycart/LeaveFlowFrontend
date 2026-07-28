const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (envBaseUrl || 'https://leavemanagementbackendpostgres.onrender.com').replace(/\/$/, '');
export const API_V0_BASE_URL = `${API_BASE_URL}/api/v0`;
