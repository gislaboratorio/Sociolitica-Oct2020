/* ICONOS */
var iconoComun = L.Icon.extend({
	options: {
		iconSize:     [45, 75],
		shadowSize:   [50, 64],
		iconAnchor:   [18, 60],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	}
});
var icono_a = [],
	icono_b = [],
	icono_c = [];
icono_a[1] = new iconoComun({iconUrl: 'images/iconos/icono-1.png'});
icono_a[2] = new iconoComun({iconUrl: 'images/iconos/icono-2.png'});
icono_a[3] = new iconoComun({iconUrl: 'images/iconos/icono-3.png'});
icono_a[0] = new iconoComun({iconUrl: 'images/iconos/icono-4.png'});
icono_b[1] = new iconoComun({iconUrl: 'images/iconos/icono-3.png'});
icono_b[2] = new iconoComun({iconUrl: 'images/iconos/icono-2.png'});
icono_b[3] = new iconoComun({iconUrl: 'images/iconos/icono-1.png'});
icono_b[0] = new iconoComun({iconUrl: 'images/iconos/icono-4.png'});
icono_c[1] = new iconoComun({iconUrl: 'images/iconos/icono-5.png'});


/* POPUPS */


/* FUNCIONES ONEACHFEATURE */

function onEachFeatureDepartamento(feature, layer) {
	layer.setStyle({fillColor: "orange", color: "orange", fillOpacity: 0.3, weight: 2});
	layer.bindPopup("<strong>" + feature.properties.DEPARTAMEN + "</strong>");
}


function onEachFeatureRadio(feature, layer) {
	layer_radio_con_pane = L.geoJSON(feature, {pane: "radios", style: { fillOpacity: 0.8, color: "grey", fillColor: "white", weight: 1 } })
	layergroup_radios.addLayer(layer_radio_con_pane);
	if (feature.properties && feature.properties.DFR) { 
			layer_radio_con_pane.bindPopup( "<strong>" + feature.properties.DFR + "</strong>");
	}
}

function onEachFeaturePunto(feature, layer) {

	var variables = {};
	variables['HUMORSOC'] = feature.properties.HUMORSOC;
	variables['AFINIDAFCM'] = feature.properties.AFINIDAFCM;
	variables['AFINGESTFC'] = feature.properties.AFINGESTFC;
	variables['IMGSUAREZ'] = feature.properties.IMGSUAREZ;
	variables['SERVICONEC'] = feature.properties.SERVICONEC;
	variables['AFINIDFDT'] = feature.properties.AFINIDFDT;

	var layer_duplicado_a = cloneLayer(layer);

	layer_duplicado_a.bindPopup(etiquetas_variables['HUMORSOC']['propia'] + ': <strong>' + etiquetas_variables['HUMORSOC'][variables['HUMORSOC']] + "</strong>" + "<br/>"
		+ etiquetas_variables['AFINIDAFCM']['propia'] + ': <strong>' + etiquetas_variables['AFINIDAFCM'][variables['AFINIDAFCM']] + "</strong>" + "<br/>"
		+ etiquetas_variables['AFINGESTFC']['propia'] + ': <strong>' + etiquetas_variables['AFINGESTFC'][variables['AFINGESTFC']] + "</strong>" + "<br/>"
		+ etiquetas_variables['IMGSUAREZ']['propia'] + ': <strong>' + etiquetas_variables['IMGSUAREZ'][variables['IMGSUAREZ']] + "</strong>" + "<br/>"
		+ etiquetas_variables['SERVICONEC']['propia'] + ': <strong>' + etiquetas_variables['SERVICONEC'][variables['SERVICONEC']] + "</strong>" + "<br/>"
		+ etiquetas_variables['AFINIDFDT']['propia'] + ': <strong>' + etiquetas_variables['AFINIDFDT'][variables['AFINIDFDT']] + "</strong>");

	layer_duplicado_a.setIcon(icono_c[1]);
	layergroup_puntos['todos'].addLayer(layer_duplicado_a);
	
	var clasificaciones = ['HUMORSOC', 'AFINIDAFCM', 'AFINGESTFC', 'IMGSUAREZ', 'SERVICONEC', 'AFINIDFDT'];

	i = 0;
	for (var clasificacionactual in clasificaciones) {
		var layer_duplicado_b = cloneLayer(layer);
		var valor_variable = variables[clasificaciones[i]];
		
		if (clasificaciones[i] == 'SERVICONEC') {
			var usar_icono = icono_b[valor_variable];
		} else {
			var usar_icono = icono_a[valor_variable];
		}
		
		layer_duplicado_b.setIcon(usar_icono);

		layergroup_puntos[clasificaciones[i]][valor_variable].addLayer(layer_duplicado_b);

		layer_duplicado_b.bindPopup("Humor Social: <strong>" + etiquetas_variables['HUMORSOC'][variables['HUMORSOC']] + "</strong>" + "<br/>"
			+ "Afinidad FCM: <strong>" + etiquetas_variables['AFINIDAFCM'][variables['AFINIDAFCM']] + "</strong>" + "<br/>"
			+ "Afinidad Gestión FCM: <strong>" + etiquetas_variables['AFINGESTFC'][variables['AFINGESTFC']] + "</strong>" + "<br/>"
			+ "Imagen R. Suárez: <strong>" + etiquetas_variables['IMGSUAREZ'][variables['IMGSUAREZ']] + "</strong>" + "<br/>"
			+ "Servicio Conectividad: <strong>" + etiquetas_variables['SERVICONEC'][variables['SERVICONEC']] + "</strong>" + "<br/>"
			+ "Afinidad FDT: <strong>" + etiquetas_variables['AFINIDFDT'][variables['AFINIDFDT']] + "</strong>");
		
		i++;
	};
}

