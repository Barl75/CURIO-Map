/* ******************************************************
 *
 *   Comprehensive Map Gallery using leaflet - methods javascript
 *
 *   Author: Luyu Liu 
 *   Contact: liu.6544@osu.edu
 *
 * ******************************************************* */

function print(a) {
	console.log(a)
}
var featureList = []

function testFailedHandle() //error information
{
	document.getElementById("rickroll-box").innerHTML = "<div align='center'><h1>Sorry no such things...for now</h1></div> <div align='center'> <img src='img/rickroll.gif'> </div>"
	$("#rickroll-modal").modal("show");
}

//------------------------------------sidebar------------------------------------
function clearHighlight() {
	highlight.clearLayers();
}

function animateSidebar() {
	$("#sidebar").animate({
		width: "toggle"
	}, 350, function () {
		map.invalidateSize();
	});
}

function sizeLayerControl() {
	$(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
	$("#layer-list").height($(window).height() / 2);
	$("#table-wrapper").height($(window).height() / 2);
}



function sidebarClick(id, layerID) { //click on the sidebar handle
	markerClusters = eval(layerID + "Layer");
	var alayer = markerClusters.getLayer(id);
	map.setView([alayer.getLatLng().lat, alayer.getLatLng().lng], 18);
	alayer.fire("click");
	/* Hide sidebar and go to the map on small screens */
	/*if (document.body.clientWidth <= 767) {
		$("#sidebar").hide();
		map.invalidateSize();
	}*/
}

function returnColor(color) { //for layer of cota
	switch (color) {
		case "red":
			return "#FF0000"
			break;
		case "darkred":
			return "#6C0000"
			break;
		case "orange":
			return "#FF8000"
			break;
		case "green":
			return "#3FD801"
			break;
		case "darkgreen":
			return "#1D6400"
			break;
		case "blue":
			return "#0089FF"
			break;
		case "purple":
			return "#A800FF"
			break;
		case "darkpurple":
			return "#570085"
			break;
		case "cadetblue":
			return "#5f9ea0"
			break;
	}
}

function syncSidebar(isLeveled) { //update the siderbar
	/* Empty sidebar features */
	$("#feature-list tbody").empty();
	/* Loop through stations layer and add only features which are in the map bounds */
	for (var i in POIFlagList) {
		/*if (i == 'air_stations') {
			var layerIDFullLayer = eval(i + "FullLayer");
			layerIDFullLayer.eachLayer(function (layer) {
				if (map.getBounds().contains(layer.getLatLng())) {
					$("#feature-list tbody").append('<tr class="feature-row" layerID="' + i + '" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><span class="fa fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x aq-color-' + layer.feature.properties.AQICat + '"></i><i class="fa fa-circle-thin fa-stack-2x"></i></span></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
				}
			})
		} else */
		if (i == 'parkingmeters') {
			var level = map.getZoom()
			if (level > 17 || isLeveled == true) {
				var layerIDFullLayer = eval(i + "FullLayer");
				layerIDFullLayer.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						$("#feature-list tbody").append('<tr class="feature-row" layerID="' + i + '" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><span class="fa fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x cota-color-' + returnColor(layer.feature.properties.TOTAL) + '"></i><i class="fa fa-circle-thin fa-stack-2x"></i></span></td><td class="feature-name">' + layer.feature.properties.LOCATION + " , " + layer.feature.properties.METER_ID + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
					}
				})
				var featureList = new List("collapseOne2", {
					valueNames: ["feature-name"]
				})
				featureList.sort("feature-name", {
					order: "asc"
				});

			}
		}
		if (i == "emergency" || i == "medical" || i == "industry") {
			var level = map.getZoom()
			if (level > 14 || isLeveled == true) {
				var pictureURL = "img/" + i + ".png";
				var layerIDFullLayer = eval(i + "FullLayer");
				layerIDFullLayer.eachLayer(function (layer) {
					if (map.getBounds().contains(layer.getLatLng())) {
						$("#feature-list tbody").append('<tr class="feature-row" layerID="' + i + '" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="18" height="18" src="' + pictureURL + '"></td><td class="feature-name">' + layer.feature.properties.POI_NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
					}
				})
				var featureList = new List("collapseOne2", {
					valueNames: ["feature-name"]
				})
				featureList.sort("feature-name", {
					order: "asc"
				});
			}


			/*else {
				var pictureURL = "img/" + i + ".png";
				var layerIDFullLayer = eval(i + "FullLayer");
				layerIDFullLayer.eachLayer(function (layer) {
					//if (map.hasLayer(bikeshr_cogoLayer)) {
					if (map.getBounds().contains(layer.getLatLng())) {
						$("#feature-list tbody").append('<tr class="feature-row" layerID="' + i + '" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="18" height="18" src="' + pictureURL +
							'"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
					}
					//}
				});
			}*/
		}


	}
}


//------------------------------------addhandle.js------------------------------------
function getColorJson(val, grades, colors) {
	for (i = 0; i < grades.length; i++)
		if (val >= grades[i])
			return colors[i];
	return colors[colors.length - 1];
}

