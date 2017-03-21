/*!
 * is-type-of - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var utils = require('core-util-is');
var isStearm = require('isstream');
var isClass = require('is-class');

/**
 * Expose all methods in core-util-is
 */

Object.keys(utils).map(function (name) {
  exports[transform(name)] = utils[name];
});

/**
 * Stream detected by isstream
 */

exports.stream = isStearm;
exports.readableStream = isStearm.isReadable;
exports.writableStream = isStearm.isWritable;
exports.duplexStream = isStearm.isDuplex;

/**
 * Class detected by is-class
 */
 exports.class = isClass;

/**
 * Extend method
 */

exports.finite = function (obj) {
  return Number.isFinite(obj);
};

exports.NaN = function (obj) {
  return Number.isNaN(obj);
};

exports.generator = function (obj) {
  return obj
    && 'function' === typeof obj.next
    && 'function' === typeof obj.throw;
};

exports.generatorFunction = function (obj) {
  return obj
    && obj.constructor
    && 'GeneratorFunction' === obj.constructor.name;
};

exports.promise = function (obj) {
  return obj
    && 'function' === typeof obj.then;
};

var MAX_INT_31 = Math.pow(2, 31);

exports.int = function (obj) {
  return utils.isNumber(obj)
    && obj % 1 === 0;
};

exports.int32 = function (obj) {
  return exports.int(obj)
    && obj < MAX_INT_31
    && obj >= -MAX_INT_31;
};

exports.long = function (obj) {
  return exports.int(obj)
    && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.Long = function (obj) {
  return exports.object(obj)
    && exports.number(obj.high)
    && exports.number(obj.low);
};

exports.double = function (obj) {
  return utils.isNumber(obj)
    && !isNaN(obj)
    && obj % 1 !== 0;
};

/**
 * transform isNull type to null
 * @param {[type]} m [description]
 * @return {[type]} [description]
 */

function transform(m) {
  var name = m.slice(2);
  name = name[0].toLowerCase() + name.slice(1);
  return name;
}
