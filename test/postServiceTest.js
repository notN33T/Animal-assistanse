let chai                    = require('chai');
let chaiHttp                = require('chai-http');
let server                  = require('../index');
let should                  = chai.should();

chai.use(chaiHttp)


function GetAllPostsTest() {
    describe('API /Get posts', () => {
        it('It should get all posts', (done) => {
            chai.request(server)
                .get('/apiposts/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                })
        })
    })
}

function GetPostByIdTest(id) {
    describe('API /Get posts for id', () => {
        it('It should get information about post id', (done) => {
            chai.request(server)
                .get(`/apiposts/post:${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    console.log(res.body)
                    done();
                })
        })
    })
}


GetPostByIdTest('BOTTLENOSE DOLPHINS: OUR SMART, SOCIABLE STARS OF THE SEA')
GetAllPostsTest()


