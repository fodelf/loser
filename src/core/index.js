require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')
//版本号
var version = '1.0.0'
//基类
var loser = function() {}
//原型扩展
loser.fn = loser.prototype = {
  //构造器斧正
  constructor: loser,
  //版本信息
  loser: version
}
/**
 * 测试方法
 */
loser.test = loser.fn.test = function() {
  alert('s')
}

export default loser
