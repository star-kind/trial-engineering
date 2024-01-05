class Account {
  constructor(
    id = null,
    email = "",
    password = "",
    salt = "",
    initvector = "",
    authority = null,
    updatetime = ""
  ) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._salt = salt;
    this._initvector = initvector;
    this._authority = authority;
    this._updatetime = updatetime;
  }

  get updatetime() {
    return this._updatetime;
  }

  set updatetime(value) {
    if (value !== null && typeof value !== "string") {
      throw new Error("Updatetime must be a string");
    }
    this._updatetime = value;
  }

  get authority() {
    return this._authority;
  }

  set authority(value) {
    if (value !== null && typeof value !== "number") {
      throw new Error("Authority must be a number");
    }
    this._authority = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (value !== null && typeof value !== "number") {
      throw new Error("ID must be a number");
    }
    this._id = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (typeof value !== "string") {
      throw new Error("Email must be a string");
    }
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    if (typeof value !== "string") {
      throw new Error("Password must be a string");
    }
    this._password = value;
  }

  get salt() {
    return this._salt;
  }

  set salt(value) {
    if (typeof value !== "string") {
      throw new Error("Salt must be a string");
    }
    this._salt = value;
  }

  get initvector() {
    return this._initvector;
  }

  set initvector(value) {
    if (typeof value !== "string") {
      throw new Error("InitVector must be a string");
    }
    this._initvector = value;
  }

  toString() {
    return `Account [id=${this._id}, email=${this._email}, password=${this._password}, salt=${this._salt}, initvector=${this._initvector}], authority=${this._authority}], updatetime=${this._updatetime}]`;
  }
}

module.exports = Account;

// let user = new Account(11, "sopeh", "pwssakey");
// console.log(user);

// let user1 = new Account();
// console.log(user1);

// let user2 = new Account();
// user2.id = 900;
// user2.email = "mine-acc@iof.com";
// user2.password = "666665555";
// console.log(user2);
