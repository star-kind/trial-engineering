let hintClsTagObj = "hint-word";

let insertIntoText = (string) => {
  if (string) {
    let tagObject = document.getElementsByClassName(hintClsTagObj);
    tagObject[0].textContent = string;

    setTimeout(() => {
      tagObject[0].textContent = "";
    }, 20 * 1000);
  }
};
