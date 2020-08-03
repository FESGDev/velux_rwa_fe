import $ from 'jquery';
import 'bootstrap';
import intro from './introduction.mjs';
//import { validateDefaults, validateDevices, validateMain } from './validate.js';

let settings = {
	"defaults": { 
		"ambient_temperature": 15,
		"nr_sims": 3500,
		"back_layering": 25,
		"data_type": "total_freq", //"freq_by_car"
		"total_frequency": "1.15e-6",
		"frequency_car_diesel": "1e-6",
		"frequency_car_petrol": "1e-6",
		"frequency_car_cng_lng": "1e-6",
		"frequency_car_lpg": "1e-6",
		"frequency_car_electric": "1e-6",
		"itm1": 180, //manual call mean
		"its1": 20, //manual call std
		"itm2": 0, //automatic call mean
		"its2": 0, //automatic call std
		"itm3": 240, //Permanent Fire Fighter reaction mean
		"its3": 8, //Permanent Fire Fighter reaction std
		"itm4": 420, //Volenteer Fire Fighter reaction mean
		"its4": 35, //Volenteer Fire Fighter reaction std
		"itm5": 0.76198, //Travel Time Coefficients mean
		"its5": 0.1719, //Travel Time Coefficients std
		"itm6": 180, //Attack Time mean
		"its6": 0, //Attack Time std
		"dist_parking": 0,
		"sprinkler_walking_cam_off": 0.1,
		"sprinkler_walking_cam_on": 0.2,
		"hvac_walking_cam_off": 0.1,
		"hvac_walking_cam_on": 0.3,
		"hvac_walking_dist": 1.0,
	},
    "devices": {
        "sprinkler_rti": 50.0,
        "sprinkler_activation_temperature": 68,
        "sprinkler_coverage_area": 12.0,
        "smoke_rti": 0.12,
        "smoke_activation_threshold": 16.7,
        "smoke_coverage_area": 60.0,
        "rwa_failure_temperature": 300.0,
        "rwa_critical_velocity": 1.3
    },
    "main": {
        "car_file":"",
        "wall_file":"",
        "drawing_scale": "m",
        "height":"",
        "width":"",
        "entrance_location_x":"",
        "entrance_location_y":"",
        "shaft_location_x":"",
        "shaft_location_y":"",
        "car_composition_mini":"",
        "car_composition_light":"",
        "car_composition_medium":"",
        "car_composition_compact":"",
        "car_composition_heavy":"",
        "car_composition_light":"",
        "cartype_composition_diesel":"",
        "cartype_composition_petrol":"",
        "cartype_composition_cng_lng":"",
        "cartype_composition_lpg":"",
        "cartype_composition_electric":"",
        "number_solutions":"",
        /*
        "number_layersug":"",
        "number_layersag":"",
        "og1":"",
        "og2":"",
        "og3":"",
        "bg1":"",
        "bg2":"",
        "bg3":"",
        */ 
        "s1_type":"sprinkler",
        "s1_measure":"rwa",
        "s1_reliability_1":"",
        "s1_reliability_2":"",
        "s2_type":"sprinkler",
        "s2_measure":"rwa",
        "s2_reliability_1":"",
        "s2_reliability_2":"",
        "s3_type":"sprinkler",
        "s3_measure":"rwa",
        "s3_reliability_1":"",
        "s3_reliability_2":"",
        "s4_type":"sprinkler",
        "s4_measure":"rwa",
        "s4_reliability_1":"",
        "s4_reliability_2":"",
        "notification":"auto",
        "camera":0,
        "fire_fighters":"permanent",
        "distance":"",
        "speed":"",
    },
}
let hasChanged = false;

function renderCalc() {
	$('#sidebar').removeClass('sidebar-opacity');
	$('#main').show();
	$('#intro-div').hide();
}

window.onbeforeunload = function(){
    if(hasChanged)
        return 'Are you sure you want to leave?';
};


