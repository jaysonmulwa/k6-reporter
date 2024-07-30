(()=>{var e={481:e=>{e.exports=function e(r,t,n){function i(a,o){if(!t[a]){if(!r[a]){if(s)return s(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=t[a]={exports:{}};r[a][0].call(l.exports,(function(e){return i(r[a][1][e]||e)}),l,l.exports,e,r,t,n)}return t[a].exports}for(var s=void 0,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,r,t){"use strict";var n=e("fs"),i=e("path"),s=e("./utils"),a=!1,o=e("../package.json").version,c="locals",l=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"],d=l.concat("cache"),u=/^\uFEFF/;function h(e,r){var i;if(r.some((function(r){return i=t.resolveInclude(e,r,!0),n.existsSync(i)})))return i}function m(e,r){var n,i=e.filename,s=arguments.length>1;if(e.cache){if(!i)throw new Error("cache option requires a filename");if(n=t.cache.get(i))return n;s||(r=f(i).toString().replace(u,""))}else if(!s){if(!i)throw new Error("Internal EJS error: no file name or template provided");r=f(i).toString().replace(u,"")}return n=t.compile(r,e),e.cache&&t.cache.set(i,n),n}function p(e,r,n){var i;if(!n){if("function"==typeof t.promiseImpl)return new t.promiseImpl((function(t,n){try{t(i=m(e)(r))}catch(e){n(e)}}));throw new Error("Please provide a callback function")}try{i=m(e)(r)}catch(e){return n(e)}n(null,i)}function f(e){return t.fileLoader(e)}function v(e,r){var i=s.shallowCopy({},r);if(i.filename=function(e,r){var i,s,a=r.views,o=/^[A-Za-z]+:\\|^\//.exec(e);if(o&&o.length)e=e.replace(/^\/*/,""),i=Array.isArray(r.root)?h(e,r.root):t.resolveInclude(e,r.root||"/",!0);else if(r.filename&&(s=t.resolveInclude(e,r.filename),n.existsSync(s)&&(i=s)),!i&&Array.isArray(a)&&(i=h(e,a)),!i&&"function"!=typeof r.includer)throw new Error('Could not find the include file "'+r.escapeFunction(e)+'"');return i}(e,i),"function"==typeof r.includer){var a=r.includer(e,i.filename);if(a&&(a.filename&&(i.filename=a.filename),a.template))return m(i,a.template)}return m(i)}function g(e,r,t,n,i){var s=r.split("\n"),a=Math.max(n-3,0),o=Math.min(s.length,n+3),c=i(t),l=s.slice(a,o).map((function(e,r){var t=r+a+1;return(t==n?" >> ":"    ")+t+"| "+e})).join("\n");throw e.path=c,e.message=(c||"ejs")+":"+n+"\n"+l+"\n\n"+e.message,e}function b(e){return e.replace(/;(\s*$)/,"$1")}function _(e,r){r=r||{};var n={};this.templateText=e,this.mode=null,this.truncate=!1,this.currentLine=1,this.source="",n.client=r.client||!1,n.escapeFunction=r.escape||r.escapeFunction||s.escapeXML,n.compileDebug=!1!==r.compileDebug,n.debug=!!r.debug,n.filename=r.filename,n.openDelimiter=r.openDelimiter||t.openDelimiter||"<",n.closeDelimiter=r.closeDelimiter||t.closeDelimiter||">",n.delimiter=r.delimiter||t.delimiter||"%",n.strict=r.strict||!1,n.context=r.context,n.cache=r.cache||!1,n.rmWhitespace=r.rmWhitespace,n.root=r.root,n.includer=r.includer,n.outputFunctionName=r.outputFunctionName,n.localsName=r.localsName||t.localsName||c,n.views=r.views,n.async=r.async,n.destructuredLocals=r.destructuredLocals,n.legacyInclude=void 0===r.legacyInclude||!!r.legacyInclude,n.strict?n._with=!1:n._with=void 0===r._with||r._with,this.opts=n,this.regex=this.createRegex()}t.cache=s.cache,t.fileLoader=n.readFileSync,t.localsName=c,t.promiseImpl=new Function("return this;")().Promise,t.resolveInclude=function(e,r,t){var n=i.dirname,s=i.extname,a=(0,i.resolve)(t?r:n(r),e);return s(e)||(a+=".ejs"),a},t.compile=function(e,r){return r&&r.scope&&(a||(console.warn("`scope` option is deprecated and will be removed in EJS 3"),a=!0),r.context||(r.context=r.scope),delete r.scope),new _(e,r).compile()},t.render=function(e,r,t){var n=r||{},i=t||{};return 2==arguments.length&&s.shallowCopyFromList(i,n,l),m(i,e)(n)},t.renderFile=function(){var e,r,t,n=Array.prototype.slice.call(arguments),i=n.shift(),a={filename:i};return"function"==typeof arguments[arguments.length-1]&&(e=n.pop()),n.length?(r=n.shift(),n.length?s.shallowCopy(a,n.pop()):(r.settings&&(r.settings.views&&(a.views=r.settings.views),r.settings["view cache"]&&(a.cache=!0),(t=r.settings["view options"])&&s.shallowCopy(a,t)),s.shallowCopyFromList(a,r,d)),a.filename=i):r={},p(a,r,e)},t.Template=_,t.clearCache=function(){t.cache.reset()},_.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"},_.prototype={createRegex:function(){var e="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)",r=s.escapeRegExpChars(this.opts.delimiter),t=s.escapeRegExpChars(this.opts.openDelimiter),n=s.escapeRegExpChars(this.opts.closeDelimiter);return e=e.replace(/%/g,r).replace(/</g,t).replace(/>/g,n),new RegExp(e)},compile:function(){var e,r,t,n=this.opts,a="",o="",c=n.escapeFunction,l=n.filename?JSON.stringify(n.filename):"undefined";if(!this.source){if(this.generateSource(),a+='  var __output = "";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n',n.outputFunctionName&&(a+="  var "+n.outputFunctionName+" = __append;\n"),n.destructuredLocals&&n.destructuredLocals.length){for(var d="  var __locals = ("+n.localsName+" || {}),\n",u=0;u<n.destructuredLocals.length;u++){var h=n.destructuredLocals[u];u>0&&(d+=",\n  "),d+=h+" = __locals."+h}a+=d+";\n"}!1!==n._with&&(a+="  with ("+n.localsName+" || {}) {\n",o+="  }\n"),o+="  return __output;\n",this.source=a+this.source+o}e=n.compileDebug?"var __line = 1\n  , __lines = "+JSON.stringify(this.templateText)+"\n  , __filename = "+l+";\ntry {\n"+this.source+"} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n":this.source,n.client&&(e="escapeFn = escapeFn || "+c.toString()+";\n"+e,n.compileDebug&&(e="rethrow = rethrow || "+g.toString()+";\n"+e)),n.strict&&(e='"use strict";\n'+e),n.debug&&console.log(e),n.compileDebug&&n.filename&&(e=e+"\n//# sourceURL="+l+"\n");try{if(n.async)try{t=new Function("return (async function(){}).constructor;")()}catch(e){throw e instanceof SyntaxError?new Error("This environment does not support async/await"):e}else t=Function;r=new t(n.localsName+", escapeFn, include, rethrow",e)}catch(e){throw e instanceof SyntaxError&&(n.filename&&(e.message+=" in "+n.filename),e.message+=" while compiling ejs\n\n",e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n",e.message+="https://github.com/RyanZim/EJS-Lint",n.async||(e.message+="\n",e.message+="Or, if you meant to create an async function, pass `async: true` as an option.")),e}var m=n.client?r:function(e){return r.apply(n.context,[e||{},c,function(r,t){var i=s.shallowCopy({},e);return t&&(i=s.shallowCopy(i,t)),v(r,n)(i)},g])};if(n.filename&&"function"==typeof Object.defineProperty){var p=n.filename,f=i.basename(p,i.extname(p));try{Object.defineProperty(m,"name",{value:f,writable:!1,enumerable:!1,configurable:!0})}catch(e){}}return m},generateSource:function(){this.opts.rmWhitespace&&(this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")),this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var e=this,r=this.parseTemplateText(),t=this.opts.delimiter,n=this.opts.openDelimiter,i=this.opts.closeDelimiter;r&&r.length&&r.forEach((function(s,a){var o;if(0===s.indexOf(n+t)&&0!==s.indexOf(n+t+t)&&(o=r[a+2])!=t+i&&o!="-"+t+i&&o!="_"+t+i)throw new Error('Could not find matching close tag for "'+s+'".');e.scanLine(s)}))},parseTemplateText:function(){for(var e,r=this.templateText,t=this.regex,n=t.exec(r),i=[];n;)0!==(e=n.index)&&(i.push(r.substring(0,e)),r=r.slice(e)),i.push(n[0]),r=r.slice(n[0].length),n=t.exec(r);return r&&i.push(r),i},_addOutput:function(e){if(this.truncate&&(e=e.replace(/^(?:\r\n|\r|\n)/,""),this.truncate=!1),!e)return e;e=(e=(e=(e=e.replace(/\\/g,"\\\\")).replace(/\n/g,"\\n")).replace(/\r/g,"\\r")).replace(/"/g,'\\"'),this.source+='    ; __append("'+e+'")\n'},scanLine:function(e){var r,t=this.opts.delimiter,n=this.opts.openDelimiter,i=this.opts.closeDelimiter;switch(r=e.split("\n").length-1,e){case n+t:case n+t+"_":this.mode=_.modes.EVAL;break;case n+t+"=":this.mode=_.modes.ESCAPED;break;case n+t+"-":this.mode=_.modes.RAW;break;case n+t+"#":this.mode=_.modes.COMMENT;break;case n+t+t:this.mode=_.modes.LITERAL,this.source+='    ; __append("'+e.replace(n+t+t,n+t)+'")\n';break;case t+t+i:this.mode=_.modes.LITERAL,this.source+='    ; __append("'+e.replace(t+t+i,t+i)+'")\n';break;case t+i:case"-"+t+i:case"_"+t+i:this.mode==_.modes.LITERAL&&this._addOutput(e),this.mode=null,this.truncate=0===e.indexOf("-")||0===e.indexOf("_");break;default:if(this.mode){switch(this.mode){case _.modes.EVAL:case _.modes.ESCAPED:case _.modes.RAW:e.lastIndexOf("//")>e.lastIndexOf("\n")&&(e+="\n")}switch(this.mode){case _.modes.EVAL:this.source+="    ; "+e+"\n";break;case _.modes.ESCAPED:this.source+="    ; __append(escapeFn("+b(e)+"))\n";break;case _.modes.RAW:this.source+="    ; __append("+b(e)+")\n";break;case _.modes.COMMENT:break;case _.modes.LITERAL:this._addOutput(e)}}else this._addOutput(e)}this.opts.compileDebug&&r&&(this.currentLine+=r,this.source+="    ; __line = "+this.currentLine+"\n")}},t.escapeXML=s.escapeXML,t.__express=t.renderFile,t.VERSION=o,t.name="ejs","undefined"!=typeof window&&(window.ejs=t)},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(e,r,t){"use strict";var n=/[|\\{}()[\]^$+*?.]/g;t.escapeRegExpChars=function(e){return e?String(e).replace(n,"\\$&"):""};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},s=/[&<>'"]/g;function a(e){return i[e]||e}t.escapeXML=function(e){return null==e?"":String(e).replace(s,a)},t.escapeXML.toString=function(){return Function.prototype.toString.call(this)+';\nvar _ENCODE_HTML_RULES = {\n      "&": "&amp;"\n    , "<": "&lt;"\n    , ">": "&gt;"\n    , \'"\': "&#34;"\n    , "\'": "&#39;"\n    }\n  , _MATCH_HTML = /[&<>\'"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n'},t.shallowCopy=function(e,r){for(var t in r=r||{})e[t]=r[t];return e},t.shallowCopyFromList=function(e,r,t){for(var n=0;n<t.length;n++){var i=t[n];void 0!==r[i]&&(e[i]=r[i])}return e},t.cache={_data:{},set:function(e,r){this._data[e]=r},get:function(e){return this._data[e]},remove:function(e){delete this._data[e]},reset:function(){this._data={}}},t.hyphenToCamel=function(e){return e.replace(/-[a-z]/g,(function(e){return e[1].toUpperCase()}))}},{}],3:[function(e,r,t){},{}],4:[function(e,r,t){(function(e){function r(e,r){for(var t=0,n=e.length-1;n>=0;n--){var i=e[n];"."===i?e.splice(n,1):".."===i?(e.splice(n,1),t++):t&&(e.splice(n,1),t--)}if(r)for(;t--;t)e.unshift("..");return e}function n(e,r){if(e.filter)return e.filter(r);for(var t=[],n=0;n<e.length;n++)r(e[n],n,e)&&t.push(e[n]);return t}t.resolve=function(){for(var t="",i=!1,s=arguments.length-1;s>=-1&&!i;s--){var a=s>=0?arguments[s]:e.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(t=a+"/"+t,i="/"===a.charAt(0))}return(i?"/":"")+(t=r(n(t.split("/"),(function(e){return!!e})),!i).join("/"))||"."},t.normalize=function(e){var s=t.isAbsolute(e),a="/"===i(e,-1);return(e=r(n(e.split("/"),(function(e){return!!e})),!s).join("/"))||s||(e="."),e&&a&&(e+="/"),(s?"/":"")+e},t.isAbsolute=function(e){return"/"===e.charAt(0)},t.join=function(){var e=Array.prototype.slice.call(arguments,0);return t.normalize(n(e,(function(e,r){if("string"!=typeof e)throw new TypeError("Arguments to path.join must be strings");return e})).join("/"))},t.relative=function(e,r){function n(e){for(var r=0;r<e.length&&""===e[r];r++);for(var t=e.length-1;t>=0&&""===e[t];t--);return r>t?[]:e.slice(r,t-r+1)}e=t.resolve(e).substr(1),r=t.resolve(r).substr(1);for(var i=n(e.split("/")),s=n(r.split("/")),a=Math.min(i.length,s.length),o=a,c=0;c<a;c++)if(i[c]!==s[c]){o=c;break}var l=[];for(c=o;c<i.length;c++)l.push("..");return(l=l.concat(s.slice(o))).join("/")},t.sep="/",t.delimiter=":",t.dirname=function(e){if("string"!=typeof e&&(e+=""),0===e.length)return".";for(var r=e.charCodeAt(0),t=47===r,n=-1,i=!0,s=e.length-1;s>=1;--s)if(47===(r=e.charCodeAt(s))){if(!i){n=s;break}}else i=!1;return-1===n?t?"/":".":t&&1===n?"/":e.slice(0,n)},t.basename=function(e,r){var t=function(e){"string"!=typeof e&&(e+="");var r,t=0,n=-1,i=!0;for(r=e.length-1;r>=0;--r)if(47===e.charCodeAt(r)){if(!i){t=r+1;break}}else-1===n&&(i=!1,n=r+1);return-1===n?"":e.slice(t,n)}(e);return r&&t.substr(-1*r.length)===r&&(t=t.substr(0,t.length-r.length)),t},t.extname=function(e){"string"!=typeof e&&(e+="");for(var r=-1,t=0,n=-1,i=!0,s=0,a=e.length-1;a>=0;--a){var o=e.charCodeAt(a);if(47!==o)-1===n&&(i=!1,n=a+1),46===o?-1===r?r=a:1!==s&&(s=1):-1!==r&&(s=-1);else if(!i){t=a+1;break}}return-1===r||-1===n||0===s||1===s&&r===n-1&&r===t+1?"":e.slice(r,n)};var i=function(e,r,t){return e.substr(r,t)}}).call(this,e("_process"))},{_process:5}],5:[function(e,r,t){var n,i,s=r.exports={};function a(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(r){try{return n.call(null,e,0)}catch(r){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{i="function"==typeof clearTimeout?clearTimeout:o}catch(e){i=o}}();var l,d=[],u=!1,h=-1;function m(){u&&l&&(u=!1,l.length?d=l.concat(d):h=-1,d.length&&p())}function p(){if(!u){var e=c(m);u=!0;for(var r=d.length;r;){for(l=d,d=[];++h<r;)l&&l[h].run();h=-1,r=d.length}l=null,u=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===o||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(r){try{return i.call(null,e)}catch(r){return i.call(this,e)}}}(e)}}function f(e,r){this.fun=e,this.array=r}function v(){}s.nextTick=function(e){var r=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)r[t-1]=arguments[t];d.push(new f(e,r)),1!==d.length||u||c(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=v,s.addListener=v,s.once=v,s.off=v,s.removeListener=v,s.removeAllListeners=v,s.emit=v,s.prependListener=v,s.prependOnceListener=v,s.listeners=function(e){return[]},s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},{}],6:[function(e,r,t){r.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"3.1.6",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",license:"Apache-2.0",bin:{ejs:"./bin/cli.js"},main:"./lib/ejs.js",jsdelivr:"ejs.min.js",unpkg:"ejs.min.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{jake:"^10.6.1"},devDependencies:{browserify:"^16.5.1",eslint:"^6.8.0","git-directory-deploy":"^1.5.1",jsdoc:"^3.6.4","lru-cache":"^4.0.1",mocha:"^7.1.1","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"mocha"}}},{}]},{},[1])(1)},748:e=>{"use strict";e.exports='<!DOCTYPE html>\r\n<html lang="en">\r\n  <head> \r\n    <meta charset="UTF-8" />\r\n    <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css" crossorigin="anonymous">\r\n\r\n    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" crossorigin="anonymous">\r\n\r\n    <link rel="shortcut icon" href="https://raw.githubusercontent.com/benc-uk/k6-reporter/main/assets/icon.png" type="image/png">\r\n\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r\n    <title>K6 Load Test: <%= title %></title>\r\n    <style>\r\n      body {\r\n        margin: 1rem;\r\n      }\r\n      footer { \r\n        float: right;\r\n        font-size: 0.8rem;\r\n        color: #777;\r\n      }\r\n      footer a {\r\n        text-decoration: none;\r\n        color: #777;\r\n      }\r\n      .failed {\r\n        background-color: #ff6666 !important;\r\n      }     \r\n      .good {\r\n        background-color: #3abe3a !important;\r\n      }   \r\n      .inactive {\r\n        background-color: #666 !important;\r\n        color: #777 !important;\r\n      }\r\n      td.failed {\r\n        font-weight: bold;\r\n      }\r\n      h2 {\r\n        padding-bottom: 4px;\r\n        border-bottom: solid 3px #cccccc;\r\n      }\r\n      .tabs {\r\n        display: flex;\r\n        flex-wrap: wrap; \r\n      }\r\n      .tabs label {\r\n        order: 1; \r\n        display: block;\r\n        padding: 1rem 2rem;\r\n        margin-right: 0.2rem;\r\n        cursor: pointer;\r\n        color: #666;\r\n        background: #ddd;\r\n        font-weight: bold;\r\n        font-size: 1.2rem;\r\n        flex: 1 1;\r\n        transition: background ease 0.2s;\r\n        border-top-left-radius: 0.3rem;\r\n        border-top-right-radius: 0.3rem;\r\n        border-color: #ccc;\r\n        border-style: solid;\r\n        border-width: 2px 2px 0px;\r\n        box-shadow: inset 0px -3px 7px -1px rgba(0,0,0,0.33);\r\n      }\r\n      .tabs .tab {\r\n        order: 99;\r\n        flex-grow: 1;\r\n        width: 100%;\r\n        display: none;\r\n        padding: 1rem;\r\n        background: #fff;\r\n      }\r\n      .tabs input[type="radio"] {\r\n        display: none;\r\n      }\r\n      .tabs input[type="radio"]:checked + label {\r\n        background: #fff;\r\n        box-shadow: none;\r\n        color: #000;\r\n      }\r\n      .tabs input[type="radio"]:checked + label + .tab {\r\n        display: block;\r\n      }\r\n      .box {\r\n        flex: 1 1;\r\n        border-radius: 0.3rem;\r\n        background-color: #3abe3a;\r\n        margin: 1rem;\r\n        padding: 0.5rem;\r\n        font-size: 2vw; \r\n        box-shadow: 0px 4px 7px -1px rgba(0,0,0,0.49);\r\n        color: white;\r\n        position: relative;\r\n        overflow: hidden;\r\n      }\r\n      .box h4 {\r\n        margin: 0;\r\n        padding-bottom: 0.5rem;\r\n        text-align: center;\r\n        position: relative;\r\n        z-index: 50;\r\n      }\r\n      .row {\r\n        display: flex;\r\n      }\r\n      .row div {\r\n        flex: 1 1;\r\n        text-align: center;\r\n        margin-bottom: 0.5rem;\r\n      }\r\n      .bignum {\r\n        position: relative;\r\n        font-size: min(6vw, 80px);\r\n        z-index: 20;\r\n      }\r\n      table {\r\n        font-size: min(2vw, 22px);\r\n        width: 100%;\r\n      }\r\n      .icon { \r\n        position: absolute;\r\n        top: 60%;\r\n        left: 50%;\r\n        transform: translate(-50%, -50%);\r\n        color: #0000002d;\r\n        font-size: 8vw;\r\n        z-index: 1;\r\n      }\r\n      .metricbox {\r\n        background-color: #5697e2;\r\n        font-size: 3vw;\r\n        height: auto;\r\n      }\r\n      .metricbox .row {\r\n        position: relative;\r\n        z-index: 20;\r\n      }\r\n    </style>\r\n  </head>\r\n\r\n  <body>\r\n    <h1>\r\n      <svg style="vertical-align:middle" width="50" height="45" viewBox="0 0 50 45" fill="none" class="footer-module--logo--_lkxx"><path d="M31.968 34.681a2.007 2.007 0 002.011-2.003c0-1.106-.9-2.003-2.011-2.003a2.007 2.007 0 00-2.012 2.003c0 1.106.9 2.003 2.012 2.003z" fill="#7D64FF"></path><path d="M39.575 0L27.154 16.883 16.729 9.31 0 45h50L39.575 0zM23.663 37.17l-2.97-4.072v4.072h-2.751V22.038l2.75 1.989v7.66l3.659-5.014 2.086 1.51-3.071 4.21 3.486 4.776h-3.189v.001zm8.305.17c-2.586 0-4.681-2.088-4.681-4.662 0-1.025.332-1.972.896-2.743l4.695-6.435 2.086 1.51-2.239 3.07a4.667 4.667 0 013.924 4.6c0 2.572-2.095 4.66-4.681 4.66z" fill="#7D64FF"></path></svg> \r\n      &nbsp; K6 Load Test: <%= title %>\r\n    </h1>\r\n\r\n    <div class="row">\r\n      <div class="box inactive">\r\n        <i class="fas fa-globe icon"></i>\r\n        <h4>Total Requests</h4>\r\n        <div class="bignum"><%= http_and_grpc_req_count %></div>\r\n      </div>\r\n      <% if(data.metrics.http_req_failed && data.metrics.http_req_failed.values) { %>\r\n        <div class="box <% if(data.metrics.http_req_failed.values.passes > 0) { %> failed <% } %>">\r\n          <i class="far fa-times-circle icon"></i>\r\n          <h4>Failed Requests</h4>\r\n          <div class="bignum"><%= data.metrics.http_req_failed.values.passes %></div>\r\n        </div> \r\n      <% } %>     \r\n      <div class="box <% if(thresholdFailures > 0) { %> failed <% } %>">\r\n        <i class="fas fa-chart-bar icon"></i>\r\n        <h4>Breached Thresholds</h4>\r\n        <div class="bignum"><%= thresholdFailures %></div>\r\n      </div>\r\n      <div class="box <% if(checkFailures > 0) { %> failed <% } %>">\r\n        <i class="fas fa-eye icon"></i>\r\n        <h4>Failed Checks</h4>\r\n        <div class="bignum"><%= checkFailures %></div>\r\n      </div>\r\n    </div>\r\n\r\n    <br>\r\n    \r\n    <div class="tabs">\r\n      <input type="radio" name="tabs" id="tabone" checked="checked">\r\n      <label for="tabone"><i class="far fa-clock"></i> &nbsp; Request Metrics</label>\r\n      <div class="tab">\r\n        <table class="pure-table pure-table-striped">\r\n          <tbody>\r\n            <thead>\r\n              <tr>\r\n                <th></th>\r\n                <th>Count</th>\r\n                <th>Rate</th>\r\n                <th>Average</th>\r\n                <th>Maximum</th>\r\n                <th>Median</th> \r\n                <th>Minimum</th>\r\n                <th>90th Percentile</th>\r\n                <th>95th Percentile</th>\r\n              </tr>\r\n            </thead>\r\n            \r\n            <% function checkFailed(metric, valName) {\r\n                if(!metric.thresholds) return \'\'\r\n                for(thres in metric.thresholds) {\r\n                  if(thres.includes(valName)) {\r\n                    if(!metric.thresholds[thres].ok) return \'failed\'\r\n                    return \'good\'\r\n                  }\r\n                }\r\n              }\r\n\r\n              for(metricName of standardMetrics) { \r\n                if(!data.metrics[metricName]) { continue }\r\n                var metric = data.metrics[metricName] \r\n            %>\r\n              <tr>\r\n                <td><b><%= metricName %></b></td>\r\n\r\n                <% if(metric.values.count) { %>\r\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values.rate) { %>\r\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n                \r\n                <% if(metric.values.avg) { %>\r\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values.max) { %>\r\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>  \r\n\r\n                <% if(metric.values.med) { %>\r\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>  \r\n                \r\n                <% if(metric.values.min) { %>\r\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>   \r\n                              \r\n                <% if(metric.values[\'p(90)\']) { %>\r\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values[\'p(95)\']) { %>\r\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td> \r\n                <% } %>\r\n              </tr>\r\n            <% } %>\r\n          </tbody>\r\n        </table>\r\n        <br>\r\n\r\n        <% \r\n          first = true \r\n          var sortedMetrics = {}\r\n          Object.keys(data.metrics).sort().forEach(function(k) {\r\n            sortedMetrics[k] = data.metrics[k]\r\n          });\r\n          for(metricName in sortedMetrics) {\r\n            if(standardMetrics.includes(metricName) || otherMetrics.includes(metricName)) { continue }\r\n            var metric = sortedMetrics[metricName] \r\n        %>\r\n          <% if(first) { first = false %> <h2>Custom Metrics</h2> \r\n          <table class="pure-table pure-table-striped">\r\n            <tbody>\r\n              <thead>\r\n                <tr>\r\n                  <th></th>\r\n                  <th>Count</th>\r\n                  <th>Rate</th>\r\n                  <th>Average</th>\r\n                  <th>Maximum</th>\r\n                  <th>Median</th> \r\n                  <th>Minimum</th>\r\n                  <th>90th Percentile</th>\r\n                  <th>95th Percentile</th>\r\n                </tr>\r\n              </thead>\r\n              <% } %>\r\n              <tr>\r\n                <td><b><%= metricName %></b></td>\r\n\r\n                <% if(metric.values.count) { %>\r\n                  <td class="<%= checkFailed(metric, \'count\') %>"><%= metric.values.count.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values.rate) { %>\r\n                  <td class="<%= checkFailed(metric, \'rate\') %>"><%= metric.values.rate.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n                \r\n                <% if(metric.values.avg) { %>\r\n                  <td class="<%= checkFailed(metric, \'avg\') %>"><%= metric.values.avg.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values.max) { %>\r\n                  <td class="<%= checkFailed(metric, \'max\') %>"><%= metric.values.max.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>  \r\n\r\n                <% if(metric.values.med) { %>\r\n                  <td class="<%= checkFailed(metric, \'med\') %>"><%= metric.values.med.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>  \r\n                \r\n                <% if(metric.values.min) { %>\r\n                  <td class="<%= checkFailed(metric, \'min\') %>"><%= metric.values.min.toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>   \r\n                              \r\n                <% if(metric.values[\'p(90)\']) { %>\r\n                  <td class="<%= checkFailed(metric, \'p(90)\') %>"><%= metric.values[\'p(90)\'].toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td>\r\n                <% } %>\r\n\r\n                <% if(metric.values[\'p(95)\']) { %>\r\n                  <td class="<%= checkFailed(metric, \'p(95)\') %>"><%= metric.values[\'p(95)\'].toFixed(2) %></td>\r\n                <% } else { %>\r\n                  <td>-</td> \r\n                <% } %>\r\n              </tr>\r\n              <% } %>\r\n            </tbody>\r\n          </table>\r\n          <br>\r\n\r\n\r\n        &nbsp;&nbsp; Note. All times are in milli-seconds\r\n      </div> \r\n      \x3c!-- ---- end tab ---- --\x3e\r\n\r\n      <input type="radio" name="tabs" id="tabtwo">\r\n      <label for="tabtwo"><i class="fas fa-chart-line"></i> &nbsp; Other Stats</label>\r\n      <div class="tab">\r\n        <div class="row">\r\n          <% if (data.metrics.checks) { %>\r\n            <div class="box metricbox">\r\n              <h4>Checks</h4>\r\n              <i class="fas fa-eye icon"></i>\r\n              <div class="row"><div>Passed</div><div><%= data.metrics.checks.values.passes %></div></div>\r\n              <div class="row"><div>Failed</div><div><%= data.metrics.checks.values.fails %></div></div>\r\n            </div>\r\n          <% } %>\r\n\r\n          <% if (data.metrics.iterations) { %>\r\n            <div class="box metricbox">\r\n              <h4>Iterations</h4>\r\n              <i class="fas fa-redo icon"></i>\r\n              <div class="row"><div>Total</div><div><%= data.metrics.iterations.values.count %></div></div>\r\n              <div class="row"><div>Rate</div><div><%= data.metrics.iterations.values.rate.toFixed(2) %>/s</div></div>\r\n            </div>\r\n          <% } %>\r\n\r\n          <div class="box metricbox">\r\n            <h4>Virtual Users</h4>\r\n            <i class="fas fa-user icon"></i>\r\n            <div class="row"><div>Min</div><div><%= data.metrics.vus ? data.metrics.vus.values.min : 1 %></div></div>\r\n            <div class="row"><div>Max</div><div><%= data.metrics.vus ? data.metrics.vus.values.max : 1 %></div></div>\r\n          </div>\r\n        </div>\r\n        \r\n        <div class="row">\r\n          <% if (data.metrics.http_reqs.values.count > 0) { %>\r\n          <div class="box metricbox">\r\n            <h4>Requests</h4>\r\n            <i class="fas fa-globe icon"></i>\r\n            <div class="row"><div>Total</div><div><%= data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0 %></div></div>\r\n            <div class="row"><div>Rate</div><div><%= data.metrics.http_reqs ? data.metrics.http_reqs.values.rate.toFixed(2) : 0 %> /s</div></div>\r\n          </div>\r\n          <% } %>\r\n\r\n          <% if (data.metrics.data_received.values.count > 0) { %>\r\n          <div class="box metricbox">\r\n            <h4>Data Received</h4>\r\n            <i class="fas fa-cloud-download-alt icon"></i>\r\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_received.values.count/1000000).toFixed(2) %> MB</div></div>\r\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_received.values.rate/1000000).toFixed(2) %> mB/s</div></div>\r\n          </div>\r\n          <% } %>\r\n\r\n          <% if (data.metrics.data_sent.values.count > 0) { %>\r\n          <div class="box metricbox">\r\n            <h4>Data Sent</h4>\r\n            <i class="fas fa-cloud-upload-alt icon"></i>\r\n            <div class="row"><div>Total</div><div><%= (data.metrics.data_sent.values.count/1000000).toFixed(2) %> MB</div></div>\r\n            <div class="row"><div>Rate</div><div><%= (data.metrics.data_sent.values.rate/1000000).toFixed(2) %> mB/s</div></div>\r\n          </div>  \r\n          <% } %>\r\n\r\n        </div>\r\n      </div>  \r\n      \x3c!-- ---- end tab ---- --\x3e     \r\n\r\n      <input type="radio" name="tabs" id="tabthree">\r\n      <label for="tabthree"><i class="fas fa-tasks"></i> Checks & Groups</label>\r\n      <div class="tab">\r\n\r\n        <% for(group of data.root_group.groups) { %>\r\n          <h2>&bull; Group - <%= group.name %></h2>\r\n          <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n            <thead>\r\n              <tr>\r\n                <th>Check Name</th>\r\n                <th>Passes</th>\r\n                <th>Failures</th>\r\n              </tr>\r\n            </thead>\r\n            <% for(check of group.checks) { %>\r\n              <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\r\n                <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\r\n              </tr>\r\n            <% } %>\r\n          </table>\r\n          <br>\r\n        <% } %>\r\n\r\n        <h2>&bull; Other Checks</h2>\r\n        <table class="pure-table pure-table-horizontal" style="width: 100%">\r\n          <thead>\r\n            <tr>\r\n              <th>Check Name</th>\r\n              <th>Passes</th>\r\n              <th>Failures</th>\r\n            </tr>\r\n          </thead>\r\n          <% for(check of data.root_group.checks) { %>\r\n            <tr class="checkDetails <% if(check.fails > 0) { %>failed<% } %>">\r\n              <td width="50%"><%= check.name %></td><td><%= check.passes %></td><td><%= check.fails %></td>\r\n            </tr>\r\n          <% } %>\r\n        </table>     \r\n      </div> \r\n      \x3c!-- ---- end tab ---- --\x3e\r\n    </div>\r\n    <footer>K6 Reporter v<%= version %> - Ben Coleman 2021, <a href="https://github.com/benc-uk/k6-reporter">[GitHub]</a></footer>\r\n  </body>\r\n</html>\r\n'}},r={};function t(n){var i=r[n];if(void 0!==i)return i.exports;var s=r[n]={exports:{}};return e[n](s,s.exports,t),s.exports}t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";t.r(n),t.d(n,{htmlReport:()=>s});var e=t(481),r=t.n(e),i=t(748);function s(e,t={}){t.title||(t.title=(new Date).toISOString().slice(0,16).replace("T"," ")),t.hasOwnProperty("debug")||(t.debug=!1),console.log("[k6-reporter v2.3.0] Generating HTML summary report");let n=[];t.debug&&console.log(JSON.stringify(e,null,2));let s=0,o=0;for(let r in e.metrics)if(n.push(r),e.metrics[r].thresholds){o++;let t=e.metrics[r].thresholds;for(let e in t)t[e].ok||s++}let c=0,l=0;if(e.root_group.checks){let{passes:r,fails:t}=a(e.root_group.checks);c+=t,l+=r}for(let r of e.root_group.groups)if(r.checks){let{passes:e,fails:t}=a(r.checks);c+=t,l+=e}let d=0;return e.metrics.grpc_reqs&&(d+=e.metrics.grpc_reqs.values.count),e.metrics.http_reqs&&(d+=e.metrics.http_reqs.values.count),r().render(i,{data:e,title:t.title,standardMetrics:["grpc_req_duration","http_req_duration","http_req_waiting","http_req_connecting","http_req_tls_handshaking","http_req_sending","http_req_receiving","http_req_blocked","iteration_duration","group_duration","ws_connecting","ws_msgs_received","ws_msgs_sent","ws_sessions"],otherMetrics:["iterations","data_sent","checks","http_reqs","data_received","vus_max","vus","http_req_failed","http_req_duration{expected_response:true}"],thresholdFailures:s,thresholdCount:o,checkFailures:c,checkPasses:l,version:"2.3.0",http_and_grpc_req_count:d})}function a(e){let r=0,t=0;for(let n of e)r+=parseInt(n.passes),t+=parseInt(n.fails);return{passes:r,fails:t}}})();var i=exports;for(var s in n)i[s]=n[s];n.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();