var express = require("express");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render("error", {
		message: err.message,
		error: {}
	});
});

app.get('/:dateString', function(req, res) {
	var urlDate = "";
	var isUnixDate = !/\D/.test(req.params.dateString);
	if(isUnixDate) {
		urlDate = Number(req.params.dateString);
	}else {
		urlDate = req.params.dateString;
	}
	var dateJSON = {
		natural: null,
		unix: null
	}

	var dateObj = new Date(urlDate);
	var isValidDate = dateObj.toString() !== "Invalid Date";
	if(isValidDate) {
		dateJSON.natural = constructFriendlyDate(dateObj);
		dateJSON.unix = getUTCString(dateObj);
	}

	res.send(dateJSON);
});

var getFriendlyMonth = function(monthNumber) {
	var friendlyMonth = "";

	switch(monthNumber) {
		case 0:
			friendlyMonth = "January";
			break;
		case 1:
			friendlyMonth = "February";
			break;
		case 2:
			friendlyMonth = "March";
			break;
		case 3:
			friendlyMonth = "April";
			break;
		case 4:
			friendlyMonth = "May";
			break;
		case 5:
			friendlyMonth = "June";
			break;
		case 6:
			friendlyMonth = "July";
			break;
		case 7:
			friendlyMonth = "August";
			break;
		case 8:
			friendlyMonth = "September";
			break;
		case 9:
			friendlyMonth = "October";
			break;
		case 10:
			friendlyMonth = "November";
			break;
		case 11:
			friendlyMonth = "December";
			break;
		default:
			friendlyMonth = "ERROR: number between 0 and 11 not passed";
			break;
	}

	return friendlyMonth;
}

var constructFriendlyDate = function(dateObj) {
	var year = dateObj.getUTCFullYear();
	var month = getFriendlyMonth(dateObj.getUTCMonth());
	var day = dateObj.getUTCDate();
	var friendlyDate = "";

	friendlyDate = month + " " + day + ", " + year;
	return friendlyDate;
}

var getUTCString = function(dateObj) {
	var year = dateObj.getUTCFullYear();
	var month = dateObj.getUTCMonth();
	var day = dateObj.getUTCDate();

	return Date.UTC(year, month, day);
}

app.listen(port, function() {
	console.log("App running on http://localhost:" + port);
});