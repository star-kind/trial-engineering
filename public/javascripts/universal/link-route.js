let searchHistoriesValKey = "search_target";

let initializationLinkPage = () => {
  localStorage.removeItem(searchHistoriesValKey);
  localStorage.removeItem("articleSingleObj");
  localStorage.removeItem("tally");
};

initializationLinkPage();
