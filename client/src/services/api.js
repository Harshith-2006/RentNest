import axios from "axios";


const API = "https://rentnest-fako.onrender.com";


// ======================
// GET ALL HOUSES
// ======================

export const fetchProperties = async () => {

  const response = await axios.get(
    `${API}/house`
  );

  return response.data;

};


// ======================
// GET SINGLE HOUSE
// ======================

export const fetchHouse = async (id) => {

  const response = await axios.get(
    `${API}/house/${id}`
  );

  return response.data;

};


// ======================
// OWNER DASHBOARD
// ======================

export const fetchOwnerDashboard = async () => {

  const token =
    localStorage.getItem("token");

  const dashboard =
    await axios.get(
      `${API}/owner/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const requests =
    await axios.get(
      `${API}/request/owner`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  const houses =
    await axios.get(
      `${API}/house/owner`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  return {
    ...dashboard.data,
    requests: requests.data,
    houses: houses.data,
  };

};


// ======================
// RENT REQUEST
// ======================

export const submitRentalRequest = async (
  houseId
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API}/request/send/${houseId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// FAVORITES
// ======================

export const getFavorites = async () => {

  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API}/favorite`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


export const addFavorite = async (
  houseId
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API}/favorite/add/${houseId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


export const removeFavorite = async (
  id
) => {

  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/favorite/remove/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};
// ======================
// USER DASHBOARD
// ======================

export const fetchUserDashboard = async () => {

  const token =
    localStorage.getItem("token");

  const favorites =
    await axios.get(
      `${API}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  return {
    favorites: favorites.data
  };

};
// ======================
// ADMIN DASHBOARD
// ======================

export const fetchAdminDashboard = async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.get(
      `${API}/admin/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  return response.data;

};
// ======================
// ADMIN - ALL HOUSES
// ======================

export const fetchAdminHouses = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/admin/houses`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// DELETE HOUSE
// ======================

export const deleteHouse = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/admin/house/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// ADMIN REQUESTS
// ======================

export const fetchAdminRequests = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/admin/requests`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// ADMIN REPORTS
// ======================

export const fetchAdminReports = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/admin/reports`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// DELETE REPORT
// ======================

export const deleteReport = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API}/admin/report/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};
// ======================
// ADMIN - GET USERS
// ======================

export const fetchAdminUsers = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API}/admin/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// BLOCK USER
// ======================

export const blockUser = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/admin/block/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};


// ======================
// UNBLOCK USER
// ======================

export const unblockUser = async (id) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API}/admin/unblock/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;

};
