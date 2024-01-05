class Pagination {
  constructor(totalRows = 0, rowsPerPage = 10, currentPage = 1) {
    this._totalRows = totalRows;
    this._totalPages = Math.ceil(totalRows / rowsPerPage);
    this._currentPage = currentPage;
    // 是否在第一页之后且不超过最后一页
    this._hasPrevPage = currentPage > 1 && currentPage <= this._totalPages;
    // 是否在第一页及之后且在最后一页之前
    this._hasNextPage = currentPage >= 1 && currentPage < this._totalPages;
    this._rowsPerPage = rowsPerPage;
    this._pagedData = []; // 泛型对象数组，存储查询到的每页数据
  }

  // Setter and Getter for Total Rows
  set totalRows(value) {
    this._totalRows = value;
    this._totalPages = Math.ceil(this._totalRows / this._rowsPerPage);
    this._hasNextPage = this._totalPages > 1;
  }

  get totalRows() {
    return this._totalRows;
  }

  // Getter for Total Pages
  get totalPages() {
    return this._totalPages;
  }

  // Setter and Getter for Current Page
  set currentPage(page) {
    this._currentPage = page;
    this._hasPrevPage = this._currentPage > 1;
    this._hasNextPage = this._currentPage < this._totalPages;
  }

  get currentPage() {
    return this._currentPage;
  }

  // Getter for Previous Page Availability
  get hasPrevPage() {
    return this._hasPrevPage;
  }

  // Getter for Next Page Availability
  get hasNextPage() {
    return this._hasNextPage;
  }

  // Setter and Getter for Rows Per Page
  set rowsPerPage(rows) {
    this._rowsPerPage = rows;
    this._totalPages = Math.ceil(this._totalRows / this._rowsPerPage);
    this._hasNextPage = this._totalPages > 1;
  }

  get rowsPerPage() {
    return this._rowsPerPage;
  }

  // Setter and Getter for Paged Data
  set pagedData(data) {
    this._pagedData = data;
  }

  get pagedData() {
    return this._pagedData;
  }

  // toString method to display Pagination details
  toString() {
    return `Total Rows: ${this._totalRows}, Total Pages: ${this._totalPages}, Current Page: ${this._currentPage}, Rows Per Page: ${this._rowsPerPage}, Has Prev Page: ${this._hasPrevPage}, Has Next Page: ${this._hasNextPage}`;
  }
}

// const pagination = new Pagination(100, 10);
// pagination.currentPage = 2;
// console.log(pagination.toString());
// Output: Total Rows: 100, Total Pages: 10, Current Page: 2, Rows Per Page: 10, Has Prev Page: true, Has Next Page: true

module.exports = Pagination;
