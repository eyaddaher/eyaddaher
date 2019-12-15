
var count = 0;
var amount = '';


$("#output").append('<span>$</span>');

$(".digit").on('click', function() {
  num = ($(this).clone().children().remove().end().text());
  if (count < 11) {
    $("#output").append('<span>' + num.trim() + '</span>');
	amount = amount + num.trim();
    count++
  }
});

$('.fa-long-arrow-left').on('click', function() {
	
  if (count == 0){
	$('#output span:last-child');
	}else{
		
  $('#output span:last-child').remove();
	
  count--;
	}
});

$("#call").on('click', function() {
	
	countCurrency(amount);
	
	
});

function replacer(key, value) {
  // Filtering out properties
  if (value === null) {
    return nil;
  }
  return value;
}


function countCurrency(x){
	var notes = [1000, 500, 100];
	var noteCounter = [0, 0, 0];
	var result = new Array();
	
	
	var i;
	for (i=0; i<3; i++){
		if (amount >= notes[i]) { 
			noteCounter[i] = parseInt(amount / notes[i]);
			amount = amount - noteCounter[i] * notes[i]; 
		}
		
	}
	
		for (i = 0; i < 3; i++) { 
			if (noteCounter[i] != 0 ) { 
				result[i] = ('$ ' + notes[i] + " : " + noteCounter[i]);
			} 
		} 
	
	alert('successful! \nTake your cash\n' + JSON.stringify(result,replacer,'\n'));
	$.ajax({
    url: "https://us-central1-atm-backend-2cc1b.cloudfunctions.net/withdraw",
    type: "POST",
    data: JSON.stringify(result),
    contentType: "application/json"
	});
	document.getElementById('output').innerHTML = '<span>$</span>';
	count = 0;
	
	
}
