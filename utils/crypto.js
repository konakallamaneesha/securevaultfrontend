import CryptoJS from "crypto-js";

export const encryptPassword = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptPassword = (cipher, key) => {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};