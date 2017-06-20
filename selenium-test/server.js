var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var By = webdriver.By,
    until = webdriver.until;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

driver.get('http://digitalrenter.com/login');

 for (var i = 0; i < 20 ; i++) {
 	driver.findElement(By.name('identity')).sendKeys(i);
	driver.findElement(By.name('password')).sendKeys(i);
	driver.findElement(By.className('btn-primary')).click();
	if (i==18) {
		driver.findElement(By.name('user')).sendKeys('admin@localhost.com');
		driver.findElement(By.name('pass')).sendKeys('admin');
		driver.findElement(By.className('btn-primary')).click();
	}
	
 }

driver.findElement(By.name('user')).sendKeys('root');
driver.findElement(By.name('pass')).sendKeys('root@localhost.com');
driver.findElement(By.name('login')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 5000);
driver.quit();