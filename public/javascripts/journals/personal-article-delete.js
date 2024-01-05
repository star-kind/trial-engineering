let mineTokenName = "token";
let TARGET_URL = "/journals-delete-chosen";

function click2DeleteNotes() {
  // 调用函数并获取已勾选复选框的值
  const checkedValuesArray = getCheckedCheckboxValues();
  console.log("checkedValuesArray", checkedValuesArray); // 输出包含已勾选复选框值的数组

  let param = { article_id_array: checkedValuesArray };
  sendDeletedArticle(param);
}

function removeRowsBySuffix(array) {
  array.forEach((value) => {
    const className = "row-prefix-" + value;
    const elements = document.getElementsByClassName(className);

    // 移除匹配特定类名的元素
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  });
}

function getCheckedCheckboxValues() {
  // 获取具有类名为 "journal-option" 和类型为 "checkbox" 的所有元素
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"].journal-option:checked'
  );

  // 声明一个空数组以存储勾选的值
  const checkedValues = [];

  // 遍历所有勾选的复选框元素并将其值存入数组
  checkboxes.forEach((checkbox) => {
    checkedValues.push(checkbox.value);
  });

  return checkedValues;
}

function sendDeletedArticle(params) {
  let token = localStorage.getItem(mineTokenName);
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

      if (Array.isArray(data) === false) {
        // 变量不是数组
        followUp2(data.message);
      } else {
        let array = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].state === 200) {
            array.push(data[i].operate_id);
          }
        }

        console.log("data success array", array);
        if (array.length < 1) {
          followUp2("Successful deleted 0 article");
        } else {
          followUp2("Successful deleted " + array.length + " article");
          setTimeout(function () {
            removeRowsBySuffix(array);
          }, 3000);
        }
      }
      uncheckAllCheckboxes1();
    })
    .catch((error) => {
      console.error(error); // 打印错误信息
    });
}

function followUp2(param) {
  // 获取具有指定类名的段落元素
  let hintParagraph = document.querySelector(".hint-word");
  // 设置段落元素的文字内容
  hintParagraph.textContent = param;
}

function uncheckAllCheckboxes1() {
  // 获取所有类型为 "checkbox" 且已被勾选的 input 元素
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // 取消勾选所有已被勾选的复选框
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
