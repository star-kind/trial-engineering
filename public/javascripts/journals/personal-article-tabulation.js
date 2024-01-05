let oneArticleKey = "articleSingleObj";
let tallyTokenName0 = "tally";
let tokenName0 = "token";
let journalsPaginListUrl = "/journals-pagin-list";
let journalReadSingleUrl = "/journals-reading-single";
let viewPageReqUrl = "/journals-view-page";
let titleSearchFlag = "search_target";

window.onload = function () {
  let flag = scout();

  if (flag) {
    console.log("flag", flag.article_title);
    snatchByTitle(flag.article_title);
  } else {
    initialize();
  }
};

let scout = () => {
  let prevTitle = localStorage.getItem(titleSearchFlag);
  console.log("prevTitle", prevTitle);

  if (prevTitle) {
    return JSON.parse(prevTitle);
  }
  return false;
};

function initialize() {
  let token = localStorage.getItem(tokenName0);
  if ((token === "") | (token === null) | (token === undefined)) {
    console.log("Login status is abnormal, please log in again");
  } else {
    console.log("token: " + token);
  }

  let mineHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  initializeSendReq(mineHeader, journalsPaginListUrl);
}

function initializeSendReq(mineHeader, destinationUrl) {
  fetch(destinationUrl, {
    method: "POST",
    headers: mineHeader,
  })
    .then((response) => {
      console.info(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.state === 200 && Object.keys(data.pagination).length !== 0) {
        generateArticleTable(data.pagination._pagedData);
        saveTally(data);
        followUpMsg(data.pagination);
      }
      return data;
    })
    .then((data) => {
      if (data.state != 200) {
        insertIntoText(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function followUpMsg(params) {
  console.log("followUpMsg-params", params);
  // 检查参数是否包含所需属性
  if (
    params &&
    params._currentPage !== undefined &&
    params._totalPages !== undefined
  ) {
    // 当前页通过 ID 获取
    let hintCurrent = document.getElementById("current-essay-page");
    // 总页数通过 ID 获取
    let hintTotal = document.getElementById("total-essay-page");

    // 检查选择的元素是否存在
    if (hintCurrent && hintTotal) {
      // 设置当前页和总页数的文本内容
      hintCurrent.textContent = params._currentPage;
      hintTotal.textContent = params._totalPages;
    } else {
      console.error("DOM elements not found.");
    }
  } else {
    console.error("Invalid or missing parameters.");
  }
}

function saveTally(params) {
  let tally = params.pagination;
  tally._pagedData = {};
  let tallyString = JSON.stringify(tally);
  localStorage.setItem(tallyTokenName0, tallyString);
  console.log(localStorage.getItem(tallyTokenName0));
}

// Function to select all rows when the header checkbox is clicked
function selectAllRows() {
  var checkboxes = document.querySelectorAll('#tbody input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = document.getElementById("selectAll").checked;
  }
}

function generateArticleTable(params) {
  var tableBody = document.getElementById("tbody");
  params.reverse().forEach(function (item) {
    var row = document.createElement("tr");
    row.className = "row-prefix-" + item.id;
    // data cell
    var dataCell = document.createElement("td");
    var selectBox = document.createElement("input");
    // checkboxs
    selectBox.type = "checkbox";
    selectBox.name = "single_journal";
    selectBox.value = item.id;
    selectBox.className = "journal-option";
    // tr->td->input:checkbox
    dataCell.appendChild(selectBox);
    row.appendChild(dataCell);
    tableBody.appendChild(row);
    // item-->cell
    Object.keys(item).forEach(function (key) {
      var cell = document.createElement("td");
      if (
        key == "id" ||
        key == "accountemail" ||
        key == "accountid" ||
        key == "visual" ||
        key == "article"
      ) {
        cell.className = "article-treat";
      } else if (key == "title") {
        cell.className = "title-item rubric-" + item.id;
        cell.addEventListener("click", click2ReadByTitle);
      }
      cell.textContent = item[key];
      row.appendChild(cell);
    });
  });
}

function click2ReadByTitle(event) {
  // 获取被点击元素的类名列表
  var classList = event.target.classList.toString().split(" ");
  // 打印类名列表
  console.log(classList);

  let arr = classList[1].split("-");
  let number = Number(arr[1]);
  console.log("article id:", number);

  getReadingCont(number);
}

function getReadingCont(params) {
  let jsonData = { article_id: params };

  let token = localStorage.getItem("token");
  if ((token === "") | (token === null) | (token === undefined)) {
    insertIntoText("Login status is abnormal, please log in again");
    return;
  } else {
    console.log("token: " + token);
  }

  let mineHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  getReadContSendReq(mineHeader, journalReadSingleUrl, jsonData);
}

function getReadContSendReq(mineHeader, TARGET_URL, jsonData) {
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
      if (data.state === 200 && Object.keys(data.article).length !== 0) {
        localStorage.setItem(oneArticleKey, JSON.stringify(data.article));
      }
      return data;
    })
    .then((data) => {
      if (data.state == 200) {
        setTimeout(() => {
          window.location.assign(viewPageReqUrl);
        }, 1000 * 1.5);
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
