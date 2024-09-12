import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "c8520de119a3e3d38632d0a0c4e0f424",
    language: "ko-KR"
  }
});

export default instance;