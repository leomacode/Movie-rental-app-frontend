import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "./../config.json";
const endPoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(endPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getAdmin() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user.isAdmin;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  getAdmin
};
