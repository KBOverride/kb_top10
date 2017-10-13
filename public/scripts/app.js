/* app.js */

var data = "{}";
var counter = 0;

// for (var i = 0; i < 3; i++) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=2017-10-11&primary_release_date.gte=2017-08-10&page="+i+1 );
// 	xhr.addEventListener("readystatechange", function () {
// 		if (this.readyState === this.DONE) {
// 			var myArr = JSON.parse(this.responseText);
// 			displayInfo(myArr, counter);
// 			console.log("test"+i);
// 			counter+=40;
// 		}
// 	});
// 	xhr.send(data);
// }

var fname = fileName();
var xhr = new XMLHttpRequest();
var comingSoon = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    displayNowPlaying(myArr, counter);
  }
});

comingSoon.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    displayComingSoon(myArr, counter);
  }
});

// Movies in theatres for past 2 months and sorted by popularity by default request

if (fname == "index.html" || fname == "now-playing-page2.html" || window.location.href == "https://kb-top-10-movies.firebaseapp.com/") {
	xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=2017-10-12&primary_release_date.gte=2017-08-10&page=1");
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte=2017-10-12&page=1");
	counter = 1;
} else if (fname == "now-playing-page3.html" || fname == "now-playing-page4.html") {
	xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=2017-10-12&primary_release_date.gte=2017-08-10&page=2");
	comingSoon.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.gte=2017-10-12&page=1");
	counter = 21;
}


xhr.send(data);
comingSoon.send(data);

function displayNowPlaying(myArr, counter) {

	for (var i = 0; i < 20; i++) {
		$(".poster" + counter).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".movieTitle" + counter).text(myArr.results[i].title);
		$(".movieDesc" + counter).text(myArr.results[i].overview);
		counter++;
	}
}

function displayComingSoon(myArr, counter) {

	for (var i = 0; i < 20; i++) {
		$(".comingSoonPoster" + counter).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i].poster_path);
		$(".comingSoonTitle" + counter).text(myArr.results[i].title);
		$(".comingSoonDesc" + counter).text(myArr.results[i].overview);
		counter++;
	}
}

function fileName() {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	return page;
}

