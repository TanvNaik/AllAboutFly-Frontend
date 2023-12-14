import { API } from "../../backend";
export const getUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`,{
    method:"GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  }).then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
}
export const getUserOrders = (userId) => {
  return fetch(`${API}/orders/${userId}`,{
    method:"GET"
  }).then((res) => {
    return res.json();
  })
  .catch((err) => {
    console.log(err);
  });
}


