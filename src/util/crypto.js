/**

//  * 签名
//  * @param token 身份令牌
//  * @param timestamp 签名时间戳
//  * @param data 签名数据
//  */

// export { aes, md5, sha256, base64 };
import CryptoJS from "crypto-js";
import aesKey from "./key";
var key = CryptoJS.AES.decrypt(aesKey, "secretkey123");
var crypto = {
  Encrypt: word => {
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  Decrypt: word => {
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    var result = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
    return result;
  }
};
export default crypto;
