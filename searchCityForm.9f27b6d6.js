function t(t){return t&&t.__esModule?t.default:t}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},o={},r=n.parcelRequirea979;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in o){var n=o[t];delete o[t];var r={id:t,exports:{}};return e[t]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,n){o[t]=n},n.parcelRequirea979=r);var i,u=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt,s="object"==typeof n&&n&&n.Object===Object&&n,p="object"==typeof self&&self&&self.Object===Object&&self,d=s||p||Function("return this")(),y=Object.prototype.toString,m=Math.max,v=Math.min,b=function(){return d.Date.now()};function g(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function h(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==y.call(t)}(t))return NaN;if(g(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=g(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(u,"");var e=c.test(t);return e||f.test(t)?l(t.slice(2),e?2:8):a.test(t)?NaN:+t}i=function(t,n,e){var o,r,i,u,a,c,f=0,l=!1,s=!1,p=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function d(n){var e=o,i=r;return o=r=void 0,f=n,u=t.apply(i,e)}function y(t){return f=t,a=setTimeout(j,n),l?d(t):u}function T(t){var e=t-c;return void 0===c||e>=n||e<0||s&&t-f>=i}function j(){var t=b();if(T(t))return M(t);a=setTimeout(j,function(t){var e=n-(t-c);return s?v(e,i-(t-f)):e}(t))}function M(t){return a=void 0,p&&o?d(t):(o=r=void 0,u)}function w(){var t=b(),e=T(t);if(o=arguments,r=this,c=t,e){if(void 0===a)return y(c);if(s)return a=setTimeout(j,n),d(c)}return void 0===a&&(a=setTimeout(j,n)),u}return n=h(n)||0,g(e)&&(l=!!e.leading,i=(s="maxWait"in e)?m(h(e.maxWait)||0,n):i,p="trailing"in e?!!e.trailing:p),w.cancel=function(){void 0!==a&&clearTimeout(a),f=0,o=c=r=a=void 0},w.flush=function(){return void 0===a?u:M(b())},w};var T=r("7Y9D8");const j=document.querySelector(".country-list"),M=document.querySelector('[id="search-box"]'),w=document.querySelector(".country-info");function L(t){return t.map((t=>`<li class="country-item">\n      <img class="country-flag" src=${t.flags.svg} alt=${t.flags.alt} />\n      <h2 class="country-item-name">${t.name.official}</h2>\n      </li>`)).join("")}M.addEventListener("input",t(i)((function(){const n=M.value.trim();if(""===n)return j.innerHTML="",w.innerHTML="";(e=n,fetch(`https://restcountries.com/v3.1/name/${e}`).then((t=>{if(!t.ok)throw console.dir(t),new Error(t.status);return t.json()}))).then((n=>{j.innerHTML="",w.innerHTML="",1===n.length?(j.insertAdjacentHTML("beforeend",L(n)),w.insertAdjacentHTML("beforeend",function(t){const n=t.map((t=>{const n=Object.values(t.languages).join(", ");return`<ul class=country-option-list>\n        <li class=country-option-item> <p class="country-option"> <b>Capital:</b> ${t.capital}</p></li>\n            <li class=country-option-item><p class="country-option"><b>Population:</b> ${t.population}</p></li>\n            <li class=country-option-item> <p class="country-option"><b>Languages:</b> ${n}</p></li>\n            </ul>`})).join("");return n}(n))):n.length>10?t(T).Notify.info("Too many matches found. Please enter a more specific name."):n.length>=2&&n.length<=10&&j.insertAdjacentHTML("beforeend",L(n))})).catch((n=>{"404"===n.message?t(T).Notify.failure("Oops, there is no country with that name"):t(T).Notify.failure(n.message),j.innerHTML="",w.innerHTML=""}));var e}),300));
//# sourceMappingURL=searchCityForm.9f27b6d6.js.map
