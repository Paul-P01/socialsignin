populateGrid();

function populateGrid() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("feeds") === null) {
      //Code to handle no Feeds Present
    } else {
      var feeds = JSON.parse(localStorage.getItem("feeds"));
      for (var i in feeds) {
        getData(feeds[i].feedURL);
    	}
  	}
	} else {
  // Sorry! No Web Storage support..
	}
}

function getData(feedURL,feedIndex)	{
	$.ajax({
    url: 'https://api.rss2json.com/v1/api.json',
    method: 'GET',
    dataType: 'json',
    data: {
      rss_url: feedURL,
      api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
      count: 6
    }
  }).done(function(response) {
    if (response.status != 'ok') {
      throw response.message;
    }
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
     	buildGrid(feed,feedIndex);
		}
  });
}

function buildGrid(result, feedIndex) {
	var $template = $('#content-card').clone();
	var newItem = $template.prop('content');
	$(newItem).find('.grid-item').addClass(String(feedIndex));
	$(newItem).find('.title').text(result.feedName);
	var d = new Date(result.pubDate).toString('MMM dd yyyy | hh:mm');;
	$(newItem).find('.timestamp').text(d);
	if (result.thumbnail) {
		$(newItem).find('.image-link').attr('href', result.link).attr('target', '_blank');
		$(newItem).find('.external-link-link').attr('href', result.link).attr('target', '_blank');
		$(newItem).find('.article-image').attr('src', result.thumbnail).attr('alt', 'BBC News Image').addClass('thumbnail');
	}else	{
		$(newItem).find('figure').remove();
	}
	$(newItem).find('.content-copy').text(result.title);
	$(newItem).find('.article_snippet').text(result.description);
	$('.grid').append(newItem);
}

function addFeed2(feedName, feedURL)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			feeds = [];
			localStorage.setItem("feeds", JSON.stringify(feeds));
		}else	{
			var retrievedData = localStorage.getItem("feeds");
			var feeds = JSON.parse(retrievedData);
		}
	}
		feeds.push({'feedName':feedName, 'feedURL':feedURL});
		feedIndex = feeds.length - 1;
		localStorage.setItem("feeds", JSON.stringify(feeds));
		document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
		getData(feedURL,feedIndex);
}

function removeFeed2(index)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			//code to hande no entries
		}else	{
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			feeds.splice(index,1);
			localStorage.setItem("feeds", JSON.stringify(feeds));
			document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
			$( "." + index ).remove();
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