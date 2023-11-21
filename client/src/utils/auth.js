import decode from "jwt-decode";

class AuthService {
  // Retrieves the decoded JWT token from local storage
  getProfile() {
    return decode(this.getToken());
  }

  // Checks if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  // Checks if the token has expired
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  // Retrieves the token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Sets the token to local storage and reloads the page to home
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Removes the token from local storage and reloads the page
  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }

  // Retrieves the user ID from the decoded token
  getUserId() {
    const token = this.getToken();
    if (token) {
      const decoded = decode(token);
      return decoded.userId; // Adjust this field name based on your JWT token structure
    }
    return null;
  }
}

export default new AuthService();
