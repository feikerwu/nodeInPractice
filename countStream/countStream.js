const { Writable } = require('stream')
const path = require('path')
const fs = require('fs')

/**
 * 扩展Writable用于计算某个正则出现的次数
 *
 * @class countStream
 * @extends {Writable}
 */
export default class countStream extends Writable {
  constructor(reg, filePath) {
    this.reg = reg
    this.filePath = filePath
    this.count = 0
    this.validate()
  }

  write(chuck, encoding, cb) {
    const matches = chuck.toString().macth(this.reg)
    if (matches) {
      this.count += matches.length
    }
  }

  end() {
    this.emit('total', this.count)
  }

  validate() {
    try {
      this.validateReg(this.reg)
      this.validateFile(this.filePath)
    } catch (err) {
      console.error(err)
    }
  }

  validateReg(reg) {
    return reg instanceof RegExp ? true : new Error('reg in not a validate RegExp')
  }

  validateFile(filePath) {
    const fileStat = fs.statSync(filePath)
    if (!fileStat.isFile()) {
      return new Error('file not exited')
    }
    return true
  }

}


