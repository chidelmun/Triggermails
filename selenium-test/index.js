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

driver.get('http://localhost:3000/login');
setTimeout(function() {
}, 9000);
driver.findElement(By.name('user')).sendKeys('root@localhost.com');
driver.findElement(By.name('pass')).sendKeys('root');
driver.findElement(By.name('login')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 5000);
driver.quit();