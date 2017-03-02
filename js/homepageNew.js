function parseDate(str) {
    var mdy = str.split('-')
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function daydiff(first, second) {
    return (second - first) / (1000 * 60 * 60 * 24);
}

// START Added by thanh on 2015/12/04
function convertDate(dateInput, addday) {
    var mydate = new Date(dateInput);
    mydate.setDate(mydate.getDate() + parseInt(addday));
    var dd = mydate.getDate();
    var mm = mydate.getMonth();
    var y = mydate.getFullYear();
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    for (var j = 0; j < months.length; j++) {
        if (mm == j) {
            mm = months[j];
            break;
        }
    }
    if (dd < 10) {
        dd = "0" + dd;
    }
    var formattedDate = y + "-" + mm + "-" + dd;
    return formattedDate;
}

function appendNumberOfNight(CityID) {
    var checkPackageCityID = $("#MSIFrameworkURL").val() + 'API/packagesnumberofnights';
    $.ajax({
        url: checkPackageCityID,
        type: "POST",
        data: CityID,
        processData: true,
        traditional: true,
        dataType: 'json',
        //contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (IsJsonString(response)) {
                var result = JSON.parse(response);
                var nights = result.LstNumberofNights;
                var days = result.LstNumberOfDays;
                $('#NumberOfNights').find('option').remove().end().append('<option value="0">Duration</option>');
                $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid ul li").remove().end();
                $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid ul").append(String.format("<li><span data-val='{0}'>{1}</span><li>", 0, "Duration"))
                var ListNumberOfNight = '';
                for (var i in nights) {
                    var index = parseInt(i) + 1;
                    $("#NumberOfNights").append(new Option(days[i] + ";" + nights[i], index));
                    if (days[i] == "0") {
                        $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid ul").append(String.format("<li><span data-val='{0};{1};{1}'>{1} nights</span><li>", index, nights[i]));
                    }
                    else {
                        $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid ul").append(String.format("<li><span data-val='{0};{2};{1}'>{2} days {1} nights</span><li>", index, nights[i], days[i]));
                    }
                    if (ListNumberOfNight == '') {
                        ListNumberOfNight = days[i] + ";" + nights[i];
                    }
                    else {
                        ListNumberOfNight += "," + days[i] + ";" + nights[i];
                    }
                };
                $('.ListNumberOfNight').val(ListNumberOfNight);
                $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid >ul li").removeClass("selected on").first().addClass("on selected");
                $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid >ul li:empty").remove();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#NumberOfNights').find('option').remove().end().append('<option value="0">Duration</option>');
            $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid >ul li").remove().end();
            $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid >ul").append(String.format("<li><span data-val='{0}'>{1}</span><li>", 0, "Duration"));
            $("#NumberOfNights").parent().find(".ffSelect .ffSelectMenuWrapper .ffSelectMenuMid >ul li").removeClass("selected on").first().addClass("on selected");
        }
    });
}
// END Added by thanh on 2015/12/04

function datevalidate(checkindate, dateEntered, checkinClassname, checkoutClassName) {    
    //var dateEntered = $(this).val();

    var year = dateEntered.substring(0, 4);
    var month = dateEntered.substring(5, 7);
    var date = dateEntered.substring(8, 10);

    // var checkindate = $(".modify_start").val();

    var checkindateyear = checkindate.substring(0, 4);
    var checkindatemonth = checkindate.substring(5, 7);
    var checkindatedate = checkindate.substring(8, 10);

    var checkoutday = new Date(year, month - 1, date);
    var checkinday = new Date(checkindateyear, checkindatemonth - 1, checkindatedate);

    if (checkoutday <= checkinday) {
        $("." + checkinClassname).addClass('missingfield');
        $("." + checkoutClassName).addClass('missingfield');
        return "true";
    } else {
        $("." + checkinClassname).removeClass('missingfield');
        $("." + checkoutClassName).removeClass('missingfield');
        return "false";
    }
}

function showDatepicker(className) {
    setTimeout(
  function () {
      $("." + className).datepicker("show");
  }, 200);
}

function hotelRoomChildChange(Selectedclass) {
    
    var hcrno = $("." + Selectedclass).attr("class").replace("hotel_child_room_", "");

    if ($(".hotel_child_room_" + hcrno).val() == 1) {
        $(".HotelRoomChildBolg_" + hcrno + "_1").show();
        $(".HotelRoomChildBolg_" + hcrno + "_2").show();
        $(".HotelRoomChildBolg_" + hcrno + "_2").css('visibility', 'hidden');
    }
    else if ($(".hotel_child_room_" + hcrno).val() == 2) {
        $(".HotelRoomChildBolg_" + hcrno + "_1").show();
        $(".HotelRoomChildBolg_" + hcrno + "_2").show();
        $(".HotelRoomChildBolg_" + hcrno + "_2").css('visibility', 'visible');
    }
    else {
        $(".HotelRoomChildBolg_" + hcrno + "_1").hide();
        $(".HotelRoomChildBolg_" + hcrno + "_2").hide();
    }

}

function FlighthotelRoomChildChange(Selectedclass) {

    var hcrno = $("." + Selectedclass).attr("class").replace("Flight_hotel_child_room_", "");

    if ($(".Flight_hotel_child_room_" + hcrno).val() == 1) {
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_1").show();
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_2").show();
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_2").css('visibility', 'hidden');
    }
    else if ($(".Flight_hotel_child_room_" + hcrno).val() == 2) {
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_1").show();
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_2").show();
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_2").css('visibility', 'visible');
    }
    else {
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_1").hide();
        $(".Flight_HotelRoomChildBolg_" + hcrno + "_2").hide();
    }

}

function packageRoomChildChange(Selectedclass) {

    var hcrno = $("." + Selectedclass).attr("class").replace("package_child_room_", "");
    //$("div[class*='PackageRoomChildBolg_" + val1 + "']").show();
    if ($(".package_child_room_" + hcrno).val() == 1) {
        $(".PackageRoomChildBolg_" + hcrno + "_1").show();
        $(".PackageRoomChildBolg_" + hcrno + "_1").css('visibility', 'visible');
        $(".PackageRoomChildBolg_" + hcrno + "_2").show();
        $(".PackageRoomChildBolg_" + hcrno + "_2").css('visibility', 'hidden');
        $(".PackageRoomChildBolg_" + hcrno + "_3").show();
        $(".PackageRoomChildBolg_" + hcrno + "_3").css('visibility', 'hidden');
    }
    else if ($(".package_child_room_" + hcrno).val() == 2) {
        $(".PackageRoomChildBolg_" + hcrno + "_1").show();
        $(".PackageRoomChildBolg_" + hcrno + "_1").css('visibility', 'visible');
        $(".PackageRoomChildBolg_" + hcrno + "_2").show();
        $(".PackageRoomChildBolg_" + hcrno + "_2").css('visibility', 'visible');
        $(".PackageRoomChildBolg_" + hcrno + "_3").show();
        $(".PackageRoomChildBolg_" + hcrno + "_3").css('visibility', 'hidden');
    }
    else if ($(".package_child_room_" + hcrno).val() == 3) {
        $(".PackageRoomChildBolg_" + hcrno + "_1").show();
        $(".PackageRoomChildBolg_" + hcrno + "_1").css('visibility', 'visible');
        $(".PackageRoomChildBolg_" + hcrno + "_2").show();
        $(".PackageRoomChildBolg_" + hcrno + "_2").css('visibility', 'visible');
        $(".PackageRoomChildBolg_" + hcrno + "_3").show();
        $(".PackageRoomChildBolg_" + hcrno + "_3").css('visibility', 'visible');

    }
    else {
        $(".PackageRoomChildBolg_" + hcrno + "_1").hide();
        $(".PackageRoomChildBolg_" + hcrno + "_1").css('visibility', 'hidden');
        $(".PackageRoomChildBolg_" + hcrno + "_2").hide();
        $(".PackageRoomChildBolg_" + hcrno + "_2").css('visibility', 'hidden');
        $(".PackageRoomChildBolg_" + hcrno + "_3").hide();
        $(".PackageRoomChildBolg_" + hcrno + "_3").css('visibility', 'hidden');
    }


    var noselect = $("." + Selectedclass).attr("class").replace("package_child_room_", "");
        var noChds = 4 - parseInt($("select[class*='package_adult_room_" + noselect + "']").val());
        var noChdBeds = 3 - parseInt($("select[class*='package_adult_room_" + noselect + "']").val());

       // var nodrp = $("." + Selectedclass).parent("span").attr("class").replace("package_childs_room_", "");
        var nodrp = noselect;

        if ($("select[class*='package_child_room_" + noselect + "']").val() != 0) {

            //for (var i = 1; i <= noselect; i++) {
            //    $(".package_childs_age_" + nodrp + "_" + i).css('visibility', '');
            //}


            $(".package_childage .child_" + nodrp + "_1").val(2);
            $(".package_childage .childbed_" + nodrp + "_1").val(0);
            $(".package_childage .child_" + nodrp + "_2").val(2);
            $(".package_childage .childbed_" + nodrp + "_2").val(0);
            $(".package_childage .child_" + nodrp + "_3").val(2);
            $(".package_childage .childbed_" + nodrp + "_3").val(0);

            var i = 1;
            var hi = 1;
            $("#search-form-packages_1 select[class*='childbed_" + noselect + "'] option[value='1']").each(function () {
                if (i <= noChdBeds) {
                    $(this).show();
                    $(this).css('visibility', 'visible');
                    $(this).showOption();
                } else {
                    $(this).hide();
                    $(this).css('visibility', 'hidden');
                    $(this).hideOption();
                }
                i++;

            });

                $("#search-form-packages_1 select[class*='childbed_" + noselect + "']").parent().find(".ffSelect .ffSelectMenuMidBG .ffSelectMenuMid ul li span[data-val='1']").each(function () {
                if (hi <= noChdBeds) {
                    $(this).parent().show();
                    $(this).parent().css('visibility', 'visible');
                    $(this).parent().showOption();
                } else {
                    $(this).parent().hide();
                    $(this).parent().css('visibility', 'hidden');
                    $(this).parent().hideOption();
                }
                hi++;

            });
        }
    


}


