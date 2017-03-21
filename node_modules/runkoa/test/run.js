var should = require('should')
var app = require('./bin/www')

require('..')()

var request = require('request');

describe('RUNKOA with require', function() {
  describe('GET /', function(){
    this.timeout(20000)
    it('respond sucess', function(){
      request('http://127.0.0.1:3000', function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // console.log(body) // Show the HTML for the Google homepage.
          body.should.equal('Hello Koa in app.js');
          
          done()
        }
      })
    })
  })
});