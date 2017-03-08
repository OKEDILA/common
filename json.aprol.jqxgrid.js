
function AprolGrid(objectname, parameter, gWidth, gHeight, updateintervall) {
	
	this.objectname 		= objectname;
	this.gWidth 			= gWidth;
	this.gHeight 			= gHeight;
	this.updateintervall 	= updateintervall;
	this.parameter			= parameter;

	// create Tree Grid
	var grid = $(objectname);

	var requeststr = "";

	var filterData = new Array();

// Teste repository

	for (var i = 0; i < parameter.length; i++) {
		if (i < parameter.length) {
			requeststr += parameter[i][0] + ',';

		} else {
			requeststr += parameter[i][0];
		}

		console.log(parameter[i][0]);
		
		filterData.push({
			'id' : parameter[i][0].substring(16)
		});
	}

	var localAdapter = new $.jqx.dataAdapter(filterData);

	var source = {
		dataType : "json",
		dataFields : [ {
			name : 'flags',
			type : 'string'
		}, {
			name : 'id',
			type : 'string'
		}, {
			name : 'ts',
			type : 'string'
		}, {
			name : 'val',
			type : 'float'
		} ],
		url : 'https://srv4aprol.oke.group/opt/aprol/doc/html/HTML/OKE/Scada/php/aprol.json.php?PARAM=' + requeststr + '"',
		type: 'GET'
	};

	var cellsrenderer = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		if (isFloat(value)) {
			value = parseFloat(value).toFixed(2);
		}

		if (value > 20) {
			return '<span class="oke-grid-cell-value">' + value + '</span>';
		} else {
			return '<span class="oke-grid-cell-value">' + value + '</span>';
		}
	};

	var cellsrenderer_unit = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		var value = grid.jqxGrid('getcellvalue', row, 'val');

		for (var i = 0; i < parameter.length; i++) {
			if (row == i) {
				return '<span class="oke-grid-cell-value-descr">'
						+ myescape(parameter[i][3]) + '</span>';
			}
		}

		return '';
	};

	var cellsrenderer_name = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		return '<span class="oke-grid-cell">' + value.substring(16) + '</span>';
	};

	var cellsrenderer_descr = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		var value = grid.jqxGrid('getcellvalue', row, 'val');

		for (var i = 0; i < parameter.length; i++) {
			if (row == i) {
				return '<span class="oke-grid-cell">' + umlaut(parameter[i][1])
						+ '</span>';
			}
		}

		return '';
	};

	var cellsrenderer_meaning = function(row, columnfield, value, defaulthtml,
			columnproperties, rowdata) {

		var value = grid.jqxGrid('getcellvalue', row, 'val');

		for (var i = 0; i < parameter.length; i++) {
			if (row == i) {
				return '<span class="oke-grid-cell">' + parameter[i][2]
						+ '</span>';
			}
		}

		return '';
	};

	var dataAdapter = new $.jqx.dataAdapter(source, {

		downloadComplete : function(records, status, xhr) {
			// get data records.
			var length = records.length;

			var data = new Array();

			for (var i = 1; i < length; i++) {
				var record = records[i];

				data.push(record);
			}

			return data[0];
		}
	});
	

    grid.jqxGrid({
   	autoshowloadelement: false,
	width : gWidth,
	source : dataAdapter,
	pageable : true,
	height : gHeight,
	sortable : true,
	pagesize : 40,
	altrows : true,
	filterable : true,
	theme : 'ui-sunny',

	columns : [
			{
				text : '#',
				sortable : false,
				filterable : false,
				editable : false,
				groupable : false,
				draggable : false,
				resizable : false,
				datafield : '',
				columntype : 'number',
				width : 50,
				cellsrenderer : function(row, column, value) {
					return "<div style='font-size: 10px; margin:4px;'>"
							+ (value + 1) + "</div>";
				}
			},
			{
				text : 'Name',
				datafield : 'id',
				width : 150,
				columntype : 'dropdownlist',
				cellsrenderer : cellsrenderer_name,
				createeditor : function(row, column, editor) {
					editor.jqxDropDownList({
						dropDownHeight : 60,
						source : localAdapter,
						displayMember : 'id',
						valueMember : 'name',
						filterable : false,
						placeHolder : 'Choose…',
						renderer : function(index, label, value) {
							var item = editor
									.jqxDropDownList('getSelectedItem');
							return label + ' - ' + value;
						}
					});
				}

			}, {
				text : 'Value',
				dataField : 'val',
				width : 150,
				cellsrenderer : cellsrenderer,
				filtertype : 'input'
			}, {
				text : 'Unit',
				dataField : 'unit',
				width : 100,
				cellsrenderer : cellsrenderer_unit,
				filterable : false
			}, {
				text : 'Description',
				dataField : 'descr',
				width : 300,
				cellsrenderer : cellsrenderer_descr,
				filterable : false
			}, {
				text : 'Meaning',
				dataField : 'meaning',
				width : 140,
				cellsrenderer : cellsrenderer_meaning,
				filterable : false
			}, {
				text : 'Quality',
				dataField : 'flags',
				width : 100,
				filterable : false
			}, {
				text : 'Time Stamp',
				dataField : 'ts',
				width : 200,
				filterable : false
			} ]
	});
	
	function time1(f) {
		var t1 = 0;
		setInterval(function() {
			f.call(t1);
		}, 1000);
	}
	
	time1(function() {
		grid.jqxGrid('updatebounddata', 'cells');
	});

    
  
}