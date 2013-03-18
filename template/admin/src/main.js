(function(window) {
	var user = "";
	var pass = "";
	var dataLocation = "../data.json";
	var content;
	var currentPage = "";
	var currentIndex = 0;
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
		var data = (eval('(' + t + ')'));
		user = data.username;
		pass = data.password;
		showLogin();
		Utensil.addListener(document.getElementById('formIframe'), "load", dataUpdated);
	}

	function showLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('user');
		var p = document.getElementById('pass');
		Utensil.addListener(submit, "click", onSubmitClicked);
		Utensil.addListener(un, "focus", onFocus);
		Utensil.addListener(p, "focus", onFocus);
		document.getElementById('login').style.display = "block";
		document.getElementById('spacer').style.display = "block";
	}

	function hideLogin() {
		var submit = document.getElementById('submit');
		var un = document.getElementById('user');
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
		var un = document.getElementById('user');
		var p = document.getElementById('pass');
		if (un.value == user && p.value == pass) {
			logIn();
		} else {
			document.getElementById('loginError').innerHTML = "*invalid login details";
		}
	}

	function logIn() {
		
		hideLogin();
		Utensil.URLLoader.load(dataLocation + "?rand=" + Math.random(), dataLoaded);
	}

	function dataLoaded(t, x) {
		content = (eval('(' + t + ')'));

		showWrapper();
		var first;
		for (var name in content) {
			if (!first)
				first = name;
			createPages(content[name], name);
		}
		updateContentSection(first, 0);
	}

	function showWrapper() {
		document.getElementById("wrapper").style.display = "block";
		var update = document.getElementById('updateButton');
		Utensil.addListener(update, "click", onUpdateClicked);
	}

	function createPages(item, name) {
		var holder = document.createElement('div');
		holder.className = "page";
		var p = document.createElement('p');
		p.className = "title";
		p.id = name.replace(".", "-");
		p.innerHTML = name;
		holder.appendChild(p);

		var ul = document.createElement('ul');
		ul.className = "pageDetails";
		ul.id = "content-" + name.replace(".", "-");
		holder.appendChild(ul);

		var li;
		for (var a = 0; a < item.length; a++) {
			li = document.createElement('li');
			li.className = "elementButton";
			li.id = name.replace(".", "-") + "_" + a;
			li.innerHTML = "-" + item[a].id;
			ul.appendChild(li);
			Utensil.addListener(li, "click", onElementClicked);
		}

		document.getElementById('nav').appendChild(holder);
	}

	function onElementClicked(event) {
		var target = event.srcElement ? event.srcElement : event.target;
		var arr = target.id.split("_");
		var page = arr[0];
		var index = arr[1];
		page = page.replace("-", ".");

		updateContentSection(page, index);
	}

	function updateContentSection(page, index) {
		var pageContent = content[page];
		currentPage = page;
		currentIndex = index;
		document.getElementById('contentTitle').innerHTML = page;
		document.getElementById('contentElement').innerHTML = "<b>Content ID:</b> " + pageContent[index].id;
		document.getElementById('contentElementType').innerHTML = "<b>Type:</b> " + pageContent[index].type;
		document.getElementById('contentValue').value = pageContent[index].value.replace(/<br>/gm, "\n");

		if (pageContent[index].type == "image") {
			document.getElementById('contentValue').disabled = true;
			document.getElementById('file').style.display = "block";
			document.getElementById('file').setAttribute("name", pageContent[index].id);
		} else {
			document.getElementById('contentValue').disabled = false;
			document.getElementById('file').style.display = "none";
		}
	}

	function onUpdateClicked(event) {
		document.getElementById('backdrop').style.display = "block";
		document.getElementById('progress').style.display = "block";
		content[currentPage][currentIndex].value = document.getElementById('contentValue').value.replace(/(\r\n|\n|\r)/gm, "<br>");

		var form = createForm();
		
		form.submit();
		}

	function createForm() {
		var f = document.getElementById("dataForm");

		var i = document.getElementById("formData");
		i.setAttribute('value', JSON.stringify(content));
		return f;
	}

	window.setImageName=function(imageData) {
		if (content[currentPage][currentIndex].type != "image") return;
		document.getElementById('contentValue').value = imageData.name;
		content[currentPage][currentIndex].value = imageData.name;

	}

	function dataUpdated(t) {

		switch(t) {
			case "done":
				break;
			case "error":
				break;
		}
		setTimeout(function() {
			document.getElementById('backdrop').style.display = "none";
			document.getElementById('progress').style.display = "none";
		}, 1000);

	}

	Main();
})(window);
