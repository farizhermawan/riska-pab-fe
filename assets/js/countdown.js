// var target_date = new Date().getTime() + (1000*3600*48); // set the countdown date
// var days, hours, minutes, seconds; // variables for time units
//
// var countdown = document.getElementById("tiles"); // get tag element
//
// getCountdown();
//
// setInterval(function () { getCountdown(); }, 1000);
//
// function getCountdown(){
//
// 	// find the amount of "seconds" between now and target
// 	var current_date = new Date().getTime();
// 	var seconds_left = (target_date - current_date) / 1000;
//
// 	days = pad( parseInt(seconds_left / 86400) );
// 	seconds_left = seconds_left % 86400;
//
// 	hours = pad( parseInt(seconds_left / 3600) );
// 	seconds_left = seconds_left % 3600;
//
// 	minutes = pad( parseInt(seconds_left / 60) );
// 	seconds = pad( parseInt( seconds_left % 60 ) );
//
// 	// format countdown string + set tag value
// 	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>";
// }
//
// function pad(n) {
// 	return (n < 10 ? '0' : '') + n;
// }

$(function() {
  // taun, bulan 0-11, tanggal 0-30, jam 0-23, menit 0-59, second 0-59, milliseconds
  // jam 00 = 17
  var targetDate  = new Date(Date.UTC(2018, 07, 08, 0, 0));
  var now   = new Date();

  console.log('date skrg => ' + now);
  console.log('date countdown => ' + targetDate);

  window.days = daysBetween(now, targetDate);
  var secondsLeft = secondsDifference(now, targetDate);
  window.hours = Math.floor(secondsLeft / 60 / 60);
  secondsLeft = secondsLeft - (window.hours * 60 * 60);
  window.minutes = Math.floor(secondsLeft / 60 );
  secondsLeft = secondsLeft - (window.minutes * 60);
  console.log(secondsLeft);
  window.seconds = Math.floor(secondsLeft);

  if(targetDate > now) {
    startCountdown();
  } else {
    // untuk biar ga minus di default 00
    displayValue('#js-days', 00);
    displayValue('#js-hours', 00);
    displayValue('#js-minutes', 00);
    displayValue('#js-seconds', 00);
  }

});

var interval;

function daysBetween( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}

function secondsDifference( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms;
  var difference = difference_ms / one_day;
  var offset = difference - Math.floor(difference);

  return offset * (60*60*24);
}

function startCountdown() {
  $('#input-container').hide();
  $('#countdown-container').show();

  displayValue('#js-days', window.days);
  displayValue('#js-hours', window.hours);
  displayValue('#js-minutes', window.minutes);
  displayValue('#js-seconds', window.seconds);


  interval = setInterval(function() {
      if (window.seconds > 0) {
        window.seconds--;
        displayValue('#js-seconds', window.seconds);
      } else {
          // Seconds is zero - check the minutes
          if (window.minutes > 0) {
            window.minutes--;
            window.seconds = 59;
            updateValues('minutes');
          } else {
            // Minutes is zero, check the hours
            if (window.hours > 0)  {
              window.hours--;
              window.minutes = 59;
              window.seconds = 59;
              updateValues('hours');
            } else {
              // Hours is zero
              window.days--;
              window.hours = 23;
              window.minutes = 59;
              window.seconds = 59;
              updateValues('days');
            }
            // $('#js-countdown').addClass('remove');
            // $('#js-next-container').addClass('bigger');
          }
      }

      console.log('hari => '+ window.days);
      console.log('jam => '+ window.hours);
      console.log('menit => '+ window.minutes);
      console.log('detik => '+ window.seconds);

      if((window.days == 0 && window.hours == 0
        && window.minutes == 0 && window.seconds == 0)) {
        console.log('berenti ya');
        clearInterval(interval);
      }
  }, 1000);

}


function updateValues(context) {
  if (context === 'days') {
    displayValue('#js-days', window.days);
    displayValue('#js-hours', window.hours);
    displayValue('#js-minutes', window.minutes);
    displayValue('#js-seconds', window.seconds);
  } else if (context === 'hours') {
    displayValue('#js-hours', window.hours);
    displayValue('#js-minutes', window.minutes);
    displayValue('#js-seconds', window.seconds);
  } else if (context === 'minutes') {
    displayValue('#js-minutes', window.minutes);
    displayValue('#js-seconds', window.seconds);
  }
}

function displayValue(target, value) {
  var newDigit = $('<span></span>');
  $(newDigit).text(pad(value))
    .addClass('new');
  $(target).prepend(newDigit);
  $(target).find('.current').addClass('old').removeClass('current');
  setTimeout(function() {
    $(target).find('.old').remove();
    $(target).find('.new').addClass('current').removeClass('new');
  }, 900);
}

function pad(number) {
  return ("0" + number).slice(-2);
}
