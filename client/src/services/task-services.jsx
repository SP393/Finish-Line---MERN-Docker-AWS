import axios from "axios";
const apiUrl = "http://54.173.186.1:8000/tracktask";
axios.defaults.withCredentials = true;

// Assignment Requests

export function getUsers() {
  console.log("call api");
  try {
    const data = axios.get(apiUrl + "/user/find");
    console.log("data is", data);
    return data;
  } catch (error) {
    return error;
  }
}

export function findUser(userId) {
  console.log("call api");
  const data = axios.get(apiUrl + "/user/find/" + userId);
  console.log("data is", data);
  return data;
}

export function addUser(user) {
  console.log("call api");
  return axios.post(apiUrl + "/user/create", user);
}

export function loginUser(user) {
  console.log("call user api");
  return axios.post(apiUrl + "/user/login", user);
}
export function getUser() {
  console.log("call user api");
  return axios.get(apiUrl + "/user/profile");
}
export function logoutUser() {
  console.log("call user api");
  return axios.post(apiUrl + "/user/logout");
}

export function getAssignment(userId) {
  console.log("call api");
  const data = axios.get(apiUrl + "/assignment/find/" + userId);
  console.log("data is", data);
  return data;
}

export function findAssignment(title) {
  console.log("call api");
  const data = axios.get(apiUrl + "/assignment/find/" + title);
  console.log("data is", data);
  return data;
}

export function addAssignment(task) {
  return axios.post(apiUrl + "/assignment/create", task);
}

export function updateAssignment(userId, title, task) {
  console.log("update api");

  return axios.put(apiUrl + `/assignment/update/${userId}/${title}`, task);
}

export function deleteAssignment(userId, title) {
  return axios.delete(apiUrl + "/assignment/delete/" + userId + "/" + title);
}

// Project Requests

export function getProject(userId) {
  console.log("call api");
  const data = axios.get(apiUrl + "/project/find/" + userId);
  console.log("data is", data);
  return data;
}

export function addProject(task) {
  return axios.post(apiUrl + "/project/create", task);
}

export function updateProject(userId, title, task) {
  return axios.put(apiUrl + `/project/update/${userId}/${title}`, task);
}

export function deleteProject(userId, title) {
  return axios.delete(apiUrl + "/project/delete/" + userId + "/" + title);
}

// Test Requests

export function getTest(userId) {
  console.log("call api");
  const data = axios.get(apiUrl + "/test/find/" + userId);
  console.log("data is", data);
  return data;
}

export function addTest(task) {
  return axios.post(apiUrl + "/test/create", task);
}

export function updateTest(userId, title, task) {
  return axios.put(apiUrl + `/test/update/${userId}/${title}`, task);
}

export function deleteTest(userId, title) {
  return axios.delete(apiUrl + "/test/delete/" + userId + "/" + title);
}
