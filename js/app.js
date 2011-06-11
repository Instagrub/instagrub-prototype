
	function showPosition(position) {  
		// Did we get the position correctly?
		var auth = { 
		  //
		  // Update with your auth tokens
		  //
		  consumerKey: "Srg-JpR1_N4ZQjgG904CwA", 
		  consumerSecret: "UK4zDt-c2GOKhqHZ0Tu8A-n6bIk",
		  accessToken: "mKQtr08ZBVLgwoLzTgY2xvSeHYHFd9gK",
		  accessTokenSecret: "Vwfou_he0DirTEEH872lAy5jXjQ",
		  serviceProvider: { 
			signatureMethod: "HMAC-SHA1"
		  }
		};

		var terms = 'restaurants';
		var ll = position.coords.latitude + ',' + position.coords.longitude;
		var limit = '6';
		
		var accessor = {
		  consumerSecret: auth.consumerSecret,
		  tokenSecret: auth.accessTokenSecret
		};

		parameters = [];
		parameters.push(['term', terms]);
		parameters.push(['ll', ll]);
		parameters.push(['limit', limit]);
		parameters.push(['callback', 'cb']);
		parameters.push(['oauth_consumer_key', auth.consumerKey]);
		parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
		parameters.push(['oauth_token', auth.accessToken]);
		parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

		var message = { 
		  'action': 'http://api.yelp.com/v2/search',
		  'method': 'GET',
		  'parameters': parameters 
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);

		var parameterMap = OAuth.getParameterMap(message.parameters);
		console.log(parameterMap);

		$.ajax({
		  'url': message.action,
		  'data': parameterMap,
		  'dataType': 'jsonp',
		  'jsonpCallback': 'cb',
		  'success': getYelpResults,
		});		
	}

	function handleError(error) {
      // Update a div element with error.message.
    }
	
	function getYelpResults(data, textStats, XMLHttpRequest) {
		
		for (var i=0; i < data.businesses.length; i++)
		{
			$("#rlist ul").append('<li><a data-yelpid="' + data.businesses[i].id + '" href="#specials">' + data.businesses[i].name + '</a></li>');			
		}
		$.getScript('http://code.jquery.com/mobile/1.0a4.1/jquery.mobile-1.0a4.1.min.js');
	}
		  
	(function () {
        if (window.navigator && window.navigator.geolocation) 
		{
			window.navigator.geolocation.getCurrentPosition( showPosition, handleError );
		}
	} ());
	
