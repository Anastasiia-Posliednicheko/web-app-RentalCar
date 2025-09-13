import axios from "axios";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  timeout: 10000,
});