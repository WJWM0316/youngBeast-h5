import axios from 'axios'
export function getPathQuery () {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

export function splicingLink (url, query) {
	for (let n in query) {
		if (url.indexOf('?') === -1) {
			url = `${url}?${n}=${query[n]}`
		} else {
			url = `${url}&${n}=${query[n]}`
		}
	}
	return url
}

export function setHeader () {
	let query = getPathQuery()
	if (query.sourceType) axios.defaults.headers.common['Channel-Code'] = query.sourceType;
	if (query.sCode) axios.defaults.headers.common['Act-Code'] = query.sCode;
}

