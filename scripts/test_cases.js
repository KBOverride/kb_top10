// Automated Test cases using Selenium and Chromedriver

var webdriver = require ('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;

	var driver = new webdriver.Builder().forBrowser('chrome').build();

	driver.get('https://kb-top-10-movies.firebaseapp.com');

	driver.findElements(By.css('img')).then(function(el){
		console.log("Success " + el);
	});

	driver.quit();

