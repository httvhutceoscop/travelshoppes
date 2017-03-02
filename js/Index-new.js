//jQuery.noConflict();

function fancyChange(id) {
    if (id == "sltSearchFlightAdult") {
        var chd = 9 - parseInt($("#sltSearchFlightAdult").val());


        if ((parseInt($("#sltSearchFlightAdult").val()) * 2) < parseInt(chd)) {
            chd = parseInt($("#sltSearchFlightAdult").val()) * 2;
        }

        var listOptions = [["Child", "0"]];

        for (var i = 0; i <= chd; i++) {

            var child = [i, i]
            listOptions.push(child);
        }

        $("#sltSearchFlightChild").setOptions(listOptions);

        var chd = 9 - parseInt($("#sltSearchFlightAdult").val());

        if ((parseInt($("#sltSearchFlightAdult").val())) < parseInt(chd)) {
            chd = parseInt($("#sltSearchFlightAdult").val());
        }

        var listInfants = [["Infant", "0"]];
        for (var i = 0; i <= chd; i++) {

            var Infant = [i, i]
            listInfants.push(Infant);
        }

        $("#sltSearchFlightInfant").setOptions(listInfants);

        return true;
    }


    if (id == "sltSearchFlightChild") {

        var chd = 9 - parseInt($("#sltSearchFlightAdult").val()) - parseInt($("#sltSearchFlightChild").val());


        if ((parseInt($("#sltSearchFlightAdult").val())) < parseInt(chd)) {
            chd = parseInt($("#sltSearchFlightAdult").val());
        }


        var listInfants = [["Infant", "0"]];

        for (var i = 0; i <= chd; i++) {

            var Infant = [i, i]
            listInfants.push(Infant);
        }

        $("#sltSearchFlightInfant").setOptions(listInfants);

        return true;
    }
}

