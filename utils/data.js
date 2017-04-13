let wilddog = require('./config')


//获取词条Reference
const getRef = () => {
  return wilddog.sync().ref('/leaves')
}

exports.getref = getRef;