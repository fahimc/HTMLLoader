(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		
		HTMLLoader.load("resource/template/index.html", onReady);
	}

	function onReady(content) {
		
			document.body.innerHTML+=content;
	}

	Main();
})(window);
