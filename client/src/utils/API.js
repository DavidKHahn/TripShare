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
  getUser: function(id) {
    return axios.get("/api/users/" + id)
  },
  saveUser: function(userData) {
    return axios.post("/api/user/" + userData.id)
  }
};
