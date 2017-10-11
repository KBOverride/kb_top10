var data = "{}";

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    displayInfo(myArr);
  }
});

// Movies in theatres for past 2 months and sorted by popularity by default request
xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?api_key=4a302fed57f688d39421fdd5fc669830&language=en-US&primary_release_date.lte=2017-10-11&primary_release_date.gte=2017-08-10&page=1");

// Movies now playing request
//xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?page=1language=en-US&api_key=4a302fed57f688d39421fdd5fc669830");

xhr.send(data);

function displayInfo(myArr) {
	for (var i = 1; i <=10; i++) {
		$(".poster" + i).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i-1].poster_path);
		$(".movieTitle" + i).text(myArr.results[i-1].title);
		$(".movieDesc" + i).text(myArr.results[i-1].overview);
	}
}


