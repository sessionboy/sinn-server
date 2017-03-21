var request = require('supertest')
var should = require('should')
var app = require('./bin/www')

describe('Koa GET /', function(){
  it('respond sucess', function(done){
    request(app.listen())
      .get('/')
      .set('Accept', 'application/text')
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        // console.log(res)
        res.status.should.equal(200);
        // console.log(res.text)
        res.text.should.equal('Hello Koa in app.js');
        done();
      });
  })
})
