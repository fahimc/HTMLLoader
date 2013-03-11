HTMLLoader
==========

loads HTML external files through JavaScript. Also loads any scripts or css linked to the HTML page. The callback function provides the body content.  

##1. How To Install
Add the following tag to the head.
```JavaScript
<script type="text/javascript" src="../release/templateMax.js"></script>
```

##2. Setup the Template Pages
create HTML pages and in the body tag add the templated element (header, footer etc..). You can include external css and javascript in  the head tag.

##3. Map the Template Elements to each page.
Create a site.json file and add an Array object per page. Name the Array object the same name as the page name. 
Then add each template element location in the array in the correct order.  
###Example
```JavaScript
{
  "example.html": [
	"resource/template/header.html",
	"resource/template/nav.html",
	"resource/template/index.html"
	],
	"about.html": [
	"resource/template/header.html",
	"resource/template/nav.html",
	"resource/template/about.html"
	]
}

```

##3. Add Copy and Images
Create a data.json file and add Array objects per page. The Array is going to contain a object which has three variables, id, type and value. 

*id: the DOM object id.
*type: type of object, supports "text" (updates the innerHTML) or "img" (updates the src of an img tag)
*value: this will be the value such as the copy or image location.

