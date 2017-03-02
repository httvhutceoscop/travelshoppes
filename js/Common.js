//C# like String format using Javascript
//Author Subramanyam

var Applicationurl = $("#Applicationurl").val();

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}


function bindnationalityDetails(ccode, cname) {
    if (ccode.length <= 0) {
        ccode = "SG";
    }

    if (cname.length <= 0)
        cname = "Singapore";

    var natlCode = $("#modify-search-form #Nationality").val();
    if (natlCode != null && natlCode != "" && natlCode != " " && natlCode != undefined) {
        $("#modify-search-form #Nationality").val(natlCode);
    } else {
        $("#modify-search-form #Nationality").val(ccode);
    }

}
function bindnationality(ccode, cname) {
    
    if (ccode.length <= 0)
        ccode = "SG";


    if (cname.length <= 0)
        cname = "Singapore";
    
    $("#Nationality").val(ccode);

    var countryCode = ccode;//'@ViewBag.geoLocation_country_code';
    if (cname != null && cname != "") {
        $("#Nationality").parent().find(".ffSelectButton span").html(cname);
    }
    else { $("#Nationality").parent().find(".ffSelectButton span").html("Nationality"); }
    
$("#Nationality").parent().find(".ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
    $("#Nationality").parent().find(".ffSelectMenuMid ul li span[data-val='" + countryCode + "']").parent().addClass("on").addClass("selected");

}
function bindcurrency(ccode, applicationtype) {
    if (applicationtype == "B2C") {
        if (ccode == "SG") {
            $("#HotelDetailsForm #Currency, #SimilarListForm #Currency, #modify-search-form #Currency").val('SGD');

            $(".Packages_currency_type").val('SGD');
            // $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid >ul li").removeClass("selected on").first().addClass("on selected");
            $(".currency_type_hotel").val('SGD');
            $(".actcurrency_type").val('SGD');
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectButton span").html("SGD");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectButton span").html("SGD");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectButton span").html("SGD");
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");

        }
        else {
            $("#HotelDetailsForm #Currency, #SimilarListForm #Currency, #modify-search-form #Currency").val('USD');
            $(".Packages_currency_type").val('USD');
            $(".currency_type_hotel").val('USD');
            $(".actcurrency_type").val('USD');
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectButton span").html("USD");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectButton span").html("USD");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectButton span").html("USD");
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='USD']").parent().addClass("on").addClass("selected");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='USD']").parent().addClass("on").addClass("selected");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
            $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='USD']").parent().addClass("on").addClass("selected");

        }
    }
    else
    {
        $("#HotelDetailsForm #Currency, #SimilarListForm #Currency, #modify-search-form #Currency").val('SGD');
        $(".Packages_currency_type").val('SGD');
        $(".currency_type_hotel").val('SGD');
        $(".actcurrency_type").val('SGD');
        $(".Packages_currency_type").parent().find(".ffSelect .ffSelectButton span").html("SGD");
        $(".currency_type_hotel").parent().find(".ffSelect .ffSelectButton span").html("SGD");
        $(".actcurrency_type").parent().find(".ffSelect .ffSelectButton span").html("SGD");
        $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
        $(".Packages_currency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");
        $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
        $(".currency_type_hotel").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");
        $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li").removeClass("on").removeClass("selected");
        $(".actcurrency_type").parent().find(".ffSelect .ffSelectMenuMid ul li span[data-val='SGD']").parent().addClass("on").addClass("selected");
    }

}

//Getting Querystring values 
//author Subramanyam
function getQueryStringByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function imgError(image) {
    image.onerror = "";
    image.src = Applicationurl + "images/noimg.png";
    return true;
}


function sliderImgError(image) {
    
    image.onerror = "";
    image.src = Applicationurl + "images/noimg.png";
    return true;
}



function isDate(txtDate) {

    var currVal = txtDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for yyyy/mm/dd format.
    var dtDay = dtArray[5];
    var dtMonth = dtArray[3];
    var dtYear = dtArray[1];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }

    return true;
}

//added by Narsimha
function equalHeight(group) {
    
    tallest = 0;
    //var keys = Object.keys(group).length;
    //for (var k in keys)
    //{ alert(k);}
    group.each(function () {
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}


///converts List of input elements in Given container into Json Object
//Author: Subramanyam
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function () {
    $(".modify-date-span").click(function () {
        
        $(this).prev().focus().click();
    });

    $(document).on("cut copy paste", ".onlynumbers", function (e) {
      //  alert("Only numbers allowed.");
        e.preventDefault();
    });
    //below code for allow textbox's as numbers only
    $(document).on("keypress", ".onlynumbers", function (event) {
        // alert("HI");
       // if ($.browser.mozilla == true) {

            var keyCode = (typeof event.which == "number") ? event.which : event.keyCode
           // alert(keyCode);
            if (keyCode == 8 || keyCode == 46 || keyCode == 13) return true;

            if (keyCode < 46 || keyCode > 57) {
                event.preventDefault();
            } else if (keyCode == 47) {
                event.preventDefault();
            }
        //}
        //else {

        //    if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 13) return true;

        //    if (event.keyCode < 46 || event.keyCode > 57) {
        //        event.preventDefault();
        //    }
        //    else if (event.keyCode == 47) {
        //        event.preventDefault();
        //    }
        //}
    });
});

//Author:subramanyam
//Description:chekcing for given string is in json format or not
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


//second field date exceeding first date field max date then chabge second filed date and also shows the date filed. 
function changeToDateCheck(checkindate, checkoutdate, checkinClassname, checkoutClassName, noofDays) {


    var year = checkoutdate.substring(0, 4);
    var month = checkoutdate.substring(5, 7);
    var date = checkoutdate.substring(8, 10);

    var checkindateyear = checkindate.substring(0, 4);
    var checkindatemonth = checkindate.substring(5, 7);
    var checkindatedate = checkindate.substring(8, 10);

    var checkoutday = new Date(year, month - 1, date);
    var checkinday = new Date(checkindateyear, checkindatemonth - 1, (parseInt(checkindatedate) + parseInt(noofDays)));

    if (checkoutday >= checkinday) {

        var checkinoutday = new Date(checkindateyear, checkindatemonth - 1, parseInt(checkindatedate) + 2);
        $("." + checkoutClassName).val(checkinoutday.getFullYear() + '-' + (parseInt(checkinoutday.getMonth() + 1) <= 9 ? ("0" + (checkinoutday.getMonth() + 1)) : (checkinoutday.getMonth() + 1)) + '-' + (parseInt(checkinoutday.getDate()) <= 9 ? ("0" + (checkinoutday.getDate())) : (checkinoutday.getDate())));

        showDatepicker(checkoutClassName);
    }

}


function showDatepicker(className) {
    setTimeout(
  function () {
      $("." + className).datepicker("show");
  }, 200);
}