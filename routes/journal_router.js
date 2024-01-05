var express = require("express");
var router = express.Router();
var blogListController = require("../controllers/journals/personal_blog_list_controller");
var getSingleBlogController = require("../controllers/journals/get_single_blog_controller");
var alterArticleController = require("../controllers/journals/alter_article_controller");
var navigationPaginController = require("../controllers/journals/navigation_pagin_controller");
var fuzzyPaginController = require("../controllers/journals/fuzzy_pagin_controller");
var writeBlogController = require("../controllers/journals/write_blog_controller");
var deleteArticleController = require("../controllers/journals/delete_blog_controller");

router.get("/journals", function (req, res, next) {
  res.render("journals/personal-article-tabulation");
});

router.post("/journals-pagin-list", blogListController);

router.get("/journals-view-page", function (req, res, next) {
  res.render("journals/article-view-page");
});

router.post("/journals-reading-single", getSingleBlogController);

router.post("/journals-revamp-article", alterArticleController);

router.post("/journals-navigation-page", navigationPaginController);

router.post("/journals-search-note", fuzzyPaginController);

router.get("/journals-write-essay", function (req, res, next) {
  res.render("journals/write-blog-view");
});

router.post("/journals-write-new-note", writeBlogController);

router.post("/journals-delete-chosen", deleteArticleController);

module.exports = router;
