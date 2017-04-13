//配置数据源
const wilddogConfig = {
    authDomain: 'leaves-99.wilddog.com',
    syncURL: 'https://leaves-99.wilddogio.com'
}

//require wilddog.js
var wilddog = require('./wilddog-weapp-all')

//应用初始化
wilddog.initializeApp(wilddogConfig)

module.exports = wilddog


