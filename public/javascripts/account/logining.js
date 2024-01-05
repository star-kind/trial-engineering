let tokenInformationName = "token";
let accountCookieName = "account_designation";

window.onload = function () {
  let cookie = getCookie(accountCookieName);
  endowMailVal(cookie);
};

function endowMailVal(params) {
  if (params != null || params != undefined || params != "") {
    let element = document.getElementById("id-email");
    element.value = params;
  }
}

function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      let result = cookie.substring(name.length + 1, cookie.length);
      console.info("result", result);
      return result;
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      sendLogining();
    });
  } else {
    console.error("Element with ID 'login-btn' not found.");
  }
});

function handleKeyPress(event) {
  // 判断按下的键是否为回车键的键码（Enter 键的键码为 13）
  if (event.keyCode === 13) {
    // 在这里执行您想要触发的函数或逻辑
    sendLogining(); // 调用您的函数
  }
}

function sendLogining() {
  // 获取表单中所有的input标签
  let inputs = document.querySelectorAll("#login-form input");
  let jsonData = {}; // 初始化jsonData对象
  let TARGET_URL = "/account-logining";

  // 遍历input标签，将name作为key，value作为value存入jsonData中
  inputs.forEach(function (input) {
    jsonData[input.name] = input.value;
  });

  // 使用fetch API发送POST请求
  fetch(TARGET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData), // 将jsonData转为JSON字符串发送
  })
    .then((response) => {
      console.info(response);
      return response.json();
    }) // 解析响应为JSON
    .then((data) => {
      console.log(data);
      dispose(data);
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function dispose(data) {
  if (data.state === 200) {
    followUp("Login successful, going to the navigation page soon");
    localStorage.setItem(tokenInformationName, data.token);
    setTimeout(destination, 1000 * 3);
  } else {
    followUp(data.message);
  }
}

function followUp(params) {
  // 获取具有类名为 'xxx' 的段落元素
  let hintParagraph = document.querySelector(".msg-p-word");
  // 设置段落元素的文字内容
  hintParagraph.textContent = params;
}

function destination(token) {
  window.location.assign("/links-router");
}
