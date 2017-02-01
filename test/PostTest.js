/**************************************************************
 * DEPENDENCIES
 *************************************************************/

const mongoose = require('mongoose')
const Post = require('../app/models/Post')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

/**************************************************************
 * CONFIG
 *************************************************************/

chai.use(chaiHttp)

/**************************************************************
 * TESTS
 *************************************************************/

describe('Posts', () => {
    beforeEach((done) => {
        Post.remove({}, (err) => {
            done()
        })
    })

    describe('/GET posts', () => {
        it('it should GET all the posts', (done) => {
            chai.request(server)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
                })
        })
    })

    describe('/POST post', () => {
        it('it should not POST the post(missing text)', (done) => {
            let post = {
                user: 'Test user #1',
                title: 'Test title #1'
            }

            chai.request(server)
                .post('/api')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('post').eql('not created!')
                    done()
                })
        })

        it('it should POST the post', (done) => {
            let post = {
                user: 'Test user #2',
                title: 'Test title #2',
                text: 'Test text #2'
            }

            chai.request(server)
                .post('/api')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('user').eql('Test user #2')
                    res.body.should.have.property('title').eql('Test title #2')
                    res.body.should.have.property('text').eql('Test text #2')
                    done()
                })
        })
    })

    describe('/GET/:id post', () => {
        it('it should GET a post', (done) => {
            let post = new Post({
                user: 'Test user #3',
                title: 'Test title #3',
                text: 'Test text #3'
            })
            post.save((err) => {
                chai.request(server)
                    .get('/api/' + post.id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('user').eql('Test user #3')
                        res.body.should.have.property('title').eql('Test title #3')
                        res.body.should.have.property('text').eql('Test text #3')
                        done()
                })
            })
        })
        it('it should not GET a post', (done) => {
            chai.request(server)
                .get('/api/' + 1)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('get').eql('could not get the post!')
                    done()
                })
        })
    })

    describe('/PUT/:id post', () => {
        it('it should UPDATE a post', (done) => {
            let post = new Post({
                user: 'Test user #4',
                title: 'Test title #4',
                text: 'Test text #4'
            })
            post.save((err) => {
                chai.request(server)
                    .put('/api/' + post.id)
                    .send({text: 'Modified text #4'})
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('put').eql('updated!')
                        done()
                    })
            })
        })
        it('it should not UPDATE a post', (done) => {
            chai.request(server)
                    .put('/api/' + 1)
                    .send({title: 'Modified title #5'})
                    .end((err, res) => {
                        res.should.have.status(400)
                        res.body.should.be.a('object')
                        res.body.should.have.property('put').eql('not updated!')
                        done()
                    })
        })
    })

    describe('/DELETE/:id post', () => {
        it('it should DELETE a post', (done) => {
            let post = new Post({
                user: 'Test user #6',
                title: 'Test title #6',
                text: 'Test text #6'
            })
            post.save((err) => {
                chai.request(server)
                    .delete('/api/' + post.id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('delete').eql('deleted!')
                        done()
                    })
            })
        })
        it('it should not DELETE a post', (done) => {
            chai.request(server)
                .delete('/api/' + 1)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('delete').eql('not deleted!')
                    done()
                })
        })
    })
})