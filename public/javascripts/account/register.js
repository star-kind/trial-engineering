let userCookieName = "account_designation";
let expiredDayTime = 1;
let userNameEleKey = "user_email";
let followUpHintEle = ".msg-p-word";

function handleKeyPress(event) {
  // 判断按下的键是否为回车键的键码（Enter 键的键码为 13）
  if (event.keyCode === 13) {
    sendRegister(); // 调用您的函数
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      sendRegister();
    });
  } else {
    console.error("Element with ID 'register-btn' not found.");
  }
});

function sendRegister() {
  // 获取表单中所有的input标签
  let inputs = document.querySelectorAll("#register-form input");
  let jsonData = {}; // 初始化jsonData对象
  let TARGET_URL = "/account-register-new-account";

  // 遍历input标签，将name作为key，value作为value存入jsonData中
  inputs.forEach(function (input) {
    jsonData[input.name] = input.value.trim();
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
    })
    .then((data) => {
      console.log(data);
      setCookie(
        data.state,
        userCookieName,
        jsonData[userNameEleKey],
        expiredDayTime
      );
      dispose(data);
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function dispose(response) {
  console.log(response);
  if (response.state === 200) {
    followUp("Registration successful, going to the login page soon");
    setTimeout(destination, 1000 * 3);
  } else {
    followUp(response.message);
  }
}

function followUp(params) {
  // 获取具有类名为 'xxx' 的段落元素
  let hintParagraph = document.querySelector(followUpHintEle);
  // 设置段落元素的文字内容
  hintParagraph.textContent = params;
}

function destination() {
  window.location.assign("/");
}

function setCookie(allow, name, value, expiresInDays) {
  if (allow == 200) {
    const date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  } else {
    console.log("setting cookie failure:allow", allow);
  }
}
