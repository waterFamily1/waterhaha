
function countMidFromLine(start, end) {
	return {
		lng: (start.lng + end.lng) / 2,
		lat: (start.lat + end.lat) /2
	}
}

var img_todo = require('../images/map/todo.png'),
	img_done = require('../images/map/done.png'),
	img_invalid = require('../images/map/invalid.png'),	
	img_error = require('../images/map/error.png');
var actual_color = '#7ed321',
	plan_color_valid = '#3a6bdb',
	plan_color_invalid = '#9b9b9b';

var dispatch_normal = require('../images/dispatch/process.png'),
	dispatch_error = require('../images/dispatch/process_red.png'),
	dispatch_onduty = require('../images/dispatch/staff.png'),
	dispatch_offduty = require('../images/dispatch/staff_green.png');

import Vue from 'vue'
import util from '@/libs/public_js'
const VUEINS = new Vue()
var mapStyle = [
	{
		"featureType": "poilabel",
		"elementType": "all",
		"stylers": {
		 	"visibility": "off"
		}
	}
];
export default {
	create: function(callback) {
		if (typeof BMap == 'undefined') {
			var script = document.createElement("script");  
			script.src = "https://api.map.baidu.com/api?v=2.0&ak=0lPULNZ5PmrFVg76kFuRjezF&callback=MG__MAP__CALLBACK";
			document.body.appendChild(script); 
			window.MG__MAP__CALLBACK = function() {
				callback && callback();
			}
		} else {
			callback && callback();
		}
	},
	addTiles: function(map) {
		if(!map) return;
		var tileLayer = new BMap.TileLayer({isTransparentPng: true});
		tileLayer.getTilesUrl = function(tileCoord, zoom) {
			var x = tileCoord.x;
			var y = tileCoord.y;
			return '/images/tiles/' + zoom + '/' + x + '/' + y + '.png'; 
		}
		map.addTileLayer(tileLayer);
	},
	placePoint: function(map, callback) {
		if(!map) return;
		var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(r){
            let point = {lng: 117.216624, lat: 39.142637};//默认
			map.centerAndZoom(new BMap.Point(point.lng, point.lat), 15);//缩放层级修改为17
            
			// callback && callback(point);
		},{ enableHighAccuracy: true })
	},
	setStyle: function(map) {
		if(!map) return;
		map.setMapStyle({styleJson: mapStyle});
	},
	//设置缩放级别和中心点
	setZoom: function(map, points,zoomLevel){
		var view = map.getViewport(points.map(v => {
			return {
				lng: v.longitude,
				lat: v.latitude
			}
		}));
		var mapZoom = view.zoom;
		var centerPoint = view.center;
		map.centerAndZoom(centerPoint, zoomLevel||mapZoom);  
	},
	drawPatrolTask: function(map, data) {
		var points = data.patrolPointDetailDTOs || [],
			lines = data.patrolTaskPlanPaths || [];
		if(!map || !points.length || !lines.length) {
			return;
		}
		this.setZoom(map, points);
		var icon; 
		points.forEach((po)=>{
			var P = new BMap.Point(po.longitude, po.latitude);
			switch (po.status) {
				case '正常':
				icon = new BMap.Icon(img_done, new BMap.Size(16,21));
				break;
				case '异常':
				icon = new BMap.Icon(img_error, new BMap.Size(16,21));
				break;
				case '未检':
				icon = new BMap.Icon(img_invalid, new BMap.Size(16,21), {anchor:new BMap.Size(8,21)});
				break;
				default:
				icon = new BMap.Icon(img_todo, new BMap.Size(16,21));
				break;
			}  
			var marker = new BMap.Marker(P, {icon: icon});
			map.addOverlay(marker);

			var label = new BMap.Label(po.patrolPoint,  {
					position : P,  
					offset   : new BMap.Size(10, -15)    
				}); 
				label.setStyle({borderColor: '#0093ff', color: '#0093ff'})
			map.addOverlay(label);   

			var errorHtml = "", errorStep, errorStepHtml = "" ;
			if(po.uninspectedStep && po.uninspectedStep.length) {
				errorStep = po.uninspectedStep;
				errorStep.forEach((step)=>{
					errorStepHtml += "<li>"+step+"</li>";
				})
			} else {
				errorStepHtml = '<li>无</li>'
			}
			if(po.status == '异常')
				errorHtml = "<div ><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>漏检结果</div><ul style='padding-top:2px;clear:both;color:gray;'>"+ errorStepHtml +"</ul></div>";
			var infoWindow = new BMap.InfoWindow(
				"<div style='overflow:auto;'><div style='font-size:large;font-weight:bold;'>"+po.patrolPoint+"</div><div><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>报缺数</div>"+po.faultCount+"</div>"+errorHtml+"</div>", 
				{
					width : 0,     // 信息窗口宽度
					height: 0,     // 信息窗口高度
					title : '' , // 信息窗口标题
					enableMessage:false 
				});  
			marker.addEventListener("click", function(){      
				map.openInfoWindow(infoWindow, P); 
			});

		})

		
		if(lines.length < 2) return;

		var linesData = [];
		for(var i = 0,len=lines.length;i<=len;i++) {
			var lin , LP , polyline;
			if(i!=len) {
				lin = lines[i];
				LP = new BMap.Point(lin.longitude, lin.latitude);
			}
			if(linesData.length < 2){
				linesData.push(LP);
			} else {
				polyline = new BMap.Polyline(
					linesData, 
					{
						strokeColor: (lin.validate == 'valid') ? plan_color_valid : plan_color_invalid, 
						strokeWeight: 4
					}
				);  

			
				map.addOverlay(polyline);

				if(i != len) {
					linesData = [linesData[1], LP];
				}

			}
			
		}
	},
	drawPatrol: function(map, data, pointField) {
		var points = data.patrolTaskPointTrackDTOs || [],
			lines = data.patrolTaskPlanPaths || [];
		if(!map || !points.length || !lines.length) {
			return;
		}
		this.setZoom(map, points);
		var icon; 
		points.forEach((po)=>{
			var P = new BMap.Point(po.longitude, po.latitude);
			switch (po.status) {
				case '正常':
				icon = new BMap.Icon(img_done, new BMap.Size(16,21));
				break;
				case '异常':
				icon = new BMap.Icon(img_error, new BMap.Size(16,21));
				break;
				case '未检':
				icon = new BMap.Icon(img_invalid, new BMap.Size(16,21), {anchor:new BMap.Size(8,21)});
				break;
			}  
			var marker = new BMap.Marker(P, {icon: icon});
			map.addOverlay(marker);

			var label = new BMap.Label(po.patrolPointName,  {
					position : P,  
					offset   : new BMap.Size(10, -15)    
				}); 
				label.setStyle({borderColor: '#0093ff', color: '#0093ff'})
			map.addOverlay(label);   

			var errorHtml = "", errorStep, errorStepHtml = "" ;
			if(po.uninspectedStep && po.uninspectedStep.length) {
				errorStep = po.uninspectedStep;
				errorStep.forEach((step)=>{
					errorStepHtml += "<li>"+step+"</li>";
				})
			} else {
				errorStepHtml = '<li>无</li>'
			}
			if(po.status == '异常')
				errorHtml = "<div ><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>漏检结果</div><ul style='padding-top:2px;clear:both;color:gray;'>"+ errorStepHtml +"</ul></div>";
			var infoWindow = new BMap.InfoWindow(
				"<div style='overflow:auto;'><div style='font-size:large;font-weight:bold;'>"+po.patrolPointName+"</div><div><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>报缺数</div>"+po.faultCount+"</div>"+errorHtml+"</div>", 
				{
					width : 0,     // 信息窗口宽度
					height: 0,     // 信息窗口高度
					title : '' , // 信息窗口标题
					enableMessage:false 
				});  
			marker.addEventListener("click", function(){      
				map.openInfoWindow(infoWindow, P); 
			});

		})

		
		if(lines.length < 2) return;
		var lineInfoWindow = new BMap.InfoWindow(
				"<h5>"+data.name+"</h5>"+
				"<div>"+data.executeStatus+"</div>"+
				"<div>时间："+util.transDateFromServer(data.startTime, 'hh:mm')+" - "+util.transDateFromServer(data.endTime, 'hh:mm')+"</div>"+
				"<div>发现缺陷："+data.faultCount+"</div>"+
				"<div>巡检点：" + data.inspectedCount + "/" + data.patrolPointCount+"</div>"+
				"<div>计划距离："+data.planPathLength+"米</div>"+
				"<div>有效距离："+data.validPathLength+"米</div>", 
				{
					width : 270,     // 信息窗口宽度
					height: 140,     // 信息窗口高度
					title : '' , // 信息窗口标题
					enableMessage:false 
				});  
		var linesData = [];
		for(var i = 0,len=lines.length;i<=len;i++) {
			var lin , LP , polyline;
			if(i!=len) {
				lin = lines[i];
				LP = new BMap.Point(lin.longitude, lin.latitude);
			}
			if(linesData.length < 2){
				linesData.push(LP);
			} else {
				polyline = new BMap.Polyline(
					linesData, 
					{
						strokeColor: (lin.validate == 'valid') ? plan_color_valid : plan_color_invalid, 
						strokeWeight: 4
					}
				);  

				polyline.addEventListener('mouseover', function() {
					this.setStrokeStyle('dashed');
				})
				polyline.addEventListener('mouseout', function() {
					this.setStrokeStyle('solid');
				})
				polyline.addEventListener('click', function(e) {
					var start = e.target.getPath()[0], end = e.target.getPath()[1];
					map.openInfoWindow(
						lineInfoWindow, 
						new BMap.Point(
							countMidFromLine(start, end).lng, 
							countMidFromLine(start, end).lat
						)
					)
				})
				map.addOverlay(polyline);

				if(i != len) {
					linesData = [linesData[1], LP];
				}

			}
			
		}
	},
	
	addSearch(map, inputId, onComplete) {
		var ac = new BMap.Autocomplete({
			input : inputId || 'bdmap-search-key',
			location : map
		});
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			var _value = e.item.value,
				myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			var local = new BMap.LocalSearch(map, { //智能搜索
				onSearchComplete: function (){
					var pp = local.getResults().getPoi(0).point;
					map.centerAndZoom(pp, 18);
					onComplete && onComplete(pp);
				}
			});
			local.search(myValue);
		});
		
	},
	getBDPoints: function(data) {
		if(!data) return [];
	    var points = [];
	    data.forEach((item)=>{ 
	    	if(item.longitude && item.latitude)
	        points.push(new BMap.Point(item.longitude, item.latitude))
	    });
	    return points;
	},
	hitPoint: function(map, points, disableDrag) {
		if(Object.prototype.toString.call(points) !== '[object Array]')  points = [points];
		points.forEach((point)=>{
			if(point.longitude && point.latitude) {
				var P = new BMap.Point(point.longitude, point.latitude)
				var marker = new BMap.Marker(P, {icon: new BMap.Icon(img_todo, new BMap.Size(16, 21))});  
				
				if(disableDrag && typeof disableDrag == "boolean") 
					marker.disableDragging();
				else if(typeof disableDrag == "function") {
					marker.enableDragging();
					marker.addEventListener('dragend', function(e) {
						disableDrag(e);
					})
				}
				var label = new BMap.Label(point.patrolPoint, {offset:new BMap.Size(20,-10)});
				label.setStyle({borderColor: '#0093ff', color: '#0093ff'})
				marker.setLabel(label);
				marker.setTitle(point.id);
				map.addOverlay(marker); 
			}
		})
	},
	renderLine: function(map, points, options) {
		var _config = {
		   enableEditing: false,//是否启用线编辑，默认为false
		   enableClicking: true,//是否响应点击事件，默认为true
		   strokeWeight:'5',//折线的宽度，以像素为单位
		   strokeOpacity: 0.65,//折线的透明度，取值范围0 - 1
		};
		var polyline =new BMap.Polyline(points, Object.assign(_config, options||{}));
		map.addOverlay(polyline); 
		return polyline;
	},

	hitProcess: function(map, data, onMarkerClick) {
		var points = [];
		data.forEach((item)=>{
			if(item.longitude && item.latitude) {
				var icon = item.handleStatus ? dispatch_normal : dispatch_error;
				var P = new BMap.Point(item.longitude , item.latitude);
				var marker = new BMap.Marker(P, {icon: new BMap.Icon(icon, new BMap.Size(22, 22))});  
				var label = new BMap.Label(item.name, {offset:new BMap.Size(25, 0)});
				label.setStyle({backgroundColor: '#FFFFFF', borderColor:'#FFFFFF', color: '#4A4A4A', borderRadius:'2px', boxShadow:'2px 2px 4px 0px rgba(0,0,0,0.13)',padding: '3px 10px',cursor:'pointer'});
				marker.setLabel(label);
				map.addOverlay(marker); 
				label.addEventListener("click", function(){
					onMarkerClick && onMarkerClick(this, P, item);
				});
				marker.addEventListener("click", function(){
					onMarkerClick && onMarkerClick(this, P, item);
				});

				points.push(P);
			}
		})
		return points;
	},
	hitStaff: function(map, data, onMarkerClick) {
		var points = [];
		data.forEach((item)=>{
			if(item.longitude && item.latitude) {
				var icon = (item.haveTask==1) ? dispatch_onduty : dispatch_offduty;
				var P = new BMap.Point(item.longitude , item.latitude);
				var marker = new BMap.Marker(P, {icon: new BMap.Icon(icon, new BMap.Size(22, 22))});  
				var label = new BMap.Label(item.userName, {offset:new BMap.Size(25, 0)});
				label.setStyle({backgroundColor: '#FFFFFF', borderColor:'#FFFFFF', color: '#4A4A4A', borderRadius:'2px', boxShadow:'2px 2px 4px 0px rgba(0,0,0,0.13)',padding: '3px 10px'});
				marker.setLabel(label);
				map.addOverlay(marker); 
				marker.addEventListener("click", function(){
					onMarkerClick && onMarkerClick(this, P, item);
				});

				points.push(P);
			}
		})
		return points;
	}
}