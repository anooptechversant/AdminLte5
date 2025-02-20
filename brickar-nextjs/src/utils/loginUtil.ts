// Define the structure of the authentication response
interface AuthData {
  access_token: string;
  refresh_token?: string;
  user_name?: string;
}

// Save user information after logging in
const saveUserInfo = (data: AuthData): void => {
  localStorage.setItem('userInfo', data.access_token);
  if (data.refresh_token)
    localStorage.setItem('refreshToken', data.refresh_token);
  if (data.user_name) localStorage.setItem('user_name', data.user_name);
};

// Save new access token after refreshing
const saveAccessToken = (data: Pick<AuthData, 'access_token'>): void => {
  localStorage.setItem('userInfo', data.access_token);
};

// Remove user information on logout
const removeUserInfo = (): void => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user_name');
};

// Check if the user is logged in
const isLoggedIn = (): boolean => {
  try {
    return !!localStorage.getItem('userInfo');
  } catch {
    return false;
  }
};

export { removeUserInfo, isLoggedIn, saveAccessToken };
export default saveUserInfo;
