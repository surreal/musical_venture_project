
var profilesArray;
$(document).ready(function() {
    console.log("$(document).ready(function()");
    /** request for a server*/
    $.get("/get_users", $(this).serialize(), function( data ) {
        profilesArray = data;
        $('#spinner').empty();
        $.each(data, function(i, p) {
            console.log("name == " + data[i].name + "; phone_number == " + data[i].phone_number + "; city == " + data[i].city  + "; age == " + data[i].age);
            $('#spinner').append($('<option></option>').val(data[i].name).html(data[i].name));
        });
        setValuesOnViews(data[0].phone_number,data[0].city,data[0].age, data[0].body,data[0].is_has_confidence,data[0].is_like_to_sing_whant_to_show,
            data[0].is_has_voice_fits_vocals,data[0].is_know_to_dance,data[0].is_playing_guitar,data[0].is_playing_electric_guitar,data[0].is_playing_trumpet,
            data[0].is_playing_drums, data[0].is_playing_keyboards);
        var picturePath = data[0].picture_path;
        if(picturePath != 'null') $("#image").attr("src", picturePath); else $("#image").hide('slow');
        setRelevantIsHavePicValue(picturePath);
        console.log("document).ready() -> data[0].name == " + data[0].name + "; picturePath == " + picturePath);            
    });
});

function setValuesOnViews(phone_number, city, age, body, is_has_confidence, is_like_to_sing_whant_to_show, is_has_voice_fits_vocals, is_know_to_dance, is_playing_guitar, is_playing_electric_guitar, is_playing_trumpet, is_playing_drums, is_playing_keyboards) {
    $('#user_phone_number').html(phone_number);
    $('#user_city').html(city);
    $('#user_age').html(age);
    $('#user_body').html(body);
    $('#is_has_confidence').html(is_has_confidence);
    $('#is_like_to_sing_whant_to_show').html(is_like_to_sing_whant_to_show);
    $('#is_has_voice_fits_vocals').html(is_has_voice_fits_vocals);
    $('#is_know_to_dance').html(is_know_to_dance);
    $('#is_playing_guitar').html(is_playing_guitar);
    $('#is_playing_electric_guitar').html(is_playing_electric_guitar);
    $('#is_playing_trumpet').html(is_playing_trumpet);
    $('#is_playing_drums').html(is_playing_drums);
    $('#is_playing_keyboards').html(is_playing_keyboards);
}

$("#spinner").on("change", function(event){
    var selectedIndex = $("#spinner").prop('selectedIndex');
    var picturePath = profilesArray[selectedIndex].picture_path;
    setRelevantIsHavePicValue(picturePath);
    setValuesOnViews(profilesArray[selectedIndex].phone_number,profilesArray[selectedIndex].city,profilesArray[selectedIndex].age, profilesArray[selectedIndex].body,profilesArray[selectedIndex].is_has_confidence,profilesArray[selectedIndex].is_like_to_sing_whant_to_show,
        profilesArray[selectedIndex].is_has_voice_fits_vocals,profilesArray[selectedIndex].is_know_to_dance,profilesArray[selectedIndex].is_playing_guitar,profilesArray[selectedIndex].is_playing_electric_guitar,profilesArray[selectedIndex].is_playing_trumpet,
        profilesArray[selectedIndex].is_playing_drums, profilesArray[selectedIndex].is_playing_keyboards);
    if(picturePath != 'null'){
        // $("#image").css('visibility', 'visible');
        $("#image").show('slow');
         $("#image").attr("src", picturePath); 
    } else {
        $("#image").hide('slow');
        // $("#image").css('visibility', 'hidden');
    }
    console.log("spinner changed -> selectedIndex == " + selectedIndex + "; picturePath == " + picturePath);            
})

function setRelevantIsHavePicValue(picturePath){
    if(picturePath != 'null'){
        $("#havePicture").hide('slow');
    } else {
        $("#havePicture").show('slow');
        $("#havePicture").text('אין תמונה');
    }
}