/**
 * jsBridge 客户端与前端的交互
 * Created by liminshen on 2017/5/8.
 */
'use strict';

var uId = 1314;
function JsBridge(options,cb) {
	var options = options || {};
	this.schemeProtocol = options.protocol || 'jsbridge';
	this.params = options.params;
	this.action = options.action;
	this.cbName = 'jsBridgeFn'+(uId++);
	this.cb = cb;
	this.init();
}
JsBridge.prototype = {
	constructor : JsBridge,
	init : function () {
		this.initUrl();
		this.initJsBridgeFn();
		this.initIframe();
		this.loadIframe();
	},
	initUrl : function () {
		this.url = this.schemeProtocol+'://'+this.action+'?';
		for(var name in this.params){
			this.url += name + '=' + this.params[name] +'&';
		}
		this.url += 'callBackFunction' + '=' + this.cbName;
	},
	initIframe : function () {
		this.iframe = document.createElement('iframe');
		this.iframe.style.width = '1px';
		this.iframe.style.height = '1px';
		this.iframe.style.display = 'none';
		this.iframe.src = this.url;
	},
	initJsBridgeFn : function () {
		var self = this;
		window[this.cbName] = function (repsonse) {
			self.cb(repsonse);
		}
	},
	loadIframe : function () {
		var self = this;
		document.body.appendChild(this.iframe);
		setTimeout(function() {
			self.iframe.remove();
		}, 100);
	}
}
module.exports = JsBridge;
