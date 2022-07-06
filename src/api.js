const axios = require("axios");

const fetchUsers = () => {
  return axios.get("/api/users");
};

const fetchUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

const fetchUserThings = (userId) => {
  return axios.get(`/api/users/${userId}/things`);
};

const addUser = (user) => {
  const response = axios.post("/api/users", user);
  return response.data;
};

const deleteUser = (user) => {
  return axios.delete(`/api/users/${user.id}`);
};

const updateUser = (user, params) => {
  return axios.put(`/api/users/${user.id}`, params);
};

const deleteUserThing = (userId, thingId) => {
  return axios.put(`/api/users/${userId}/things/${thingId}`);
};

const fetchThings = () => {
  return axios.get(`/api/things`);
};

const fetchUnownedThings = () => {
  return axios.get(`/api/things/unowned`);
};

const deleteThing = (thing) => {
  return axios.delete(`/api/things/${thing.id}`);
};

const addThing = (thing) => {
  const response = axios.post("/api/things", thing);
  return response.data;
};

const updateThing = (thing, params) => {
  return axios.put(`/api/things/${thing.id}`, params);
};

const fetchThingUser = (thingId) => {
  return axios.get(`/api/things/${thingId}/users`);
};

export {
  fetchUsers,
  fetchUser,
  fetchUserThings,
  addUser,
  deleteUser,
  updateUser,
  deleteUserThing,
  fetchThings,
  deleteThing,
  addThing,
  updateThing,
  fetchThingUser,
  fetchUnownedThings,
};
