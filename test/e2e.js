const Rize = require('rize')
const rize = new Rize({
  headless: false,
  width: 375,
  height: 667
})
rize
  .goto('http://listenfor.jerryonlyzrj.com/')
  .click('.try-it')
  .waitForNavigation()
  .saveScreenshot('try-it.png')
  .end()