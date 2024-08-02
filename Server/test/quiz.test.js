const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Quiz = require('../models/quiz');

let should = chai.should();
const token="jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdC50b2xzYW5rYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYyOTc0MTQ3fQ.lSs6Aw4xvpPuWvxDvEPZrn8-P6O8uXJBeDs6DheQvVo";
chai.use(chaiHttp);

describe('/Create Quiz', () => {
    const quiz1 = {
        id: 2,
        title: "Quiz on java",
        description: "blah blah blah bilack ship",
        startTime: "0",
        endTime: "30",
        questionGroup: [2,3]
    };

    const quiz2 = {
        id: 4,
        title: "Quiz" 
    };

    it('it should post the quiz', (done) => {
        chai.request(server)
            .post("/quiz")
            .set({'Cookie': token})
            .send(quiz1)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('title');
                response.body.should.have.property('startTime');
                response.body.should.have.property('endTime');
                response.body.should.have.property('questionGroup').be.a('array');
            done();
        })
    })

    it('it should not post the quiz', (done) => {
        chai.request(server)
            .post("/quiz")
            .set({'Cookie': token})
            .send(quiz2)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('error');
            done();
        })
    }) 

});

describe('/Get All Quiz', () => {
    it('it should get all the quiz', (done) => {
        chai.request(server)
            .get("/quiz")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                //response.body.length.should.be.eql(1);
            done();
        })
    })
});

describe('/Get Quiz', () => {
    it('it should get the quiz by id', (done) => {

        chai.request(server)
            .get("/quiz/2")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('title');
                response.body.should.have.property('startTime');
                response.body.should.have.property('endTime');
                response.body.should.have.property('questionGroup').be.a('array');
            done();
        })
    
    })

    it('it should not get the quiz', (done) => {
        chai.request(server)
            .get("/quiz/10")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                //response.body.should.have.property('msg');
            done();
        })
    })
});

describe('/update quiz', () => {

    const quiz = new Quiz({
        title: "Quiz on java",
        description: "blah blah blah bilack ship",
        startTime: "0",
        endTime: "30",
        questionGroup: [2,3]
    });

    it('it should update the quiz', (done) => {
 
        chai.request(server)
            .put("/quiz/2")
            .set({'Cookie': token})
            .send(quiz)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
            done();
        })
    })

    it('it should not update the quiz', (done) => {

        chai.request(server)
            .put("/quiz/10")
            .set({'Cookie': token})
            .send(quiz)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                //response.body.should.have.property('msg')
            done();
            })
    })
});

describe('/delete quiz', () => {

    it('it should delete the quiz', (done) => {
        chai.request(server)
            .delete("/quiz/2")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg');
            done();
        })
    })

    it('it should not delete the quiz', (done) => {
        chai.request(server)
            .delete("/quiz/10")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                response.body.should.have.property('msg')
            done();
        })
    })
});

