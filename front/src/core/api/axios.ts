import axios from 'axios'

export const getApi = (contenType: string = "application/json") =>
  axios.create({
    baseURL: "http://localhost:9000",
    headers: {
      "Content-Type": contenType,
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
