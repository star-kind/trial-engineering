const axios = require("axios");

async function sendPostRequest(url, data) {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiZHZjb0B1b2wuY29tIiwiZXhwIjoxNzAzNjAwMjY4LCJpYXQiOjE3MDM1NzE0Njh9.ldW02dGqzCvLe1Y9BKvC2DG7aW4A9mkgUN0-psUXYtw";
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 使用示例
const url = "http://localhost:3100/journals-pagin-list";
const data = {
  pageOrder: "val@iov.com",
};

sendPostRequest(url, data)
  .then((response) => {
    console.log(response);
    return response;
  })
  .then((data) => {
    console.log(data);
    console.log(data.pagination._pagedData);
  });
