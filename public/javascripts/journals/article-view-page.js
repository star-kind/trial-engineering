let cancelBtn = document.querySelector("#cancelButton");
let editBtn = document.querySelector("#editButton");
let saveBtn = document.querySelector("#saveButton");
let backBtn = document.querySelector("#returnButton");
let articleContentTag = document.querySelector("#articleContent");
let titleTag = document.querySelector("#title");
let articleObjToken = "articleSingleObj";
let accountTokenName = "token";
let inlineValueStr = "inline-block";

window.onload = function () {
  initialize();
  setTagReadOnly();
  setTagValFromLocal();
};

function handleKeyDown2Save(event) {
  if (event.ctrlKey && event.keyCode === 13) {
    let parameters = collectsArticleData();
    console.log("parameters", parameters);
    if (parameters != null) {
      setTimeout(sendUpdatedArticle(parameters), 1000 * 2);
    } else {
      followUp1("please into the editable state");
    }
  }
}

function initialize() {
  // 初始化时隐藏取消编辑按钮和保存按钮，显示编辑按钮和返回列表按钮
  saveBtn.style.display = "none";
  cancelBtn.style.display = "none";
  backBtn.style.display = inlineValueStr;

  // 点击编辑按钮时显示保存按钮和取消编辑按钮，隐藏编辑按钮和返回列表按钮
  editBtn.addEventListener("click", function () {
    cancelReadOnly();
    save2Local();
    editBtn.style.display = "none";
    saveBtn.style.display = inlineValueStr;
    cancelBtn.style.display = inlineValueStr;
    backBtn.style.display = "none";
  });

  // 点击取消编辑按钮时隐藏取消编辑按钮和保存按钮，显示编辑按钮和返回列表按钮
  cancelBtn.addEventListener("click", function () {
    setTagReadOnly();
    setTagValFromLocal();
    editBtn.style.display = inlineValueStr;
    saveBtn.style.display = "none";
    cancelBtn.style.display = "none";
    backBtn.style.display = inlineValueStr;
  });

  // 点击保存按钮时隐藏编辑框和取消编辑按钮，显示编辑按钮和返回列表按钮，
  // 保存文章内容输入框的值到 localStorage 中，用于后续恢复编辑状态时使用，并刷新页面
  saveBtn.addEventListener("click", function () {
    let parameters = collectsArticleData();
    console.log("parameters", parameters);
    if (parameters != null) {
      setTimeout(sendUpdatedArticle(parameters), 1000 * 2);
    } else {
      followUp1("please into the editable state");
    }
  });

  //点击 returnButton 按钮时
  backBtn.addEventListener("click", function () {
    window.location.assign("/journals");
  });
}

function collectsArticleData() {
  let title = titleTag;
  let articleContent = articleContentTag;
  let articleSingleObj = getArticleSingleObj();

  if (articleContent.readOnly == true) {
    console.info("not in editable state");
    return null;
  }

  let parameters = {
    article_id: articleSingleObj.id,
    article_title: title.value,
    article_content: articleContent.value,
  };
  console.log("parameters", parameters);
  return parameters;
}

function save2Local() {
  var title = titleTag.value;
  var articleContent = articleContentTag.value;

  let articleSingleObj = getArticleSingleObj();
  articleSingleObj.title = title;
  articleSingleObj.article = articleContent;

  localStorage.setItem(articleObjToken, JSON.stringify(articleSingleObj));
}

function setTagValFromLocal() {
  let articleSingleObj = getArticleSingleObj();
  let title = articleSingleObj.title;
  let articleContent = articleSingleObj.article;

  articleContentTag.value = articleContent;
  titleTag.value = title;
}

function setTagReadOnly() {
  // 获取所有具有类名为 "reads" 的元素
  var readsElements = document.querySelectorAll(".only-reads");
  // 遍历每个元素，并设置其 `readonly` 属性为 `true`
  readsElements.forEach(function (element) {
    element.setAttribute("readonly", "readonly");
  });
}

function cancelReadOnly() {
  // 获取所有具有类名为 "reads" 的元素
  var readsElements = document.querySelectorAll(".only-reads");
  // 遍历每个元素，并设置其 `readonly` 属性为 `true`
  readsElements.forEach(function (element) {
    element.removeAttribute("readonly");
  });
}

function getArticleSingleObj() {
  let jsonStr = localStorage.getItem(articleObjToken);
  let articleSingleObj = JSON.parse(jsonStr);
  return articleSingleObj;
}

function sendUpdatedArticle(params) {
  let TARGET_URL = "/journals-revamp-article";

  let token = localStorage.getItem(accountTokenName);
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
        localStorage.setItem(articleObjToken, JSON.stringify(data.article));
        followUp1("Essay Modification Successful");
        setTimeout(destination1, 1000 * 2);
      } else {
        followUp1(data.message);
      }
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function followUp1(param) {
  // 获取具有指定类名的段落元素
  let hintParagraph = document.querySelector(".hint-word");
  // 设置段落元素的文字内容
  hintParagraph.textContent = param;
}

function destination1() {
  location.reload(); // 刷新页面
}
