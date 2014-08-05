/*	
	This script is used to populate the html files that
	use it with JustGage gauges. The gauges are updated
	using values from an influxDB database.
*/

var InfluxDBGaugeManager = function (interval) {
	
	var InfluxGauge = function(config) {
		var query = "";

		query += "select ";
		query += config.influxValue.split(" ")[0] + " ";
		query += "from ";
		query += config.influxTimeSeries.split(" ")[0];



		this.gauge = new JustGage(config);
		this.query = query;
	};

	this.parseMetaProperties = function(meta) {
		var metaContents = meta.getAttribute("content");

		metaContents = metaContents.split(";");

		var properties = {};
		
		for(var i = 0; i < metaContents.length; i++)
		{
			if(metaContents[i].trim() == "")
			{
				continue;
			}
			
			var keyValuePair = metaContents[i].split(":");
			var key = keyValuePair[0].trim();
			var value = keyValuePair[1].trim();

			if(key && value)
			{
				properties[key] = value;
			}
		}

		return properties;
	};

	this.getDatabaseCredentials = function() {
		var metas = document.getElementsByName("influxDBCredentials");
		var meta = metas[metas.length - 1];
		var credentials = this.parseMetaProperties(meta);

		if(credentials.port == undefined)
		{
			credentials.port = "8086";
		}

		return credentials;
	};

	this.createGaugeObjects = function () {
		var gauges = $(".gauge").toArray();
		var influxGauges = [];

		for(var i = 0; i < gauges.length; i++)
		{
			if(gauges[i].nodeName != "DIV")
			{
				return influxGauges;
			}

			var metas = gauges[i].getElementsByTagName("meta");
			var meta = metas[metas.length - 1];
			
			if(meta == undefined)
			{ 
				return influxGauges;
			}

			if(gauges[i].id == undefined)
			{
				return influxGauges;
			}

			var gaugeProperties = this.parseMetaProperties(meta);
			
			gaugeProperties["id"] = gauges[i].id;
			gaugeProperties["labelFontColor"] = "#000000"; 
			gaugeProperties["titleFontColor"] = "#000000"
			gaugeProperties["relativeGaugeSize"] = true;

			influxGauges.push(new InfluxGauge(gaugeProperties));

		}

		return influxGauges;
	};

	//GET request with the query will be sent to the influxDB database.
	this.influxDBUpdateGauge = function(credentials, query, gauge, callback) {
		var url = "http://" + credentials.databaseIP + ":" + credentials.port + "/db/" + credentials.database + "/series?u=" 
			+ credentials.username + "&p=" + credentials.password + "&q=" + query + "&" 
			+ Math.floor(Math.random()*11240912); //Keep from hitting browser cache.

		$.get(
			url, 
			function(res){
			
				var data = jQuery.parseJSON(res.substring(1,res.length - 1));

				var points = data["points"][0]
				callback(Math.floor(points[2]), gauge);
			},
			"text")
	};

	//This function allows the JustGage.refresh function to be used as a callback.
	this.refreshGauge = function(val, gauge) {
		gauge.refresh(val);
	}

	//This function will force all the gauges to sync with the latest value outputed by the database.
	this.sendQueries = function(gauges, credentials) {
		for (var i = 0; i < gauges.length; i++)
		{
			var gauge = gauges[i]["gauge"];
			var query = gauges[i]["query"];
			if (gauge instanceof JustGage)
			{
				this.influxDBUpdateGauge(credentials, query, gauge, this.refreshGauge);
			}
		}
	};

	this.initGauges = function(interval) {
		var gauges = this.createGaugeObjects();
		var credentials = this.getDatabaseCredentials();
		
		this.sendQueries(gauges, credentials);

		var tempthis = this; //bypass scope during event handler declaration.
		var queryInterval = setInterval(function(){
			tempthis.sendQueries(gauges, credentials);
		},interval);
	};

	//Executions
	this.initGauges(interval);
};

