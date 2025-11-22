import { apiRequest, setAuthToken, removeAuthToken, setUser, removeUser } from '../config/api';
import type { User } from '../types';

export interface AuthResponse {
  uid: string;
  email: string;
  displayName?: string;
  token: string;
}

export const registerUser = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResponse> => {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, displayName }),
  });

  const data = await response.json();
  setAuthToken(data.token);
  setUser({
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
  });

  return {
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
    token: data.token,
  };
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  setAuthToken(data.token);
  setUser({
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
  });

  return {
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
    token: data.token,
  };
};

export const logoutUser = async (): Promise<void> => {
  removeAuthToken();
  removeUser();
};

export const getUserProfile = async (uid: string): Promise<User | null> => {
  try {
    const response = await apiRequest(`/auth/profile/${uid}`);
    const data = await response.json();
    return {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      createdAt: new Date(data.createdAt),
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
