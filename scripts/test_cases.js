var webdriver = require ('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;

	var driver = new webdriver.Builder().forBrowser('chrome').build();

	driver.get('https://kb-top-10-movies.firebaseapp.com');

	driver.findElement(By.css('img')).getText().then(function(text){
		console.log("Success, text of img is: " + text);
	});

	driver.findElements(By.css('h4')).then(function(elements){
		elements.map(function(el){
			el.getText().then(function(txt){
				console.log("the text of the movie title element is: " + txt);
			});
		});
	});
	
	driver.quit();