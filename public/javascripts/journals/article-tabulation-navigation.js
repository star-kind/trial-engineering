let navigationJournalsUrl = "/journals-navigation-page";
let userAccountTokenName = "token";

//翻倒上一页
function goToPrevious() {
  let tallyStr = localStorage.getItem(tallyTokenName0);
  // 将 JSON 字符串转换为 JavaScript 对象
  let tallyObj = JSON.parse(tallyStr);
  if (tallyObj._currentPage === 1) {
    insertIntoText("Already first page");
    return;
  }
  let param = { order: tallyObj._currentPage - 1 };
  setTimeout(function () {
    sendData2Back(param);
  }, 1200);
}

//翻倒指定页
function goToPage(value) {
  if (!value) {
    console.log("void value");
    return;
  }
  console.log(value);

  let param = { order: Number(value) };
  setTimeout(function () {
    sendData2Back(param);
  }, 1200);
}

//翻倒下一页
function goToNext() {
  let tallyStr = localStorage.getItem(tallyTokenName0);
  // 将 JSON 字符串转换为 JavaScript 对象
  let tallyObj = JSON.parse(tallyStr);
  if (tallyObj._currentPage === tallyObj._totalPages) {
    insertIntoText("Already last page");
    return;
  }
  let param = { order: tallyObj._currentPage + 1 };
  setTimeout(function () {
    sendData2Back(param);
  }, 1200);
}

// 重新初始化 currentPage
function retryInitTally(params) {
  let tallyStr = localStorage.getItem(tallyTokenName0);

  // 检查 tallyStr 是否为有效值
  if (tallyStr) {
    // 尝试将 JSON 字符串转换为 JavaScript 对象
    let tallyObj = JSON.parse(tallyStr);
    tallyObj._currentPage = params.order;
    localStorage.setItem(tallyTokenName0, JSON.stringify(tallyObj));
  } else {
    console.error("The 'tally' item in localStorage is not set or is empty.");
  }
}

let gainHeader = () => {
  let token = localStorage.getItem(userAccountTokenName);
  if ((token === "") | (token === null) | (token === undefined)) {
    insertIntoText("Login status is abnormal, please log in again");
    return false;
  }

  let mineHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  console.log("mineHeader", mineHeader);

  return mineHeader;
};

let switchReqUrl = () => {
  let searchHistory = JSON.parse(localStorage.getItem(searchEnterValKey));
  let param = {};

  if (searchHistory.article_title) {
    param.url = journalSearchTitleUrl;
    param.type = 1;
    param.articleTitle = searchHistory.article_title;
  } else {
    param.url = navigationJournalsUrl;
    param.type = 0;
  }

  return param;
};

function sendData2Back(params) {
  let mineHeader = gainHeader();
  let switchReq = switchReqUrl();
  console.log("switchReq", switchReq);

  if (switchReq.type == 1) {
    let emitParam = {
      order: params.order,
      article_title: switchReq.articleTitle,
    };
    sendData2BackSendReq(switchReq.url, mineHeader, emitParam);
  } else {
    sendData2BackSendReq(switchReq.url, mineHeader, params);
  }
}

function sendData2BackSendReq(TARGET_URL, mineHeader, params) {
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
      if (data.state === 200 && Object.keys(data.pagination).length !== 0) {
        removeTableBodyContents();
        generateArticleTable(data.pagination._pagedData);
        saveTally(data);
        followUpMsg(data.pagination);
      }
      return data;
    })
    .then((data) => {
      console.log(data);
      if (data.state === 200 && Object.keys(data.pagination).length == 0) {
        removeTableBodyContents();
        followUpMsg({ _currentPage: params.order, _totalPages: "" });
        retryInitTally(params);
      }
      return data;
    })
    .then((data) => {
      if (data.state == 200) {
        uncheckAllCheckboxes();
      }
      return data;
    })
    .then((data) => {
      if (data.state != 200) {
        insertIntoText(data.message);
      }
      return data;
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function removeTableBodyContents() {
  let tableBody = document.getElementById("tbody"); // 获取表格主体元素
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild); // 移除表格主体内的所有子元素
    }
  }
}

function uncheckAllCheckboxes() {
  // 获取所有类型为 "checkbox" 且已被勾选的 input 元素
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // 取消勾选所有已被勾选的复选框
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
