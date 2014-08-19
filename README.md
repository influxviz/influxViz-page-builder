influxViz-page-builder
======================

The influxViz page builder is a client side javascript application that allows the user to easily construct dashboards with graphs and visuals.

How to:
=======

When creating a dashboard object you pass in The title as text and an array of json-formatted pages.

Each page is formatted in the following way:
```
dashBoard_Object_Data = {
  title: "test dashboard",
  pages: [page1, page2, page3...]
}

where page1, page2, page3... are objects formatted as

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
  task: {
    html: "<div>html code that will be inserted into the content wrapper</div>",
    js: {
      selectors: {
        d3: "d3.select(widgetPH)",
        jquery: "$(widgetPH)",
        DOM: "document.getElementById(widgetPH)"
      },

      functions: [function1, function2, ...]
    }
  }
}

```

where 'selectors' is an object that contains all the selectors 
formatted as a string. 'widgetPH' is simply a placeholder that is 
'String.replace'ed with the actual widget id when the page is loaded.

The functions are of the form

```
function(arg){
  arg.jquery.click(etc..);
  arg.d3.append("svg")...;
  arg.DOM.innerHTML = "text";
}
```
The 'arg' argument will be the 'selectors' object containing all the selectors.
The functions will all be called after the dashboard loads.

Finally a dashboard instance needs to be created in order to initialize and render the page.
```
var db = new InfluxDashboard(dashBoard_Object_Data);
```

TODO: 
Add DOM, jquery, and d3 closure objects that will take their repsective selectors as input and apply the calls to their respective libraries.