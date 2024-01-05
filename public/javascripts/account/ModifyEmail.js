let exhibitUserNameKey = "account_designation";
let accountTokenSign = "token";

function handleKeyPress(event) {
  // 判断按下的键是否为回车键的键码（Enter 键的键码为 13）
  if (event.keyCode === 13) {
    sendAlterMail(); // 调用您的函数
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("renewal-mailbox-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      sendAlterMail();
    });
  } else {
    console.error("Element with ID 'renewal-mailbox-btn' not found.");
  }
});

function sendAlterMail() {
  // 获取表单中所有的input标签
  let inputs = document.querySelectorAll("#renewal-mailbox-form input");
  let jsonData = {}; // 初始化jsonData对象
  let TARGET_URL = "/account-renewal-email-action";

  // 遍历input标签，将name作为key，value作为value存入jsonData中
  inputs.forEach(function (input) {
    jsonData[input.name] = input.value;
  });

  let token = localStorage.getItem("token");
  if ((token === "") | (token === null) | (token === undefined)) {
    alter("Login status is abnormal, please log in again");
    return;
  } else {
    console.log("token: " + token);
  }

  let mineHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  // 使用fetch API发送POST请求
  fetch(TARGET_URL, {
    method: "POST",
    headers: mineHeader,
    body: JSON.stringify(jsonData), // 将jsonData转为JSON字符串发送
  })
    .then((response) => {
      console.info(response);
      return response.json();
    }) // 解析响应为JSON
    .then((data) => {
      console.log(data);
      setTimeout(dispose(data), 1000 * 2);
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function dispose(data) {
  console.log(data);
  if (data.state == 200) {
    exhibitionInformation("Successfully changed email, about to refresh page");
    setTimeout(destination(data), 1000 * 2);
  } else {
    exhibitionInformation(data.message);
  }
}

function destination(data) {
  localStorage.setItem(accountTokenSign, data.token);
  location.reload();
}

function exhibitionInformation(msgStr) {
  console.log("msgStr", msgStr);
  let tagEle = document.getElementById("response-information-tag");
  if (msgStr !== "" || msgStr !== undefined || msgStr !== null) {
    tagEle.textContent = msgStr;
  }
}

function exhibitionUserName() {
  let mailVal = getValueFromCookie(exhibitUserNameKey);

  let userNameTag = document.getElementById("current-user-name");
  let nameClassTags = document.getElementsByClassName(
    "exploed-user-name-class"
  );

  if (mailVal !== "" || mailVal !== undefined || mailVal !== null) {
    if (userNameTag !== null) {
      userNameTag.textContent = mailVal;
    } else if (nameClassTags !== null) {
      console.log("nameClassTags");
      nameClassTags[0].textContent = mailVal;
    }
  }
}

function getValueFromCookie(name) {
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

exhibitionUserName();
