import $ from 'jquery';
import 'bootstrap';
import intro from './introduction.mjs';
//import { validateDefaults, validateDevices, validateMain } from './validate.js';

let hasChanged = false;

function renderCalc() {
    console.log("renderCalc function to make side bar opaque");
	$('#sidebar').removeClass('sidebar-opacity');
	$('#main').show();
	$('#intro-div').hide();
}

window.onbeforeunload = function(){
    if(hasChanged)
        return 'Are you sure you want to leave?';
};



$(document).ready(function () {
    console.log("DOM ready for index.js for velux_rwa_fe project");
    document.getElementById('smokecompt').style.display = 'none';
    document.getElementById('classGebouw').style.display = 'none';


    let boards = undefined;
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('#introduction').on('click', () => { 
        console.log("introduction clicked");

    	$('#intro-div').html(intro()).show();
    	$('#main').hide();

    	$('#sidebar').addClass('sidebar-opacity');
    });
    $('#Kilimanjaro').on('click', () => { 
        console.log("vent-calc-tool clicked");

    	renderCalc();
    });

    $('#main input').on('change', () => {
        console.log("main input changed");

        hasChanged = true;
        console.log(hasChanged);
        //validateMain();
    });
    


    $(document).on('change', '#smoke_compts', () => {
         updateNumberLayersUG();
    });

    function updateNumberLayersUG() {
        let n = parseInt($('#smoke_compts').val());
        console.log("number of smoke compartments selected");
        console.log(n);
        
        if(n==0){
            document.getElementById('smokecompt').style.display = 'none';


        }
        else {
            document.getElementById('smokecompt').style.display = 'block';


        }


        for(let i=1;i<=3;i++) {
            if(n >= i){
                //$('#ug'+i).css("visibility", "visible");
                //$('#labelug'+i).css("visibility", "visible");
                //$('#ug'+i).css("display", "block");
                $('#labelug'+i).css("display", "block");
            }
            else{
                console.log("making smoke compartment hidden",i);

                //$('#ug'+i).css("visibility", "hidden");
                //$('#labelug'+i).css("visibility", "hidden");
                //$('#ug'+i).css("display", "none");
                $('#labelug'+i).css("display", "none");
            }
        }
    }


    $(document).on('change', '#buildingType', () => {
        console.log("User changed building type");
        updateHoogteGebouw();
    });

    function updateHoogteGebouw() {
        let aantalGebouwen = $('#buildingType').val();
        //console.log(aantalGebouwen)
        switch(aantalGebouwen) {
            case 'typeIndustry':
                console.log("industry selected");
                $('#classGebouw').show();
                //$('#classGebouw').css("display", "block");
                //document.getElementById('classGebouw').style.display = 'block';


                break;
            case 'typeRegular':
                $('#classGebouw').hide();
               // $('#classGebouw').css("display", "none");
                //document.getElementById('classGebouw').style.display = 'none';


                break;
            default:
                break;
                // do nothing
        }
    }




    $('[data-toggle="popover"]').popover();
});

