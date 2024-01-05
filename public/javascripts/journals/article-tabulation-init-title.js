let renderRequestPath = "/journals-search-note";

let snatchByTitle = (value) => {
  let param = { article_title: value };
  setTimeout(function () {
    sendParam2Back(param, renderRequestPath);
  }, 1000 * 1.5);
};
