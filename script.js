
function generatorTitol(year,month){

  var titolo = $("h1.titolo");

  var mom = moment().year(year).month(month);
  var dayOfTheMonth = mom.daysInMonth(month);

  var textTitol = mom.format("MMMM YYYY");
  titolo.text(textTitol + ": 1 - " + dayOfTheMonth);
}

function genDate(year,month,day){

  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

  var data = mom.format("DD MMMM YY");
  return data;
}

function addListDate(year,month,day){

  var mom = moment();
  mom.year(year);
  mom.month(month);
  mom.date(day);

  var data = mom.format("YYYY-MM-DD");
  return data;
}

function genList (year,month){
  var mom = moment().year(year).month(month);
  var daysInMonth = mom.daysInMonth();
  var ul = $(".wrapper ul");

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);

  for (var day = 1; day <= daysInMonth ;day++) {

    var templDate = {
      listDate : addListDate(year,month,day),
      data: genDate(year,month,day)
    }

    var final = compiled(templDate);
    ul.append(final);
  }
}

function ajaxPrint(year,month){

  var outData = {
    year : year,
    month : month
  }

  $.ajax({

    url : "https://flynn.boolean.careers/exercises/api/holidays",
    data: outData,
    method : "GET",
    success: function(inData,state){

      if (inData.success == true) {

        var holidays = inData.response;
        addHolidays(holidays);
      }else {
        console.log("comunication error");
      }
    },
    error : function (request,state,error){
      console.log("request",request);
      console.log("state",state);
      console.log("error",error);
    }
  });
}

function addHolidays(holidays){

  for (var i = 0; i < holidays.length; i++) {

    var holiday = holidays[i];
    var holidayData = holiday.date;
    var holidayName = holiday.name;

    var selector = "li[data-date='"+ holidayData +"']";
    var selHoliday = $(selector);

    selHoliday.addClass("red");
    selHoliday.text(selHoliday.text()+ " - " + holidayName);
  }
}
function rightClick(year,month){

  month++;
  clear();
  generatorTitol(year,month);
  genList (year,month);
  ajaxPrint(year,month);

  return month;
}

function leftClick(year,month){

  month--;
  clear();
  generatorTitol(year,month);
  genList (year,month);
  ajaxPrint(year,month);

  return month;
}


function clear(){

  var h1 = $("h1");
  h1.text(" ");

  var li = $("li");
  li.remove();
}

function init(){

  var year = 2018;
  var month = 0;

  generatorTitol(year,month);
  genList (year,month);
  ajaxPrint(year,month);

  var right = $(".fa-hand-point-right");
  right.click(function(){

    if (month < 11) {

      month = rightClick(year,month);
    }
    else {
      month = rightClick(year,-1);
    }
  });
  var left = $(".fa-hand-point-left");
  left.click(function(){

    if (month > 0) {

      month = leftClick(year,month);
    }else {
      month = leftClick(year,12);    }
  });
}

$(document).ready(init);