function packageRoomAdultChange(Selectedclass) {

    var hcrno = $("." + Selectedclass).attr("class").replace("hotel_child_room_", "");

    var noselect = $("." + hcrno).attr("class").replace("package_adult_room_", "");

    var noOpt = 4 - parseInt($("." + hcrno).val());

    var i = 0;
    var hi = 0;
    $("select[class*='package_child_room_" + noselect + "'] option").each(function () {

        if (i <= noOpt) {
            $(this).show();
            $(this).css('visibility', 'visible');
            $(this).showOption();
        } else {
            $(this).hide();
            $(this).css('visibility', 'hidden');
            $(this).hideOption();
        }
        i++;

    });

    $("select[class*='package_child_room_" + noselect + "']").parent().find(".ffSelect .ffSelectMenuMidBG .ffSelectMenuMid ul li").each(function () {

        if (hi <= noOpt) {
            $(this).show();
            $(this).css('visibility', 'visible');
            $(this).showOption();
        } else {
            $(this).hide();
            $(this).css('visibility', 'hidden');
            $(this).hideOption();
        }
        hi++;

    });

    $(".PackageRoomChildBolg_" + noselect + "_1").hide();
    $(".PackageRoomChildBolg_" + noselect + "_2").hide();
    $(".PackageRoomChildBolg_" + noselect + "_3").css('visibility', 'hidden');

    $("select[class*='package_child_room_" + noselect + "']").val(0);

    $(".PackageRoomChildBolg_" + noselect + "_1 .child_" + noselect + "_1").val(2);
    $(".PackageRoomChildBolg_" + noselect + "_1 .childbed_" + noselect + "_1").val(0);
    $(".PackageRoomChildBolg_" + noselect + "_2 .child_" + noselect + "_2").val(2);
    $(".PackageRoomChildBolg_" + noselect + "_2 .childbed_" + noselect + "_2").val(0);
    $(".PackageRoomChildBolg_" + noselect + "_3 .child_" + noselect + "_3").val(2);
    $(".PackageRoomChildBolg_" + noselect + "_3 .childbed_" + noselect + "_3").val(0);


    $(".package_child_room_" + noselect).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>0');
    $(".PackageRoomChildBolg_" + noselect + "_1 .child_" + noselect + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
    $(".PackageRoomChildBolg_" + noselect + "_1 .childbed_" + noselect + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
    $(".PackageRoomChildBolg_" + noselect + "_2 .child_" + noselect + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
    $(".PackageRoomChildBolg_" + noselect + "_2 .childbed_" + noselect + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
    $(".PackageRoomChildBolg_" + noselect + "_3 .child_" + noselect + "_3").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
    $(".PackageRoomChildBolg_" + noselect + "_3 .childbed_" + noselect + "_3").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
}


$(function () {

    $('#search-form-hotels #hotelsearch').click(function () {
      //  debugger;
        var $t = true;
        if ($('.atc_hotel_city').val() == "" || $('.atc_hotel_city').val() != $('#autocomplete_hotel_city').val() || $('.check_in').val() == "" || $('.check_out').val() == "" || $('.currency_type_hotel').val() == 0 || $('.hotel_rooms').val() == "0" || $('.hotel_rooms').val() == null || $('.hotel_rooms').val() == 0) {
            if ($('.atc_hotel_city').val() == "" || $('.atc_hotel_city').val() != $('#autocomplete_hotel_city').val()) {
                $('.autocomplete_hotel_city').addClass('missingfield');
            }
            if ($('.check_in').val() == "") {
                $('.check_in').addClass('missingfield');
            }
            if ($('.check_out').val() == "") {
                $('.check_out').addClass('missingfield');
            }
            if ($('.currency_type_hotel').val() == 0) {
                $('.currency_type').addClass('missingfield');
                $('.currency_type').parent().find(".ffSelect").addClass('missingfield');
            }
            if ($('.hotel_rooms').val() == 0 || $('.hotel_rooms').val() == null) {
                $('.hotel_rooms').addClass('missingfield');
                $('.hotel_rooms').parent().find(".ffSelect").addClass('missingfield');
            }
            $t = false;
        }
        if ($('.check_in').hasClass('missingfield') || $('.check_out').hasClass('missingfield') || $('.check_in').hasClass('input-validation-error') || $('.check_out').hasClass('input-validation-error')) {
            $t = false;
        }
        var cin = new Date($('.check_in').val());
        var cout = new Date($('.check_out').val());
        var cdate = new Date();

        if (cin < cdate) {
            $('.check_in').addClass('missingfield');
            $t = false;
        } else if (cout < cdate) {
            $('.check_out').addClass('missingfield');
            $t = false;
        } else if (cin > cout) {
            $t = false;
        }

        var adultCnt = 0;
        var childCnt = 0;
        var roomFormat = '';
        var roomBedFormat = '';

        for (var val = 1; val <= $(".hotel_rooms").val() ; val++) {
            adultCnt += parseInt($(".adult_room_" + val).val());
            childCnt += parseInt($(".hotel_child_room_" + val).val());
            var room = '';
            if (roomFormat == '')
                room = 'room' + val + "=" + $(".adult_room_" + val).val() + ",0";
            else
                room = '&room' + val + "=" + $(".adult_room_" + val).val() + ",0";

            roomFormat += room;

            for (var child = 1; child <= $(".hotel_child_room_" + val).val() ; child++) {
                roomFormat += "," + $(".child_" + val + "_" + child).val();
                //room += "," + $(".child_" + val + "_" + child).val() + "-" + $(".childbed_" + val + "_" + child).val();
                room += "," + $(".child_" + val + "_" + child).val() + "-0";
            }

            //for (var child = 1; child <= $(".hotel_child_room_" + val).val() ; child++) {
            //    room += "," + $(".child_" + val + "_" + child).val();
            //}
            roomBedFormat += room;
        }

        var RoomAudltChildCntMsg = "";
        var RoomValidTrue = false;;
        RoomAudltChildCntMsg += "Maximum number of guests exceeded in";
        var ii = 0;
        for (var val = 1; val <= $(".hotel_rooms").val() ; val++) {
            var roomadultCnt = parseInt($(".adult_room_" + val).val());
            var roomchildCnt = parseInt($(".hotel_child_room_" + val).val());

            if ((parseInt(roomadultCnt) + parseInt(roomchildCnt)) > 6) {
                $t = false;
                if (ii > 0) {
                    RoomAudltChildCntMsg += ",";
                }
                ii++;
                RoomAudltChildCntMsg += " Room" + val;
                RoomValidTrue = true;
            }

        }
        RoomAudltChildCntMsg += ".";
        //if (RoomAudltChildCntMsg != null && RoomAudltChildCntMsg != "" && RoomAudltChildCntMsg != " ") {
        if (RoomValidTrue == true) {
            //alert(RoomAudltChildCntMsg);
        }

        //alert(roomFormat);
        //alert(roomBedFormat);

        $("#roomFormat").val(roomFormat);
        $("#roomBedFormat").val(roomBedFormat);
        $("#adultCount").val(adultCnt);
        $("#childCount").val(childCnt);
        //alert($t);
        if ($t == true) {

            $("#sectionprocessing").show();
            var url = window.location.href;

            if (url.toLowerCase().indexOf("/hoteldetails") > 0) {

                var searchObject = $('#search-form-hotels :input').serializeObject();

                $.ajax({
                    url: $("#HotelSearchList").val(),
                    //cache: false,
                    //type: "GET",
                    data: searchObject,
                    success: function (response) {
                        $("#sectionprocessing").hide();
                        if (response == true) {

                            $("#search-form-hotels").submit();
                        } else {
                            alert("Prices are not available for this hotel.");
                            //$(".errormsg").html("No activities available for this search criteria.");
                        }
                        return response;
                    },
                    error: function (xhr) {
                        $("#sectionprocessing").hide();
                        return false;
                        //$(".processing").hide();
                    }
                });


            } else {
                $("#sectionprocessing").hide();
                $("#search-form-hotels").submit();
                return $t;
            }
        } else {
            $("#sectionprocessing").hide();
            return $t;
        }

        // return $t;
    });


    // added by suresh for flight hotel search 
   
    $(document).on("click","#search-form-flightandhotel #flighthotelsearch",function(){
        // $('#search-form-flightandhotel #flighthotelsearch').click(function () {
        //debugger
        var $t = true;
        if ($('.atc_hotel_city').val() == "" || $('.atc_hotel_city').val() != $('#autocomplete_hotel_city1').val() || $('#check_in1').val() == "" || $('#check_out1').val() == "" || $('.Flight_hotel_rooms').val() == "0" || $('.Flight_hotel_rooms').val() == null || $('.Flight_hotel_rooms').val() == 0) {
            if ($('.atc_hotel_city').val() == "" || $('.atc_hotel_city').val() != $('#autocomplete_hotel_city1').val()) {
                $('.autocomplete_hotel_city').addClass('missingfield');
            }
            if ($('.check_in').val() == "") {
                $('.check_in').addClass('missingfield');
            }
            if ($('.check_out').val() == "") {
                $('.check_out').addClass('missingfield');
            }
            if ($('.currency_type_hotel').val() == 0) {
                $('.currency_type').addClass('missingfield');
                $('.currency_type').parent().find(".ffSelect").addClass('missingfield');
            }
            if ($('.Flight_hotel_rooms').val() == 0 || $('.Flight_hotel_rooms').val() == null) {
                $('.Flight_hotel_rooms').addClass('missingfield');
                $('.Flight_hotel_rooms').parent().find(".ffSelect").addClass('missingfield');
            }
            $t = false;
        }
        if ($('.check_in').hasClass('missingfield') || $('.check_out').hasClass('missingfield') || $('.check_in').hasClass('input-validation-error') || $('.check_out').hasClass('input-validation-error')) {
            $t = false;
        }
        var cin = new Date($('.check_in').val());
        var cout = new Date($('.check_out').val());
        var cdate = new Date();

        if (cin < cdate) {
            $('.check_in').addClass('missingfield');
            $t = false;
        } else if (cout < cdate) {
            $('.check_out').addClass('missingfield');
            $t = false;
        } else if (cin > cout) {
            $t = false;
        }

        var adultCnt = 0;
        var childCnt = 0;
        var roomFormat = '';
        var roomBedFormat = '';

        for (var val = 1; val <= $(".Flight_hotel_rooms").val() ; val++) {
            adultCnt += parseInt($(".Flight_adult_room_" + val).val());
            childCnt += parseInt($(".Flight_hotel_child_room_" + val).val());
            var room = '';
            if (roomFormat == '')
                room = 'room' + val + "=" + $(".Flight_adult_room_" + val).val() + ",0";
            else
                room = '&room' + val + "=" + $(".Flight_adult_room_" + val).val() + ",0";

            roomFormat += room;

            for (var child = 1; child <= $(".Flight_hotel_child_room_" + val).val() ; child++) {
                roomFormat += "," + $(".Flight_HotelRoomBolg .child_" + val + "_" + child).val();
                //room += "," + $(".child_" + val + "_" + child).val() + "-" + $(".childbed_" + val + "_" + child).val();
                room += "," + $(".Flight_HotelRoomBolg .child_" + val + "_" + child).val() + "-0";
            }

            //for (var child = 1; child <= $(".hotel_child_room_" + val).val() ; child++) {
            //    room += "," + $(".child_" + val + "_" + child).val();
            //}
            roomBedFormat += room;
        }

        var RoomAudltChildCntMsg = "";
        var RoomValidTrue = false;;
        RoomAudltChildCntMsg += "Maximum number of guests exceeded in";
        var ii = 0;
        for (var val = 1; val <= $(".Flight_hotel_rooms").val() ; val++) {
            var roomadultCnt = parseInt($(".Flight_adult_room_" + val).val());
            var roomchildCnt = parseInt($(".Flight_hotel_child_room_" + val).val());

            if ((parseInt(roomadultCnt) + parseInt(roomchildCnt)) > 6) {
                $t = false;
                if (ii > 0) {
                    RoomAudltChildCntMsg += ",";
                }
                ii++;
                RoomAudltChildCntMsg += " Room" + val;
                RoomValidTrue = true;
            }

        }
        RoomAudltChildCntMsg += ".";
        //if (RoomAudltChildCntMsg != null && RoomAudltChildCntMsg != "" && RoomAudltChildCntMsg != " ") {
        if (RoomValidTrue == true) {
            //alert(RoomAudltChildCntMsg);
        }

        //alert(roomFormat);
        //alert(roomBedFormat);

        $("#roomFormat1").val(roomFormat);
        $("#roomBedFormat1").val(roomBedFormat);
        $("#adultCount1").val(adultCnt);
        $("#childCount1").val(childCnt);
        //alert($t);
        if ($t == true) {

            $("#sectionprocessing").show();
            var url = window.location.href;

            if (url.toLowerCase().indexOf("/hoteldetails") > 0) {

                var searchObject = $('#search-form-flightandhotel :input').serializeObject();

                $.ajax({
                    url: $("#HotelSearchList").val(),
                    //cache: false,
                    //type: "GET",
                    data: searchObject,
                    success: function (response) {
                        $("#sectionprocessing").hide();
                        if (response == true) {

                            $("#search-form-hotels").submit();
                        } else {
                            alert("Prices are not available for this hotel.");
                            //$(".errormsg").html("No activities available for this search criteria.");
                        }
                        return response;
                    },
                    error: function (xhr) {
                        $("#sectionprocessing").hide();
                        return false;
                        //$(".processing").hide();
                    }
                });


            } else {
                $("#sectionprocessing").hide();
                $("#search-form-flightandhotel").submit();
                return $t;
            }
        } else {
            $("#sectionprocessing").hide();
            return $t;
        }

        // return $t;
    });





    // end script



    $('.autocomplete_hotel_city').click(function () {
        $(this).removeClass('missingfield');
    });
    $('.check_in').click(function () {
        $(this).removeClass('missingfield');
    });
    $('.check_out').click(function () {
        $(this).removeClass('missingfield');
    });
    $('.currency_type').click(function () {
        $(this).removeClass('missingfield');
        $(this).parent().find(".ffSelect").removeClass('missingfield');
        
    });
    $('.hotel_rooms').click(function () {
        //debugger;
        $(this).removeClass('missingfield');
        $(this).parent().find(".ffSelect").removeClass('missingfield');
    });

    //$('.check_out').keyup(function () {
    //    if (new Date($(".check_in").val()) >= new Date($(".check_out").val())) {
    //        $(this).addClass('missingfield');
    //    } else {
    //        $(this).removeClass('missingfield');
    //    }
    //});

    //$('.check_in').keyup(function () {
    //    if (new Date() >= new Date($(".check_in").val())) {
    //        $(this).addClass('missingfield');
    //    } else {
    //        $(this).removeClass('missingfield');
    //    }
    //}); FH_check_in

   

    $(".check_in").datepicker({
       
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: "+1D",
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
            //debugger

            var statusvalid = false;
            var beforeCheckout = "";
            if ($(".check_out").val() == null || $(".check_out").val() == "" || $(".check_out").val() == undefined) {

            	var check_indate = $('.check_in').val();
            	$(".check_out").val(check_indate);
            }
          
            if ($(".check_out").val() != null && $(".check_out").val() != "" && $(".check_out").val() != undefined) {

                changeToDateCheck($('.check_in').val(), $(".check_out").val(), "check_in", "check_out", 30);


                statusvalid = datevalidate($(".check_in").val(), $(".check_out").val(), "check_in", "check_out");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".check_out").val();
                }
            }
            else
            {
            	var check_indate = $('.check_in').val();
                //$(".check_out").val(check_indate + 1);
            	$(".check_out").val(check_indate + 1);
            }

            var check_in2 = $('.check_in').datepicker('getDate');
            //check_in2.setDate(check_in2.getDate() + 1);
            check_in2.setDate(check_in2.getDate() + 1);
            $('.check_out').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.check_in').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.check_out').datepicker('option', 'maxDate', check_out2);

            if ($(".check_in").hasClass("input-validation-error")) {
                $(".check_in").blur();
            }
            if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".check_out").val(), "check_in", "check_out");
                showDatepicker("check_out");
            }
        }
    });
    // added by suresh for flight + hotel checkin

    $(".FH_check_in").datepicker({

        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +1,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
            //debugger

            var statusvalid = false;
            var beforeCheckout = "";
            if ($(".FH_check_out").val() != null && $(".FH_check_out").val() != "" && $(".FH_check_out").val() != undefined) {

                changeToDateCheck($('.FH_check_in').val(), $(".FH_check_out").val(), "FH_check_in", "FH_check_out", 30);


                statusvalid = datevalidate($(".FH_check_in").val(), $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".FH_check_out").val();
                }
            }

            var check_in2 = $('.FH_check_in').datepicker('getDate');
            check_in2.setDate(check_in2.getDate() + 1);
            $('.FH_check_out').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.FH_check_in').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.FH_check_out').datepicker('option', 'maxDate', check_out2);

            if ($(".FH_check_in").hasClass("input-validation-error")) {
                $(".FH_check_in").blur();
            }
            if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
                showDatepicker("FH_check_out");
            }
        }
    });
    //end


    $(".check_out").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +1,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {

            //var check_in2 = $('.check_out').datepicker('getDate');
            //check_in2.setDate(check_in2.getDate() - 1);
            //$('.check_in').datepicker('option', 'maxDate', check_in2);


            if ($(".check_out").hasClass("input-validation-error")) {
                $(".check_out").blur();
            }
            if ($(".check_in").val() != null && $(".check_in").val() != "" && $(".check_in").val() != undefined) {
                datevalidate($(".check_in").val(), $(".check_out").val(), "check_in", "check_out");
            }
        }
    });
    //Added by suresh for flight and hotel check out
    $(".FH_check_out").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +1,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {

            //var check_in2 = $('.check_out').datepicker('getDate');
            //check_in2.setDate(check_in2.getDate() - 1);
            //$('.check_in').datepicker('option', 'maxDate', check_in2);


            if ($(".FH_check_out").hasClass("input-validation-error")) {
                $(".FH_check_out").blur();
            }
            if ($(".FH_check_in").val() != null && $(".FH_check_in").val() != "" && $(".FH_check_in").val() != undefined) {
                datevalidate($(".FH_check_in").val(), $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
            }
        }
    });


    $(".check_in").keyup(function () {

        if (new Date($(".check_in").val()) != "Invalid Date") {

            var statusvalid = false;
            var beforeCheckout = "";
            if ($(".check_out").val() != null && $(".check_out").val() != "" && $(".check_out").val() != undefined) {
                statusvalid = datevalidate($(".check_in").val(), $(".check_out").val(), "check_in", "check_out");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".check_out").val();
                }
            }

            var check_in2 = $('.check_in').datepicker('getDate');
            check_in2.setDate(check_in2.getDate() + 1);
            $('.check_out').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.check_in').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.check_out').datepicker('option', 'maxDate', check_out2);

            var dateEntered = $(this).val();

            var year = dateEntered.substring(0, 4);
            var month = dateEntered.substring(5, 7);
            var date = dateEntered.substring(8, 10);

            var dateToCompare = new Date(year, month - 1, date);
            var currentDate = new Date();

            if (dateToCompare <= currentDate) {
                $(this).addClass('missingfield');
            } else {
                $(".check_in").removeClass('missingfield');
                $(".check_out").removeClass('missingfield');
            }

            if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".check_out").val(), "check_in", "check_out");
                showDatepicker("check_out");
            }

        }
        else {
            $(this).addClass('missingfield');
        }
    });


    // added by suresh for flight + hotel FH_check_in FH_check_out
    $(".FH_check_in").keyup(function () {

        if (new Date($(".FH_check_in").val()) != "Invalid Date") {

            var statusvalid = false;
            var beforeCheckout = "";
            if ($(".FH_check_out").val() != null && $(".FH_check_out").val() != "" && $(".FH_check_out").val() != undefined) {
                statusvalid = datevalidate($(".FH_check_in").val(), $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".FH_check_out").val();
                }
            }

            var check_in2 = $('.FH_check_in').datepicker('getDate');
            check_in2.setDate(check_in2.getDate() + 1);
            $('.FH_check_out').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.FH_check_in').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.FH_check_out').datepicker('option', 'maxDate', check_out2);

            var dateEntered = $(this).val();

            var year = dateEntered.substring(0, 4);
            var month = dateEntered.substring(5, 7);
            var date = dateEntered.substring(8, 10);

            var dateToCompare = new Date(year, month - 1, date);
            var currentDate = new Date();

            if (dateToCompare <= currentDate) {
                $(this).addClass('missingfield');
            } else {
                $(".FH_check_in").removeClass('missingfield');
                $(".FH_check_out").removeClass('missingfield');
            }

            if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
                showDatepicker("FH_check_out");
            }

        }
        else {
            $(this).addClass('missingfield');
        }
    });
    // end

    $(".check_out").keyup(function () {

        var dateEntered = $(this).val();

        var year = dateEntered.substring(0, 4);
        var month = dateEntered.substring(5, 7);
        var date = dateEntered.substring(8, 10);

        var checkindate = $(".check_in").val();

        var checkindateyear = checkindate.substring(0, 4);
        var checkindatemonth = checkindate.substring(5, 7);
        var checkindatedate = checkindate.substring(8, 10);

        var checkoutday = new Date(year, month - 1, date);
        var checkinday = new Date(checkindateyear, checkindatemonth - 1, checkindatedate);

        if (checkoutday <= checkinday) {
            $(this).addClass('missingfield');
        } else {
            $(".check_in").removeClass('missingfield');
            $(".check_out").removeClass('missingfield');
        }
        if ($(".check_out").val() != null && $(".check_out").val() != "" && $(".check_out").val() != undefined) {
            datevalidate($(".check_in").val(), $(".check_out").val(), "check_in", "check_out");
        }
    });

    // added by suresh v for flight + Hotel
    $(".FH_check_out").keyup(function () {

        var dateEntered = $(this).val();

        var year = dateEntered.substring(0, 4);
        var month = dateEntered.substring(5, 7);
        var date = dateEntered.substring(8, 10);

        var checkindate = $(".FH_check_in").val();

        var checkindateyear = checkindate.substring(0, 4);
        var checkindatemonth = checkindate.substring(5, 7);
        var checkindatedate = checkindate.substring(8, 10);

        var checkoutday = new Date(year, month - 1, date);
        var checkinday = new Date(checkindateyear, checkindatemonth - 1, checkindatedate);

        if (checkoutday <= checkinday) {
            $(this).addClass('missingfield');
        } else {
            $(".FH_check_in").removeClass('missingfield');
            $(".FH_check_out").removeClass('missingfield');
        }
        if ($(".FH_check_out").val() != null && $(".FH_check_out").val() != "" && $(".FH_check_out").val() != undefined) {
            datevalidate($(".FH_check_in").val(), $(".FH_check_out").val(), "FH_check_in", "FH_check_out");
        }
    });

    // end
    $(".autocomplete_hotel_city").autocomplete({
        autoFocus: true,
        source: function (request, response) {

            $(".autocomplete_hotel_city").addClass("ui-autocomplete-loading1");
            var searchtxt = request.term;

            $.ajax({
                url: HotelCitiesUrl,
                data: "{ 'cname': '" + searchtxt.split("'")[0] + "' }",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { $(".autocomplete_hotel_city").removeClass("ui-autocomplete-loading1"); return data; },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.cname,
                            val: item.cid
                        }
                    }));


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //  alert(textStatus);
                }
            });
        },
        select: function (event, ui) {
            $(".atc_hotel_city").val(ui.item.label);
            $("#Destination").val(ui.item.label);
            $("#hotel_city_id").val(ui.item.val);
        },
        minLength: 2
    });


    $(document).on("click", ".select div", function (e) {

       
        $(".package-act-dest-c").hide();
        var sclass = $(this).find("a").attr("class").replace(" active", "");
        var blogClass = sclass + "blog";
        $(".tripplanblog").hide();
        $(".select div a").removeClass("active");
        $(this).find("a").addClass("active");
        $("." + blogClass).show();


        $(".hotel .hotelplans").find("input").val("");
        $(".hotel .hotelplans").find("select").val("0");
        $(".hotel .hotelplans").find("select[class*='adult_room_']").val("1");
        $("span[class*='adults_room_']").hide();
        $("span[class*='hotel_childs_room_'],span[class*='hotel_childs_age_'],span[class*='package_childs_room_'],span[class*='package_childs_age_']").hide();

        $(".menuplan").removeClass("active");
        $("#" + sclass).addClass("active");

        //if (blogClass == "packagesplanblog") {
        //    $("#Nationality").val("");
        //}
    });

    //$(document).on("click", ".menuplan", function (e) {
    //    var linkid = $(this).attr("id");
    //    var blogClass = linkid + "blog";
    //    $(".tripplanblog").hide();
    //    $(".select div a").removeClass("active");
    //    $("." + linkid).addClass("active");
    //    $("." + blogClass).show();

    //});

    //$("#" + ActPopup).click();


    $("div[class*='Flight_adultBlogHotelRoom_']").hide();
    $("div[class*='Flight_childBlogHotelRoom_']").hide();
    $(".Flight_HotelRoomBolg").show();
    // START added by thanh on 2015/12/09
    $("div[class*='Flight_adultBlogHotelRoom_" + 1 + "']").show();
    $("div[class*='Flight_childBlogHotelRoom_" + 1 + "']").show();
    $("div[class*='Flight_HotelRoomChildBolg_" + 1 + "']").show();
    hotelRoomChildChange("hotel_child_room_" + 1);    
    // END added by thanh on 2015/12/09
    
    $(document).on("change keyup", ".hotel_rooms", function (e) {
        //debugger
        $("#search-form-hotels li[class^='adultBlogHotelRoom_']").hide()
        $("div[class*='adultBlogHotelRoom_']").hide();
        $("div[class*='childBlogHotelRoom_']").hide();
        $("div[class*='HotelRoomChildBolg_']").hide();
        //alert($(this).val());
        for (var val1 = 1; val1 <= $(this).val() ; val1++) {
            $("#search-form-hotels li[class^='adultBlogHotelRoom_" + val1 + "']").show();

            $("div[class*='adultBlogHotelRoom_" + val1 + "']").show();
            $("div[class*='childBlogHotelRoom_" + val1 + "']").show();
            $("div[class*='HotelRoomChildBolg_" + val1 + "']").show();
            hotelRoomChildChange("hotel_child_room_" + val1);
        }

        for (var val = (parseInt($(this).val()) + 1) ; val <= 4 ; val++) {

            $(".hotel_child_room_" + val).val(0);
            $(".adult_room_" + val).val(2); //edited by thanh on 2015/12/04

            $(".HotelRoomBolg .child_" + val + "_1").val(0);
            //$(".HotelRoomBolg .childbed_" + val + "_1").val(0).hide();
            $(".HotelRoomBolg .child_" + val + "_2").val(0);
            //$(".HotelRoomBolg .childbed_" + val + "_2").val(0).hide();

            $(".hotel_child_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>0');
            $(".adult_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2'); //edited by thanh on 2015/12/04

            $(".HotelRoomBolg .child_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i> <1');
            //$(".HotelRoomBolg .childbed_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
            $(".HotelRoomBolg .child_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i> <1');
            //$(".HotelRoomBolg .childbed_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
        }

    });

    
    $("div[class*='Flight_adultBlogHotelRoom_']").hide();
    $("div[class*='Flight_childBlogHotelRoom_']").hide();
   // $(".flightandhotelsearch").show();
    // START added by thanh on 2015/12/09
    $("div[class*='Flight_adultBlogHotelRoom_" + 1 + "']").show();
    $("div[class*='Flight_childBlogHotelRoom_" + 1 + "']").show();
    $("div[class*='Flight_HotelRoomChildBolg_" + 1 + "']").show();
    FlighthotelRoomChildChange("Flight_hotel_child_room_" + 1);

    $(document).on("change keyup", ".Flight_hotel_rooms", function (e) {
        //debugger
        //alert("rooms values:" + $(this).val());
        //alert("rooms values by class:" + $(".hotel_rooms").val()); 
        //debugger
        $("div[class*='Flight_adultBlogHotelRoom_']").hide();
        $("div[class*='Flight_childBlogHotelRoom_']").hide();
        $("div[class*='Flight_HotelRoomChildBolg_']").hide();
        //alert($(this).val());
        for (var val1 = 1; val1 <= $(this).val() ; val1++) {
            $("div[class*='Flight_adultBlogHotelRoom_" + val1 + "']").show();
            $("div[class*='Flight_childBlogHotelRoom_" + val1 + "']").show();
            $("div[class*='Flight_HotelRoomChildBolg_" + val1 + "']").show();
            FlighthotelRoomChildChange("Flight_hotel_child_room_" + val1);
        }

        for (var val = (parseInt($(this).val()) + 1) ; val <= 4 ; val++) {

            $(".Flight_hotel_child_room_" + val).val(0);
            $(".Flight_adult_room_" + val).val(2); //edited by thanh on 2015/12/04

            $(".Flight_HotelRoomBolg .child_" + val + "_1").val(0);
            //$(".HotelRoomBolg .childbed_" + val + "_1").val(0).hide();
            $(".Flight_HotelRoomBolg .child_" + val + "_2").val(0);
            //$(".HotelRoomBolg .childbed_" + val + "_2").val(0).hide();

            $(".Flight_hotel_child_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>0');
            $(".Flight_adult_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2'); //edited by thanh on 2015/12/04

            $(".Flight_HotelRoomBolg .child_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i> <1');
            //$(".HotelRoomBolg .childbed_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
            $(".Flight_HotelRoomBolg .child_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i> <1');
            //$(".HotelRoomBolg .childbed_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
        }

    });

    //$("span[class*='adults_room_']").hide();
    //$("span[class*='hotel_childs_age_']").hide();
    //$("span[class*='hotel_childs_room_']").hide();


    //$(document).on("change keyup", ".hotel_rooms", function (e) {

    //    $(".adults").hide();
    //    $(".childs").hide();
    //    $(".hotel_childage").hide();
    //    for (var val1 = 1; val1 <= $(".hotel_rooms").val() ; val1++) {
    //        $(".adults_room_" + val1).show();
    //        $(".hotel_childs_room_" + val1).show();

    //        $(".hotel_child_room_" + val1).change();

    //        //$(".hotel_child_room_" + val).val(0);
    //        //$(".adult_room_" + val).val(1);

    //        //$(".hotel_childage .child_" + val + "_1").val(0);
    //        //$(".hotel_childage .childbed_" + val + "_1").val(0);
    //        //$(".hotel_childage .child_" + val + "_2").val(0);
    //        //$(".hotel_childage .childbed_" + val + "_2").val(0);
    //    }

    //    for (var val = (parseInt($(".hotel_rooms").val()) + 1) ; val <= 4 ; val++) {

    //        $(".hotel_child_room_" + val).val(0);
    //        $(".adult_room_" + val).val(1);

    //        $(".hotel_childage .child_" + val + "_1").val(0);
    //        $(".hotel_childage .childbed_" + val + "_1").val(0);
    //        $(".hotel_childage .child_" + val + "_2").val(0);
    //        $(".hotel_childage .childbed_" + val + "_2").val(0);
    //    }


    //});


    //$(document).on("change keyup", "span[class*='hotel_childs_room_']", function (e) {

    //    var hcrno = $(this).attr("class").replace("childs hotel_childs_room_", "");

    //    if ($(".hotel_child_room_" + hcrno).val() == 1) {
    //        $(".hotel_childs_age_" + hcrno + "_1").show();
    //        $(".hotel_childs_age_" + hcrno + "_2").show();
    //        $(".hotel_childs_age_" + hcrno + "_2").css('visibility', 'hidden');
    //    }
    //    else if ($(".hotel_child_room_" + hcrno).val() == 2) {
    //        $(".hotel_childs_age_" + hcrno + "_1").show();
    //        $(".hotel_childs_age_" + hcrno + "_2").show();
    //        $(".hotel_childs_age_" + hcrno + "_2").css('visibility', 'visible');
    //    }
    //    else {
    //        $(".hotel_childs_age_" + hcrno + "_1").hide();
    //        $(".hotel_childs_age_" + hcrno + "_2").hide();
    //    }

    //});

    //below code for allow textbox's as letters only

    $(document).on("keypress", "#autocomplete_hotel_city", function (e) {


        //var keyCode = (typeof e.which == "number") ? e.which : e.keyCode
        //if (keyCode == 8 || keyCode == 46 || keyCode == 13 || keyCode == 0) return true;

        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (str == "'") {
            //alert("special characters (') is not allowed");
            e.preventDefault();
            return false;
        }
        return true;
        //var regex = new RegExp("^[']+$");
        //if (regex.test(str)) {
        //    alert(str);
        //    return true;
        //} else {
        //    alert("special characters are not allowed");
        //    e.preventDefault();
        //    return false;
        //}
    });
    //$(document).on("keypress", "#autocomplete_hotel_city", function (event) {
    //    var $th = $(this);
    //  //  $th.val($th.val().replace(/[^a-zA-Z0-9]/g, function (str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.'); return ''; }));
    //    $th.val($th.val().replace(/[^a-zA-Z,]/g, function (str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters.'); return ''; }));
    //});

    ///Activities

    
    $(".travel_date").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +7,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
            if ($(".travel_date").hasClass("input-validation-error") || $(".travel_date").hasClass("missingfield")) {
               // $(".travel_date").blur();
                $(".travel_date").keyup();
            }
        }
    });

    $(".travel_date").keyup(function () {

        if (new Date($(".travel_date").val()) != "Invalid Date" || $("#travel_date").val().length > 0) {

            var date = new Date();

            var currentyyyy = date.getFullYear();
            var currentmm = date.getMonth() + 1;
            currentmm = parseInt(currentmm) < 10 ? ("0" + currentmm) : currentmm;
            var currentdd = date.getDate();
            currentdd = parseInt(currentdd) < 10 ? ("0" + currentdd) : currentdd;


            var dateEntered = $(this).val();

            var year = dateEntered.substring(0, 4);
            var month = dateEntered.substring(5, 7);
            var date = dateEntered.substring(8, 10);

            date = date - 7;
            if (date <= 0) {
                month = parseInt(month) - 1;
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    date = parseInt(24) + parseInt(date);
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    date = parseInt(23) - parseInt(date);
                } else if (month == 2) {
                    date = parseInt(21) - parseInt(date);
                }
            }
            var dateToCompare = new Date(year, month - 1, date);
            var currentDate = new Date(currentyyyy, currentmm - 1, currentdd);
      
            if (dateToCompare < currentDate) {
                $(this).addClass('missingfield');
            }
            else if (dateEntered.length > 0 && dateEntered.length < 10)
            {
                $(this).addClass('missingfield');
            }
            else {
                $(this).removeClass('missingfield');
            }
        }
        //else if ($("#travel_date").val().length == 0)
        //{
        //    $(this).removeClass('missingfield');
        //}
        else {
            $(this).addClass('missingfield');
        }
    });
    //below code for allow textbox's as numbers only
    $(document).on("keypress", "#adult, #children", function (event) {
        var keyCode = (typeof event.which == "number") ? event.which : event.keyCode

        if (keyCode == 8 || keyCode == 46 || keyCode == 13 || keyCode == 0) return true;

        if (keyCode < 46 || keyCode > 57) {
            event.preventDefault();
        }
        else if (keyCode == 47) {
            event.preventDefault();
        }
    });

    $('#actsearchbox').click(function () {
        var $t = true;

        if ($('.activity_destination').val() == "" || $('.atc_city').val() == "" || $('.travel_date').val() == "" || $('.actcurrency_type').val() == 0 || $('.activityadult').val() == "") {

            if ($('.activity_destination').val() == "" || $('.atc_city').val() == "") {
                $('.activity_destination').addClass('missingfield');
            }
            if ($('.travel_date').val() == "") {
                $('.travel_date').addClass('missingfield');
            }
            if ($('.actcurrency_type').val() == 0) {
                $('.actcurrency_type').addClass('missingfield');
                $('.actcurrency_type').parent().find(".ffSelect").addClass('missingfield');
                
            }
            if ($('.activityadult').val() == "") {
                $('.activityadult').addClass('missingfield');
                $('.activityadult').parent().find(".ffSelect").addClass('missingfield');
            }
            //if ($('.activitychildren').val() == "") {
            //    $('.activitychildren').addClass('missingfield');
            //}

            $t = false;
        }

        if ($('.travel_date').hasClass('missingfield') || $('.travel_date').hasClass('input-validation-error')) {
            $t = false;
        }
        var tdate = new Date($('.travel_date').val());
        var cdate = new Date();

        cdate.setDate(cdate.getDate() + 6);

        if (tdate < cdate) {
            $('.travel_date').addClass('missingfield');
            $t = false;
        }

        if ($('.autocomplete_activity_city').val() != $('.atc_city').val()) {
            $('.autocomplete_activity_city').addClass('missingfield');
            $t = false;
        }


        var url = window.location.href;
        if ($t == true) {
            $("#sectionprocessing").show();
            if (url.toLowerCase().indexOf("/activitiesdetails") > 0) {

                var objInput = {
                    //Adults: $("#adult").val(),
                    //Childs: $("#children").val(),
                    Adults: 1,
                    Childs: 0,
                    Destination: $("#activity_destination").val(),
                    TravelDate: $("#travel_date").val(),
                    Nid: $("#Nid").val(),
                    Currency: $(".actcurrency_type").val()
                };

                $.ajax({
                    url: $("#ActivitiesSearchList").val(),
                    // cache: false,
                    // type: "GET",
                    data: objInput,
                    success: function (response) {
                        $("#sectionprocessing").hide();
                        if (response == true) {

                            $("#search-form-activities").submit();
                        } else {
                            alert("Prices are not available for this activity.");
                            //$(".errormsg").html("No activities available for this search criteria.");
                        }
                        return response;
                    },
                    error: function (xmlHttpRequest, errorText, thrownError) {
                        $("#sectionprocessing").hide();
                        return false;
                        //$(".processing").hide();
                    }
                });



            } else {
                $("#sectionprocessing").hide();
                $("#search-form-activities").submit();
                return $t;
            }
        } else {
            if (url.toLowerCase().indexOf("/activitiesdetails") > 0) {
                return false;
            } else {
                $("#sectionprocessing").hide();
                return $t;
            }
        }
        return false;
    });

    $('.activity_destination').click(function () {
        $('.activity_destination').removeClass('missingfield');
    });
    $('.travel_date').click(function () {
        $('.travel_date').removeClass('missingfield');
    });
    $('.actcurrency_type').click(function () {
        $('.actcurrency_type').removeClass('missingfield');
        $('.actcurrency_type').parent().find(".ffSelect").removeClass('missingfield');
    });
    $('.activityadult').click(function () {
        $('.activityadult').removeClass('missingfield');
        $('.activityadult').parent().find(".ffSelect").removeClass('missingfield');
    });
    $('.activitychildren').click(function () {
        $('.activitychildren').removeClass('missingfield');
    });

    /*var $c = $('.autocomplete_package_city');
    var $p = $('.package-act-dest-c');
    var $act = $('.autocomplete_activity_city');

    $c.click(function () {
        $(this).removeClass("missingfield");
        $p.css({ 'display': 'block' });

    });
    $act.click(function () {
        $(this).removeClass("missingfield");

        $p.css({ 'display': 'block' });

    });
    $c.keypress(function () {
        $p.fadeOut();
    });
    $act.keypress(function () {
        $p.fadeOut();
    });*/

    $(document).on("click", ".destination-cities-inner ul li.sel", function (event) {
        var $city = $(this).data("city");
        var $country = $(this).data("country");
        var $desti = $city + ", " + $country;
        $p.css({ 'display': 'none' });
        $(".autocomplete_activity_city").val($desti);
        $(".atc_city").val($desti);
    });

    $(document).on("click", ".destination-cities-inner ul li#sel_p", function (event) {
        var $city = $(this).data("city");
        var $country = $(this).data("country");
        var $desti = $city + ", " + $country;
        $p.css({ 'display': 'none' });
        $(".autocomplete_package_city").val($desti);
        $(".atc_city").val($desti);
    });
    $(document).on("click", ".destination-delete", function (e) {
        $p.fadeOut();
        e.stopPropagation();
    });


    $(".activity_destination").autocomplete({
        autoFocus: true,
        source: function (request, response) {
            $(".activity_destination").addClass("ui-autocomplete-loading1");


            var searchtxt = request.term;

            $.ajax({
                url: ActivitiesCitiesUrl,
                data: "{ 'cname': '" + searchtxt.split("'")[0] + "' }",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { $(".activity_destination").removeClass("ui-autocomplete-loading1"); return data; },
                success: function (data) {

                    response($.map(data, function (item) {
                        return {
                            label: item.cname,
                            val: item.cid
                        }
                    }));


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //     alert(textStatus);
                }
            });
        },
        select: function (event, ui) {
            $(".activity_destination,.atc_city").val(ui.item.label);
            $("#activities_city_id").val(ui.item.val);
        },
        minLength: 2
    });

    ///packages

    $(".autocomplete_package_city").autocomplete({
        autoFocus: true,
        source: function (request, response) {

            if (PackagesCitiesUrl == "[object HTMLInputElement]" || PackagesCitiesUrl == undefined || PackagesCitiesUrl == null) {
                PackagesCitiesUrl = $("#PackagesCitiesUrl").val();
            }

            $(".autocomplete_package_city").addClass("ui-autocomplete-loading1");

            var searchtxt = request.term;

            $.ajax({
                url: PackagesCitiesUrl,
                data: "{ 'cname': '" + searchtxt.split("'")[0] + "' }",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { $(".autocomplete_package_city").removeClass("ui-autocomplete-loading1"); return data; },
                success: function (data) {

                    response($.map(data, function (item) {
                        return {
                            label: item.cname,
                            val: item.cid
                        }
                    }));
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //  alert(textStatus);
                }
            });
        },
        select: function (event, ui) {
            $(".autocomplete_package_city,.atc_package_city").val(ui.item.label);
            $("#package_city_id").val(ui.item.val);
            //$(".processing").show();
            // START added by thanh on 2015/12/07
            var CityID = {
                cityID: $("#package_city_id").val()
            };
            appendNumberOfNight(CityID);
            // END added by thanh on 2015/12/07
        },
        minLength: 2
    });


    //$('.departure_date,.return_date').blur(function () {
    //    if (new Date($(".departure_date").val()) == "Invalid Date" || new Date($(".return_date").val()) == "Invalid Date") {
    //        //if (new Date($(".departure_date").val()) == "Invalid Date")
    //        //    $(".departure_date").addClass('missingfield');
    //        //if (new Date($(".departure_date").val()) == "Invalid Date")
    //        //    $(".return_date").addClass('missingfield');

    //    } else if (new Date($(".departure_date").val()) >= new Date($(".return_date").val())) {
    //        $(".departure_date").addClass('missingfield');
    //        $(".return_date").addClass('missingfield');
    //    } else {
    //        $(".departure_date").removeClass('missingfield');
    //        $(".return_date").removeClass('missingfield');
    //    }
    //    if (($(".departure_date").val() != null && $(".departure_date").val() != "" && $(".departure_date").val() != undefined) && ($(".return_date").val() != null && $(".return_date").val() != "" && $(".return_date").val() != undefined)) {
    //        datevalidate($(".departure_date").val(), $(".return_date").val(), "departure_date", "return_date");
    //    }
    //});

    $(".departure_date").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +7,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
            
            // START Edited by thanh on 2015/12/04
            /*var statusvalid = false;
            //var beforeCheckout = "";
            if ($(".return_date").val() != null && $(".return_date").val() != "" && $(".return_date").val() != undefined) {

                changeToDateCheck($('.departure_date').val(), $(".return_date").val(), "departure_date", "return_date", 30);

                statusvalid = datevalidate($(".departure_date").val(), $(".return_date").val(), "departure_date", "return_date");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".return_date").val();
                }
            }

            
            var check_in2 = $('.departure_date').datepicker('getDate');
            check_in2.setDate(check_in2.getDate() + 1);
            $('.return_date').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.departure_date').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.return_date').datepicker('option', 'maxDate', check_out2);
            END Deleted by thanh on 2015/12/04

            if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".return_date").val(), "departure_date", "return_date");
                showDatepicker("return_date");
            } */ 
            if ($(".departure_date").hasClass("input-validation-error")) {
                $(".departure_date").blur();
            }
            // END Edited by thanh on 2015/12/04
        }
    });
    /* $(".return_date").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +8,
        maxDate: "+330D",
        onSelect: function (selected) {

            //var check_in2 = $('.return_date').datepicker('getDate');
            //check_in2.setDate(check_in2.getDate() - 1);
            //$('.departure_date').datepicker('option', 'maxDate', check_in2);

            if ($(".return_date").hasClass("input-validation-error")) {
                $(".return_date").blur();
            }

            if ($(".departure_date").val() != null && $(".departure_date").val() != "" && $(".departure_date").val() != undefined) {
                datevalidate($(".departure_date").val(), $(".return_date").val(), "departure_date", "return_date");
            }

        }
    }); */ // deleted by thanh on 2015/12/04


    $(".departure_date").keyup(function () {
        
        if (new Date($(".departure_date").val()) != "Invalid Date") {

            // START delete by thanh on 2015/12/04
            /*var statusvalid = false;
            var beforeCheckout = "";
            /* if ($(".return_date").val() != null && $(".return_date").val() != "" && $(".return_date").val() != undefined) {
                statusvalid = datevalidate($(".departure_date").val(), $(".return_date").val(), "departure_date", "return_date");
                if (statusvalid == true || statusvalid == "true") {
                    beforeCheckout = $(".return_date").val();
                }
            }

            var check_in2 = $('.departure_date').datepicker('getDate');
            check_in2.setDate(check_in2.getDate() + 1);
            $('.return_date').datepicker('option', 'minDate', check_in2);
            var check_out2 = $('.departure_date').datepicker('getDate');
            check_out2.setDate(check_out2.getDate() + 30);
            $('.return_date').datepicker('option', 'maxDate', check_out2); */
            // END deleted by thanh on 2015/12/04

            var dateEntered = $(this).val();

            var year = dateEntered.substring(0, 4);
            var month = dateEntered.substring(5, 7);
            var date = dateEntered.substring(8, 10);

            var dateToCompare = new Date(year, month - 1, date);
            var currentDate = new Date();

            if (dateToCompare <= currentDate) {
                
                $(this).addClass('missingfield');
            } else {
                $(".departure_date").removeClass('missingfield');
                // $(".return_date").removeClass('missingfield'); // Deleted by thanh on 2015/12/04
            }

            /* if (statusvalid == true || statusvalid == "true") {
                datevalidate(beforeCheckout, $(".return_date").val(), "departure_date", "return_date");
                showDatepicker("return_date");
            } */ // Deleted by thanh on 2015/12/04
        }
        else if ($("#departure_date").val().length == 0)
        { $(this).removeClass('missingfield');}
        else {
            $(this).addClass('missingfield');
        }
    });

    /* $(".return_date").keyup(function () {

        var dateEntered = $(this).val();
        
        var year = dateEntered.substring(0, 4);
        var month = dateEntered.substring(5, 7);
        var date = dateEntered.substring(8, 10);

        var checkindate = $(".departure_date").val();

        var checkindateyear = checkindate.substring(0, 4);
        var checkindatemonth = checkindate.substring(5, 7);
        var checkindatedate = checkindate.substring(8, 10);

        var checkoutday = new Date(year, month - 1, date);
        var checkinday = new Date(checkindateyear, checkindatemonth - 1, checkindatedate);
       
        if (checkoutday <= checkinday && dateEntered.length!=0) {
            
            $(this).addClass('missingfield');
        }
        else if (dateEntered.length <= 10 && dateEntered.length>0)
        {
            
            $(this).addClass('missingfield');
        }
        else if (dateEntered.length == 0)
        {
            
            $(this).removeClass('missingfield');
        }
        else {
            
            $(".departure_date").removeClass('missingfield');
            $(".return_date").removeClass('missingfield');
        }

        
    }); */ // Deleted by thanh on 2015/12/04

    // START delete by thanh on 2015/12/09
    /*
    $('#packagessearchbox').click(function () {
        var $t = true;

        $(".errormsg").html("");

        //if ($('#Nationality').val() == null || $('#Nationality').val() == "" || $('.autocomplete_package_city').val() == "" || $('.atc_package_city').val() == "" || $('.departure_date').val() == "" || $('.return_date').val() == 0 || $('.Packages_currency_type').val() == "0" || $('.package_rooms').val() == "0") {
        if ($('#Nationality').val() == null || $('#Nationality').val() == "" || $('.autocomplete_package_city').val() == "" || $('.atc_package_city').val() == "" || $('.Packages_currency_type').val() == "0") {

            if ($('.autocomplete_package_city').val() == "" || $('.atc_package_city').val() == "") {
                $('.autocomplete_package_city').addClass('missingfield');
            }
            if ($('#Nationality').val() == null || $('#Nationality').val() == "") {
                $('#Nationality').addClass('missingfield');
                $('#Nationality').parent().find(".ffSelect").addClass('missingfield');
            }
            //if ($('.departure_date').val() == "") {
            //    $('.departure_date').addClass('missingfield');
            //}
            //if ($('.return_date').val() == 0) {
            //    $('.return_date').addClass('missingfield');
            //}
            if ($('.Packages_currency_type').val() == "0") {
                $('.Packages_currency_type').addClass('missingfield');
                $('.Packages_currency_type').parent().find(".ffSelect").addClass('missingfield');
            }
            //if ($('.package_rooms').val() == "0") {
            //    $('.package_rooms').addClass('missingfield');
            //    $('.package_rooms').parent().find(".ffSelect").addClass('missingfield');
            //}
            $t = false;
        }
        if ($('.autocomplete_package_city').val() != $('.atc_package_city').val()) {
            $('.autocomplete_package_city').addClass('missingfield');
            $t = false;
        }
        if ($('.departure_date').hasClass('missingfield') || $('.return_date').hasClass('missingfield') || $('.departure_date').hasClass('input-validation-error') || $('.return_date').hasClass('input-validation-error')) {
            $t = false;
        }

        //if (new Date($(".departure_date").val()) == "Invalid Date" || new Date($(".return_date").val()) == "Invalid Date") {
        //    if (new Date($(".departure_date").val()) == "Invalid Date")
        //        $(".departure_date").addClass('missingfield');
        //    if (new Date($(".departure_date").val()) == "Invalid Date")
        //        $(".return_date").addClass('missingfield');

        //    $t = false;
        //} else if ((new Date($(".departure_date").val()) >= new Date($(".return_date").val()))) {
        //    $(".departure_date").addClass('missingfield');
        //    $(".return_date").addClass('missingfield');
        //    $t = false;
        //} else {
        //    $(".departure_date").removeClass('missingfield');
        //    $(".return_date").removeClass('missingfield');

        //}


        var cin = new Date($('.departure_date').val());
        var cout = new Date($('.return_date').val());
        var cdate = new Date();
        if (new Date($(".departure_date").val()) != "Invalid Date" && new Date($(".return_date").val()) != "Invalid Date") {
            cdate.setDate(cdate.getDate() + 6);

            if (cin < cdate) {
                $('.departure_date').addClass('missingfield');
                $t = false;
            } else if (cout < cdate) {
                $('.return_date').addClass('missingfield');
                $t = false;
            } else if (cin > cout) {
                $t = false;
            }
        }

        if (new Date($(".departure_date").val()) == "Invalid Date" || new Date($(".return_date").val()) == "Invalid Date" || $('.package_rooms').val() == "0") {
            $("#OpenSearch").val("true");
        } else {
            $("#OpenSearch").val("false");
        }

        var adultCnt = 0;
        var childCnt = 0;
        var roomFormat = '';

        for (var val = 1; val <= $(".package_rooms").val() ; val++) {
            adultCnt += parseInt($(".package_adult_room_" + val).val());
            childCnt += parseInt($(".package_child_room_" + val).val());
            var room = '';
            if (roomFormat == '')
                room = 'room' + val + "=" + $(".package_adult_room_" + val).val() + ",0";
            else
                room = '&room' + val + "=" + $(".package_adult_room_" + val).val() + ",0";

            for (var child = 1; child <= $(".package_child_room_" + val).val() ; child++) {
                room += "," + $(".PackageRoomBolg .child_" + val + "_" + child).val() + "-" + $(".PackageRoomBolg .childbed_" + val + "_" + child).val();
            }
            roomFormat += room;
        }

        $("#packageroomFormat").val(roomFormat);
        $("#packageadultCount").val(adultCnt);
        $("#packagechildCount").val(childCnt);


        if ($t == true) {
            $("#sectionprocessing").show();
            var url = window.location.href;

            if (url.toLowerCase().indexOf("/packagedetails") > 0) {

                var noofnight = daydiff(parseDate($('.departure_date').val()), parseDate($('.return_date').val()));

                $("#NoOfNights").val(noofnight);
                $("#NoOfDays").val(parseInt(noofnight) + 1);

                var searchObject = $('#search-form-packages_1 :input').serializeObject();

                $.ajax({
                    url: $("#PackagesSearchList").val(),
                    cache: false,
                    type: "GET",
                    data: searchObject,
                    success: function (response) {
                        $("#sectionprocessing").hide();
                        if (response == true) {

                            $("#search-form-packages_1").submit();
                        } else {
                            alert("Prices are not available for this package.");
                            //$(".errormsg").html("No Packages available for this search criteria.");
                        }
                        return response;
                    },
                    error: function (xhr) {
                        $("#sectionprocessing").hide();
                        return false;
                        //$(".processing").hide();
                    }
                });

            } else {
                $("#sectionprocessing").hide();
                $("#search-form-packages_1").submit();
                return $t;
            }
        } else {
            $("#sectionprocessing").hide();
            return $t;
        }
        return false;
    });
    */
    // END delete by thanh on 2015/12/09
    $('#packagessearchbox').click(function () {
        //debugger
        var $t = true;

        $(".errormsg").html("");
        
        if ($('#Nationality').val() == null || $('#Nationality').val() == "" || $('.autocomplete_package_city').val() == "" || $('.atc_package_city').val() == "" || $('.Packages_currency_type').val() == "0") {

            if ($('.autocomplete_package_city').val() == "" || $('.atc_package_city').val() == "") {
                $('.autocomplete_package_city').addClass('missingfield');
            }
            if ($('#Nationality').val() == null || $('#Nationality').val() == "") {
                $('#Nationality').addClass('missingfield');
                $('#Nationality').parent().find(".ffSelect").addClass('missingfield');
            }

            if ($('.Packages_currency_type').val() == "0") {
                $('.Packages_currency_type').addClass('missingfield');
                $('.Packages_currency_type').parent().find(".ffSelect").addClass('missingfield');
            }
            $t = false;
        }
        if ($('.autocomplete_package_city').val() != $('.atc_package_city').val()) {
            $('.autocomplete_package_city').addClass('missingfield');
            $t = false;
        }
        if ($('.departure_date').hasClass('missingfield') || $('.departure_date').hasClass('input-validation-error')) {
            $('.departure_date').addClass('missingfield');
            $t = false;
        }

        var cin = new Date($('.departure_date').val());
        var cdate = new Date();
        if (cin != "Invalid Date") { 
            cdate.setDate(cdate.getDate() + 6);
            if (cin < cdate) {
                $('.departure_date').addClass('missingfield');
                $t = false;
            }
        } 

        if (cin == "Invalid Date" || $('.package_rooms').val() == "0") {
            $("#OpenSearch").val("true");
        } else {
            $("#OpenSearch").val("false");
        }

        if ($('.departure_date').val() != "") {
            if ($('#NumberOfNights').val() == "0" || $('#NumberOfNights').val() == null) {
                    $('#NumberOfNights').parent().find(".ffSelect").addClass('missingfield');
                    $t = false;
            }
            if ($('.package_rooms').val() == "0") {
                $('.package_rooms').parent().find(".ffSelect").addClass('missingfield');
                $t = false;
            }
        }

        var adultCnt = 0;
        var childCnt = 0;
        var roomFormat = '';

        for (var val = 1; val <= $(".package_rooms").val() ; val++) {
            adultCnt += parseInt($(".package_adult_room_" + val).val());
            childCnt += parseInt($(".package_child_room_" + val).val());
            var room = '';
            if (roomFormat == '')
                //room = 'room' + val + "=" + $(".package_adult_room_" + val).val() + ",0"; // Deleted by thanh on 2015/12/28
                room = 'room' + val + "=" + $(".package_adult_room_" + val).val();
            else
                //room = '&room' + val + "=" + $(".package_adult_room_" + val).val() + ",0"; // Deleted by thanh on 2015/12/28
                room = '&room' + val + "=" + $(".package_adult_room_" + val).val();

            for (var child = 1; child <= $(".package_child_room_" + val).val() ; child++) {
                if (child == 1) {
                    room += ",0"; // Added by thanh on 2015/12/28
                }
                room += "," + $(".PackageRoomBolg .child_" + val + "_" + child).val() + "-" + $(".PackageRoomBolg .childbed_" + val + "_" + child).val();
            }
            roomFormat += room;
        }

        $("#packageroomFormat").val(roomFormat);
        $("#packageadultCount").val(adultCnt);
        $("#packagechildCount").val(childCnt);
        

        if ($t == true) {
            $("#sectionprocessing").show();
            var url = window.location.href;
            var duration = $('#NumberOfNights :selected').text().split(";");
            var days = 0; var nights = 0;
            if (duration.length == 1) {
                days = parseInt(duration[0]) + 1;
                nights = parseInt(duration[0])
            }
            else {
                nights = parseInt(duration[1]);
                days = parseInt(duration[0]) == 0 ? nights + 1 : parseInt(duration[0]);
            }

            $('#NumberOfNight').val(nights);
            $('#NumberOfDay').val(days);
            $("#noofdaysnights").val(days);//added by suresh

           // var noofnight = $('#NumberOfNights option:selected').text();
           // //var noofnight = $('#NumberOfNights').val();
           //// alert("no os nights :" + noofnight);
           // $('#NumberOfNight').val(noofnight);
           // $("#return_date").val(convertDate($('#departure_date').val(), noofnight));
           // if ($("#return_date").val() == "NaN-NaN-NaN") {
           //     $("#return_date").val("");
           // }

            $("#sectionprocessing").hide();
            $("#search-form-packages_1").submit();
            return $t;
            
        } else {
            $("#sectionprocessing").hide();
            return $t;
        }
        return false;
    });
    // START edited by thanh on 2015/12/04
    $('#Nationality').parent().click(function () {
        $('#Nationality').removeClass('missingfield');
        $('#Nationality').parent().find(".ffSelect").removeClass('missingfield');
        $('.package-act-dest-c').fadeOut();
    });
    $('.autocomplete_package_city').click(function () {
        $('.autocomplete_package_city').removeClass('missingfield');
    });
    $('.departure_date').click(function () {
        $('.departure_date').removeClass('missingfield');
    });
    
    /* $('.return_date').click(function () {
        $('.return_date').removeClass('missingfield');
    }); */
    // END edited by thanh on 2015/12/04
    $('.Packages_currency_type').click(function () {
        $('.Packages_currency_type').removeClass('missingfield');
        $('.Packages_currency_type').parent().find(".ffSelect").removeClass('missingfield');
    });
    $('.package_rooms').click(function () {
        $('.package_rooms').removeClass('missingfield');
        $('.package_rooms').parent().find(".ffSelect").removeClass('missingfield');
    });

    $(document).on("click", ".destination-cities-inner_pachages ul li.sel", function (event) {
        var $city = $(this).data("city");
        var $country = $(this).data("country");
        var $cityid = $(this).data("cityid");
        var $desti = $city + ", " + $country;
        $p.css({ 'display': 'none' });
        $(".autocomplete_package_city").val($desti);
        $('.atc_package_city').val($desti)

        $("#package_city_id").val($cityid);
        $("#activities_city_id").val($cityid);
        // START added by thanh on 2015/12/09
        var CityID = {
            cityID: $("#package_city_id").val()
        };
        appendNumberOfNight(CityID);
        // END added by thanh on 2015/12/09
    });
    $(document).on("click", ".destination-cities-inner_pachages ul li#sel_p", function (event) {
        var $city = $(this).data("city");
        var $country = $(this).data("country");
        var $cityid = $(this).data("cityid");
        var $desti = $city + ", " + $country;
        $p.css({ 'display': 'none' });
        $(".autocomplete_package_city").val($desti);
        $('.atc_package_city').val($desti);

        $("#activities_city_id").val($cityid);
    });


    $("div[class*='adultBlogPackageRoom_']").hide();
    $("div[class*='childBlogPackageRoom_']").hide();
    $("div[class*='PackageRoomChildBolg_']").css('visibility', 'hidden');
    // START added by thanh on 2015/12/09
    $("div[class*='adultBlogPackageRoom_" + 1 + "']").show();
    $("div[class*='childBlogPackageRoom_" + 1 + "']").show();
    $("div[class*='PackageRoomChildBolg_" + 1 + "']").show();
    packageRoomChildChange("package_child_room_" + 1);
    packageRoomAdultChange("package_adult_room_" + 1);
    $(".package_child_room_" + 1).val(0);
    // END added by thanh on 2015/12/09
    $(".package_rooms").val("1").change()
   
    
    $(document).on("change keyup", ".package_rooms", function (e) {

        $("#search-form-packages_1 li[class^='adultBlogPackageRoom_']").each(function () {
            $(this).hide().parent().removeClass("package-ch-sec");
        })
        $("div[class*='adultBlogPackageRoom_']").hide();
        $("div[class*='childBlogPackageRoom_']").hide();
        $("div[class*='PackageRoomChildBolg_']").css('visibility', 'hidden');
        $(".PackageRoomBolg").show();
        for (var val1 = 1; val1 <= $(".package_rooms").val() ; val1++) {
            $("#search-form-packages_1 li[class^='adultBlogPackageRoom_" + val1 + "']").show().parent().addClass("package-ch-sec");
            $("div[class*='adultBlogPackageRoom_" + val1 + "']").show();
            $("div[class*='childBlogPackageRoom_" + val1 + "']").show();
            //$("div[class*='PackageRoomChildBolg_" + val1 + "']").show();
            packageRoomChildChange("package_child_room_" + val1);
        }

        for (var val = (parseInt($(".package_rooms").val()) + 1) ; val <= 6 ; val++) {

            $(".package_adult_room_" + val).val(2); // edited by thanh on 2015/12/09
            $(".package_child_room_" + val).val(0);

            $(".PackageRoomBolg .child_" + val + "_1").val(2);
            $(".PackageRoomBolg .childbed_" + val + "_1").val(0);
            $(".PackageRoomBolg .child_" + val + "_2").val(2);
            $(".PackageRoomBolg .childbed_" + val + "_2").val(0);
            $(".PackageRoomBolg .child_" + val + "_3").val(2);
            $(".PackageRoomBolg .childbed_" + val + "_3").val(0);


            $(".package_adult_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2'); // edited by thanh on 2015/12/09
            $(".package_child_room_" + val).parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>0');

            $(".PackageRoomBolg .child_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
            $(".PackageRoomBolg .childbed_" + val + "_1").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
            $(".PackageRoomBolg .child_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
            $(".PackageRoomBolg .childbed_" + val + "_2").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');
            $(".PackageRoomBolg .child_" + val + "_3").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>2');
            $(".PackageRoomBolg .childbed_" + val + "_3").parent().find(".ffSelectButton span").html('<i class="" style="float: left;"></i>Without Bed');

            packageRoomAdultChange("package_adult_room_" + val);
        }

    });



    //$(document).on("change keyup", ".package_rooms", function (e) {
    //    $(".adults").hide();
    //    $(".childs").hide();
    //    $(".package_childage").hide();
    //    for (var val1 = 1; val1 <= $(".package_rooms").val() ; val1++) {
    //        $(".package_adults_room_" + val1).show();
    //        $(".package_childs_room_" + val1).show();

    //        $(".package_child_room_" + val1).change();
    //    }

    //    for (var val = (parseInt($(".package_rooms").val()) + 1) ; val <= 6 ; val++) {

    //        $(".package_adult_room_" + val).val(1);
    //        $(".package_child_room_" + val).val(0);

    //        $(".package_childage .child_" + val + "_1").val(2);
    //        $(".package_childage .childbed_" + val + "_1").val(0);
    //        $(".package_childage .child_" + val + "_2").val(2);
    //        $(".package_childage .childbed_" + val + "_2").val(0);

    //        $(".package_childage .child_" + val + "_3").val(2);
    //        $(".package_childage .childbed_" + val + "_3").val(0);

    //        $(".package_adult_room_" + val).change();
    //    }

    //});


    //$(document).on("change keyup", "select[class*='package_adult_room_']", function (e) {

    //    var noselect = $(this).attr("class").replace("package_adult_room_", "").replace(" valid", "");
    //    var noOpt = 4 - parseInt($(this).val());

    //    var i = 0;
    //    $("select[class*='package_child_room_" + noselect + "'] option").each(function () {

    //        if (i <= noOpt) {
    //            $(this).show();
    //            $(this).css('visibility', 'visible');
    //            $(this).showOption();
    //        } else {
    //            $(this).hide();
    //            $(this).css('visibility', 'hidden');
    //            $(this).hideOption();
    //        }
    //        i++;

    //    });

    //    $(".adult_info .package_childs_age_" + noselect + "_1").hide();
    //    $(".Children_info .package_childs_age_" + noselect + "_2").hide();
    //    $(".Children_info .package_childs_age_" + noselect + "_3").hide();

    //    $("select[class*='package_child_room_" + noselect + "']").val(0);

    //    $(".package_childage .child_" + noselect + "_1").val(2);
    //    $(".package_childage .childbed_" + noselect + "_1").val(0);
    //    $(".package_childage .child_" + noselect + "_2").val(2);
    //    $(".package_childage .childbed_" + noselect + "_2").val(0);
    //    $(".package_childage .child_" + noselect + "_3").val(2);
    //    $(".package_childage .childbed_" + noselect + "_3").val(0);


    //});

    //$(document).on("change keyup", "select[class*='package_child_room_']", function (e) {

    //    var noselect = $(this).attr("class").replace("package_child_room_", "").replace(" valid", "");
    //    var noChds = 4 - parseInt($("select[class*='package_adult_room_" + noselect + "']").val());
    //    var noChdBeds = 3 - parseInt($("select[class*='package_adult_room_" + noselect + "']").val());

    //    var nodrp = $(this).parent("span").attr("class").replace("package_childs_room_", "").replace("childs ", "");

    //    if ($("select[class*='package_child_room_" + noselect + "']").val() != 0) {

    //        for (var i = 1; i <= noselect; i++) {
    //            $(".package_childs_age_" + nodrp + "_" + i).css('visibility', '');
    //        }


    //        $(".package_childage .child_" + nodrp + "_1").val(2);
    //        $(".package_childage .childbed_" + nodrp + "_1").val(0);
    //        $(".package_childage .child_" + nodrp + "_2").val(2);
    //        $(".package_childage .childbed_" + nodrp + "_2").val(0);
    //        $(".package_childage .child_" + nodrp + "_3").val(2);
    //        $(".package_childage .childbed_" + nodrp + "_3").val(0);

    //        var i = 1;
    //        $("#search-form-packages_1 select[class*='childbed_" + noselect + "'] option[value='1']").each(function () {
    //            if (i <= noChdBeds) {
    //                $(this).show();
    //                $(this).css('visibility', 'visible');
    //                $(this).showOption();
    //            } else {
    //                $(this).hide();
    //                $(this).css('visibility', 'hidden');
    //                $(this).hideOption();
    //            }
    //            i++;

    //        });
    //    }
    //});

    //$(document).on("change keyup", "span[class*='package_childs_room_']", function (e) {

    //    var hcrno = $(this).attr("class").replace("childs package_childs_room_", "");

    //    if ($(".package_child_room_" + hcrno).val() == 1) {
    //        $(".package_childs_age_" + hcrno + "_1").show();
    //        $(".package_childs_age_" + hcrno + "_1").css('visibility', 'visible');
    //        $(".package_childs_age_" + hcrno + "_2").show();
    //        $(".package_childs_age_" + hcrno + "_2").css('visibility', 'hidden');
    //        $(".package_childs_age_" + hcrno + "_3").show();
    //        $(".package_childs_age_" + hcrno + "_3").css('visibility', 'hidden');
    //    }
    //    else if ($(".package_child_room_" + hcrno).val() == 2) {
    //        $(".package_childs_age_" + hcrno + "_1").show();
    //        $(".package_childs_age_" + hcrno + "_1").css('visibility', 'visible');
    //        $(".package_childs_age_" + hcrno + "_2").show();
    //        $(".package_childs_age_" + hcrno + "_2").css('visibility', 'visible');
    //        $(".package_childs_age_" + hcrno + "_3").show();
    //        $(".package_childs_age_" + hcrno + "_3").css('visibility', 'hidden');
    //    }
    //    else if ($(".package_child_room_" + hcrno).val() == 3) {
    //        $(".package_childs_age_" + hcrno + "_1").show();
    //        $(".package_childs_age_" + hcrno + "_1").css('visibility', 'visible');
    //        $(".package_childs_age_" + hcrno + "_2").show();
    //        $(".package_childs_age_" + hcrno + "_2").css('visibility', 'visible');
    //        $(".package_childs_age_" + hcrno + "_3").show();
    //        $(".package_childs_age_" + hcrno + "_3").css('visibility', 'visible');

    //        for (var i = 0; i < hcrno; i++) {
    //            $(".emptyspace:eq(" + i + ")").attr('style', 'display:table !important;visibility:hidden;');
    //        }

    //    }
    //    else {
    //        $(".package_childs_age_" + hcrno + "_1").hide();
    //        $(".package_childs_age_" + hcrno + "_1").css('visibility', 'hidden');
    //        $(".package_childs_age_" + hcrno + "_2").hide();
    //        $(".package_childs_age_" + hcrno + "_2").css('visibility', 'hidden');
    //        $(".package_childs_age_" + hcrno + "_3").hide();
    //        $(".package_childs_age_" + hcrno + "_3").css('visibility', 'hidden');
    //    }

    //});


    //number restriction
    $(document).on("keypress", "#adult,#children", function (event) {

        var keyCode = (typeof event.which == "number") ? event.which : event.keyCode

        if (keyCode == 8 || keyCode == 13 || keyCode == 0) return true;

        if (keyCode < 46 || keyCode > 57) {
            event.preventDefault();
        }
        else if (keyCode == 47) {
            event.preventDefault();
        }

        var tboxVal = $(this).val();
        if (tboxVal != null && tboxVal != undefined && tboxVal != "") {
            event.preventDefault();
        }
    });
    //$(".emptyspace").attr('style','display:none !important');
});
