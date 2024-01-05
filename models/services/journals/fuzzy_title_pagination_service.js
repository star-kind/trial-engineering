const Pagination = require("../../../json/Paging");
const Responses = require("../../../json/Responses");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");

const searcAllNotehByTitle = require("../../databases/journal/get_notes_by_fuzzy_title");
const performFuzzyPagination = require("../../databases/journal/perform_fuzzy_pagination");

async function fuzzyTitlePaginationService(uid, usrEmail, pageOrder, title) {
  // 检查是否有任何一个为 null/undefined/""
  if (
    [uid, usrEmail, pageOrder, title].some(
      (param) => param === null || param === undefined || param === ""
    )
  ) {
    console.log(
      "Error: One or more parameters (uid, usrEmail, pageOrder) cannot be null, undefined, or empty."
    );
    return Responses.user_status_amiss;
  }

  // 检查 uid, pageOrder 的数据类型是否为 number
  if (typeof uid !== "number" || typeof pageOrder !== "number") {
    console.log("Error: uid, pageOrder must be of type number.");
    return Responses.invaild_type;
  }

  // 如果参数：email 不符合：正则表达式(邮箱地址),return错误信息
  if (!PublicVariable.EmailRegex.test(usrEmail)) {
    return Responses.invalid_email;
  }

  // 检查user的存在与否
  let checkExist = await renewal.checkUserEexistence(usrEmail);
  if (checkExist.flag === false) {
    return Responses.login_expire;
  }

  if (checkExist.data.id !== uid) {
    return Responses.user_status_amiss;
  }

  let totalDataList = await searcAllNotehByTitle(title);
  console.log("Total_DataList.length", totalDataList.length);

  let queryPaginResult = await performFuzzyPagination(
    title,
    pageOrder,
    PublicVariable.rowsPerPage
  );

  return buildResponse(totalDataList, queryPaginResult, pageOrder);
}

// 构建返回结果
function buildResponse(totalDataArray, resultArray, pageOrder) {
  if (Array.isArray(resultArray) && resultArray.length === 0) {
    console.log("Result Array Is empty");
    return Object.assign({}, Responses.success, {
      pagination: {},
    });
  }

  console.log("Result Array Isn't empty");
  let paginObj = new Pagination(
    totalDataArray.length,
    PublicVariable.rowsPerPage,
    pageOrder
  );
  paginObj.totalRows = totalDataArray.length;
  paginObj.pagedData = resultArray.reverse();

  if (pageOrder > paginObj._totalPages) {
    return Responses.no_this_page; // 没有下一页;
  }

  return Object.assign({}, Responses.success, {
    pagination: paginObj,
  });
}

async function test() {
  let result = await fuzzyTitlePaginationService(9, "User@tvn.com", 1, "Hello");
  console.log("test.result", result);

  if (!result.pagination || Object.keys(result.pagination).length === 0) {
    console.log(
      "result.pagination is either undefined, null, or an empty object"
    );
    return;
  }

  let data = await result.pagination.pagedData; // 等待 Promise 对象解析

  // 检查 data 是否为空数组
  if (Array.isArray(data) && data.length === 0) {
    console.log("test.result.data IS empty array");
  } else {
    console.log("test.result.data Is Not empty", data); // 输出 pagination.pagedData 的实际数据
  }
}
// test();
module.exports = fuzzyTitlePaginationService;
