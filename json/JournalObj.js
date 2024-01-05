class JournalObject {
  constructor(accountemail, article, title, accountid, modifiedtime) {
    this._accountemail = accountemail;
    this._article = article;
    this._title = title;
    this._accountid = accountid;
    this._modifiedtime = modifiedtime;
  }

  set title(title) {
    if (typeof title === "string") {
      this._title = title;
    } else {
      throw new Error("Invalid title type");
    }
  }

  get title() {
    return this._title;
  }

  set accountemail(email) {
    if (typeof email === "string" && email.length <= 60) {
      this._accountemail = email;
    } else {
      throw new Error("Invalid email length");
    }
  }

  get accountemail() {
    return this._accountemail;
  }

  set article(article) {
    if (typeof article === "string") {
      this._article = article;
    } else {
      throw new Error("Invalid article type");
    }
  }

  get article() {
    return this._article;
  }

  set accountid(accountid) {
    if (Number.isInteger(accountid)) {
      this._accountid = accountid;
    } else {
      throw new Error("Invalid accountid type");
    }
  }

  get accountid() {
    return this._accountid;
  }

  set modifiedtime(modifiedtime) {
    if (typeof modifiedtime === "string") {
      this._modifiedtime = modifiedtime;
    } else {
      throw new Error("Invalid modifiedtime type");
    }
  }

  get modifiedtime() {
    return this._modifiedtime;
  }

  toString() {
    return `JournalObject: accountemail=${this._accountemail}, article=${this._article}, 
    title=${this._title}, accountid=${this._accountid}, modifiedtime=${this._modifiedtime}`;
  }
}

module.exports = JournalObject;
