let wilddog = require('./config')


//获取词条Reference
const getRef = () => {
  return wilddog.sync().ref('/leaves')
}

//获取评论
const getCommentsRef = () => {
  return wilddog.sync().ref('/comments')
}

exports.getref = getRef;
exports.getCommentsRef = getCommentsRef;