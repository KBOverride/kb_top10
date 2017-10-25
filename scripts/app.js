/* app.js */

var data = "{}";
var counter = 0;

// Getting current date
var n = new Date();
var year = n.getFullYear();
var month = n.getMonth() + 1;
var day = n.getDate();

var monthPast = month - 2;
var yearPast = year;
var dayPast = day;
if (monthPast < 0) {
	monthPast = 12 + monthPast;
	yearPast = yearPast - 1;
}


var fname = fileName();
var nowPlaying = new XMLHttpRequest();
var comingSoon = new XMLHttpRequest();
var videos = new XMLHttpRequest();

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

// Requests made here appropiately
if (fname == "index.html" || fname == "now-playing-page2.html" || window.location.href == "https://kb-top-10-movies.firebaseapp.com/") {
	nowPlaying.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=" + year + "-" + month + "-" + day + "&primary_release_date.gte="
	+ yearPast + "-" + monthPast + "-" + dayPast + "&page=1");
	day=day+1;
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte="  + year + "-" + month + "-" + day + "&page=1");
	counter = 1;
	nowPlaying.send(data);
	comingSoon.send(data);

} else if (fname == "now-playing-page3.html" || fname == "now-playing-page4.html") {
	nowPlaying.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=" + year + "-" + month + "-" + day + "&primary_release_date.gte="
	+ yearPast + "-" + monthPast + "-" + dayPast + "&page=2");
	day=day+1;
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte"  + year + "-" + month + "-" + day + "&page=2");
	counter = 21;
	nowPlaying.send(data);
	comingSoon.send(data);

} else if (fname == "moreInfo.html") {
	displayMoreInfo();
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
		$(".poster" + counter).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".movieTitle" + counter).text(myArr.results[i].title);
		$(".movieDesc" + counter).text(myArr.results[i].overview);
		$(".releaseDateNow" + counter).text(myArr.results[i].release_date);
		counter++;
	}
}

function displayComingSoon(myArr, counter) {

	for (var i = 0; i < 20; i++) {
		$(".comingSoonPoster" + counter).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".comingSoonTitle" + counter).text(myArr.results[i].title);
		$(".comingSoonDesc" + counter).text(myArr.results[i].overview);
		$(".releaseDateComingSoon" + counter).text(myArr.results[i].release_date);
		counter++;
	}
}

function displayMoreInfo() {
	
	var urlStr = "url(http://image.tmdb.org/t/p/w1920" + localStorage.movieBackDrop + ")";
	$(".backdropImg").css("background", urlStr + " center top no-repeat");
	console.log(urlStr);
	$(".moreInfoTitle").text(localStorage.movieTitle);
	$(".overviewInfo").text(localStorage.movieOverview);
	$("#imgPoster").attr("src", "http://image.tmdb.org/t/p/w342/" + localStorage.moviePoster);
}

function fileName() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}

function getTrailers() {
	var urlStr = "https://www.youtube.com/watch?v=";
}

/* Star Rating */
$(function() {
	$('#example').barrating({
		theme: 'fontawesome-stars'
	});
});
