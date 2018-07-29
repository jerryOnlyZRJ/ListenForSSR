const Rize = require('rize')
const rize = new Rize({
  headless: false,
  width: 375,
  height: 667
})
rize
  .goto('http://listenfor.jerryonlyzrj.com/')
  .click('.try-it')
  .saveScreenshot('try-it.png')
  .end()

rize
  .goto('http://listenfor.jerryonlyzrj.com/')
  .waitForNavigation()
  .saveScreenshot('rigister.png')
  .end()