function receiveJsonp(URL2, layerID, jsonp, acolor, dataType) {
	if (acolor === undefined) {
		acolor = "brown";
	}

	if (dataType == 7) {
		URL2 = "https://luyuliu.github.io/CURIO-Map/data/CURIODemographics-ALL.geojson";
		var grades, colors, variables;
		grades = jsonp[0];
		colors = jsonp[1];
		variables = jsonp[2];
		realVariables = jsonp[3];
		var geoJsonLayer = L.geoJson(null, {
			style: function (feature) {
				edgeColor = "#000000";

				fillColor = getColorJson(feature.properties[variables[1]], grades, colors);
				return {
					color: edgeColor,
					fillColor: fillColor,
					opacity: 1,
					fillOpacity: 0.90,
					weight: 0.8
				};
			},
			onEachFeature: function (feature, layer) {
				layer.on({
					mouseover: function (e) {
						thisLayerID = e.target.options.pane.substring(0, e.target.options.pane.indexOf("P"))
						var layer = e.target;
						layer.setStyle({
							weight: 5,
							color: '#999',
							fillOpacity: 0.7
						});
					},
					mouseout: function (e) {
						eval(thisLayerID + "Layer" + ".resetStyle(e.target);")
					},
					click: function (e) {
						// TODO: click
						feature = e.target.feature;
						var content = ""
						for (var index in realVariables) {
							content = content + realVariables[index] + ": " + feature.properties[variables[index]] + "<br/>"
						}
						var popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).setContent(content).openOn(map);
					}
				});
			},
			pane: layerID + 'Pane'

		});

		$.get("https://luyuliu.github.io/CURIO-Map/data/CURIODemographics-ALL.geojson", function (data) {
			geoJsonLayer.addData(data);
		});

		return geoJsonLayer;
	}

	if (URL2 == false) {
		if (dataType == 2) {
			var geoJsonLayer = new L.GeoJSON(null, {
				style: function style(feature) {
					return {
						weight: 1,
						opacity: 1,
						color: returnColor(acolor),
						fill: false
					};
				},
				pane: layerID + "Pane",
				onEachFeature: function (feature, layer) {
					layer.on({
						mouseover: function (e) {
							thisLayerID = e.target.options.pane.substring(0, e.target.options.pane.indexOf("P"))
							var layer = e.target;
							layer.setStyle({
								weight: 5,
								color: '#999',
								fillOpacity: 0.7
							});
						},
						mouseout: function (e) {
							eval(thisLayerID + "Layer" + ".resetStyle(e.target);")
						},
						click: function (e) {
							// TODO: click
							feature = e.target.feature;
							var content = ""
							for (var index in feature.properties) {
								content = content + index + ": " + feature.properties[index] + "<br/>"
							}

							var popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).setContent(content).openOn(map);
						}
					});
				}
			});

			//localJSON=JSON.parse(localJSON)
			eval('geoJsonLayer.addData(' + layerID + 'JSON);')

			return geoJsonLayer;
		}
		if (dataType == 6) {
			var geoJsonLayer = L.geoJson(null, {
				style: function (feature) {
					edgeColor = "#000000";
					return {
						color: edgeColor,
						fillColor: returnColor(acolor),
						opacity: 1,
						fillOpacity: 0.90,
						weight: 0.8
					};
				},
				onEachFeature: function (feature, layer) {
					layer.on({
						mouseover: function (e) {
							thisLayerID = e.target.options.pane.substring(0, e.target.options.pane.indexOf("P"))
							var layer = e.target;
							layer.setStyle({
								weight: 5,
								color: '#999',
								fillOpacity: 0.7
							});
						},
						mouseout: function (e) {
							eval(thisLayerID + "Layer" + ".resetStyle(e.target);")
						},
						click: function (e) {
							// TODO: click
							feature = e.target.feature;
							var content = ""
							for (var index in feature.properties) {
								content = content + index + ": " + feature.properties[index] + "<br/>"
							}

							var popup = L.popup().setLatLng([e.latlng.lat, e.latlng.lng]).setContent(content).openOn(map);
						}
					});
				},
				pane: layerID + 'Pane'

			})
			eval('geoJsonLayer.addData(' + layerID + 'JSON);')

			return geoJsonLayer;
		}
	}

	switch (jsonp) {
		case "JSON":
			var ajax2 = $.ajax({
				url: URL2,
				dataType: 'jsonp',
				jsonpCallback: 'getjson',
				success: getjson
			});

			var geoJsonLayer = new L.GeoJSON(null, {
				style: function style(feature) {
					return {
						weight: aweight,
						opacity: 1,
						color: acolor,
						fill: false
					};
				},
				pane: layerID + "Pane"
			});

			function getjson(data) {
				geoJsonLayer.addData(data);
			}
			return geoJsonLayer;
			break;

		default:
			$.getJSON(URL2, function (data) {
				var geoJsonLayer = new L.GeoJSON(data, {
					style: function style(feature) {
						return {
							weight: aweight,
							opacity: 1,
							color: acolor,
							fill: false
						};
					},
					pane: layerID + "Pane"
				});
				return geoJsonLayer;
			})
	}

}

