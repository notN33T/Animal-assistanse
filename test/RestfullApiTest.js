    let chai                    = require('chai');
    let chaiHttp                = require('chai-http');
    let server                  = require('../index');

    let should                  = chai.should();

    chai.use(chaiHttp)

    function deletePostTest(id) {
        it('It should delete post',(done) => {
            chai.request(server)
                    .post('/apiposts/deletePost')
                    .send({id})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.have.property('status')
                        done();
                    })
        })
    }

    function createPostCorrectTest(img, title, mainText) {
            it('Api create post test', (done) => {
                chai.request(server)
                    .post('/apiposts/createPost')
                    .send({img, title, mainText})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.have.property('status')
                        done();
                    })
            })
    }
    function createPostIncorrectTest(img, title, mainText) {
        it('Api create post test', (done) => {
            chai.request(server)
                .post('/apiposts/createPost')
                .send({img, title, mainText})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('status')
                    done();
                })
        })
}
    function getAllPostsTest() {
        it('Get all posts test', (done) => {
            chai.request(server)
                .get('/apiposts/posts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
            })
        })
    }
    function createCommentCorrectTest(fcomment, title){
        it('It should create comment test', (done) => {
            chai.request(server)
                .post('/apiposts/create-comment')
                .send({fcomment, title})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('status')
                    done();
                })
        })
    }
    function createCommentInCorrectTest(fcomment, title){
        it('It should not create comment test', (done) => {
            chai.request(server)
                .post('/apiposts/create-comment')
                .send({fcomment, title})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('status')
                    done();
                })
        })
    }
    function getSingePostTest(id) {
        it('It should get information about post id', (done) => {
            chai.request(server)
                .get(`/apiposts/post:${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                })
        })
    }

    function registerSuccessTest() {
        it('Register success test', (done) => {
            email = 'example@mail.ru'
            password = 'myPassword'
            userName = 'myUserName'
            chai.request(server)
                .post(`/api/register`)
                .send({email, password, userName})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('token');
                    done();
                })
        })
    }

    function loginSuccessTest() {
        it('Login success test', (done) => {
            email = 'example@mail.ru'
            password = 'myPassword'
                chai.request(server)
                    .post(`/api/login`)
                    .send({email, password})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.have.property('token')
                        done();
                    })
        })
    }

    function registerIncorrectEmailTest() {
        it('Register test incorrect email', (done) => {
            email = 'example@mail.ru'
            password = 'myPassword'
            userName = 'myUserName'
            chai.request(server)
                .post(`/api/register`)
                .send({email, password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('message')
                    done();
                })
        })
    }

    function registerIncorrectUserNameTest() {
        it('Register test incorrect username', (done) => {
            email = 'example2@mail.ru'
            password = 'myPassword'
            userName = 'MyNewCoolUsername'
            chai.request(server)
                .post(`/api/register`)
                .send({email, password, userName})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('message')
                    done();
                })
        })
    }

    function loginIncorrectEmailTest() {
        it('Login test incorrect password', (done) => {
            email = 'example1@mail.ru'
            password = 'myPassword'
            chai.request(server)
                .post(`/api/login`)
                .send({email, password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('message')
                    done();
                })
        })
    }

    function loginIncorrectPasswordTest() {
        it('Login test incorrect password', (done) => {
            email = 'example@mail.ru'
            password = 'myPassword1'
            chai.request(server)
                .post(`/api/login`)
                .send({email, password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('message')
                    done();
                })
        })
    }

    function createPostTest() {
        createPostCorrectTest('testPost.jpg', 'testTitle', 'testMainTest')
        createPostIncorrectTest('testPost.jpg', 'testTitle', 'testMainTest')
    }


    function registeTest() {
        describe('Register test', () => {
            registerSuccessTest()
            
            context('Register test incorrect data', () => {
                registerIncorrectEmailTest()
                registerIncorrectUserNameTest()
            })
        })
    }

    function loginTest() {
        describe('Login test correct data', () => {
                    loginSuccessTest()
                    
                    context('Login test incorrect data', () => {
                        loginIncorrectEmailTest()
                        loginIncorrectPasswordTest()
                    })
                })
    }

    function editCommentCorrectTest(editedText, text, owner, title) {
        it('It should edit comment', (done) => {
            chai.request(server)
                .post('/apiposts/edit-comment')
                .send({editedText, text, owner, title})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('status')
                    done();
                })
        })
    }

    function editCommentIncorrectTest(editedText, text, owner, title) {
        it('It should not edit comment', (done) => {
            chai.request(server)
                .post('/apiposts/edit-comment')
                .send({editedText, text, owner, title})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body[0].should.have.property('status')
                    done();
                })
        })
    }

    function createCommentTest() {
        createCommentCorrectTest({avatar:'Eret1kkkkk.jpg', admin: true, owner:'Eret1kkkkk', title:'Ez post for deleting'}, 'MyNewTestComment')
        createCommentInCorrectTest({avatar:'Eret1kkkkk.jpg', admin: true, owner:'Eret1kkkkk', title:'Ez post for deleting'}, 'MyNewTestComment')
    }

    function editCommentTest() {
        editCommentCorrectTest('New editet text', 'Ez post for deleting', 'Eret1kkkkk', 'Ez post for deleting')
        editCommentIncorrectTest('New editet text', 'Ez post for deleting', 'Eret1kkkkk', 'Ez post for deleting')
    }

    createPostTest()
    registeTest()
    loginTest()
    createCommentTest()
    editCommentTest()
    deletePostTest('61b24821d6b8451820865c99')