jQuery(document).ready(function ($) {

    $(".demoWrapper img[id^='btnsearch']").hover(function () {
        $(this).css("cursor", "pointer");
    });
    $(document).on("click", ".ffRadioWrapper", function () {


        if ($(this).hasClass("on")) {
            var text = $(this).find("a").text();
            if (text.trim() == "One Way") {
                $("#dateReturn").hide();
                $("img[title='Return Date']").hide();
                $("#dateReturn").parents("li").addClass("flightHideLi");


                $("#sltSearchFlightAdult").parents("li").addClass("flightHideLiOnewayAdl");
                $("#sltSearchFlightChild").parents("li").addClass("flightHideLiOnewayChd");

            } else {
                $("#dateReturn").show();
                $("img[title='Return Date']").show();
                $("#dateReturn").parents("li").removeClass("flightHideLi");

                $("#sltSearchFlightAdult").parents("li").removeClass("flightHideLiOnewayAdl");
                $("#sltSearchFlightChild").parents("li").removeClass("flightHideLiOnewayChd");
            }

        }
        
        if ($(this).hasClass("on")) {
            if (text.trim() == "Multiple Cities") {
                window.location.href = MultiCitySearchUrl;
            }
        }
    });

    //$("#dateDepart").datepicker({
    //    showOn: 'both',
    //    buttonText: 'Depart Date',
    //    buttonImageOnly: true,
    //    buttonImage: calendarImageUrl,
    //    dateFormat: 'yy-mm-dd',
    //    minDate: +3,
    //    maxDate: "+330D",
    //    onSelect: function (selected) {
    //        if (!($(".OneWay").parent().hasClass("on"))) {
    //            var check_in2 = $('#dateDepart').datepicker('getDate');
    //            check_in2.setDate(check_in2.getDate() + 1);
    //            $('#dateReturn').datepicker('option', 'minDate', check_in2);
    //            var check_out2 = $('#dateDepart').datepicker('getDate');
    //            check_out2.setDate(check_out2.getDate() + 30);

    //            if ($("#dateDepart").hasClass("input-validation-error")) {
    //                $("#dateDepart").blur();
    //                $("#dateReturn").blur();
    //            }
    //        }
    //    }
    //});

    //$("#dateReturn").datepicker({
    //    showOn: 'both',
    //    buttonText: 'Return Date',
    //    buttonImageOnly: true,
    //    buttonImage: calendarImageUrl,
    //    dateFormat: 'yy-mm-dd',
    //    minDate: +3,
    //    maxDate: "+330D",
    //    onSelect: function (selected) {
    //        if ($("#dateReturn").hasClass("input-validation-error")) {
    //            $("#dateReturn").blur();
    //        }
    //    }
    //});




    $('.dateDepart').click(function () {
        $(this).removeClass('missingfield');
    });
    $('.dateReturn').click(function () {
        $(this).removeClass('missingfield');
    });
    $(".dateDepart").datepicker({
        showOn: 'both',
        buttonText: 'Depart Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +3,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
         
           
            if (!($(".OneWay").parent().hasClass("on"))) {
                var statusvalid = false;
                var beforeCheckout = "";
                $(".dateReturn").val($(".dateDepart").val());

                if ($(".dateReturn").val() != null && $(".dateReturn").val() != "" && $(".dateReturn").val() != undefined) {
                    statusvalid = datevalidate($(".dateDepart").val(), $(".dateReturn").val(), "dateDepart", "dateReturn");
                    if (statusvalid == true || statusvalid == "true") {
                        beforeCheckout = $(".dateReturn").val();
                        //alert(beforeCheckout+"check");
                    }
                }

                var check_in2 = $('.dateDepart').datepicker('getDate');
               
                check_in2.setDate(check_in2.getDate() + 1);
                $('.dateReturn').datepicker('option', 'minDate', check_in2);
                var check_out2 = $('.dateDepart').datepicker('getDate');
               
                check_out2.setDate(check_out2.getDate() + 30);
                $('.dateReturn').datepicker('option', 'maxDate', check_out2);

                if ($(".dateDepart").hasClass("input-validation-error")) {
                    $(".dateDepart").blur();
                }
                if (statusvalid == true || statusvalid == "true") {
                    datevalidate(beforeCheckout, $(".dateReturn").val(), "dateDepart", "dateReturn");
                    showDatepicker("dateReturn");
                }
            }
        }
    });


    $(".dateReturn").datepicker({
        showOn: 'both',
        buttonText: 'Return Date',
        buttonImageOnly: true,
        buttonImage: calendarImageUrl,
        dateFormat: "yy-mm-dd",
        minDate: +3,
        maxDate: "+330D",
        changeMonth: true, //added by thanh on 2015/12/04
        changeYear: true, //added by thanh on 2015/12/04
        onSelect: function (selected) {
           
            if ($(".dateReturn").hasClass("input-validation-error")) {
                $(".dateReturn").blur();
            }
            if ($(".dateDepart").val() != null && $(".dateDepart").val() != "" && $(".dateDepart").val() != undefined) {
                datevalidate($(".dateDepart").val(), $(".dateReturn").val(), "dateDepart", "dateReturn");
            }
        }
    });


    $(".dateDepart").keyup(function () {
       
        //alert("dateDepart keyup function");
        if (new Date($(".dateDepart").val()) != "Invalid Date") {
            if (!($(".OneWay").parent().hasClass("on"))) {
                var statusvalid = false;
                var beforeCheckout = "";
                if ($(".dateReturn").val() != null && $(".dateReturn").val() != "" && $(".dateReturn").val() != undefined) {
                    statusvalid = datevalidate($(".dateDepart").val(), $(".dateReturn").val(), "dateDepart", "dateReturn");
                    if (statusvalid == true || statusvalid == "true") {
                        beforeCheckout = $(".dateReturn").val();
                    }
                }

                var check_in2 = $('.dateDepart').datepicker('getDate');
                check_in2.setDate(check_in2.getDate() + 1);
                $('.dateReturn').datepicker('option', 'minDate', check_in2);
                var check_out2 = $('.dateDepart').datepicker('getDate');
                check_out2.setDate(check_out2.getDate() + 30);
                $('.dateReturn').datepicker('option', 'maxDate', check_out2);

                var dateEntered = $(this).val();
              
                var year = dateEntered.substring(0, 4);
                var month = dateEntered.substring(5, 7);
                var date = dateEntered.substring(8, 10);

                var dateToCompare = new Date(year, month - 1, date);
                var currentDate = new Date();

                if (dateToCompare <= currentDate) {
                    $(this).addClass('missingfield');
                } else {
                    $(".dateDepart").removeClass('missingfield');
                    $(".dateReturn").removeClass('missingfield');
                }

                if (statusvalid == true || statusvalid == "true") {
                    datevalidate(beforeCheckout, $(".dateReturn").val(), "dateDepart", "dateReturn");
                    showDatepicker("dateReturn");
                }
            }

        }
        else {
            $(this).addClass('missingfield');
        }
    });

    $(".dateReturn").keyup(function () {

        var dateEntered = $(this).val();

        var year = dateEntered.substring(0, 4);
        var month = dateEntered.substring(5, 7);
        var date = dateEntered.substring(8, 10);

        var checkindate = $(".dateDepart").val();

        var checkindateyear = checkindate.substring(0, 4);
        var checkindatemonth = checkindate.substring(5, 7);
        var checkindatedate = checkindate.substring(8, 10);

        var checkoutday = new Date(year, month - 1, date);
        var checkinday = new Date(checkindateyear, checkindatemonth - 1, checkindatedate);

        if (checkoutday <= checkinday) {
            $(this).addClass('missingfield');
        } else {
            $(".dateDepart").removeClass('missingfield');
            $(".dateReturn").removeClass('missingfield');
        }
        if ($(".dateReturn").val() != null && $(".dateReturn").val() != "" && $(".dateReturn").val() != undefined) {
            datevalidate($(".dateDepart").val(), $(".dateReturn").val(), "dateDepart", "dateReturn");
        }
    });


   


    $.widget("custom.fcatcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var self = this, currentCountry = "";
            $.each(items, function (index, item) {
                if (item.country.toLowerCase() != currentCountry.toLowerCase()) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.country + "</li>");

                    currentCountry = item.country.toLowerCase();
                }
                self._renderItem(ul, item);
            });
        }
    });

