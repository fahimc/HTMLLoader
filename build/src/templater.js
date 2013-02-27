(function(window) {
	window.templaterArray=[];
	window.templaterIndex=0;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Utensil.URLLoader.load("site.json?rand="+Math.random(),siteLoaded);
		
	}
	function siteLoaded(t,x)
	{
		var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
		var data = (eval('(' + t + ')'));
		for(var name in data)
		{
			if(name==pageName)
			{
				window.templaterArray = data[name];
				nextTemplate();
			}
		}
	}
	function nextTemplate()
	{
		if(window.templaterArray[window.templaterIndex])
		{
			HTMLLoader.load(window.templaterArray[window.templaterIndex],onTemplateLoaded);
			
		}
	}
	function onTemplateLoaded(content)
	{
		document.body.innerHTML+=content;
		window.templaterIndex++;
		nextTemplate();
	}
	Main();
})(window);
