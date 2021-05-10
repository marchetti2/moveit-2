import axios from "axios";

const api = axios.create({
  baseURL: "https://moveit-2-five.vercel.app/api",
});

export { api };
