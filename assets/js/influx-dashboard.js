/*
	This script will prompt the user to either create a new dashboard
	or load a json file with a predetermined configuration of a dashboard.
	The user can then unlock the dashboard and edit or save the edited 
	dashboard as a new json configuration file.
*/

var testpage1 = {
	id: "test-page1",
	title: "do fun shit1",

	content: [{
		height: 400,

		widgets: [{
			id: "testgauge1",
			header: "toast toastage",
			cells: 4,
			classes: "",
			html: "html code1",
			js: ""
		}]
	}]
}

var testpage2 = {
	id: "test-page2",
	title: "do fun shit2",

	content: [{
		height: 200,

		widgets: [{
			id: "testgauge2",
			header: "room temp",
			cells: 3,
			classes: "",
			html: "html code2",
			js: ""
		}]
	}]
}


var Page = function(page) {
	this.id = page.id;
	this.title = page.title;
	this.content = page.content;

	this.loadPage = function() {
		for(var i = 0; i < this.content.length; i++)
		{
			row = this.content[i];

			var rowElement = $("<div id=\"row" + i 
				+ "\" class=\"row\" style=\"height: " + row.height + "px;\">"
				+ "</div>");
			

			$("#" + this.id)
				.append(rowElement);

			for(var j = 0; j < row.widgets.length; j++)
			{
				var widget = row.widgets[j];

				var widgetWrapper = $("<div id=\"" + widget.id 
					+ "\" class=\"col-md-" + widget.cells + " widget " + widget.classes 
					+ "\" style=\"height: 100%;\">"
					+ "</div>");

				var widgetHeader = $("<div class=\"widget-header\"><span>" + widget.header 
					+ "</div></span>");
				
				var widgetContent = $("<div class=\"widget-content\">" + widget.html 
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

var InfluxDashboard = function (title, pages) {
	//Declarations
	this.title = title;
	this.pages = [];
	this.currentPage = 0;

	for(var i = 0; i < pages.length; i++)
	{
		var page = pages[i];

		if(page.id && page.title && page.content)
		{
			this.pages.push(new Page(page));
		}
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


	//Executions
	this.renderDashboard();
};


