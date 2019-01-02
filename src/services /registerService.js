import http from "./httpService";
import { apiUrl } from "./../config.json";

const endPoint = apiUrl + "/users";

export function registerUser(user) {
  return http.post(endPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
