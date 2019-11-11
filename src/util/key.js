import CryptoJS from "crypto-js";

var key = CryptoJS.AES.encrypt("b118421990c33fd3", "secretkey123").toString();
export default key;