$(document).ready(function () {
    console.log("DOM ready");
    let boards = undefined;
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#introduction').on('click', () => { 
    	$('#intro-div').html(intro()).show();
    	$('#main').hide();

    	$('#sidebar').addClass('sidebar-opacity');
    });
    $('#vent-calc-tool').on('click', () => { 
    	renderCalc();
    });

    $('#main input').on('change', () => {
        hasChanged = true;
        console.log(hasChanged);
        validateMain();
    });
    
    $(document).on('change', '#drawing_scale', () => {
    	let v = $('#drawing_scale').val();
    	console.log('Changing drawing_scale to '+v);
      $('#entrance_location_x').attr('placeholder', 'X ('+v+')');
      $('#entrance_location_y').attr('placeholder', 'Y ('+v+')');
      $('#shaft_location_x').attr('placeholder', 'X ('+v+')');
      $('#shaft_location_y').attr('placeholder', 'Y ('+v+')');
    });
    $(document).on('change', '#box-mean', () => { 
    	let mean = parseInt($('#box-mean').val());
    	let std = parseInt($('#box-std').val());
    	boards[0].setBoundingBox([ 0, 0.3, mean + std*5,-0.1]);
    	boards[0].update();
    });
    $(document).on('change', '#box-std', () => { 
    	let mean = parseInt($('#box-mean').val());
    	let std = parseInt($('#box-std').val());
    	boards[0].setBoundingBox([ 0,0.3, mean + std*5,-0.1]);
    	boards[0].update();
    });

    $(document).on('change', '#box2-mean', () => { 
    	let mean = parseInt($('#box2-mean').val());
    	let std = parseInt($('#box2-std').val());
    	boards[1].setBoundingBox([ 0, 0.3, mean + std*5,-0.1]);
    	boards[1].update();
    });
    $(document).on('change', '#box2-std', () => { 
    	let mean = parseInt($('#box2-mean').val());
    	let std = parseInt($('#box2-std').val());
    	boards[1].setBoundingBox([ mean - std*5,0.3, mean + std*5,-0.1]);
    	boards[1].update();
    });

    $(document).on('change', '#number_layersug', () => {
         updateNumberLayersUG();
    });

    function updateNumberLayersUG() {
        let n = parseInt($('#number_layersug').val());
        for(let i=1;i<=3;i++) {
            if(n >= i){
                $('#ug'+i).css("visibility", "visible");
                $('#labelug'+i).css("visibility", "visible");
            }
            else{
                $('#ug'+i).css("visibility", "hidden");
                $('#labelug'+i).css("visibility", "hidden");
            }
        }
    }

    $(document).on('change', '#number_layersag', () => {
        updateNumberLayersAG();
   });

    function updateNumberLayersAG() {
        let n = parseInt($('#number_layersag').val());
        for(let i=2;i<=3;i++) {
            if(n >= i){
                $('#ag'+i).css("visibility", "visible");
                $('#labelag'+i).css("visibility", "visible");
            }
            else{
                $('#ag'+i).css("visibility", "hidden");
                $('#labelag'+i).css("visibility", "hidden");
            }
        }
    }

    $(document).on('change', '#provincie_lijst', () => {
        updateBrandweerZoneLijst();
   });

    function updateBrandweerZoneLijst() {
        let provincie = $('#provincie_lijst').val();
        //console.log(provincie);
        let brandweerzone=$("#brandweerzone");
        let values=[];
        switch(provincie) {
            case 'antwerpen':
                values=['Zone Antwerpen', 'Zone Rivierenland', 'Zone Rand', 'Zone Taxandria', 'Zone Kempen'];
                break;
            case 'limburg':
                values=['Zone Noord-Limburg', 'Zone Oost-Limburg', 'Zone Zuid-West Limburg'];
                break;
            case 'vlaamsbrabant':
                values=['Brussel - DBDMH','Zone Oost Vlaams-Brabant', 'Zone Vlaams-Brabant West'];
                break;
            case 'oostvlaanderen':
                values=['Zone Centrum', 'Zone Meetjesland', 'Zone Oost', 'Zone Vlaamse Ardennen', 'Zone Waasland', 'Zone Zuid-Oost'];
                break
            case 'westvlaanderen':
                values=['Zone 1', 'Zone Fluvia' ,'Zone Midwest', 'Zone Westhoek', 'Zone Westkust'];
                break
            case 'henegouwen':
                values=['Zone Henegouwen-Centrum', 'Zone Henegouwen-Oost'];
                break;
            case 'luik':
                values=['Luik Zone 2', 'Zone HEMCO', 'Zone Vesdre', 'Zone 5 Warche', 'Zone DG'];
                break;
            case 'luxemburg':
                values=['Zone Luxemburg'];
                break;
            case 'namen':
                values=['Zone DINAPHI', 'Zone NAGE', 'Zone Val de Sambre'];
                break;
            case 'waalsbrabant':
                values=['Zone Waals-Brabant'];
                break;
            default:
                values=['-'];
        }
        brandweerzone.empty();
        values=values.sort()
        $.each(values, function(index, value) {
            brandweerzone.append("<option>" + value + "</option>");
        });
    }

    $(document).on('change', '#buildingType', () => {
        console.log("buildingsAboveParking clicked");
        updateHoogteGebouw();
    });

    function updateHoogteGebouw() {
        let aantalGebouwen = $('#buildingType').val();
        //console.log(aantalGebouwen)
        switch(aantalGebouwen) {
            case 'typeIndustry':
                $('#typeGebouw').show();
                break;
            case 'typeRegular':
                $('#typeGebouw').hide();
                break;
            default:
                break;
                // do nothing
        }
    }

    // edit defaults
    $(document).on('click', '#save-edit-button', () => { 
    		if(saveEditDefaults())
    		  $('#defaults-modal').modal('hide');
    	} 
    );
    $('#reset-defaults').on('click', () => {
        fillInputs(resetDefaults);
        validateDefaults();
    });
    $(document).on('change', '#data_type', () => { 
    	console.log('changed');
    	let type = $('#data_type').val();
    	console.log(type);
    	if(type == 'total_freq') {
    		console.log('total_freq');
    		$('#total_frequency').attr('disabled',false);
    		$('.freq_by_car input').attr('disabled',true);
    	}
    	else {
    		console.log('else');
    		$('#total_frequency').attr('disabled',true);
    		$('.freq_by_car input').attr('disabled',false);
    	}
    });
    for(let i=1;i<=6;i++) {
    	$(document).on('change', '#itm'+i, () => { showGraph(i); } );
    	$(document).on('change', '#its'+i, () => { showGraph(i); } );
    	$('#it'+i).on('click', () => { showGraph(i); } );
    }

    //edit devices
    $(document).on('click', '#save-edit-devices-button', () => { 
            if(saveEditDevices())
                $('#devices-modal').modal('hide');
        } 
    );
    $('#edit-devices').on('click', () => { 
        $("#devices-modal").modal({backdrop:'static', keyboard: true}); 
        renderEditDevices();
    });
    $('#reset-devices').on('click', () => {
        fillInputs(resetDevices);
        validateDevices();
    });


    //layout files
    $(document).on('click', '#layout-files', () => { 
            $("#files-modal").modal({backdrop:'static', keyboard: true}); 
        } 
    );
    //results modal
    $(document).on('click', '#results', () => { 
            $("#results-modal").modal({backdrop:'static', keyboard: true}); 
        } 
    );
    //login modal
    $(document).on('click', '#login', () => { 
            $("#login-modal").modal({backdrop:'static', keyboard: true}); 
        } 
    );
    $(document).on('click', '#btn_login', () => 
        { 
            let username = $.trim($('#username').val());
            let pwd = $.trim($('#password').val());
            // var stayloggedin = document.getElementById('stayloggedin').checked;
            $.ajax({
                url : "login/",
                type : "post",
                data : {
                    username: username,
                    pwd : pwd,
                    csrfmiddlewaretoken: window.CSRF_TOKEN //'{ csrf_token }'
                }
            }).done(function(data) {
                if (data == "logged_in_success") {
                    location.reload();
                }
                else {
                    $('#login-danger').html('Authentication failed');
                }
            });
        } 
    );
    $(document).on('click', '#btn_upload', () => {
            $('#car_file_valid').html('');
            $('#wall_file_valid').html(''); 
            $('#btn_upload').html('Upload files').attr('disabled',false);
            $('#upload-error').html('');
            if( !($('#upload_car_file').val() && $('#upload_wall_file').val()) ) {
                $('#upload-error').html('Choose both a Car File and a Wall File.');
                return;
            }
            $('#btn_upload').html('Uploading...').attr('disabled',true);
            let fd = new FormData();
            console.log(($('#upload_car_file')));
            let cf = $('#upload_car_file')[0].files[0];
            fd.append('car_file',cf);
            let wf = $('#upload_wall_file')[0].files[0];
            fd.append('wall_file',wf);
            fd.append('csrfmiddlewaretoken', window.CSRF_TOKEN);
            $.ajax({
                url: 'upload-file',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                    $('#car_file').append( '<option value="'+cf.name+'" selected>'+cf.name+'</option>');
                    $('#wall_file').append( '<option value="'+wf.name+'" selected>'+wf.name+'</option>');
                    $('#btn_upload').html('Upload files').attr('disabled',true);
                    $('#upload-ok').html('Files uploaded.');
                },
                error: function(xhr, textStatus, errorThrown){
                    $('#upload-error').html('An unexpected error occured.');
                }
            });
        } 
    );

    $('#calc-form').submit( (e) => { 
        e.preventDefault();
        if(!(validateMain(true))) {
            $('#submit-fail').show();
            return;
        }
        saveSettings(settings.main);
        $('#submit').attr('disabled', 'true');
        $.ajax({
            url: 'submit',
            type: 'post',
            headers:{
                "X-CSRFToken": window.CSRF_TOKEN
            },
            data: JSON.stringify(settings),
            contentType: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    $('#submit-success').show();

                }else{
                    alert('An error has occured.');
                }
            },
            error: function(xhr, textStatus, errorThrown){
                $('#submit').attr('disabled',false);
                alert('Failed.');
            }
        });
        hasChanged = false;
    });

    $(document).on('click', '#save', () => {
        console.log('Saving...');
        if( confirm("Save inputs? Any previous save will be overwritten.") ) {
            saveSettings(settings.main);
            $.ajax({
                url: 'save',
                type: 'post',
                headers:{
                    "X-CSRFToken": window.CSRF_TOKEN
                },
                data: JSON.stringify(settings),
                contentType: false,
                processData: false,
                success: function(response){
                    if(response == 1){
                        hasChanged = false;
                        return;
                    } else if(response == 'not_auth') {
                        alert('Please log in before saving.');
                    }
                    else{
                        alert('An error has occured.');
                    }
                },
                error: function(xhr, textStatus, errorThrown){
                    alert('Failed to save.');
                }
            });
        }
    });

    $(document).on('click', '#open', () => {
        console.log('Open...');
        if( confirm("Open saved inputs? Current inputs will be overwritten.") ) {
            $.ajax({
                url: 'open',
                type: 'post',
                headers:{
                    "X-CSRFToken": window.CSRF_TOKEN
                },
                data: {},
                contentType: false,
                processData: false,
                success: function(response){
                    let data = JSON.parse(response);
                    console.log(data);
                    if(response == 'not_auth') {
                        alert('Please log in before saving.');
                        return;
                    }
                    settings = data;
                    fillInputs(settings.main)
                    updateNumberSolutions();
                    if(data.main.car_file != 0)
                        $('#car_file').append( '<option value="'+data.main.car_file+'" selected>'+data.main.car_file+'</option>');
                    if(data.main.wall_file != 0)
                        $('#wall_file').append( '<option value="'+data.main.wall_file+'" selected>'+data.main.wall_file+'</option>');
                    hasChanged = false;
                },
                error: function(xhr, textStatus, errorThrown){
                    alert('Failed to save.');
                }
            });
        }
    });

    $('[data-toggle="popover"]').popover();
});