//Modified by SRIKANTH on 2016/05/24//
    $("#From").autocomplete({
    	autoFocus: true,
        source: function (request, response) {
        
            $("#From").addClass("ui-autocomplete-loading1");
            $.ajax({
                url: CitiesUrl,
                data: "{ 'cname': '" + request.term + "', 'count':0 }",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { return data; },
                success: function (data) {
                    $("#From").removeClass("ui-autocomplete-loading1");
                    response($.map(data, function (item) {
                        return {
                            value: item.CityName + " (" + item.AirportCode + "), " + item.CountryName,
                            label: item.CityName + " (" + item.AirportCode + "), " + item.CountryName,
                            country: item.CountryName
                        }
                    }))
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#From").removeClass("ui-autocomplete-loading1");
                }
            });
        },
       
        minLength: 0

    });
    var countryname = "";
    function findli($li) {

    	$li.each(function () {

            if ($li.hasClass("ui-autocomplete-category")) {
                countryname = $li.html();

            } else {
                $li = $(this).prev();
                $li = $(this).css({ cursor: "default" });
                findli($li);
            }
        });

    }
  
    $(document).on("click", "#ui-id-2 .ui-menu-item,#ui-id-5 .ui-menu-item", function () {
    	// 
        var $li = $(this).prev();
       
        if ($(this).hasClass("ui-autocomplete-category")) {
            //$li = $(this).css({ cursor: "default" });
            //e.preventDefault();
            return false;
        } else {
            findli($li);
            $(".ui-autocomplete").hide();
        }
        var cityArea = $(this).html() + ", " + countryname;
        $("#From").val($(this).html() + ", " + countryname);
        //Singapore
        //if (cityArea.toLowerCase().indexOf("singapore") > -1) {
        //    $("#sltSearchFlightClass").prev().find("span[data-val='PremiumBusiness']").hide().parent().removeClass("on selected");
        //    $("#sltSearchFlightClass").prev().find("span[data-val='PremiumFirst']").hide().parent().removeClass("on selected");

        //    $("#sltSearchFlightClass").prev().find("span[data-val='']").parent().addClass("on selected");
        //    $(".sltSearchFlightClassLi div div a.ffSelectButton span").html("<i class='' style='float: left;'></i> Service Class (All)");
        //} else {
        //    $("#sltSearchFlightClass").prev().find("span[data-val='PremiumBusiness']").show();
        //    $("#sltSearchFlightClass").prev().find("span[data-val='PremiumFirst']").show();

        //    $("#sltSearchFlightClass").prev().find("span[data-val='']").parent().addClass("on selected");
        //    $(".sltSearchFlightClassLi div div a.ffSelectButton span").html("<i class='' style='float: left;'></i> Service Class (All)");
        //}
    });


	//Modified by SRIKANTH on 2016/05/24//
    $("#To").autocomplete({
    	autoFocus: true,
        source: function (request, response) {
            $("#To").addClass("ui-autocomplete-loading1");
            $.ajax({
                url: CitiesUrl,
                data: "{ 'cname': '" + request.term + "', 'count':0 }",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { return data; },
                success: function (data) {
                    $("#To").removeClass("ui-autocomplete-loading1");
                    response($.map(data, function (item) {
                        return {
                            value: item.CityName + " (" + item.AirportCode + "), " + item.CountryName,
                            label: item.CityName + " (" + item.AirportCode + ")," + item.CountryName,
                            country: item.CountryName
                        }
                    }))
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#To").removeClass("ui-autocomplete-loading1");
                }
            });
        },
        minLength: 2
    });

    var countryname = "";
    function findli($li) {

        $li.each(function () {

            if ($li.hasClass("ui-autocomplete-category")) {

                countryname = $li.html();
            } else {
                $li = $(this).prev();
                findli($li);
            }
        });

    }

    $(document).on("click", "#ui-id-3 .ui-menu-item,#ui-id-6 .ui-menu-item", function () {
        // 
        var $li = $(this).prev();

        if ($(this).hasClass("ui-autocomplete-category")) {
            $li = $(this).css({ cursor: "default" });
            e.preventDefault();
            return false;
        } else {
            findli($li);
            $(".ui-autocomplete").hide();
        }


        $("#To").val($(this).html() + ", " + countryname);
    });


    $('.searchflights').click(function () {
       //  
        
        var $t = true;

        if (!($("#FlightsSearchBox_rdSearchFlightOneWay").prop("checked"))) {
          
            if ($('#dateReturn').val() == "" || $('#dateReturn').val() == "Return") {

                if ($('#dateReturn').val() == "" || $('#dateReturn').val() == "Return") {
                    $('#dateReturn').addClass('missingfield');
                }
                $t = false;
            }
            
            

            $('.date-rightcont-calander').addClass('missingfield');
            $('.date-leftcont-calander').addClass('missingfield');
            
        }
       
       
        
        
        if ($('.activity_from').val() == "" || $('.activity_from').val() != $('#From').val() || $(".activity_to").val() == "" || $('.activity_to').val() != $('#To').val() || $('#dateDepart').val() == "" || $('#dateDepart').val() == "Depart" || $('#sltSearchFlightAdult').val() == "") {

            if ($('.activity_from').val() == "" || $('.activity_from').val() != $('#From').val()) {
                $('.activity_from').addClass('missingfield');
            }

            if ($('.activity_to').val() == "" || $('.activity_to').val() != $('#To').val()) {
                $('.activity_to').addClass('missingfield');
            }


            if ($('#dateDepart').val() == "" || $('#dateDepart').val() == "Depart") {
                $('#dateDepart').addClass('missingfield');
                $('.date-leftcont-calander').addClass('missingfield');

            }

            if ($('#sltSearchFlightAdult').val() == "") {
                $("#sltSearchFlightAdult").parent().find('.ffSelect').addClass('missingfield');

            }
           
           
            
          

            //var a = $('input[class="roundway"]:checkded');  
            //alert(a);


            if ($("#ffRadioWrapper input:checked").val() == "0") {
                $('#dateReturn').removeClass('missingfield');
            }
            //if ($(".roundway").attr('checked', 'checked') == true) {
            //    alert('yes');
            //}
            //var a = $(".roundway").attr('checked', 'checked');
            //alert(JSON.stringify(a));
            //return false;


            //if ($(".date-from-ui").val() ==="") {
            //    $('.left-cont').addClass('missingfield');
            //    $('.right-cont').removeClass('missingfield');
            //    return false;
            //}
          
           
            $t = false;

        }
        if ($('.sltSearchFlightAdult').val() == 0) {
           
            $(".two-col-form-flights ul li").addClass('missingfield');
            return false;
        }

        var depart = $('#dateDepart').val();
      

        if ($t == true) {
            $('#sltSearchFlightClass').val() = "Service Class (All)"
            {
                $('#sltSearchFlightClass').val("All");

            }

        }
     
        return $t;

    });

    $('.activity_from, .activity_to, #dateDepart, #dateReturn').click(function () {
        $(this).removeClass('missingfield');
    });

    $(document).on("click", ".ffSelect", function () {
        $(this).removeClass('missingfield');
    });

});



















