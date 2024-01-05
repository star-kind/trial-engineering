module.exports = {
  success: {
    state: 200,
    message: "Successful",
  },

  doubt_method: {
    state: 422,
    message: "Error: Doubtful Method",
  },

  pwd_inconsistent: {
    state: 423,
    message: "Error: The password entered twice is different",
  },

  param_empty: {
    state: 424,
    message: "Error: Your submitted substance cannot be empty",
  },

  contains_spaces: {
    state: 424,
    message: "Error: Your commit parameter contains spaces",
  },

  email_out_limit: {
    state: 425,
    message: "Error: Email length is can not greater than 40",
  },

  password_out_limit: {
    state: 426,
    message: "Error: password length can not greater than 16",
  },

  password_less_length: {
    state: 427,
    message: "Error: password length can not less than 4",
  },

  invalid_email: {
    state: 428,
    message: "Error: Invalid email address format",
  },

  illegal_char: {
    state: 429,
    message: "Error: Your commit parameter contains invalid characters",
  },

  no_such_user: {
    state: 430,
    message: "Error: No such account",
  },

  password_incorrect: {
    state: 431,
    message: "Error: Login Password is incorrect",
  },

  already_registered: {
    state: 432,
    message: "Error: This email has already been registered by someone",
  },

  login_expire: {
    state: 433,
    message: "Error: Login status has expired, please login retry",
  },

  consistent_email: {
    state: 434,
    message: "Error: The replaced email is consistent with the original email",
  },

  pwd_contain_space: {
    state: 435,
    message: "Error: Passwords contains a space",
  },

  user_status_amiss: {
    state: 436,
    message: "Error: Your login status was amiss, please login retry",
  },

  origin_password_incorrect: {
    state: 437,
    message: "Error: Original password is incorrect",
  },

  password_length_wrong: {
    state: 438,
    message: "Error: The password length must be between 4 and 16 characters",
  },

  password_conflict: {
    state: 439,
    message: "The original password cannot be the same as the new password",
  },

  invaild_type: {
    state: 440,
    message: "The submitted content must be an corrected type",
  },

  article_not_exists: {
    state: 441,
    message: "No such this article",
  },

  article_not_belong: {
    state: 442,
    message: "Articles that do not belong to you",
  },

  no_previous_page: {
    state: 443,
    message: "No previous page",
  },

  no_this_page: {
    state: 444,
    message: "No this page",
  },

  not_select_any_article: {
    state: 445,
    message: "Not choose any one article",
  },
};
