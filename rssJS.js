populateGrid();

var mediaContainer = $('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 400,
  gutter: 20
});

function populateGrid() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("feeds") === null) {
      //Code to handle no Feeds Present
    } else {
      var feeds = JSON.parse(localStorage.getItem("feeds"));
      for (var i in feeds) {
        $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
            rss_url: feeds[i].feedURL,
            api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
            count: 5
          }
        }).done(function(response) {
          if (response.status != 'ok') {
            throw response.message;
          }
          // console.log('====== ' + response.feed.title + ' ======');
          for (var i in response.items) {
            var item = response.items[i];
            var feed = {};
            feed = {
              'pubDate': item.pubDate,
              'feedName': response.feed.title,
              'title': item.title,
              'thumbnail': item.thumbnail,
              'link': item.link,
              'description': item.description
            };
            buildGrid(feed);
          }

   		// $('.grid-item').each(function(i, obj) {
			// $(obj).height(function(n,c){
			// 	console.log ("c = ",c);
			// 	console.log ("n = ",n)
			//  		// return c+210;
			//  	});
			// });

			$(mediaContainer).masonry('reloadItems');
			$(mediaContainer).masonry('layout');

        });
      }
    }
  } else {
    // Sorry! No Web Storage support..
  }
}

function buildGrid(result) {
	var $template = $('#content-card').clone();
	var newItem = $template.prop('content');

	$(newItem).find('.title').text(result.feedName);
	var d = new Date(result.pubDate).toString('MMM dd yyyy | hh:mm');;
	$(newItem).find('.timestamp').text(d);
	if (result.thumbnail) {
		$(newItem).find('.image-link').attr('href', result.link).attr('target', '_blank');
		$(newItem).find('.external-link-link').attr('href', result.link).attr('target', '_blank');
		$(newItem).find('.article-image').attr('src', result.thumbnail).attr('alt', 'BBC News Image').addClass('thumbnail');
	}
	$(newItem).find('.content-copy').text(result.title);
	$(newItem).find('.article_snippet').text(result.description);
	$(newItem).find('.grid-item').height(function(idx, height) {
		// console.log(height);
		return height + '460';
	})
	$('.grid').append(newItem);
}

function addFeed2(feedName, feedURL)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			console.log("Nothing there")
			feeds = [];
			localStorage.setItem("feeds", JSON.stringify(feeds));
		}else	{
			var retrievedData = localStorage.getItem("feeds");
			var feeds = JSON.parse(retrievedData);
		}
	}
		feeds.push({'feedName':feedName, 'feedURL':feedURL});
		localStorage.setItem("feeds", JSON.stringify(feeds));
		document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
		console.log("Added");
		populateGrid();
}

function removeFeed2(index)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			//code to hande no entries
		}else	{
			console.log ("Removing",index);
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			feeds.splice(index,1);
			localStorage.setItem("feeds", JSON.stringify(feeds));
			document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
			populateGrid();
		}
	}
}

function populateFeedList2()	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			//Code to handle Nothing Stored.
			addFeed2("BBC Technology","http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk");
			addFeed2("BBC Sci-Tech","http://feeds.bbci.co.uk/news/video_and_audio/technology/rss.xml?edition=uk");
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			var feedHTML ='';
			for (var i = 0; i<feeds.length; i++)	{
				feedHTML += "<div class='feed'><i class='fa fa-circle-o' aria-hidden='true'></i><h3 class='feedName'>" + feeds[i].feedName + "</h3><i class='fa fa-times-circle' aria-hidden='true' onclick=(removeFeed2(" + [i] + "))></i></div>";
			}
			return feedHTML;
		}else	{
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			var feedHTML ='';
			for (var i = 0; i<feeds.length; i++)	{
				feedHTML += "<div class='feed'><i class='fa fa-circle-o' aria-hidden='true'></i><h3 class='feedName'>" + feeds[i].feedName + "</h3><i class='fa fa-times-circle' aria-hidden='true' onclick=(removeFeed2(" + [i] + "))></i></div>";
			}
			return feedHTML;
		}
	}
}