function addingJsonPointsHandle(layerID, URL, symbolType, awcolor) {
	//console.log(symbolType)
	var anewicon = L.AwesomeMarkers.icon({
		icon: symbolType,
		markerColor: awcolor,
		shadow: null
	});
	anewicon.options.shadowSize = [0, 0]

	newLayer = L.geoJson(null, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: anewicon,
				title: feature.properties.name,
				riseOnHover: true,
				pane: layerID + "Pane"
			});
		},
		onEachFeature: function (feature, layer) {
			if (feature.properties) {
				var content = ""
				for (var index in feature.properties) {
					content = content + index + ": " + feature.properties[index] + "<br/>"
				}
				var content = content +
					"<!--Streetview Div-->" +
					"<div  id='streetview' style='margin-top:10px;'><hr><h4 class='text-center'><a href='http://maps.google.com/maps?q=&layer=c&cbll=" + layer.getLatLng().lat + "," + layer.getLatLng().lng + "' target='_blank'>Google Streetview</a></h4</div>";


				layer.on({
					click: function (e) {
						var popup = L.popup().setLatLng([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).setContent(content).openOn(map);
					}
				});
				//$("#feature-list tbody").append('<tr class="feature-row" layerID="' + layerID + '" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="18" height="18" src="img/parkingmeters.png"></td><td class="feature-name">' + layer.feature.properties.LOCATION +" , "+layer.feature.properties.METER_ID+ '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');

			}
		}
	})


	if (URL == false) {
		if (dataType == 1) {

			//console.log(localJSON)
			eval('newLayer.addData(' + layerID + 'JSON);')
			return newLayer;

		}

	}




	$.get(URL, function (data) {
		newLayer.addData(data);
	});

	return newLayer;
}

