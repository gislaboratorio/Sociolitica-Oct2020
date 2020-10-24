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
	variables['humorsoc'] = feature.properties.humorsoc;
	variables['afinidafcm'] = feature.properties.afinidafcm;
	variables['afingestfc'] = feature.properties.afingestfc;
	variables['imgsuarez'] = feature.properties.imgsuarez;
	variables['serviconec'] = feature.properties.serviconec;
	variables['afinidfdt'] = feature.properties.afinidfdt;

	var layer_duplicado_a = cloneLayer(layer);

	layer_duplicado_a.bindPopup(etiquetas_variables['humorsoc']['propia'] + ': <strong>' + etiquetas_variables['humorsoc'][variables['humorsoc']] + "</strong>" + "<br/>"
		+ etiquetas_variables['afinidafcm']['propia'] + ': <strong>' + etiquetas_variables['afinidafcm'][variables['afinidafcm']] + "</strong>" + "<br/>"
		+ etiquetas_variables['afingestfc']['propia'] + ': <strong>' + etiquetas_variables['afingestfc'][variables['afingestfc']] + "</strong>" + "<br/>"
		+ etiquetas_variables['imgsuarez']['propia'] + ': <strong>' + etiquetas_variables['imgsuarez'][variables['imgsuarez']] + "</strong>" + "<br/>"
		+ etiquetas_variables['serviconec']['propia'] + ': <strong>' + etiquetas_variables['serviconec'][variables['serviconec']] + "</strong>" + "<br/>"
		+ etiquetas_variables['afinidfdt']['propia'] + ': <strong>' + etiquetas_variables['afinidfdt'][variables['afinidfdt']] + "</strong>");

	layer_duplicado_a.setIcon(icono_c[1]);
	layergroup_puntos['todos'].addLayer(layer_duplicado_a);
	
	var clasificaciones = ['humorsoc', 'afinidafcm', 'afingestfc', 'imgsuarez', 'serviconec', 'afinidfdt'];

	i = 0;
	for (var clasificacionactual in clasificaciones) {
		var layer_duplicado_b = cloneLayer(layer);
		var valor_variable = variables[clasificaciones[i]];
		
		if (clasificaciones[i] == 'serviconec') {
			var usar_icono = icono_b[valor_variable];
		} else {
			var usar_icono = icono_a[valor_variable];
		}
		
		layer_duplicado_b.setIcon(usar_icono);

		layergroup_puntos[clasificaciones[i]][valor_variable].addLayer(layer_duplicado_b);

		layer_duplicado_b.bindPopup("Humor Social: <strong>" + etiquetas_variables['humorsoc'][variables['humorsoc']] + "</strong>" + "<br/>"
			+ "Afinidad FCM: <strong>" + etiquetas_variables['afinidafcm'][variables['afinidafcm']] + "</strong>" + "<br/>"
			+ "Afinidad Gestión FCM: <strong>" + etiquetas_variables['afingestfc'][variables['afingestfc']] + "</strong>" + "<br/>"
			+ "Imagen R. Suárez: <strong>" + etiquetas_variables['imgsuarez'][variables['imgsuarez']] + "</strong>" + "<br/>"
			+ "Servicio Conectividad: <strong>" + etiquetas_variables['serviconec'][variables['serviconec']] + "</strong>" + "<br/>"
			+ "Afinidad FDT: <strong>" + etiquetas_variables['afinidfdt'][variables['afinidfdt']] + "</strong>");
		
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

layergroup_puntos['humorsoc'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['afinidafcm'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['afingestfc'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['imgsuarez'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['serviconec'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};
layergroup_puntos['afinidfdt'] = {'1': L.layerGroup(), '2': L.layerGroup(), '3': L.layerGroup(), '0': L.layerGroup()};

	
var etiquetas_variables = {
	'humorsoc': {
		'propia': 'Humor Social',
		1: 'Bueno',
		2: 'Medio',
		3: 'Malo',
		0: 'Sin dato'
	},
	'afinidafcm': {
		'propia': 'Afinidad F.C.M.',
		1: 'Alta',
		2: 'Media',
		3: 'Baja',
		0: 'Sin dato'
	},
	'afingestfc': {
		'propia': 'Afinidad Gestión F.C.M.',
		1: 'Positiva',
		2: 'Negativa',
		3: 'Ajena',
		0: 'Sin dato'
	},
	'imgsuarez': {
		'propia': 'Imagen R. Suárez',
		1: 'Positiva',
		2: 'Negativa',
		3: 'Ajena',
		0: 'Sin dato'
	},
	'serviconec': {
		'propia': 'Servicio Conectividad',
		1: 'Malo',
		2: 'Moderado',
		3: 'Aceptable',
		0: 'Sin dato'
	},
	'afinidfdt': {
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
		"Bueno": layergroup_puntos['humorsoc']['1'],
		"Medio": layergroup_puntos['humorsoc']['2'],
		"Malo": layergroup_puntos['humorsoc']['3'],
		"Alta": layergroup_puntos['afinidafcm']['1'],
		"Media": layergroup_puntos['afinidafcm']['2'],
		"Baja": layergroup_puntos['afinidafcm']['3'],
		"Sin dato ": layergroup_puntos['afinidafcm']['0'],
		"Positiva": layergroup_puntos['afingestfc']['1'],
		"Negativa": layergroup_puntos['afingestfc']['2'],
		"Ajena": layergroup_puntos['afingestfc']['3'],
		"Positiva ": layergroup_puntos['imgsuarez']['1'],
		"Negativa ": layergroup_puntos['imgsuarez']['2'],
		"Ajena ": layergroup_puntos['imgsuarez']['3'],
		"Aceptable": layergroup_puntos['serviconec']['3'],
		"Moderado": layergroup_puntos['serviconec']['2'],
		"Malo ": layergroup_puntos['serviconec']['1'],
		"Alta ": layergroup_puntos['afinidfdt']['1'],
		"Media ": layergroup_puntos['afinidfdt']['2'],
		"Baja ": layergroup_puntos['afinidfdt']['3'],
		"Sin dato     ": layergroup_puntos['afinidfdt']['0']
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

/*var cantidad_marcadores;
function onOverlayAdd(e) {
	cantidad_marcadores = parseInt(e.layer.getLayers().length, 10);
	console.log(cantidad_marcadores);
	$('#referencias').append('<br/>Cantidad: ' + cantidad_marcadores);
}*/

map.on('overlayadd', onOverlayAdd);

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
	
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['humorsoc']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(5));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['afinidafcm']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(9));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['afingestfc']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(14));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['imgsuarez']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(18));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['serviconec']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(22));
	$('<label class="leaflet-control-layers-group-label"><span class="leaflet-control-layers-group-name">- ' + etiquetas_variables['afinidfdt']['propia'] + '</span></label>').insertBefore($('div.leaflet-control-layers-group label').get(26));
	
	$('#leaflet-control-layers-group-1 label:eq(0)').hide();
	$('#leaflet-control-layers-group-1 label:eq(1)').hide();
	$('#leaflet-control-layers-group-1 label:eq(2)').hide();
	
	$('#leaflet-control-layers-group-1 label:not(.leaflet-control-layers-group-label)').click(function (){
		$('#referencias').empty();
		var nombre_layer = $(this).text();
		var nombre_grupo = $(this).prevAll('.leaflet-control-layers-group-label').first().text().substring(2, 50).toLowerCase();
		$('#referencias').append(nombre_grupo + '<br/><strong>' + nombre_layer + '</strong>');
	});
	
	$("body a").attr("target","_blank");
}
