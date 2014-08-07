influxViz-page-builder
======================

The influxViz page builder is a client side javascript application that allows the user to easily construct dashboards with graphs and visuals.

How to:
=======

When creating a dashboard object you pass in The title as text and an array of json-formatted pages.

Each page is formatted in the following way:
```
page = {
  id: "page-id",
  title: "title of page",
  
  contents: [row1, row2, row3...];
}

where row1, row2, row3... are objects formatted as

row = {
  height: 400; //height in pixels of the row.
  
  widgets: [widget1, widget2, widget3...]
}

where widget1, widget2, widget3... are objects formatted as


widget = {
  id: "widget-content-wrapper-id"
  header: "the text that will show up as the widgets name",
  cells: 4, //The number of bootstrap columns the widget takes up.
  classes: "class1 class2 class3", //CSS classes that will be appended.
  html: "<div>html code that will be inserted into the content wrapper</div>",
}

```

finally a dashboard instance needs in order to initialize and render the page.
```
var db = new InfluxDashboard("test dashboard",[testpage1, testpage2]);
```

TODO: 
Add DOM, jquery, and d3 closure objects that will take their repsective selectors as input and apply the calls to their respective libraries.
