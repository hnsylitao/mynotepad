"use strict";

//TODO
//type :text
//type :html
//type :markdown

var NotePadProp = function (text) {
  if (text) {
    var obj = JSON.parse(text);
    this.key = obj.key;
    this.title = obj.title;
    this.type = obj.type;
    this.value = obj.value;
    this.author = obj.author;
  } else {
    this.key = "";
    this.title = "";
    this.type = "";
    this.value = "";
    this.author = "";
  }
};

NotePadProp.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var NotePad = function () {
  LocalContractStorage.defineProperty(this, "keys");
  LocalContractStorage.defineMapProperty(this, "userPads");
  LocalContractStorage.defineMapProperty(this, "notePads", {
    parse: function (text) {
      return new NotePadProp(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

NotePad.prototype = {
  init: function () {
    this.keys = 0;
  },

  /**
   * save NotePad
   * @param title notePad title
   * @param value notePad Value
   * @param type  notePad Type
   */
  save: function (title, value, type) {

    title = title.trim();
    value = value.trim();
    type = type || 'text';
    if (title === "" || value === "" || type === "") {
      throw new Error("empty key / value / type");
    }

    var key = this.keys;
    var author = Blockchain.transaction.from;
    var notePad = new NotePadProp();
    notePad.author = author;
    notePad.key = key;
    notePad.title = title;
    notePad.type = type;
    notePad.value = value;


    var userPads = this.userPads.get(author);
    if (userPads) {
      userPads.unshift(key)
    } else {
      userPads = [key];
    }

    this.userPads.set(author, userPads)
    this.notePads.set(key, notePad);
    this.keys += 1;
    return notePad;
  },

  /**
   * getSize
   * @returns {number}
   */
  len: function () {
    return this.keys;
  },

  /**
   * getNotePad
   * @param key
   */
  getNotePad: function (key) {
    if (key === "") {
      throw new Error("empty key")
    }
    return this.notePads.get(key);
  },

  /**
   * getAuthorNotePads
   * @param author
   * @returns {Array}
   */
  getAuthorNotePads: function (author) {
    if (author === "") {
      throw new Error("empty author")
    }
    var userPads = this.userPads.get(author);
    var notePads = [];
    if (userPads) {
      for (var i = 0; i < userPads.length; i++) {
        var key = userPads[i];
        var notePad = this.notePads.get(key);
        notePads.push(notePad)
      }
    }
    return notePads;
  },

  /**
   * getAuthorNotePadsPagination
   * @param author
   * @param current
   * @param pageSize
   * @returns {{data: Array, total: number, current: (Number|number|*), pageSize: (Number|number|*), pages: number}}
   */
  getAuthorNotePadsPagination: function (author, current, pageSize) {
    current = parseInt(current) || 1;
    pageSize = parseInt(pageSize) || 10;
    if (author === "") {
      throw new Error("empty author")
    }
    var start = (current - 1) * pageSize;
    var end = current * pageSize;
    var userPads = this.userPads.get(author);
    var notePads = [];
    var total = userPads ? userPads.length : 0;
    var pages = total % pageSize === 0 ? total / pageSize : Math.floor(total / pageSize) + 1;
    if (userPads) {
      var paginationUserPads = userPads.slice(start, end);
      for (var i = 0; i < paginationUserPads.length; i++) {
        var key = paginationUserPads[i];
        var notePad = this.notePads.get(key);
        notePads.push(notePad)
      }
    }
    return {
      data: notePads,
      total: total,
      current: current,
      pageSize: pageSize,
      pages: pages,
    }
  }
};
module.exports = NotePad;