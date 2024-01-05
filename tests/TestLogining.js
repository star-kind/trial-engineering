const axios = require("axios");

async function sendPostRequest(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 使用示例
const url = "http://localhost:3100/account-logining";
const data = {
  email: "val@iov.com",
  password: "9966value29898",
};

sendPostRequest(url, data).then((response) => {
  console.log(typeof response);
  console.log(response);
});
