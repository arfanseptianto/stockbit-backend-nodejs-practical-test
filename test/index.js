process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

const apikey = '7be334c0';
const keyword = 'Batman';

chai.use(chaiHttp);

describe('API Server', () => {
    describe('GET:/movies/search', () => {
        it('Must to provide apikey', (done) => {
            chai.request(server)
                .get('/movies/search/?s='+keyword)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property('Response', 'False');
                    res.body.should.have.property('Error', "An apikey is required for authentication");
                    done();
                });
        });
        it('Return the search results', (done) => {
            chai.request(server)
                .get('/movies/search/?apikey='+apikey+'&s='+keyword)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Response', 'True');
                    done();
                });
        });
    });

    describe('GET:/movies/detail', () => {
        it('Required to provide apikey', (done) => {
            chai.request(server)
                .get('/movies/detail/?t='+keyword)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.have.property('Response', 'False');
                    res.body.should.have.property('Error', "An apikey is required for authentication");
                    done();
                });
        });
        it('Movie found, return the detail', (done) => {
            chai.request(server)
                .get('/movies/detail/?apikey='+apikey+'&t='+keyword)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Response', 'True');
                    done();
                });
        });
    });

});