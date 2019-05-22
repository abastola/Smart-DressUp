var request = require('request');

exports.getWeather = function(body, callback){
	options ={
		url: 'blah blah blah',
		json: true
	};
	request.get(options, function(err, response, body_json) {
		if( !err && response.statusCode === 200 ){
			var x=body_json['weather'][0]['id'];
			var y=100;

			var return_value={
				temp: Math.round((body_json['main']['temp']-273.15)*9/5+32),
				type: body_json['weather'][0]['main'],
				detail: body_json['weather'][0]['description'],
				name: body_json['name'],
				id: (x-(x % y))/y,
				zipCode: body
			}
			return callback(null, return_value);
		}
		else{return callback(err);}
	});
}
