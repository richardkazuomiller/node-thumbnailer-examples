var test = require('./test')
test({
  sharp : require('sharp'),
  prefix : 'sharp_'
},function(){
  console.log('done')
})