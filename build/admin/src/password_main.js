(function(window) {
	var user = "";
	var pass = "";
	var dataLocation = "../data.json";
	var data;
	var currentPage="";
	var currentIndex=0;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Utensil.URLLoader.load("admin.json?rand=" + Math.random(), adminLoaded);

	}

	function adminLoaded(t, x) {
		data = (eval('(' + t + ')'));
		user = data.username;
		pass = data.password;
		showLogin();
	}

	function showLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('old');
		var p = document.getElementById('pass');
		Utensil.addListener(submit, "click", onSubmitClicked);
		Utensil.addListener(un, "focus", onFocus);
		Utensil.addListener(p, "focus", onFocus);
		document.getElementById('login').style.display = "block";
		document.getElementById('spacer').style.display = "block";
	}

	function hideLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('old');
		var p = document.getElementById('pass');
		Utensil.removeListener(submit, "click", onSubmitClicked);
		Utensil.removeListener(un, "focus", onFocus);
		Utensil.removeListener(p, "focus", onFocus);
		document.getElementById('login').style.display = "none";
		document.getElementById('spacer').style.display = "none";
	}

	function onFocus() {
		document.getElementById('loginError').innerHTML = "&nbsp;";
	}

	function onSubmitClicked(event) {
		var old = document.getElementById('old');
		var p = document.getElementById('pass');
		if (old.value == data.password && p.value !="" && p.value !=" ") {
			document.getElementById('backdrop').style.display="block";
			document.getElementById('progress').style.display="block";
			data.password = p.value;
			Utensil.URLLoader.load("lib/change.php", dataUpdated,"POST","data="+JSON.stringify(data));
		} else {
			document.getElementById('loginError').innerHTML = "*invalid details";
		}
	}


	function dataUpdated(t,x)
	{
		
		switch(t)
		{
			case "done":
			break;
			case "error":
			break;
		}
		document.getElementById('backdrop').style.display="none";
		document.getElementById('progress').style.display="none";
		
		document.getElementById('loginError').innerHTML = "password has changed";
	}
	Main();
})(window);
