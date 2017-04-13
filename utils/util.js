//公用方法

module.exports = {
  /**检测类型 */
  _testType(obj){
    return Object.prototype.toString.call(obj);
  },

  /**检测类型是否是Null、undefined或者'' */
  isNull(obj){
    return obj === '' || obj === undefined || obj === null ? true : false;
  },

  /**检测类型是否是Array */
  isArray(arr){
    const typeName = '[object Array]';
    return (this._testType(arr) === typeName);
  },

  /**检测类型是否是Function */
  isFunction(func){
    const typeName = '[object Function]';
    return (this._testType(func) === typeName);
  },

  /**检测类型是否是Object */
  isObject(obj){
    const typeName = '[object Object]';
    return (this._testType(obj) === typeName);
  },

  /**检测类型是否是String */
  isString(str){
    const typeName = '[object String]';
    return (this._testType(str) === typeName);
  },

  /**检测类型是否是Number */
  isNumber(num){
    const typeName = '[object Number]';
    return (this._testType(num) === typeName);
  },

  /**检测类型是否是Boolean */
  isBoolean(flag){
    const typeName = '[object Boolean]';
    return (this._testType(flag) === typeName);
  },

  /**
   * 以数组返回当前时间[年月日]
   *
   */
  getDateArr(){
    let time = new Date(),
        year = time.getFullYear(),
        m = time.getMonth() + 1,
        month = m < 10 ? ('0' + m) : m,
        d = time.getDate(),
        day = d < 10 ? ('0' + d) : d,
        outArr = [];

    outArr.push(year.toString());
    outArr.push(month.toString());
    outArr.push(day.toString());

    return outArr;
	},
	
  /**
   * 以数组返回当前时间[时分秒]
   *
   */
  getTimesArr(){
    let time = new Date(),
        hours = time.getHours(),
        m = time.getMinutes(),
        minutes = m < 10 ? ('0' + m) : m,
        s = time.getSeconds(),
        seconds = s < 10 ? ('0' + s) : s,
        outArr = [];

    outArr.push(hours.toString());
    outArr.push(minutes.toString());
    outArr.push(seconds.toString());

    return outArr;
	},
	
  /**
   * 来获得一个当前时间的整数时间戳
   *
   */
  now(){
    const tArr = this.getDateArr().concat(this.getTimesArr());
    return tArr.join('');
	},
	
  /**
   * 获取当前日期(年月日)
   *
   * separator:分隔符号
   *
   */
  getDate(sepr = '-'){
    const dateArr = this.getDateArr();

    return `${dateArr[0]}${sepr}${dateArr[1]}${sepr}${dateArr[2]}`;
	},
	
  /**
   * 获取当前时间(时分秒)
   *
   */
  getTimes(sepr = ':'){
    const dateArr = this.getTimesArr();

    return `${dateArr[0]}${sepr}${dateArr[1]}${sepr}${dateArr[2]}`;

  },

  /**
   * 去除html标签
   *
   */
  filterContent(str = ''){
    
    return str.replace(/<\/?[^>]*>/g,'');
  }

}