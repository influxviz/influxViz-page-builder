/*
	This script will prompt the user to either create a new dashboard
	or load a json file with a predetermined configuration of a dashboard.
	The user can then unlock the dashboard and edit or save the edited 
	dashboard as a new json configuration file.
*/




var InfluxDashboard = function (dashData) {
	//Declarations
	this.title = (dashData.title) ? dashData.title : "";
	this.currentPage = 0;

	var Page = function(page) {
		this.id = (page.id) ? page.id : "";
		this.title = (page.title) ? page.title : "";
		


		var Widget = function(widget) {

			this.id = (widget.id) ? widget.id : "";
			this.header = (widget.header) ? widget.header : "";
			this.cells = (widget.cells) ? widget.cells : 0;
			this.classes = (widget.classes) ? widget.classes : "";
			
			var WidgetTask = function(task, bindingWidget)
			{
				this.html = (task.html) ? task.html : "";
				this.js = {};
				this.js.selectors = {};
				this.js.functions = [];
				this.initSelectors = function(){};
				this.callFunctions = function(){};
				
				if((bindingWidget instanceof Widget) == false || typeof task === 'undefined')
				{
					return;
				}


				this.js.selectors = task.js.selectors;

				for(var i = 0; i < task.js.functions.length; i++)
				{
					var func = task.js.functions[i];
					this.js.functions.push(func);
				}

				this.initSelectors = function(){
					for(var selector in this.js.selectors)
					{	
						//A temporary string that will will be prepended to the widget id
						//upon replacing the widgetPH placeholder string with the widget's ID
						//Example: $(widgetPH) will become $("#testwidget-id")
						//Example: document.getElementsById(widgetPH) will become 
						//document.getElementsById("testwidget-id");
						//Where testwidget-id is the id of the widget these selectors are bound to.

						var prp = "#";
						if (selector === "DOM"){
							prp = "";
						}

						var selValue = this.js.selectors[selector]
						selValue = selValue.replace("widgetPH", "\"" + prp + bindingWidget.id + "\"");
						
						this.js.selectors[selector] = eval("\$(\"#testgauge1\")");
					}
				};

				this.callFunctions = function(){
					for(var i = 0; i < this.js.functions.length; i++)
					{
						var func = this.js.functions[i];
						func(this.js.selectors);
					}
				};
			};

			this.task = new WidgetTask(widget.task, this)
		};

		var PageRow = function(row) {
			this.height = row.height;
			this.widgets = [];
	

			for(var i = 0; i < row.widgets.length; i++)
			{
				this.widgets.push( new Widget(row.widgets[i]) );
			}
		};

		var PageContents = function (contents) {
			this.rows = [];

			for(var i = 0; i < contents.length; i++)
			{
				this.rows.push( new PageRow(contents[i]) );
			}
		};

		this.contents = new PageContents(page.contents);

		this.loadPage = function() {
			$("#" + this.id)
					.append("<div class=\"col-md-12 page-header\"><span>" + this.title + "</span></div");

			for(var i = 0; i < this.contents.rows.length; i++)
			{
				row = this.contents.rows[i];

				var rowElement = $("<div id=\"row" + i 
					+ "\" class=\"row\" style=\"height: " + row.height + "px;\">"
					+ "</div>");
				

				$("#" + this.id)
					.append(rowElement);

				for(var j = 0; j < row.widgets.length; j++)
				{
					var widget = row.widgets[j];

					var widgetWrapper = $("<div \" class=\"col-md-" + widget.cells + " widget\""
						+" style=\"height: 100%;\">"
						+ "</div>");

					var widgetHeader = $("<div class=\"widget-header\"><span>" + widget.header 
						+ "</div></span>");
					
					var widgetContent = $("<div id=\"" + widget.id 
						+ "\" class=\"widget-content " + widget.classes
						+"\">" + widget.task.html 
						+ "</div>")
					
					widgetWrapper
						.append(widgetHeader)
						.append(widgetContent);

					rowElement
						.append(widgetWrapper);
				}
			}
		};

		this.hidePage = function (){
			$("#" + this.id).addClass("hidden");
		};

		this.showPage = function (){
			$("#" + this.id).removeClass("hidden");
		};
	};

	this.pages = [];	
	for(var i = 0; i < dashData.pages.length; i++)
	{
		var page = dashData.pages[i];
		
		this.pages.push(new Page(page));
	}

	this.swapPage = function (pageNumber) {
		if( pageNumber < 0 || pageNumber > (this.pages.length - 1) )
		{
			return;
		}

		if(pageNumber === this.currentPage)
		{
			return;
		}

		this.pages[this.currentPage].hidePage();
		this.currentPage = pageNumber;
		this.pages[this.currentPage].showPage();
	};

	this.renderDashboard = function() {
		$("#title-header").append("<span>" + this.title + "</span>");
		
		$("#sidebar-page-nav").bind("append", function () {

		});

		for(var i = 0; i < this.pages.length; i++)
		{
			var page = this.pages[i];
			var sidebarButton = $("<li><a href=\"#\">" + page.title + "</a></li>");

			$("#sidebar-page-nav")
				.append(sidebarButton);

			var tempThis = this; //Used to bypass scope of 'this' in callback function declaration.
			var pageSwapEvent = function (pageNumber) {
				return function(){
					tempThis.swapPage(pageNumber);
				};
			}

			sidebarButton.click(pageSwapEvent(i));

			$("#page-container")
				.append("<div id=\"" + page.id + "\" class=\"dashboard-page hidden\"></div>");
			
			page.loadPage();
		}

		this.pages[this.currentPage].showPage();
	};

	this.initWidgetTasks = function () {

		for(var i = 0; i < this.pages.length; i++)
		{
			var page = this.pages[i];

			for(var j = 0; j < page.contents.rows.length; j++)
			{
				row = page.contents.rows[j];
				for(var k = 0; k < row.widgets.length; k++)
				{
					var widget = row.widgets[k];


					widget.task.initSelectors();
					widget.task.callFunctions();
				}
			}
		}
	};

	//Executions
	this.renderDashboard();
	this.initWidgetTasks();
};
