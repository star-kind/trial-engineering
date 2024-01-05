const Pagination = require("../../../json/Paging");
const Responses = require("../../../json/Responses");
const queryPagin = require("../../databases/journal/select_article_pagination");
const getArticleByMail = require("../../databases/journal/select_article_by_mail");
const PublicVariable = require("../../../config/public_variable");
const renewal = require("../accounts/renewal_mail_service");

/**
 *
 * @param {*} uid
 * @param {*} usrEmail
 * @param {*} pageOrder 提交的目的页
 * @returns
 */
async function queryPaginationService(uid, usrEmail, pageOrder) {
  // 检查 uid, usrEmail, pageOrder 是否有任何一个为 null/undefined/""
  if (
    [uid, usrEmail, pageOrder].some(
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

  let totalDataList = await getArticleByMail(usrEmail);
  console.log("TotalDataList.length", totalDataList.length);

  let queryResults = await queryPagin(
    usrEmail,
    pageOrder,
    PublicVariable.rowsPerPage
  );

  return buildResponse(totalDataList, queryResults, pageOrder);
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
  let result = await queryPaginationService(6, "example@goxmail.com", 3);
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
module.exports = queryPaginationService;
