// Assume full application is loaded 
console.log('specials.js');

// Force global reference to the specials list 
window.specialsModel = {};

// Change the underlying DOM for the specials list
$('#rlist ul li a').live(
    'click',
    function(e) { 
	// console.log($(this));
	var yelpid = $(this).attr('data-yelpid');
	getSpecials(yelpid);
	
	var yelpurl = $(this).attr('data-yelpurl');
	fixUrl(yelpurl);
	// alert('getting ' + yelpid);
    }
);

// Change the underlying DOM for the special order page
$('#slist ul li a').live(
    'click',
    function(e) { 
	// console.log($(this));
	alert('special order requested...');
	var title = $(this).attr('data-title');
	var image = $(this).attr('data-image');
	$('#order-title').html(title);
	$('#order-image').attr('src', image);
    }
);


// Populate the specials list 
function jsonFlickrApi(response) {
    var specials = response.photos.photo;

    // Clear out the page after the user has selected a new business 
    var html = '';

    for (var s in specials) { 
	var special = specials[s];
	var photo = 'http://farm' + special.farm + '.static.flickr.com/' + special.server + '/' + special.id + '_' + special.secret + '_m.jpg';
	html += '<li><a data-image="' + photo + '" data-title="' + special.title + '" href="#order"><img src="' + photo + '"/>' + special.title + '</a></li>';
    }

    $('#slist').html(
	'<ul data-role="listview">' + 
	    html + 
	    '</ul>'
    );
    $('#slist').page();
};


function getSpecials(yelpid) { 
    var api_key = '7a8c0dd6263c04eb4ae1a3155b8f80a1';
    
    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + api_key + '&user_id=22882695%40N00&tags=yelpid:' + yelpid + '&format=json'; 

    console.log(url);

    $.getJSON(url + '&callback=?');

};

function fixUrl(yelpurl) {    
     $('#lastpage').append('<iframe style="border-style: none;" id="fbframe" src="http://www.facebook.com/plugins/like.php?href=' + yelpurl + '"></iframe');
	 $('#lastpage').page();
};

