import axios from "axios";

export default {
  // Gets all cities
  getCities: function() {
    return axios.get("/api/cities");
  },
  // Gets the city with the given id
  getCity: function(id) {
    return axios.get("/api/cities/" + id);
  },
  // Deletes the city with the given id
  deleteCity: function(id) {
    return axios.delete("/api/cities/" + id);
  },
  // Saves a city to the database
  saveCity: function(cityData) {
    return axios.post("/api/create", cityData);
  },
  getUser: function(token) {
    return axios.get("/api/users/" + token)
  },
  saveUser: function(userData) {
    return axios.post("/api/user", userData)
  },
  saveDetails: function(formData) {
      return axios.put("/save", formData);
  },
  getUserData: function(id) {
    return axios.get("/userdata/" + id)
  },
  updateUserToken: function(userData) {
    return axios.put("/api/user", userData)
  },
  getUsers: function() {
    return axios.get("/api/users")
  },
  deletePlace: function(id) {
    return axios.put("/api/place/", id)
  },
  getUserByName: function(name) {
    return axios.get("/api/userdata/" + name)
  },
  getCurrentUser: function(token) {
    return axios.get("/api/user/" + token)
  },
  deleteCity: function(id) {
    return axios.put("/api/city/", id)
  }
};