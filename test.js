var fs = require('fs')

function test(options,done){
  options = options || {}
  var thumbnailer = require('../node-thumbnailer').create(options);

  var examples = [
    function(monkey,outdir,next){
      thumbnailer.resize(monkey,320,320,outdir+'/'+(options.prefix||'')+'monkey_320.jpg',next)
    },
    function(monkey,outdir,next){
      thumbnailer.crop(monkey,2000,2000,800,680,outdir+'/'+(options.prefix||'')+'monkey_cropped.jpg',next)
    },
    function(monkey,outdir,next){
      thumbnailer.cropMiddleSquare(monkey,outdir+'/'+(options.prefix||'')+'monkey_square.jpg',next)
    }
  ]

  var run = function(){
    var monkey = __dirname+'/monkey.jpg'

    var outdir = __dirname+'/output'

    var index = 0
    var start = Date.now()
    var next = function(){
      console.log(Date.now()-start)
      var example = examples[index]
      if(example){
        example(monkey,outdir,next)
      }
      else{
        done && done()
      }
      index++
    }

    fs.exists(outdir,function(exists){
      if(!exists){
        fs.mkdir(outdir,function(){
          next()
        })
      }
      else{
        next()
      }
    })
  }
  
  run()
}

module.exports = test


