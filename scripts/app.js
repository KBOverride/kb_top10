/* app.js */

var data = "{}";
var counter = 0;

// Getting current date
var n = new Date();
var year = n.getFullYear();
var month = n.getMonth() + 1;
var day = n.getDate();
var daysInCurrentMonth = 0;
var typingTimer;
var doneTypingInterval = 1500;

var monthPast = month - 2;
var yearPast = year;
var dayPast = day;
if (monthPast < 0) {
	monthPast = 12 + monthPast;
	yearPast = yearPast - 1;
} else if(monthPast == 0) {
	monthPast++;
}


var fname = fileName();
var nowPlaying = new XMLHttpRequest();
var comingSoon = new XMLHttpRequest();
var moreDetails = new XMLHttpRequest();
var creditsDetails = new XMLHttpRequest();
var videos = new XMLHttpRequest();
var searchMovies = new XMLHttpRequest();

nowPlaying.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    var flag = 0;
    displayNowPlaying(myArr, counter);
    localData(myArr, flag);
  }
});

comingSoon.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    var flag = 1;
    displayComingSoon(myArr, counter);
    localData(myArr, flag);
  }
});

moreDetails.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    movieDetails(myArr, counter);
  }
});

creditsDetails.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var myArr = JSON.parse(this.responseText);
		topCastDetails(myArr);
	}
});

videos.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var myArr = JSON.parse(this.responseText);
		videoTrailer(myArr);
	}
});

searchMovies.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		var myArr = JSON.parse(this.responseText);
		searchingMovies(myArr);
	}
});

// Searching movies
$('#searchMovies').on('input', function() {
	console.log("testing2");
	window.clearTimeout(typingTimer)
	typingTimer = window.setTimeout(doneTyping, doneTypingInterval);
});



function doneTyping() {
	var userInput = document.getElementById('searchMovies').value;
	console.log(userInput);

	if(userInput != '') {
		// console.log("https://api.themoviedb.org/3/search/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&page=1&query=" + input);
		searchMovies.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&page=1&query=" + userInput);
		searchMovies.send(data);
	}
}

function searchingMovies(myArr) {

	var options = {
		data: myArr.results,

		getValue: "title",

		theme: "dark",

		list: {
			match: {
				enabled: true
			}
		}
	};

		$("#searchMovies").easyAutocomplete(options);
		console.log("testing");
}


// Requests made here appropiately
if (fname == "index.html" || fname == "page2.html" || window.location.href == "https://kb-top-10-movies.firebaseapp.com/") {
	nowPlaying.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=" + year + "-" + month + "-" + day + "&primary_release_date.gte="
	+ yearPast + "-" + monthPast + "-" + dayPast + "&page=1");
	// console.log("https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=" + year + "-" + month + "-" + day + "&primary_release_date.gte="
	// + yearPast + "-" + monthPast + "-" + dayPast + "&page=1");
	daysInCurrentMonth = daysInMonth(month,year);
	day=day+1;
	if (day > daysInCurrentMonth) {
		day = 1;
		month = month + 1;
		if(month == 13) {
			month = 1;
			year = year + 1;
		}
	}
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte="  + year + "-" + month + "-" + day + "&page=1");
	console.log("https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte="  + year + "-" + month + "-" + day + "&page=1");
	counter = 1;
	nowPlaying.send(data);
	comingSoon.send(data);

} else if (fname == "page3.html" || fname == "page4.html") {
	nowPlaying.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=" + year + "-" + month + "-" + day + "&primary_release_date.gte="
	+ yearPast + "-" + monthPast + "-" + dayPast + "&page=2");
	daysInCurrentMonth = daysInMonth(month,year);
	day=day+1;
	if (day > daysInCurrentMonth) {
		day = 1;
		month = month + 1;
		if(month == 13) {
			month = 1;
			year = year + 1;
		}
	}
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte="  + year + "-" + month + "-" + day + "&page=2");
	counter = 21;
	nowPlaying.send(data);
	comingSoon.send(data);

} else if (fname == "moreInfo.html") {
	displayMoreInfo();
	moreDetails.open("GET", "https://api.themoviedb.org/3/movie/" + localStorage.movieID + "?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US");
	moreDetails.send(data);
	creditsDetails.open("GET", "https://api.themoviedb.org/3/movie/" + localStorage.movieID + "/credits?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US");
	creditsDetails.send(data);
	videos.open("GET", "https://api.themoviedb.org/3/movie/" + localStorage.movieID + "/videos?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US");
	videos.send(data);
}


/* Saving data to session Storage for moreInfo.html*/

function localData(myArr, flag){
	var clickedButton = $(".mdl-button");
		$(clickedButton).click(function () {
			var j = (this.id).replace( /^\D+/g, '');
			j = j - 1;
			 if ($("#scroll-tab-1").hasClass("is-active") && (flag == 0)) {
    			localStorage.movieTitle = myArr.results[j].title;
				localStorage.movieOverview = myArr.results[j].overview;
				localStorage.movieBackDrop = myArr.results[j].backdrop_path;
				localStorage.moviePoster = myArr.results[j].poster_path;
				localStorage.movieReleaseDate = myArr.results[j].release_date;
				localStorage.movieID = myArr.results[j].id;
    		}

    		if ($("#scroll-tab-2").hasClass("is-active") && (flag == 1)) {
    			localStorage.movieTitle = myArr.results[j].title;
				localStorage.movieOverview = myArr.results[j].overview;
				localStorage.movieBackDrop = myArr.results[j].backdrop_path;
				localStorage.moviePoster = myArr.results[j].poster_path;
				localStorage.movieReleaseDate = myArr.results[j].release_date;
				localStorage.movieID = myArr.results[j].id;
    		}
		});
}

