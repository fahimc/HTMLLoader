/*
 * requires toolkitJS Max
 * http://toolkitjs.blogspot.co.uk/
 */
var HTMLLoader = {
	handler : {},
	scripts : [],
	links : [],
	callback:null,
	content : {
		body : null
	},
	load : function(url, callback) {
		this.callback = callback;
		var root = this;
		this.handler.onHTMLLoad = function(t, x) {
			root.onHTMLLoad(t, x);
		}
		Utensil.URLLoader.load(url+"?rand="+Math.random(), this.handler.onHTMLLoad);
	},
	onHTMLLoad : function(t, x) {
		this.setBody(t);
		this.setScriptTags(t);
		this.setLinkTags(t);
		if(this.callback)this.callback(this.content.body);
	},
	setBody : function(t) {
		t = t.replace(/(\r\n|\n|\r)/gm,"");
		var regBody = /<body[^>]*>|<\/body>/gi;
		var body = (t.split( regBody )[1]);
		this.content.body = body;
	},
	setScriptTags : function(t) {
		this.scripts = [];
		var regScript = /<script\s.+?>/ig;
		var s = t.match(regScript);
		var re_src = /src="(.*?)"/i;
		this.scripts = this.getTagLinks(s, re_src, 'src="');
		this.addLinkToHead("script", this.scripts, this.createScriptTag,"src");
	},
	createScriptTag : function(link) {
		var sct = document.createElement('script');
		sct.src = link;
		return sct;
	},
	setLinkTags : function(t) {
		this.links = [];
		var regLink = /<link\s.+?>/ig;
		var s = t.match(regLink);
		var re_src = /href="(.*?)"/i;
		this.links = this.getTagLinks(s, re_src, 'href="');
		this.addLinkToHead("link", this.links, this.createLinkTag,"href");
	},
	createLinkTag : function(link) {
		var sct = document.createElement('link');
		sct.href = HTMLLoader.absolute("resource/template/", link);
		sct.type = "text/css";
		sct.rel = "stylesheet";
		return sct;
	},
	addLinkToHead : function(tagName, arr, func,att) {
		var tags = document.getElementsByTagName(tagName);

		for (var b = 0; b < arr.length; b++) {

			var found = false;
			for (var c = 0; c < tags.length; c++) {

				if (tags[c].getAttribute(att).indexOf(arr[b]) >= 0) {
					found = true;
				}
			}
			if (!found) {

				document.getElementsByTagName('head')[0].appendChild(func(arr[b]));

			}
		}
	},
	getTagLinks : function(arr, reg, rep) {
		var elems = [];
		for (var a = 0; a < arr.length; a++) {

			var src = arr[a].match(reg);
			if (src[0]) {
				src = src[0].replace(rep, "");
				src = src.replace('"', "");
			}
			elems.push(src);
		}
		return elems;
	},
	absolute:function(base, relative) {
		if(relative.indexOf("http")>=0)return relative;
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}
};
(function(window) {
	window.templaterArray = [];
	window.templaterIndex = 0;
	window.pageName = "";
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Utensil.URLLoader.load("site.json?rand=" + Math.random(), siteLoaded);

	}

	function siteLoaded(t, x) {
		window.pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
		var data = (eval('(' + t + ')'));
		for (var name in data) {
			if (name == window.pageName) {
				window.templaterArray = data[name];
				nextTemplate();
			}
		}
	}

	function nextTemplate() {
		if (window.templaterArray[window.templaterIndex]) {
			HTMLLoader.load(window.templaterArray[window.templaterIndex], onTemplateLoaded);
		} else {
			Utensil.URLLoader.load("data.json?rand=" + Math.random(), dataLoaded);
		}
	}

	function onTemplateLoaded(content) {
		document.body.innerHTML += content;
		window.templaterIndex++;
		nextTemplate();
	}

	function dataLoaded(t, x) {
		var data = (eval('(' + t + ')'));
		for (var name in data) {
			if (name == window.pageName) {
				for (var a = 0; a < data[name].length; a++) {
					switch(data[name][a].type) {
						case "text":
							setText(data[name][a]);
							break;
						case "img":
							setImg(data[name][a]);
							break;
					}
				}
			}
		}

	}

	function setText(obj) {
		document.getElementById(obj.id).innerHTML = obj.value;
	}

	function setImg(obj) {
		document.getElementById(obj.id).src = obj.value;
	}

	Main();
})(window);

