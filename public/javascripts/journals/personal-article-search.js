let tallyTokenName1 = "tally";
let userTokenName1 = "token";
let journalSearchTitleUrl = "/journals-search-note";
let searchInputEle = document.getElementById("search-blog-by-name");
let searchEnterValKey = "search_target";

let initializationListPage = () => {
  searchInputEle.value = "";
};
initializationListPage();

function click2SearchByTitle() {
  let inputValue = searchInputEle.value;
  console.log("inputValue", inputValue);

  let param = { article_title: inputValue };
  setTimeout(function () {
    sendParam2Back(param, journalSearchTitleUrl);
  }, 1000 * 1.5);
}

let getMineHeader = () => {
  let token = localStorage.getItem(userTokenName1);
  if ((token === "") | (token === null) | (token === undefined)) {
    insertIntoText("Login status is abnormal, please log in again");
    return false;
  }
  console.log("token: " + token);

  let mineHeader = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  return mineHeader;
};

function sendParam2Back(params, TARGET_URL) {
  let mineHeader = getMineHeader();

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
      if (data.state === 200 && Object.keys(data.pagination).length !== 0) {
        removeTableBodyContent1();
        generateArticleTable1(data.pagination._pagedData);
        saveTally1(data);
        followUpMsg1(data.pagination);
      }
      return data;
    })
    .then((data) => {
      if (data.state == 200 && Object.keys(data.pagination).length == 0) {
        removeTableBodyContent1();
        followUpMsg1({ _currentPage: "", _totalPages: "" });
        retryInitTally1(params);
      }
      return data;
    })
    .then((data) => {
      if (data.state != 200) {
        insertIntoText(data.message);
      }
      return data;
    })
    .then((data) => {
      if (data.state == 200 && Object.keys(data.pagination).length !== 0) {
        localStorage.setItem(searchEnterValKey, JSON.stringify(params));
      }
      return data;
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function removeTableBodyContent1() {
  let tableBody = document.getElementById("tbody"); // 获取表格主体元素
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild); // 移除表格主体内的所有子元素
    }
  }
}

// 重新初始化 currentPage
function retryInitTally1(params) {
  let tallyStr = localStorage.getItem(tallyTokenName1);

  // 检查 tallyStr 是否为有效值
  if (tallyStr) {
    try {
      // 尝试将 JSON 字符串转换为 JavaScript 对象
      let tallyObj = JSON.parse(tallyStr);
      tallyObj._currentPage = params.order;
      localStorage.setItem(tallyTokenName1, JSON.stringify(tallyObj));
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  } else {
    console.error("The 'tally' item in localStorage is not set or is empty.");
  }
}

function generateArticleTable1(params) {
  // Create table rows based on data
  let tableBody = document.getElementById("tbody");
  // data for each
  params.forEach(function (item) {
    let row = document.createElement("tr");
    let dataCell = document.createElement("td");
    let selectBox = document.createElement("input");
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
      let cell = document.createElement("td");
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

function followUpMsg1(params) {
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
      console.info("DOM elements not found.");
    }
  } else {
    console.info("Invalid or missing parameters.");
  }
}

function saveTally1(params) {
  let tally = params.pagination;
  tally._pagedData = {};
  let tallyString = JSON.stringify(tally);
  localStorage.setItem(tallyTokenName1, tallyString);
  console.log(localStorage.getItem(tallyTokenName1));
}
