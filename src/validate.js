import $ from 'jquery';

let validation = {
    "height": {
        "type": "float",
        "min": 2,
        "max": 4
        },
    "width": {
        "type": "float",
        "min": 11,
        "max": 50
        },
    "s1_reliability_1": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s1_reliability_2": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s2_reliability_1": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s2_reliability_2": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s3_reliability_1": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s3_reliability_2": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s4_reliability_1": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "s4_reliability_2": {
        "type": "float",
        "min": 70,
        "max": 95
        },
    "car_composition": {
        "car_composition_mini": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "car_composition_light": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "car_composition_medium": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "car_composition_compact": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "car_composition_heavy": {
            "type": "float",
            "min": 0,
            "max": 100
        },
    },    
    "cartype_composition": {
        "cartype_composition_diesel": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "cartype_composition_petrol": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "cartype_composition_cng_lng": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "cartype_composition_lpg": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "cartype_composition_electric": {
            "type": "float",
            "min": 0,
            "max": 100
        },
    },
    "defaults": { 
        "ambient_temperature": {
            "type": "float",
            "min": 0,
            "max": 40
        },
        // "nr_sims": {
        //     "type": "int",
        //     "min": 10,
        //     "max": 100000
        // },
        "back_layering": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "total_frequency": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "frequency_car_diesel": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "frequency_car_petrol": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "frequency_car_cng_lng": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "frequency_car_lpg": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "frequency_car_electric": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "itm1": {
            "type": "float",
            "min": 0,
        }, //manual call
        "its1": {
            "type": "float",
            "min": 0,
        },
        "itm2": {
            "type": "float",
            "min": 0,
            "max": 0
        }, //automatic call
        "its2": {
            "type": "float",
            "min": 0,
            "max": 0
        },
        "itm3": {
            "type": "float",
            "min": 60,
            "max": 300
        }, //Permanent Fire Fighter reaction
        "its3": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "itm4": {
            "type": "float",
            "min": 180,
            "max": 500
        }, //Volenteer Fire Fighter reaction
        "its4": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "itm5": {
            "type": "float",
            "min": 0.5,
            "max": 1
        }, //Travel Time Coefficients
        "its5": {
            "type": "float",
            "min": 0,
            "max": 0.5
        },
        "itm6": {
            "type": "float",
            "min": 60,
            "max": 450
        }, //Attack Time
        "its6": {
            "type": "float",
            "min": 0,
            "max": 100
        },
        "dist_parking": {
            "type": "float",
            "min": 0,
            "max": 500
        },
        "sprinkler_walking_cam_off": {
            "type": "float",
            "min": 0.1,
            "max":0.5
        },
        "sprinkler_walking_cam_on": {
            "type": "float",
            "min": 0.1,
            "max": 0.5
        },
        "hvac_walking_cam_off": {
            "type": "float",
            "min": 0.1,
            "max": 0.5
        },
        "hvac_walking_cam_on": {
            "type": "float",
            "min": 0.1,
            "max": 0.5
        },
        "hvac_walking_dist": { //TODO: is this correct?
            "type": "float",
            "min": 0.6,
            "max": 1.2
        },
    },
    "devices": {
        "sprinkler_rti": {
            "type": "float",
            "min": 50,
            "max": 200
        },
        "sprinkler_activation_temperature": {
            "type": "float",
            "min": 50,
            "max": 100
        },
        "sprinkler_coverage_area": {
            "type": "float",
            "min": 6,
            "max": 30
        },
        "smoke_rti": {
            "type": "float",
            "min": 0,
            "max": 1
        },
        "smoke_activation_threshold": {
            "type": "float",
            "min": 0,
            "max": 45
        },
        "smoke_coverage_area": {
            "type": "float",
            "min": 10,
            "max": 100
        },
        "rwa_failure_temperature": {
            "type": "float",
            "min": 100,
            "max": 600
        },
        "rwa_critical_velocity": {
            "type": "float",
            "min": 0.5,
            "max": 2.5
        },
    }
}

