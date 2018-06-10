/**
 * 由 json-server 去抓取此 JSON 資料快速製造 Fake REST API
 * 這裡的 DataBase 資料是暫存在記憶體中
 */
const data = require('./db.json');

module.exports = () => data;
