(function(window) {
	window.templaterArray = [];
	window.templaterIndex = 0;
	window.pageName = "";
	window.templateLoadComplete = false;
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
		if (window.pageName == "") {
			window.pageName = "index";
		}
		var data = (eval('(' + t + ')'));
		for (var name in data) {
			if (name == window.pageName || (window.pageName == "index" && name.indexOf("index") >= 0)) {
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
		window.data = data;
		for (var name in data) {
			if (name == window.pageName || (window.pageName == "index" && name.indexOf("index") >= 0)) {
				for (var a = 0; a < data[name].length; a++) {
					switch(data[name][a].type) {
						case "text":
							setText(data[name][a]);
							break;
						case "img":
							setImg(data[name][a]);
							break;
						case "image":
							setAdminImg(data[name][a]);
							break;
					}
				}
			}
		}
		window.templateLoadComplete =true;
		Event.dispatch(window, "TEMPLATE_DATA_LOADED");
	}

	function setText(obj) {
		if (document.getElementById(obj.id))
			document.getElementById(obj.id).innerHTML = obj.value;
	}

	function setImg(obj) {
		if (document.getElementById(obj.id))
			document.getElementById(obj.id).src = obj.value;
	}

	function setAdminImg(obj) {
		if (document.getElementById(obj.id))
			document.getElementById(obj.id).src = "admin/resource/image/" + obj.value;
	}

	Main();
})(window);
