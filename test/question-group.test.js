const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const QuestionGroup = require('../models/question-group');

let should = chai.should();
const token="jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdC50b2xzYW5rYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYyOTc0MTQ3fQ.lSs6Aw4xvpPuWvxDvEPZrn8-P6O8uXJBeDs6DheQvVo";


chai.use(chaiHttp);

// describe('Questions', () => {
//     beforeEach((done) => {
//         Question.remove({}, (err) => { 
//            done();           
//         });        
//     });

describe('/Create Question-Group', () => {
    const questionGroup1 = {
        id: 1,
        name: 'Quiz on MongoDB',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        questionID: [1,2,3]
    };

    const questionGroup2 = {
        id: 2,
        name: 'Quiz on Java',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    };

    it('it should post the question-group', (done) => {
        chai.request(server)
            .post("/question-group")
            .set({'Cookie': token})
            .send(questionGroup1)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                //response.body.should.have.property('id');
                response.body.should.have.property('name');
                response.body.should.have.property('createdAt');
                response.body.should.have.property('updatedAt');
                response.body.should.have.property('questionID');
            done();
        })
    })

    // it('it should not post the question-group', (done) => {
    //     chai.request(server)
    //         .post("/question-group")
    //         .set({'Cookie': token})
    //         .send(questionGroup2)
    //         .end((error, response) => {
    //             response.should.have.status(400);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('error');
    //             done(); 
    //     })

    // })
    
});

describe('/Get All Question-Groups', () => {
    it('it should get all the question-groups', (done) => {
        chai.request(server)
            .get("/question-group")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                //response.body.length.should.be.eql(1);
            done();
        })
    })
});

describe('/Get Question-Group', () => {
    it('it should get the question-group by id', (done) => {

        chai.request(server)
            .get("/question-group/20")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                //response.body.should.have.property('id');
                response.body.should.have.property('name');
                response.body.should.have.property('createdAt');
                response.body.should.have.property('updatedAt');
                response.body.should.have.property('questionID');
            done();
        })
    
    })

    it('it should not get the question by id', (done) => {
        chai.request(server)
            .get("/question-group/10")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
               // response.body.should.have.property('msg');
            done();
        })
    })
});

describe('/update question-group', () => {

    const question = new QuestionGroup({
        name: 'Quiz on Node',
        questionID: [4,5,6]
    });

    it('it should update the question', (done) => {
 
        chai.request(server)
            .put("/question-group/20")
            .set({'Cookie': token})
            .send(question)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
            done();
        })
    })

    it('it should not update the question', (done) => {

        chai.request(server)
            .put("/question-group/10")
            .set({'Cookie': token})
            .send(question)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                //response.body.should.have.property('msg')
            done();
            })
    })
});

describe('/delete question-group', () => {

    it('it should delete the question-group', (done) => {
        chai.request(server)
            .delete("/question-group/1")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg');
            done();
        })
    })

    it('it should not delete the question-group', (done) => {
        chai.request(server)
            .delete("/question-group/10")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                response.body.should.have.property('msg')
            done();
        })
    })
});
// })