import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateUser(data) {
    return service
      .patch("/api/users/me", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeItem(itemId) {
    return service
      .delete(`/api/items/${itemId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateItem(itemId, data) {
    return service
      .patch(`/api/items/${itemId}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserItems() {
    return service
      .get("/api/users/me/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addItem(data) {
    return service
      .post("/api/items", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