function displayNowPlaying(myArr, counter) {

	for (var i = 0; i < 20; i++) {
		$(".poster" + counter).attr("src", "https://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".movieTitle" + counter).text(myArr.results[i].title);
		$(".movieDesc" + counter).text(myArr.results[i].overview);
		$(".releaseDateNow" + counter).text(myArr.results[i].release_date);
		counter++;
	}
}

function displayComingSoon(myArr, counter) {

	for (var i = 0; i < 20; i++) {
		$(".comingSoonPoster" + counter).attr("src", "https://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".comingSoonTitle" + counter).text(myArr.results[i].title);
		$(".comingSoonDesc" + counter).text(myArr.results[i].overview);
		$(".releaseDateComingSoon" + counter).text(myArr.results[i].release_date);
		counter++;
	}
}

function displayMoreInfo() {
	
	var urlStr = "url(https://image.tmdb.org/t/p/w1920" + localStorage.movieBackDrop + ")";
	$(".backdropImg").css("background", urlStr + " center top no-repeat");
	$(".moreInfoTitle").text(localStorage.movieTitle);
	$(".overviewInfo").text(localStorage.movieOverview);
	$("#imgPoster").attr("src", "https://image.tmdb.org/t/p/w342/" + localStorage.moviePoster);
}

function movieDetails() {
	$(".runtime").text(myArr.runtime);
}

function fileName() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}

function getTrailers() {
	var urlStr = "https://www.youtube.com/watch?v=";
}

function daysInMonth(month,year) {
	return new Date(year, month, 0).getDate();
}

function movieDetails(myArr, counter) {
	var link = document.createElement('a');
	link.textContent = myArr.homepage;
	link.href = myArr.homepage;
	document.getElementById('homepage').appendChild(link);
	$(".releaseDate").append(" " + myArr.release_date);
	$(".runtime").append(" " + myArr.runtime + " minutes");
	$(".voteAverage").append(" " + myArr.vote_average);
	for (var i = 0; i < myArr.genres.length; i++) {
		if (i == myArr.genres.length - 1) {
			$(".genres").append(" " + myArr.genres[i].name);
		} else {
			$(".genres").append(" " + myArr.genres[i].name + ",");
		}
	}

	// Star Rating 
	var currentRating = myArr.vote_average;

    $('.stars-rating .current-rating')
        .find('span')
        .html(currentRating);

    $('.stars-rating .clear-rating').on('click', function(event) {
        event.preventDefault();

        $('#show-stars')
            .barrating('clear');
    });

    $('#show-stars').barrating({
        theme: 'fontawesome-stars-o',
        showSelectedRating: false,
        initialRating: currentRating,
        onSelect: function(value, text) {
            if (!value) {
                $('#show-stars')
                    .barrating('clear');
            } else {
                $('.stars-rating .current-rating')
                    .addClass('hidden');

                $('.stars-rating .your-rating')
                    .removeClass('hidden')
                    .find('span')
                    .html(value);
            }
        },
        onClear: function(value, text) {
            $('.stars-rating')
                .find('.current-rating')
                .removeClass('hidden')
                .end()
                .find('.your-rating')
                .addClass('hidden');
        }
    });
}

function topCastDetails(myArr) {

	for (var i = 1; i < 6; i++) {
		var urlStr = "url(https://image.tmdb.org/t/p/w185" + myArr.cast[i].profile_path + ")";
		$(".top-cast-img" + i).css("background", urlStr + " no-repeat");
		$(".top-cast-name" + i).text(myArr.cast[i].name);
	}
}

function videoTrailer(myArr) {

	var officialTrailer = false;
	var officialTeaserTrailer = false;
	var j = 0;
	var k = 0;

	for(var i = 0; i < myArr.results.length; i++) {
		if(myArr.results[i].name == "Official Trailer") {
			officialTrailer = true;
			j = i;
		}

		if(myArr.results[i].name == "Official Trailer 1") {
			officialTrailer = true;
			j = i;
		}

		if(myArr.results[i].name == "Official Teaser Trailer") {
			officialTeaserTrailer = true;
			k = i;
		}
	}

	if(officialTrailer == true) {
		var urlStr = "https://www.youtube.com/embed/" + myArr.results[j].key;
		$(".iframeClass").attr("src", urlStr);
		console.log("official");
	} else if(officialTrailer == false && officialTeaserTrailer == true) {
		var urlStr = "https://www.youtube.com/embed/" + myArr.results[k].key;
		$(".iframeClass").attr("src", urlStr);
		console.log("teaser");
	} else {
		var urlStr = "https://www.youtube.com/embed/" + myArr.results[0].key;
		$(".iframeClass").attr("src", urlStr);
	}
}

/* Star Rating */
// $(function() {
// 	$('#example').barrating({
// 		theme: 'fontawesome-stars'
// 	});
// });
