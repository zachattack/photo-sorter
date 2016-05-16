//
// There are a lot of things I love about not winning.
(function(){

	// Needed Authentication for the NASA Flickr account.
	var API_KEY = 'a5e95177da353f58113fd60296e1d250';
	var USER_ID = '24662369@N07';

	// getPhotos API
	var publicPhotoListing = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=' + API_KEY + '&user_id=' + USER_ID + '&format=json&nojsoncallback=1';

	// Using Jquery's get JSON to make things easier.
  $.getJSON( publicPhotoListing, {
    format: "json"
  })
    .done(function( data ) {
			// console.log(data);
      $.each( data.photos.photo, function( i, item ) {
				//console.log(item);
				var returnHTML = '';

				// getSizes API
				// var getPhotoSize = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=' + API_KEY + '&photo_id=' + item.id + '&format=json&nojsoncallback=1';

				var mediumImage = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
				// var largeImage = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg';

				// getTags API
				var getPhotoTags = 'https://api.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key=' + API_KEY + '&photo_id=' + item.id + '&format=json&nojsoncallback=1';

				$.getJSON(getPhotoTags, {
					format: "json"
				})
					.done(function( data ) {
						// console.log( data.photo.tags.tag );
						$.each( data.photo.tags.tag, function( i, item ) {
							console.log(item._content);
						});
					});

				returnHTML = "<div class='sm-col sm-col-6 md-col-4 lg-col-3'>";
				returnHTML += "<div class='pic-card mx2 mb3'><div class='pic-crop'>"
				returnHTML += "<img class='fit' src='" + mediumImage + "' alt='" + item.title + "' /></div>";
				returnHTML += "<p class='pb2 px2 m0'>" + item.title + "</p>";
				returnHTML += "</div></div>";

				$("#images").append(returnHTML);
				// Just load up the first 24.
        if ( i === 23 ) {
          return false;
        }
      });
    });

})();
