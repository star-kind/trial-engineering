let accountTokenVar = "token";
let TARGET_URL = "/journals-write-new-note";
const resetButtonTag = document.getElementById("reset-btn-id");
const formIdEle = document.getElementById("submit-essay");
const hintTag = document.querySelector("#id-hint-word");

function handleKeyDown(event) {
  if (event.ctrlKey && event.keyCode === 13) {
    click2Submit();
  }
}

function click2Submit() {
  let params = getInputAreaValues();
  console.log("click2Submit params", params);

  let flag = checkEmptyKeyValue(params);
  if (flag === false) {
    implantationText(
      "You have not filled in the title or content of your article completely"
    );

    setTimeout(() => {
      implantationText("");
    }, 15 * 1000);

    return;
  } else {
    console.info("general", params);
  }

  setTimeout(function () {
    sendNewArticle(params);
  }, 1000 * 1.5);
}

function getInputAreaValues() {
  const form = document.getElementById("submit-essay");
  const inputAreas = form.getElementsByClassName("input-area");
  const result = {};

  for (let i = 0; i < inputAreas.length; i++) {
    const inputArea = inputAreas[i];
    if (inputArea.tagName === "INPUT" && inputArea.type === "text") {
      result[inputArea.name] = inputArea.value;
    } else if (inputArea.tagName === "TEXTAREA") {
      result[inputArea.name] = inputArea.value;
    }
  }
  return result;
}

function sendNewArticle(params) {
  let token = localStorage.getItem(accountTokenVar);
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
    body: JSON.stringify(params), // 转为JSON字符串发送
  })
    .then((response) => {
      console.info(response);
      return response.json();
    }) // 解析响应为JSON
    .then((data) => {
      console.log(data);
      if (data.state === 200) {
        implantationText("Essay Saved Successful");
        setTimeout(destination0, 1000 * 1);
      } else {
        implantationText(data.message);
      }
    })
    .catch((error) => {
      console.error(error.message); // 打印错误信息
    });
}

function implantationText(param) {
  // 设置段落元素的文字内容
  hintTag.textContent = param;
}

function destination0() {
  window.location.assign("/journals");
}

function checkEmptyKeyValue(obj) {
  for (const key in obj) {
    if (
      (typeof obj[key] === "string" && obj[key].trim() === "") ||
      obj[key] === null ||
      obj[key] === undefined
    ) {
      return false;
    }
  }
  return true;
}

let resetInputs = () => {
  resetButtonTag.addEventListener("click", function () {
    // 假设你有一个表单需要重置
    if (formIdEle) {
      formIdEle.reset();
    }
  });
};

resetInputs();
