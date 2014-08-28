

/**
 * @ngdoc service
 * @name influxVizPageBuilderApp.DashXMLUtils
 * @description
 * # DashXMLUtils
 * Factory in the influxVizPageBuilderApp.
 */
angular.module('influxVizPageBuilderApp')
  .factory('DashXMLUtils', function () {
    // Public API here
      return {
        loadDashXML: function l_xml(XML) {
          var xmlDOM = function genxmldom() {

            if (window.DOMParser)
            {
              var parser = new DOMParser();
              var xmlDoc = parser.parseFromString(XML,"text/xml");
            }
            else // Internet Explorer
            {
              var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
              
              xmlDoc.async = false;
              xmlDoc.loadXML(XML); 
            }

            //Return parsed DOM element
            return xmlDoc;

          };
          
          var dashObj = function gendashobj() {
            try
            {
              var DOMdashboard = xmlDOM().getElementsByTagName("dashboard")[0];
              if(!DOMdashboard){return new Object();}; //Return an empty non-dashboard object if there is no dom.

              var obj =  new DashObject();
              obj.title = DOMdashboard.getAttribute("title");
              obj.pages = [];
              
              var pages = DOMdashboard.getElementsByTagName("page");
              console.log(pages);
              for(var i = 0; i < pages.length; i++)
              {
                var DOMpage = pages[i];
                
                function Page()
                {
                  this.id = "dash-page-" + i
                  this.title = DOMpage.getAttribute("title");
                  this.rows = [];
                }

                var page = new Page()

                var rows = DOMpage.getElementsByTagName("row");
                for(var j = 0; j < rows.length; j++)
                {
                  var DOMrow = rows[j];
                  
                  function Row()
                  {
                    var col =  trim_(DOMrow.getAttribute("col-type"));
                    this.columnType = (col) ? col : "col-lg";
                    this.widgets = [];
                  }
                  
                  var row = new Row();
                  
                  var widgets = DOMrow.getElementsByTagName("widget");
                  for(var k = 0; k < widgets.length; k++)
                  {
                    var DOMwidget = widgets[k];

                    function Widget()
                    {
                      this.id = "widget-" + k + "-row-" + j + "-page-" + i;

                      var cellw =  trim_(DOMwidget.getAttribute("cell-width"));
                      this.cellWidth = (cellw) ? cellw : "1";

                      var html = DOMwidget.getElementsByTagName("html")[0].textContent;
                      this.html = (html) ? html : "";

                      var jsFunction = DOMwidget.getElementsByTagName("function")[0].textContent;
                      jsFunction = trim_(jsFunction);
                      jsFunction = jsFunction ? jsFunction : "";

                      //Evaluate widget's function for errors and log errors on console.
                      var jsfn;
                      try
                      {
                        if(jsFunction)
                        {
                          jsfn = eval('(' + jsFunction + ')');
                        }
                        else
                        {
                          jsfn = function(){};
                        }
                      }
                      catch(error)
                      {
                        jsfn = function(){};
                        console.log("Error in " + this.id + " : \n\t" + error.message);
                      }

                      this.jsFunction = jsfn;
                    }

                    
                    var widget = new Widget();
                    row.widgets.push(widget);
                  }
                  page.rows.push(row);
                }
                obj.pages.push(page);
              }
            }
            catch(error)
            {
              console.log(error);
              alert("Invalid file.");

              obj = {};
            }
            //Return populated dashboard object.
            return obj;
          };

          //Return dashboard object.
          return dashObj();
        },

        saveDashXML: function s_xml(dashObj) {
          if( !(dashObj instanceof DashObject) )
          {
            throw new Error("No dashboard is currently loaded!");
          }
          
          var XML = function ser_xml() {
            var text = '<?xml version="1.0" encoding="UTF-8"?>' + "\n";
            text += '<dashboard>' + "\n";

            for(var i = 0; i < dashObj.pages.length; i++)
            {
              var page = dashObj.pages[i];
              text += "\t" + '<page>' + "\n";

              for(var j = 0; j < page.rows.length; j++)
              {
                var row = page.rows[j];
                text += "\t\t" + '<row col-type="'+ row.columnType +'" >' + "\n";

                for(var k = 0; k < row.widgets.length; k++)
                {
                  var widget = row.widgets[k];
                  text += "\t\t\t" + '<widget cell-width="' + widget.cellWidth + '" >' + "\n";
                  text += "\t\t\t\t" + '<html><![CDATA[' + "\n";
                  text += "\t\t\t\t\t" + trim_(widget.html) + "\n";
                  text += "\t\t\t\t" + ']]></html>' + "\n";
                  text += "\t\t\t\t" + '<function><![CDATA[' + "\n";
                  text += "\t\t\t\t\t" + widget.jsFunction.toString() + "\n";
                  text += "\t\t\t\t" + ']]></function>' + "\n";
                  text += "\t\t\t" + '</widget>' + "\n";
                }

                text += "\t\t" + '</row>' + "\n";
              }

              text += "\t" + '</page>' + "\n";
            }

            text += '</dashboard>' + "\n";

            return text;
          };

          var filename = prompt("Enter filename: ")
          saveTextAs(XML(), filename + '.xml');
        }
      }
  });

function DashObject(){}; //Made global so that objects of its type can be checked for.

//Cross browser string trimming.
function trim_(x) {
    if(x instanceof String)
    {
      return x.replace(/^\s+|\s+$/gm,'');
    }
  return x;
}