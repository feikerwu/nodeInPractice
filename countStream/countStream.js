const {
    Writable
} = require('stream')
const path = require('path')
const fs = require('fs')

/**
 * 扩展Writable用于计算某个正则出现的次数
 *
 * @class countStream
 * @extends {Writable}
 */
class countStream extends Writable {
    constructor(reg) {
        super()
        this.reg = reg instanceof RegExp ? reg : new RegExp(reg, 'ig')
        this.count = 0
        this.validate()
    }

    // 重写writable的write函数
    write(chuck, encoding, cb) {
        const matches = chuck.toString().match(this.reg)
        if (matches) {
            this.count += matches.length
        }
    }

    // 重写wriatble的end函数
    end() {
        this.emit('total', this.count)
    }

    validate() {
        try {
            this.validateReg(this.reg)
        } catch (err) {

        }
    }

    validateReg(reg) {
        return reg instanceof RegExp ? true : new Error('reg in not a validate RegExp')
    }
}

module.exports = countStream