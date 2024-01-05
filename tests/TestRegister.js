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
const url = "http://localhost:3100/register-new-account";
const data = {
  user_email: "valssu@ovl.com",
  password: "value29898",
  repeat_password: "value29898",
};

sendPostRequest(url, data).then((response) => {
  console.log(typeof response);
  console.log(response);
});
