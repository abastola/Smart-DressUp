exports.typeOfMessage = function(body, callback){
	var return_value=[];

	var messageBody=body.toLowerCase();
	if(messageBody.length == 4 && messageBody.indexOf("stop") == 0){
		return_value={
			id: 1
		}
	}else if(messageBody.length == 11 && messageBody.indexOf("start") == 0){
		return_value={
			id: 2,
			zipCode: messageBody.slice(6, 11)
		}
	}else if(messageBody.length == 9 && messageBody.indexOf("now") == 0){
		return_value={
			id: 3,
			zipCode: messageBody.slice(4, 9)
		}
	}else{
		return_value = {
			id: 0
		}
	}
	callback(null, return_value);
}