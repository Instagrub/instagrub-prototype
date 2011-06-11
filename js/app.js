
	function showPosition(position) {  
	// Did we get the position correctly?
	console.log (position.coords.latitude);		 		 
	}

	function handleError(error) {
      // Update a div element with error.message.
    }
	
	(function () {
        if (window.navigator && window.navigator.geolocation) 
		{
			window.navigator.geolocation.getCurrentPosition( showPosition, handleError );
		}
	} ());
	
