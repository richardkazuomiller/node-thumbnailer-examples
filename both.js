var test = require('./test')
console.log('testing gm...')
test(null,function(){
  console.log('testing sharp...')
  require('./sharp')
})