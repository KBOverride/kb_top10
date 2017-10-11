var data = "{}";

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var myArr = JSON.parse(this.responseText);
    displayInfo(myArr);
  }
});

//xhr.open("GET", "https://api.themoviedb.org/3/movie/343668-kingsman-2?language=en-US&api_key=4a302fed57f688d39421fdd5fc669830");
xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?page=1language=en-US&api_key=4a302fed57f688d39421fdd5fc669830");

xhr.send(data);

function displayInfo(myArr) {
	for (var i = 1; i <=10; i++) {
		$(".poster" + i).attr("src", "http://image.tmdb.org/t/p/w185/" + myArr.results[i-1].poster_path);
	}
}
