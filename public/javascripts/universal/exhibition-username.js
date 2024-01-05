let exhibitUserNameKey = "account_designation";

document.addEventListener("DOMContentLoaded", function () {
  exhibitionName();
});

function exhibitionName() {
  let mailVal = getValueFromCookie(exhibitUserNameKey);

  let userNameTag = document.getElementById("current-user-name-tag");
  let nameClassTags = document.getElementsByClassName(
    "exploed-user-name-class"
  );

  if (mailVal !== "" || mailVal !== undefined || mailVal !== null) {
    if (userNameTag !== null) {
      userNameTag.textContent = mailVal;
    } else if (nameClassTags !== null) {
      console.log("nameClassTags");
      nameClassTags[0].textContent = mailVal;
    }
  }
}

function getValueFromCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      let result = cookie.substring(name.length + 1, cookie.length);
      console.info("result", result);
      return result;
    }
  }
  return null;
}
