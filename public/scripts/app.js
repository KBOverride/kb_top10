var data = "{}";

var xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.themoviedb.org/3/movie/343668-kingsman-2?language=en-US&api_key=4a302fed57f688d39421fdd5fc669830");

xhr.send(data);

var wow = xhr.response;
console.log(wow);