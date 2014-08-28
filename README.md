influxViz-page-builder
======================

The influxViz page builder is a client side javascript application that allows the user to easily construct dashboards with graphs and visuals.

How to use
==========

Currently you can run a development version of the web application using 

```
grunt serve
```
As many of you can probably tell, this web application was made using the yeoman scaffolder
and the angular generator.

This means you can also create a release version of this application using 

```
grunt dist
```

Once the web application is open in your browser you will have the option to load a dash board from
an XML file. The testdash.xml file is a good example of what your file should look like.
The application uses Twitter Bootstrap's grid cell system to position each widget in the dashboard.

```
<?xml version="1.0" encoding="UTF-8"?>
<dashboard title="dashboard title">
	<page title="page title">
		<row col-type="col-lg" >
			<widget cell-width="1" >
				<html><![CDATA[
					<div>element1</div>
					<div>element2</div>
					<div>element3</div>
					<div>element4</div>
				]]></html>
				<function><![CDATA[
					function (e) {
						console.log(e + "<lelele>");
					}
				]]></function>
			</widget>
		</row>
	</page>
</dashboard>
```

All dashboards contain a dashboard tag with a title attribute
```
<dashboard title="dashboard title">
	...
</dashboard>

```

Inside you may have some page tags where their titles show up as the text inside their menu button.
```
<page title="page title">
	...
</page>
```

Inside each page tag you may have rows
```
<row col-type="col-lg">
	...
</row>
```

The col-type attribute is the type of bootstrap column you want to use inside
in the current row for every column in the row.

Inside each row you may also have widgets!
```
<widget cell-width="1">
		<html><![CDATA[
		<div>element1</div>
		<div>element2</div>
		<div>element3</div>
		<div>element4</div>
	]]></html>
	<function><![CDATA[
		function (element) {
			console.log(element);
		}
	]]></function>
</widget>
```

The cell-width attribute is the column size of the widget. The widget's class inside the DOM
will be the string 

```
widget.class = row.colType] + widget.cellWidth
```

Finally inside each widget tag where is the html tag and the function tag.

The html tag can contain any html you want to show inside the widget.
You may use bootstrap classes as well for it is included with the app.

The function tag contains a single function that will be bound to the widget.
This is where all your widgets functionality must go such as D3 calls and 
jQuery manipulation. 

Your function must take one argument. 
This argument will have the widget's element object passed as a jquery object.