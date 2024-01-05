/**
 * judgePaginate - 根据当前页面和分页设置确定分页状态的函数。
 * @param {Object} pagination - 包含分页详情的对象，如currentPage（当前页）、totalRows（总行数）、rowsPerPage（每页行数）和totalPages（总页数）。
 * @param {number} pageOrder - 当前页面的顺序。
 * @returns {Object} - 包含指示是否存在上一页或下一页可用于导航的标志的对象。
 */
function judgePaginate(pagination, pageOrder) {
  // 提取必要的分页详情
  const currentPage = pagination.currentPage; // 当前页码
  const totalRows = pagination.totalRows; // 总行数
  const rowsPerPage = pagination.rowsPerPage; // 每页行数
  const totalPages = pagination.totalPages; // 总页数

  // 标志，指示是否有前一页和后一页
  let judgeFlag = { hasPrev: false, hasNext: false };

  // 根据当前页和总页数确定分页状态
  if (currentPage === 0 || currentPage === 1) {
    // 处理第一页的情况
    if (totalRows > rowsPerPage) {
      judgeFlag.hasPrev = false; // 没有前一页可用
      judgeFlag.hasNext = true; // 下一页可用
    }
  } else if (pageOrder > 1 && pageOrder < totalPages) {
    // 处理第一页和最后一页之间的页面情况
    judgeFlag.hasPrev = true; // 前一页可用
    judgeFlag.hasNext = true; // 下一页可用
  } else if (pageOrder >= totalPages) {
    // 处理最后一页或之后的页面情况
    judgeFlag.hasPrev = false; // 没有前一页可用
    judgeFlag.hasNext = false; // 没有下一页可用
  }

  return judgeFlag; // 返回分页状态标志
}

module.exports = {
  judgePaginate,
  initializationPagination,
};