//--------------------------------------Legend------------------------------------
function addLegendHandle(layerID, url, grades, colors, dataType, icons, color) { //colors and grades are intented for gradient

	//for default layer; dataType,layerID
	//ADDITIONAL FOR JSON points: icon, color
	//polyline: color
	//server: url
	if (dataType == 7) {
		if (layerID == "med_income" || layerID == "commute_min") {
			getGraduatedColorsDiv(layerID, grades, colors, false);
		}
		else {
			getGraduatedColorsDiv(layerID, grades, colors, true);
		}
	}

	switch (layerID) {

		case "wshd_cso":
			getIconBlockDiv(layerID, "pic", null, "Sewer overflows", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMRJREFUOI3t0jFKgzEYBuAnUMgtFDo49gZOTuqkTuLi4OIBPEJdugs9QIUew9GDKHoCSRHj8IuU8n8/pLiIvpDle+FJQjLywxn9g78MrJziErt4wgL3idoMfnCH67XRBIeV48pFhPaClbMN7DuJczxg3nLCq2C+3jeAOY+VMgSOo6IfLOUVeyGX80u0YXTlJfZDsJRlVEXgHCc46OkeMWsCE++VI9zo/uEOnmvOi1TKbeKt9YQSK0y/VpfhhxoGt80fBD8BW6sroSH2zDEAAAAASUVORK5CYII=")
			break;

		case "medical":
			getIconBlockDiv(layerID, "pic", null, "Columbus medical facilities", "./img/medical.png")
			break;

		case "industry":
			getIconBlockDiv(layerID, "pic", null, "Columbus industry facilities", "./img/industry.png")
			break;

		case "emergency":
			getIconBlockDiv(layerID, "pic", null, "Columbus emergency response", "./img/emergency.png")
			break;

		case "parkingmeters":
			getIconBlockDiv(layerID, "pic", null, "Parking meters", "./img/parkingmeters.png")
			break;




		/*	case "air_stations":
				var airLegendContent = '<svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#008000"/></svg> 1–50 <br>Good<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#FFFF00"/></svg> 50–101 Moderate<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#FFA500"/></svg> 101–151 Unhealthy for Sensitive Groups<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#FF0000"/></svg> 151–201 Unhealthy<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#800080"/></svg> 201–301 Very Unhealthy<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#800000"/></svg> 301–500 Hazardous<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#222222"/></svg> Not Reporting Data'
				document.getElementById('legend-' + layerID + '-collapse').innerHTML = airLegendContent;
				break;*/

		case "cota":
			var cotaLegendContent = '<svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#253494" /></svg> >900 Riders<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#2c7fb8" /></svg> >500 Riders<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#41b6c4" /></svg> >99 Riders<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#a1dab4" /></svg> >50 Riders<br><svg height="28" width="28"><circle cx="14" cy="14" r="11" stroke-width="1" fill="#ffffcc" /></svg> <50 Riders'
			document.getElementById('legend-' + layerID + '-collapse').innerHTML = cotaLegendContent;
			break;
		/*
				case "gas":
					getIconBlockDiv(layerID, "pic", null, "Very high", 'http://gis.osu.edu/misc/gasprices/icons/marker-iconVeryHI.png')
					getIconBlockDiv(layerID, "pic", null, "High", 'http://gis.osu.edu/misc/gasprices/icons/marker-iconHi.png')
					getIconBlockDiv(layerID, "pic", null, "Mid high", 'http://gis.osu.edu/misc/gasprices/icons/marker-iconMidHi.png')
					for (i = 0; i < 15; i++) {
						iconurl = 'http://gis.osu.edu/misc/gasprices/icons/marker-icon' + (i + 1) + '.png';
						getIconBlockDiv(layerID, "pic", null, "No." + (i + 1) + " low", iconurl)
					}
					break;*/
		default:
			if (dataType == 3 || dataType == 4) {
				$.ajax({
					url: url + "?f=pjson",
					type: 'GET',
					async: false,
					dataType: 'JSON',
					success: function (data) {
						var layerName = data.name;
						//console.log(data)
						url = url.substring(0, url.indexOf("MapServer") + 9)
						getMapServerLegendDiv(layerID, url + '/legend?f=pjson', layerName)

					}
				});
			} else if (dataType == 1) {
				getIconBlockDiv(layerID, icons, color, getLayerName(layerID), null)
			} else if (dataType == 2) {
				getIconBlockDiv(layerID, null, color, getLayerName(layerID), null)
			} else if (dataType == 5) {
				$.ajax({
					url: url + "?f=pjson",
					type: 'GET',
					async:false,
					dataType: 'JSON',
					success: function (data) {
						//console.log(data)
						url = url.substring(0, url.indexOf("MapServer") + 9)
						getMapServerCollectionLegendDiv(layerID, url + '/legend?f=pjson')
					}
				});
			}

	}


}


function getMapServerLegendDiv(layerID, url, layerName) { //return one map's legend
	//console.log(url)
	$.ajax({
		url: url,
		type: 'GET',
		async: false,
		dataType: 'JSON',
		success: function (data) {
			//console.log(layerName)
			var numberOfLayer;
			for (var i in data.layers) {
				if (data.layers[i].layerName == layerName) {
					numberOfLayer = i;
				}
			}

			if (numberOfLayer == undefined) {
				numberOfLayer = "0";
			}
			var alegendContent = '<table><tbody>'

			/*switch (layerID) {
				case "eth_asian":
					numberOfLayer = 1
					break;
				case "eth_his":
					numberOfLayer = 2
					break;
				case "eth_black":
					numberOfLayer = 3
					break;
				case "eth_white":
					numberOfLayer = 4
					break;
			}*/
			//console.log(numberOfLayer)
			for (var i in data.layers[numberOfLayer].legend) {
				labelContent = data.layers[numberOfLayer].legend[i].label;
				alegendContent += "<tr valign='middle'>" +
					"<td class='tablehead' align='middle'><img src='data:image/png;base64," + data.layers[numberOfLayer].legend[i].imageData + "'></td>" +
					"<td class='tablecontent' align='right'><span>" + labelContent + "</span><td>" + "</tr>"
			}
			alegendContent += "</tbody><table>"
			document.getElementById('legend-' + layerID + '-collapse').innerHTML += alegendContent;
		}
	})

}

function getMapServerCollectionLegendDiv(layerID, url) {
	$.ajax({
		url: url,
		type: 'GET',
		async:false,
		dataType: 'JSON',
		success: function (data) {
			//console.log(layerName)
			var alegendContent = '<table><tbody>'
			data=data["layers"]
			print (data)
			for (var numberOfLayer in data) {
					labelContent = data[numberOfLayer].legend[0].label;
					alegendContent += "<tr valign='middle'>" +
						"<td class='tablehead' align='middle'><img src='data:image/png;base64," + data[numberOfLayer].legend[0].imageData + "'></td>" +
						"<td style='width:200px;' class='tablecontent' align='right'><span>" + data[numberOfLayer].layerName+ "</span><td>" + "</tr>"
			}

			alegendContent += "</tbody><table>"
			document.getElementById('legend-' + layerID + '-collapse').innerHTML = alegendContent;
		}
	})

}

function getGraduatedColorsDiv(layerID, grades, colors, flag) { //grades.length must === colors.length
	if (flag) {
		var legendContent2 = '<table><tbody>'
		for (var i in grades) {
			if (i == 0) {
				labelContent2 = grades[i] + "% + ";
			} else {
				labelContent2 = grades[i] + "% - " + grades[i - 1] + "%";
			}
			legendContent2 += "<tr valign='middle'>" +
				"<td class='tablehead' align='middle'>" + getColorBlockString(colors[i]) + "</td>" +
				"<td class='tablecontent' align='right' style='width:90%;'><span style='width:90%;'>" + labelContent2 + "</span><td>" + "</tr>";
		}
		legendContent2 += "<tr valign='middle'>" +
			"<td class='tablehead' align='middle'>" + getColorBlockString(colors[colors.length - 1]) + "</td>" +
			"<td class='tablecontent' align='right' style='width:90%;'><span style='width:90%;'> 0% - " + grades[grades.length - 1] + "%</span><td>" + "</tr>";
		legendContent2 += "</tbody><table>";
		document.getElementById('legend-' + layerID + '-collapse').innerHTML += legendContent2;
	}
	else {
		var legendContent2 = '<table><tbody>'
		for (var i in grades) {
			if (i == 0) {
				labelContent2 = grades[i] + " + ";
			} else {
				labelContent2 = grades[i] + " - " + grades[i - 1];
			}
			legendContent2 += "<tr valign='middle'>" +
				"<td class='tablehead' align='middle'>" + getColorBlockString(colors[i]) + "</td>" +
				"<td class='tablecontent' align='right' style='width:90%;'><span style='width:90%;'>" + labelContent2 + "</span><td>" + "</tr>";
		}
		legendContent2 += "<tr valign='middle'>" +
			"<td class='tablehead' align='middle'>" + getColorBlockString(colors[colors.length - 1]) + "</td>" +
			"<td class='tablecontent' align='right' style='width:90%;'><span style='width:90%;'> 0 - " + grades[grades.length - 1] + "</span><td>" + "</tr>";
		legendContent2 += "</tbody><table>";
		document.getElementById('legend-' + layerID + '-collapse').innerHTML += legendContent2;
	}
}

function getColorBlockString(color) {
	var div = '<div class="legendbox" style="padding:0px;background:' + color + '"></div>'
	return div;
}

function getIconBlockString(color, icon) {
	var div = '<div class="legendbox" style="padding:0px;background:' + color + '"><i class="fa fa-' + icon + '" aria-hidden="true" style="color:#ffffff"></i></div>'
	return div;
}

function getIconBlockDiv(mapID, icons, colors, names, url) {
	/*var legendContent = '<div class="legendcontent" id="' + mapID + '-legendcontent"><a data-toggle="collapse" href="#legend-' + mapID + '-collapse">' + mapID + '</a>' +
		'<div id="' + 'legend-' + mapID + '-collapse' + '" class="panel-collapse collapse in" role="tabpane2" aria-labelledby="headingOne0" aria-expanded="true"></div></div>'

	legend.getContainer().innerHTML += legendContent*/

	var legendContent2 = '<table><tbody>'
	if (icons == "pic") {
		legendContent2 += "<tr valign='middle'>" +
			"<td class='tablehead' align='middle'>" + getPicBlockString(url) + "</td>" +
			"<td class='tablecontent' align='right'><span>" + names + "</span><td>" +
			"</tr>"
	} else {
		if (icons == "line") {
			legendContent2 += "<tr valign='middle'>" +
				"<td class='tablehead' align='middle'>" + getColorLineString(colors) + "</td>" +
				"<td class='tablecontent' align='right'><span>" + names + "</span><td>" +
				"</tr>"

		} else { //icon+colorblock
			legendContent2 += "<tr valign='middle'>" +
				"<td class='tablehead' align='middle'>" + getIconBlockString(colors, icons) + "</td>" +
				"<td class='tablecontent' align='right'><span>" + names + "</span><td>" +
				"</tr>"
		}
	}


	legendContent2 += "</tbody><table>"
	document.getElementById('legend-' + mapID + '-collapse').innerHTML += legendContent2;
}

function getPicBlockString(url) {
	var div = '<img src=' + url + '>'
	return div;
}

function getColorLineString(color) {
	var div = '<hr width="26px" style="background-color:' + color + '; border-width:0;">'
	return div;
}



//------------------------------------About 'Layer Settings' menu------------------------------------
function changeBasemap(basemap) { //change the icon of each options when changing basemap
	map.removeLayer(baseLayer);
	baseLayer = L.esri.basemapLayer(getLayerName(basemap), pane = "basemapPane");
	map.addLayer(baseLayer);
	document.getElementById(baseLayerID).innerHTML = document.getElementById(baseLayerID).innerHTML.substring(document.getElementById(baseLayerID).innerHTML.indexOf('/') + 4, document.getElementById(baseLayerID).innerHTML.length)
	document.getElementById(basemap).innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> ' + document.getElementById(basemap).innerHTML;
	baseLayerID = basemap;
}

/*
function changeButtonStatus(layerID) { //to change the icon in the buttons of each map
	try {
		if (mapFlagList[layerID] == null) {
			document.getElementById(layerID + "-btn").innerHTML = '<i class="fa fa-check" aria-hidden="true"></i> ' + document.getElementById(layerID + "-btn").innerHTML.substring(document.getElementById(layerID + "-btn").innerHTML.indexOf('/') + 4, document.getElementById(layerID + "-btn").innerHTML.length)
		} else {
			document.getElementById(layerID + "-btn").innerHTML = '<i class="fa fa-circle" aria-hidden="true"></i> ' + document.getElementById(layerID + "-btn").innerHTML.substring(document.getElementById(layerID + "-btn").innerHTML.indexOf('/') + 4, document.getElementById(layerID + "-btn").innerHTML.length)
		}
	} catch (err) {}

}*/

//------------------------------------For sortable------------------------------------
function generateBase36Id(el) {
	var str = el.tagName + el.className + el.src + el.href + el.textContent,
		i = str.length,
		sum = 0;

	while (i--) {
		sum += str.charCodeAt(i);
	}

	return sum.toString(36);
}

function getBoundsMapServer(url) {
	var a;
	$.ajax({
		url: url,
		type: 'GET',
		async: false,
		dataType: 'JSON',
		success: function (data) {
			a = data.extent;
		}
	})

	return a;
}

function returnBounds(layerID) { //used to put this in the bottom of addhandle.js, due to ajax's async so can't. So just put this into buttons' click listener.
	/*if (layerID == "gas") {
		var corner1 = L.latLng(40.14948820651526, -83.17611694335939)
		var corner2 = L.latLng(39.8928799002948, -82.86712646484376)
		extent = L.latLngBounds(corner1, corner2)

		return extent;
	}*/
	try {
		console.log(fullLayerFlags.getItemByLayerID(layerID).extentType);
		switch (fullLayerFlags.getItemByLayerID(layerID).extentType) {
			case 1: //json
				var extent;
				eval('extent=' + layerID + "Layer.getBounds()")
				return extent;

			case 2: //feature
				/*
					var aUrl;
					eval('var currentLayer=' + layerID + 'Layer')
					aUrl = currentLayer.options.url;
					var theend = aUrl.indexOf("MapServer");
					aUrl = aUrl.substring(0, theend + 9);
					var extent = getBoundsMapServer(aUrl + "/info/iteminfo?f=pjson");
					
					extent = L.latLngBounds(corner1, corner2)

					console.log(extent)
					return extent;*/
				var corner1 = L.latLng(40.143327, -83.177279)
				var corner2 = L.latLng(39.835083, -82.773769)
				return L.latLngBounds(corner1, corner2)

			case 3: //tile
				var aUrl;
				eval('var currentLayer=' + layerID + 'Layer')
				aUrl = currentLayer._url;
				var theend = aUrl.indexOf("/tile");
				aUrl = aUrl.substring(0, theend);
				var extent = getBoundsMapServer(aUrl + "/info/iteminfo?f=pjson");
				A =
					console.log(extent)
				var corner1 = L.latLng(extent[0][1], extent[0][0])
				var corner2 = L.latLng(extent[1][1], extent[1][0])
				extent = L.latLngBounds(corner1, corner2)
				return extent;

			default:
		}
	} catch (error) {
		var corner1 = L.latLng(40.248471, -83.312091)
		var corner2 = L.latLng(39.731868, -82.606219)
		extent = L.latLngBounds(corner1, corner2)

		return extent;
	}




}

function getLayerName(layerID) { //from layerID to get full name of layer, the name 
	switch (layerID) {
		case "esriDarkGray":
			mapName = "DarkGray";
			return mapName;
			break;
		case "esriTopo":
			mapName = "Topographic";
			return mapName;
			break;
		case "esriImagery":
			mapName = "Imagery";
			return mapName;
			break;
		case "esriGray":
			mapName = "Gray";
			return mapName;
			break;
		default:
			return fullLayerFlags.getItemByLayerID(layerID).layerName;
			break;

	}
}

//------------------------------------------add layer-===---------------------------------------


function addDefaultHandles(layerID, dataType, URL, symbolType, jsonp, acolor) //
{
	if (dataType == 1) { //"JSON Points"
		eval(layerID + "Layer=addingJsonPointsHandle(layerID, URL,symbolType,acolor);")
		eval("map.addLayer(" + layerID + "Layer);")
		flagList[layerID] = 1;
		return false;
	}

	if (dataType == 2 || dataType == 6 || dataType == 7) { //"JSON Polyline (2)/Polygon (6)"
		eval(layerID + "Layer = receiveJsonp(URL, layerID,jsonp,acolor,dataType);")
		eval("map.addLayer(" + layerID + "Layer);")
		flagList[layerID] = 1;
		return false;
	}

	if (dataType == 4) { //"GeoServer tiles"
		//console.log(URL)
		eval(layerID + "Layer = L.esri.tiledMapLayer({" +
			"url: '" + URL + "'," +
			"pane: layerID + 'Pane'" +
			"});")
		eval("map.addLayer(" + layerID + "Layer);")
		flagList[layerID] = 1;
		return false;
	}

	if (dataType == 3) { //"GeoServer features"

		var numberOfLayer = URL.substring(URL.lastIndexOf("/") + 1, URL.lastIndexOf("/") + 2)

		legendURL = URL.substring(0, URL.indexOf("MapServer") + 9) + '/legend?f=pjson'
		$.ajax({
			url: legendURL,
			type: 'GET',
			dataType: 'JSON',
			success: function (data) {

				iconurl = ('data:image/png;base64,' + data.layers[numberOfLayer].legend[0].imageData);

				var codeString = layerID + 'Layer = L.esri.featureLayer({' +
					'url: URL,' +
					'pointToLayer:function (feature, latlng) {' +
					'return L.marker(latlng, {' +
					'icon: L.icon({' +
					'iconUrl: iconurl,' +
					'iconSize: [28, 28],' +
					'iconAnchor: [12, 28],' +
					'popupAnchor: [0, -25]' +
					'}),' +
					'riseOnHover: true,' +
					'pane: "' + layerID + 'Pane",' +
					'title: feature.properties.name' +
					'});' +
					'},' +
					'style:function(feature){' +
					'return {color:"' + acolor + '"};' +
					'},' +
					'pane: "' + layerID + 'Pane",' +
					'ignoreRenderer:false' +
					'})' //very ugly, I know.
				eval(codeString)
				eval("map.addLayer(" + layerID + "Layer)")

				flagList[layerID] = 1;
				return false;
			}
		})


	}
	if (dataType == 5) { // "Dynamic layer"
		eval(layerID + "Layer = L.esri.dynamicMapLayer({" +
			"url: '" + URL + "'," +
			"pane: layerID + 'Pane'" +
			"});")
		eval("map.addLayer(" + layerID + "Layer);")
		flagList[layerID] = 1;
		return false;

	}
}

function addServerMapCollection() {

}

//addLayerHandle: when initializing or add custom layers, this method is fired.
//Include: add items and their eventlisteners, remove eventlisteners
function addLayerHandle(layerID, isOut, dataType, URL, symbolType, jsonp, color) {
	//create pane for each layer, so that adjusting zindex is possible. Pane is a DOM so avoid use same name as layer.
	var layerPaneID = layerID + "Pane";
	if (!map.getPane(layerPaneID)) {
		map.createPane(layerPaneID);
	}
	if (symbolType === undefined) {
		symbolType = "cog";
	}
	if (color === undefined) {
		if (fullLayerFlags.getItemByLayerID(layerID).color != "null") {
			color = fullLayerFlags.getItemByLayerID(layerID).color
		} else {
			color = "#000000";
		}
	}
	if (isOut === undefined) {
		isOut = false;
	}

	//syncSidebar(); //refresh POIList


	var neodiv = document.createElement('div');
	neodiv.innerHTML = "<div class=\"list-group-item\" layerID='" + layerID + "' id=\"" + layerID + "-list-item\" style='border-width: 3px;border-style: outset;border-color:" + fullLayerFlags.getBackgroundColor(layerID) + ";padding-left:8px;padding-right:5px;'>" + //list-group-item
		"<div class=\"panel-heading\" style=\"width:230px;height:20px;padding:0;margin:0px\">" + //wrapper
		"<span style=\"float:left;vertical-align: middle;padding-right:0;opacity:0.3;cursor: all-scroll;padding-top:2px\" class=\"glyphicon glyphicon-menu-hamburger\" title=\"Drag to change the sequence of layers\" aria-hidden=\"true\"></span>" +
		//dragger


		//checkbox
		"&nbsp&nbsp&nbsp<div class=\"form-check abc-checkbox\" title=\"Click to show or hide the layer\" style=\"float:left ; margin: auto;padding:0;margin:0\">" +

		"<input type=\"checkbox\" id=\"" + layerID + "-checkbox" + "\" class=\"styled\" unchecked style=\"float:left;vertical-align: middle;padding:0\">" +

		"<label style='float:left;padding-left:0;padding-right:0;font-weight:normal' class='form-check-label' for='" + layerID + "-checkbox'>" +
		"<a style=\"float:left;padding-left:9px\" id=\"" + layerID + "-metadata" + "\" title=\"The metadata of the layer\" valign=\"top\" href=\"#\">" + getLayerName(layerID) + "</a>" + //metadata
		//"<div class=\"panel-title\" style=\"float:left\">" +
		"</label>" +
		"</div>" +
		//checkbox end



		"<a class=\"accordion-toggle collapsed\" id=\"" + layerID + "-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" style=\"vertical-align: middle; float:right\" href=\"#" + layerID + "-controlcontainer" + "\" title=\"Click to show or hide the control box\">" +
		"</a>" +
		//"</div>" +
		"</div>" +

		"<div id=\"" + layerID + "-controlcontainer" + "\" style='width:230px;margin:0' class=\"panel-collapse collapse\" title=\"Click to open the legend\">" + //control wrapper
		"<div class=\"panel-body\" style=\"width:230px;padding:0px;margin:0px\"><br>" + //wrapper

		"<a id=\"" + layerID + "-legend-btn\" class=\"btn btn-info btn-xs\" title=\"Click to open the legend\" data-toggle=\"collapse\" href=\"#legend-" + layerID + "-collapse\" disabled>" + '<b' + ' class="fa fa-info-circle" aria-hidden="true"></b>' + " Legend</a>" + //legendbutton
		"&nbsp&nbsp&nbsp<a id=\"" + layerID + "-upmost-btn\" class=\"btn btn-primary btn-xs\" title=\"Click to move this layer to the top\">" + '<b' + ' class="fa fa-thumbs-up" aria-hidden="true"></b>' + " To top</a>" + //legendbutton
		"&nbsp&nbsp&nbsp<a id=\"" + layerID + "-zoomto-btn\" class=\"btn btn-success btn-xs\" title=\"Click to zoom in the layer\">" + '<b' + ' class="fa fa-search-plus" aria-hidden="true"></b>' + " Zoomto</a>" + //legendbutton
		"</br>" +
		"<a class=\"btn btn-light btn-xs\" title=\"Opacity Slider\">" + '<b' + ' class="fa fa-eye" aria-hidden="true"></b>' + " Opacity</a>" +
		"<input id=\"" + layerID + "-slider\"type=\"range\" value=\"100\" title=\"Drag to adjust the opacity of the layer\">" + //slider

		'<div class="legendcontent" id="' + layerID + '-legendcontent">' + //legendcontent
		'<div id="' + 'legend-' + layerID + '-collapse' + '" class="panel-collapse collapse collapse" role="tabpanel" aria-labelledby="headingOne0" aria-expanded="true"></div></div>' +
		"</div>" +
		"</div>" +
		"</div>"

	if (isOut == false) {
		document.getElementById("layer-list").prepend(neodiv);
	} else {
		document.getElementsByClassName("simplebar-content")[0].prepend(neodiv);
	}
	$("#" + layerID + "-metadata").click(function () { //metadata
		document.getElementById("left").innerHTML = "<div class=panel-body style=width:100%><p>" + fullLayerFlags.getItemByLayerID(layerID).left + '</p></div>'
		document.getElementById("right").innerHTML = "<div class=panel-body style=width:100%><p>" + fullLayerFlags.getItemByLayerID(layerID).right + '</p></div>'
		$("#meta-modal").modal("show");
		$(".navbar-collapse.in").collapse("hide");
		return false;
	});

	//-----legend------if you are looking for the real adding legend sentence, pls go to add handle's bottom
	$('#' + layerID + "-legend-btn").click(function () {
		/*if (!$('#' + layerID + "-checkbox").prop('checked')) {
			alert("Please add the layer first.");
		}*/

	});


	//------upmost------
	$('#' + layerID + "-upmost-btn").click(function () {
		var layerListOrder = asortable.toArray();
		var currentItem = document.getElementById(layerID + "-list-item").parentNode;
		var currentBase36Id = generateBase36Id(currentItem);
		for (var i = 0; i < layerListOrder.length; i++) {
			if (currentBase36Id == layerListOrder[i]) {
				var tempId = layerListOrder[i];
				layerListOrder.splice(i, 1);
				layerListOrder.unshift(tempId);
				break;
			}
		}
		asortable.sort(layerListOrder);
		sortLayerHandle(e)
	});

	//------zoomto------
	$('#' + layerID + "-zoomto-btn").click(function () {
		var bounds = returnBounds(layerID)
		map.fitBounds(bounds)
	});

	//------slider------
	$('#' + layerID + "-slider").rangeslider({
		polyfill: true,
	});

	var selector = "#" + layerID + "-slider"
	$(document).on('input', selector, function (e) {
		map.getPane(layerPaneID).style.opacity = (e.currentTarget.value / 100);
	})

	//------checkbox------
	$('#' + layerID + "-checkbox").change(function () {
		if ($(this).prop('checked')) {
			//add layer to the map by layerID
			checkedHandle(layerID, dataType, URL, symbolType, jsonp, color);
			//include a delete button, a icon, a slider (basically)
		} else {
			uncheckedHandle(layerID);
		}
	});


}


//sort layer handle according to the list order in list-group aka 'layer-list'
function sortLayerHandle(e) {
	var sortList = asortable.toArray();
	var baseZindex = 300;
	for (var i = 0; i < sortList.length; i++) {
		//hint:  contentwrapper=document.getElementsByClassName("simplebar-content")[0]
		currentLayerID = contentwrapper.children[i].children[0].id.substring(0, contentwrapper.children[i].children[0].id.indexOf("-"));
		try {
			map.getPane(currentLayerID + "Pane").style.zIndex = baseZindex - i;
		} catch (err) {
			alert("Please add the layer first.")
		}
	}
}

//get layer's mapID
function getLayerParent(layerID) { //very ugly codes...
	switch (layerID) {
		case "bikeshr_cogo":
			return "bikeshr";
			break;
		case "bikeshr_zgst":
			return "bikeshr";
			break;
		case "bikepath_heads":
			return "bikepath";
			break;
		case "bikepath_green":
			return "bikepath";
			break;
		case "bikepath_path":
			return "bikepath";
			break;

		default:
			return layerID;
	}
}

//uncheck handle of each layer
function uncheckedHandle(layerID) {

	/*$("#" + layerID + "-metadata").off("click");
	$("#" + layerID + "-legend").off("click");
	$('#' + layerID + "-slider").off("rangeslider");
	$('#' + layerID + "-checkbox").off("change");
	$("#" + layerID + "-slider").off("input"); //turn off the eventhandler*/


	document.getElementById(layerID + "-legend-btn").setAttribute("disabled", "")
	deletelegend = document.getElementById("legend-" + layerID + "-collapse")
	deletelegend.innerHTML = ''


	/*$("#" + layerID + "-listItem").animate({
		height: "0px"
	}, 100, function () {
		document.getElementById(layerID + "-listItem").parentElement.remove();
	});*/

	//map.removeLayer(eval(layerID + "Layer"));
	eval('map.removeLayer(' + layerID + 'Layer);')




	delete flagList[layerID];
	if (POIFlagList[layerID]) {
		delete POIFlagList[layerID];
	}

	if (isPined) {
		reSortHandle();
	}

	syncSidebar();
}

function conditionalSortHandle(condition) {
	/*fullLayerFlags.layerFlags.sort(function (a, b) {
		eval('var textA = a.'+condition)
		eval('var textB = a.'+condition)
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	  })*/
	switch (condition) {
		case "layerUpperName":
			fullLayerFlags.layerFlags.sort(function (a, b) {
				var textA = a.layerName;
				var textB = b.layerName;
				return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			})
			break;

		case "layerType":
			fullLayerFlags.layerFlags.sort(function (a, b) {
				var textA = a.layerType;
				var textB = b.layerType;
				return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			})
			break;

		case "featureType":
			fullLayerFlags.layerFlags.sort(function (a, b) {
				var textA = a.featureType;
				var textB = b.featureType;
				return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
			})
			break;

	}


	var base36ListTemp = new Array();
	for (var i in fullLayerFlags.layerFlags) {
		base36ListTemp[i] = generateBase36Id(document.getElementById(fullLayerFlags.layerFlags[i].layerID + "-list-item").parentNode)
	}
	asortable.sort(base36ListTemp)
	sortLayerHandle(e)
	return false;
}

/*Array.prototype.remove = function (dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[dx]) {
			this[n++] = this[i]
		}
	}
	this.length -= 1
}*/

function removeItem(a, b) {
	var flag = false;
	for (var i in a) {
		if (a[i] == b) {
			a.splice(i, 1);
			flag = true;
			return flag;
		}
	}
	return flag;
}

function reSortHandle() { //to guarantee the sequence of the sortable list is always right. Design for "pin-checkbox"
	var container = document.getElementsByClassName("simplebar-content")[0]

	var layerIDList = new Array(),
		base36UpList = new Array();

	var base36List = asortable.toArray();
	for (var i in base36List) { //something goes wrong here
		var currentLayerID = document.getElementsByClassName("simplebar-content")[0].children[i].children[0].getAttribute("layerID")
		layerIDList.push(currentLayerID);
		currentItem = document.getElementById(currentLayerID + "-list-item").parentNode;
		currentBase36Id = generateBase36Id(currentItem);
		//console.log(currentLayerID, currentBase36Id)
	}
	var base36DownList = asortable.toArray();
	//console.log(layerIDList, base36List, base36UpList, base36DownList)
	for (var i in layerIDList) { //this goes something wrong
		if (flagList[layerIDList[i]]) { //
			//console.log(base36List[i], layerIDList[i])
			base36UpList.push(base36List[i]);
			removeItem(base36DownList, base36List[i])
			//console.log(base36List[i])
		}
	}
	//console.log(layerIDList, base36List, base36UpList, base36DownList)
	if (!base36UpList) {
		return false;
	}

	for (var i in base36UpList) {
		base36DownList.unshift(base36UpList[base36UpList.length - i - 1])
	}
	//console.log(base36UpList,base36DownList)
	asortable.sort(base36DownList);
	return false;
}