/* BASE LAYERS */
var mapabase_argenmap = new L.TileLayer.WMTS('https://wms.ign.gob.ar/geoserver/capabaseargenmap/gwc/service/wmts?',
	   {
		   layer: 'capabaseargenmap',
		   style: "normal",
		   tilematrixSet: "EPSG:3857",
		   format: "image/png",
		   opacity: 0.3,
		   attribution: "<a href='https://github.com/'>GitHub</a>&copy; | <a href='https://www.ign.gob.ar/AreaServicios/Argenmap/IntroduccionV2'>ArgenMap</a> | Sociolítica"
		}
	);


/* OVERLAYS */

var layergroup_puntos = {'todos': L.layerGroup(), 'ninguno': L.layerGroup()};

layergroup_puntos['HUMORSOC'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['AFINIDAFCM'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['AFINGESTFC'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['IMGSUAREZ'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['SERVICONEC'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['AFINIDFDT'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};

	
var etiquetas_variables = {
	'HUMORSOC': {
		'propia': 'Humor Social',
		1: 'Bueno',
		2: 'Medio',
		3: 'Malo',
		0: 'Sin dato'
	},
	'AFINIDAFCM': {
		'propia': 'Afinidad F.C.M.',
		1: 'Alta',
		2: 'Media',
		3: 'Baja',
		0: 'Sin dato'
	},
	'AFINGESTFC': {
		'propia': 'Afinidad Gestión F.C.M.',
		1: 'Positiva',
		2: 'Negativa',
		3: 'Ajena',
		0: 'Sin dato'
	},
	'IMGSUAREZ': {
		'propia': 'Imagen R. Suárez',
		1: 'Positiva',
		2: 'Negativa',
		3: 'Ajena',
		0: 'Sin dato'
	},
	'SERVICONEC': {
		'propia': 'Servicio Conectividad',
		1: 'Malo',
		2: 'Moderado',
		3: 'Aceptable',
		0: 'Sin dato'
	},
	'AFINIDFDT': {
		'propia': 'Afinidad F.D.T.',
		1: 'Alta',
		2: 'Media',
		3: 'Baja',
		0: 'Sin dato'
	}
};


/* CREACIÓN DEL MAPA CON BASE LAYERS Y OVERLAYS */

var layergroup_radios = L.layerGroup();
var overlay_departamentos = L.geoJson(geojson_departamentos, { onEachFeature: function(feature, layer) { onEachFeatureDepartamento(feature, layer) } }),
	overlay_radios = L.geoJson(geojson_radios, { onEachFeature: function(feature, layer) { onEachFeatureRadio(feature, layer) } }),
	overlay_puntos = L.geoJson(geojson_puntos, { onEachFeature: function(feature, layer) { onEachFeaturePunto(feature, layer) } });

	
/* DATA PARA EL LAYERS CONTROL */
var baseMaps = {
};

var groupedOverlays = {
	"RADIOS": {
		"Todos los radios": layergroup_radios
	},
	"<br/>  PUNTOS MUESTRALES": {
		"Todos": layergroup_puntos['todos'],
		"Ninguno": layergroup_puntos['ninguno'],
		"Bueno": layergroup_puntos['HUMORSOC']['1'],
		"Medio": layergroup_puntos['HUMORSOC']['2'],
		"Malo": layergroup_puntos['HUMORSOC']['3'],
		"Sin dato": layergroup_puntos['HUMORSOC']['0'],
		"Alta": layergroup_puntos['AFINIDAFCM']['1'],
		"Media": layergroup_puntos['AFINIDAFCM']['2'],
		"Baja": layergroup_puntos['AFINIDAFCM']['3'],
		"Sin dato ": layergroup_puntos['AFINIDAFCM']['0'],
		"Positiva": layergroup_puntos['AFINGESTFC']['1'],
		"Negativa": layergroup_puntos['AFINGESTFC']['2'],
		"Ajena": layergroup_puntos['AFINGESTFC']['3'],
		"Sin dato  ": layergroup_puntos['AFINGESTFC']['0'],
		"Positiva ": layergroup_puntos['IMGSUAREZ']['1'],
		"Negativa ": layergroup_puntos['IMGSUAREZ']['2'],
		"Ajena ": layergroup_puntos['IMGSUAREZ']['3'],
		"Sin dato   ": layergroup_puntos['IMGSUAREZ']['0'],
		"Aceptable": layergroup_puntos['SERVICONEC']['3'],
		"Moderado": layergroup_puntos['SERVICONEC']['2'],
		"Malo ": layergroup_puntos['SERVICONEC']['1'],
		"Sin dato    ": layergroup_puntos['SERVICONEC']['0'],
		"Alta ": layergroup_puntos['AFINIDFDT']['1'],
		"Media ": layergroup_puntos['AFINIDFDT']['2'],
		"Baja ": layergroup_puntos['AFINIDFDT']['3'],
		"Sin dato     ": layergroup_puntos['AFINIDFDT']['0']
	}
};

var opciones_groupedlayers = {
	exclusiveGroups: [
		"<br/>  PUNTOS MUESTRALES"
	],
	groupCheckboxes: false
};

/* CREACIÓN DEL MAPA */
var map = L.map('map', {
	scrollWheelZoom: false
}).setView([-33.9294, -68.4567], 8);	
var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays, opciones_groupedlayers);
map.createPane("radios").style.zIndex = 500;

function crearMapa() {
	map.addControl(layerControl);
	L.control.scale().addTo(map);
	
	/* MEDIDOR DISTANCIAS */
	L.control.polylineMeasure().addTo(map);
	
	/* LIMPIAR MAPA */
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
	});
	map.addLayer(mapabase_argenmap);
	map.addLayer(overlay_departamentos);
	map.addLayer(layergroup_puntos['todos']);
	
	$('.leaflet-control-layers-toggle').append('<span>PANEL DE CAPAS</span>');
	
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['HUMORSOC']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(5));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['AFINIDAFCM']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(10));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['AFINGESTFC']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(15));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['IMGSUAREZ']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(20));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['SERVICONEC']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(25));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['AFINIDFDT']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(30));

	$('#leaflet-control-layers-group-1 label:not(.leaflet-control-layers-group-label)').click(function (){
		$('#referencias').empty();
		console.log($(this).prevAll('.leaflet-control-layers-group-name').first());
		var nombre_layer = $(this).text();
		var nombre_grupo = $(this).prevAll('.leaflet-control-layers-group-label').first().text().substring(2, 50).toLowerCase();
		$('#referencias').append(nombre_grupo + '<br/><strong>' + nombre_layer + '</strong>');
	});
	
	$("body a").attr("target","_blank");
}
