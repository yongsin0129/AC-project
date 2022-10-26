/*
進階加密標準（英語：Advanced Encryption Standard，縮寫：AES）
128的16位key,16位iv
192的24位key,16位iv
256的32位key,16位iv

因為短網址只能用 5 個數字，所以後來不用 AES 加密，改用 buffer
*/
const crypto = require('crypto')

function aesEncrypt (data) {
  const iv = '1234567890abcdef'
  const key = '1234567890abcdefghijklmn'
  const cipher = crypto.createCipheriv('aes192', key, iv)

  let crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')

  return crypted
}

module.exports = aesEncrypt
// const data = 'Hello, this is a secret'
// const encrypted = aesEncrypt(data)
// console.log(encrypted)