function validate(s,send=false) {
    let valid = true;
    for (var prop in s) {
        if (Object.prototype.hasOwnProperty.call(s, prop)) {
          let val = $('#'+prop).val();
          let validation_prop = s[prop];
          if(val == '') {
            $('#'+prop+'_valid').html('');
            if(send) {
                $('#'+prop+'_valid').html('Fill in value');
                valid = false;
            }
            continue;
        }
          else if(!isNumeric(val)) {
            $('#'+prop+'_valid').html('Enter a number');
            valid = false;
          }
          else if(validation_prop.hasOwnProperty('min') && val < validation_prop.min ) {
          	$('#'+prop+'_valid').html('Minimum value is ' + validation_prop.min);
          	valid = false;
          }
          else if(validation_prop.hasOwnProperty('max') && val > validation_prop.max ) {
          	$('#'+prop+'_valid').html('Maximum value is ' + validation_prop.max);
          	valid = false;
          }
          else
          	$('#'+prop+'_valid').html('');
        }
    }
    return valid;
}

function validate100(s, send=false) {
    console.log(s);
    let sum = 0;
    let glob_prop;
    for (var prop in s) {
        if (Object.prototype.hasOwnProperty.call(s, prop)) {
          let val = $('#'+prop).val();
          sum += parseFloat(val);
          glob_prop = prop;
          if(val == '') {
            if(send)
                return false;
            $('#'+prop+'_valid').html('');
            return true;
          }
        }
    }
    if(sum != 100) {
        $('#'+glob_prop+'_valid').html('Sum equals '+sum+'% (should be 100%)');
        return false;
    }
    return true;
}

function validateDefaults() {
    let s = validation.defaults;
    return validate(s);
}

function validateDevices() {
    let s = validation.devices;
    return validate(s);
}

function validateMain(send=false) {
    $('#submit-fail').hide();
    let valid = true;
    let id_warnings = ['height','width','s1_reliability_1','s1_reliability_2','s2_reliability_1','s2_reliability_2','s3_reliability_1','s3_reliability_2','s4_reliability_1','s4_reliability_2'];
    for(let i=0;i<id_warnings.length;i++) {
        let v = validation[id_warnings[i]]; //only warning
        let val = $('#'+id_warnings[i]).val();
        if(val == '') {
            $('#'+id_warnings[i]+'_valid').html('');
            if(send) {
                $('#'+id_warnings[i]+'_valid').html('Fill in value');
                valid = false;
            }
            continue;
        }
        else if(!isNumeric(val)) {
            $('#'+id_warnings[i]+'_valid').html('Enter a number');
            valid = false;
        }
        else if(v.hasOwnProperty('min') && val < v.min) {
            $('#'+id_warnings[i]+'_valid').html('Unusual number');
        }
        else if(v.hasOwnProperty('max') && val > v.max) {
            $('#'+id_warnings[i]+'_valid').html('Unusual number');
        }
        else
            $('#'+id_warnings[i]+'_valid').html('');
    }
    
    let id_checks = ['entrance_location_x', 'entrance_location_y', 'shaft_location_x', 'shaft_location_y', 'distance', 'speed'];
    for(let i=0;i<id_checks.length;i++) {
        $('#'+id_checks[i]+'_valid').html('');
        $('#car_file_valid').html('');
        $('#wall_file_valid').html('');
        if(send) {   
            let val = $('#'+id_checks[i]).val();
            if(val == '') {
                $('#'+id_checks[i]+'_valid').html('');
                    $('#'+id_checks[i]+'_valid').html('Fill in value');
                    valid = false;
                continue;
            }
            else if(!isNumeric(val)) {
                $('#'+checks[i]+'_valid').html('Enter a number');
                valid = false;
            }
        }
    }
    if(send) {
        if( $('#car_file').val() == 0 ) {
            $('#car_file_valid').html('Please upload or select car file.');
            valid = false;
        }
        if( $('#wall_file').val() == 0 ) {
                $('#wall_file_valid').html('Please upload or select wall file.');
                valid = false;
        }
    }
    const s = validation.car_composition;
    valid = validate(s, send) && validate100(s,send) && valid;
    const t = validation.cartype_composition;
    valid = validate(t, send) && validate100(t,send) && valid;
    
    return valid;
}

function isNumeric(n) {
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

export { validateDefaults, validateDevices, validateMain };