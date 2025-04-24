import axios from "axios";

// bütün endpoint 'lerim json döndürüyor
export default axios.create({
  baseURL: "http://localhost:8083/api/",
});
