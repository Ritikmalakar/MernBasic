import axios from 'axios'
export const baseUrl = axios.create({
  baseURL: "http://localhost:1212/user",
  withCredentials: true
});
export const baseUrl1 = axios.create({
  baseURL: "http://localhost:1212/todo",
  withCredentials: true
});