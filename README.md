This is a templating system which allows you to include HTML DOM objects from different HTML pages into one file. It combines all the elements from the body tags from all the specified pages. 

Everything is managed with two json files.

You can also update content via the data.json file and once you setup the data.json you can use the CMS.

##1. How To Install
Add the following tag to the head.
```JavaScript
<script type="text/javascript" src="../release/templateMax.js"></script>
```

Or use the template.zip which contains the admin/CMS section and example files.  
[template.zip](https://github.com/fahimc/HTMLLoader/blob/master/release/template.zip)  

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

###Example  
```JavaScript
{
	"example.html": [
		{
			"id": "mainTitle",
			"type": "text",
			"value": "hello world"
		},
		{
			"id": "mainImage",
			"type": "img",
			"value": "http://images.fanpop.com/images/image_uploads/Dragon-Ball-Z-dragon-ball-z-538442_1024_768.jpg"
		}
	]
}
```

## Admin Section (CMS)
You can use this to update the content on you site. Navigate to 'your-site.com/admin' then use the default username and password. 

- username: admin  
- password: admin  
 
### Changing the password
Navigate to 'your-site.com/admin/password.html'.
