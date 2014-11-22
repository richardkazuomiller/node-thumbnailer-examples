var fs = require('fs')

var thumbnailer = require('node-thumbnailer').create();

var examples = [
  function(monkey,outdir,next){
    thumbnailer.resize(monkey,320,320,outdir+'/monkey_320.jpg',next)
  },
  function(monkey,outdir,next){
    thumbnailer.crop(monkey,2000,2000,800,680,outdir+'/monkey_cropped.jpg',next)
  },
  function(monkey,outdir,next){
    thumbnailer.cropMiddleSquare(monkey,outdir+'/monkey_square.jpg',next)
  }
]

var run = function(){
  var monkey = __dirname+'/monkey.jpg'

  var outdir = __dirname+'/output'

  var index = 0
  var next = function(){
    var example = examples[index]
    example && example(monkey,outdir,next)
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
