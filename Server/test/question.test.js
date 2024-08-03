const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Question = require('../models/question');

let should = chai.should();
const token="jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdC50b2xzYW5rYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYyOTc0MTQ3fQ.lSs6Aw4xvpPuWvxDvEPZrn8-P6O8uXJBeDs6DheQvVo";

chai.use(chaiHttp);

// describe('Questions', () => {
//     beforeEach((done) => {
//         Question.remove({}, (err) => { 
//            done();           
//         });        
//     });

describe('/Create Question', () => {
    const question1 = {
        question: "some question",
        option1: "abcd",
        option2: "efgh",
        option3: "ijkl",
        option4: "mnop",
        answer: "option2",
        difficulty: "simple",
    };

    const question2 = {
        answer: "option2",
        createdAt: new Date().toString()
    };

    it('it should post the question', (done) => {
        chai.request(server)
            .post("/question")
            // .set({Authorization:`Bearer ${token}`})
            .set({'Cookie': token})
            .send(question1)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('question');
                response.body.should.have.property('option1');
                response.body.should.have.property('option2');
                response.body.should.have.property('option3');
                response.body.should.have.property('option4');
                response.body.should.have.property('answer').eql('option2');
                response.body.should.have.property('difficulty');
            done();
        })
        
    })

    it('it should not post the question', (done) => {
        chai.request(server)
            .post("/question")
            .set({'Cookie': token})
            .send(question2)
            .end((error, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('error').eql('Question field is required!');
            done();
        })
    }) 
});

describe('/Get All Questions', () => {
    const role="admin";
    it('it should get all the questions', (done) => {
        chai.request(server)
            .get("/question")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                //response.body.length.should.be.eql(1);
            done();
        })
    })
});

describe('/Get Question', () => {
    it('it should get the question by id', (done) => {
        chai.request(server)
            .get("/question/20")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('question');
                response.body.should.have.property('option1');
                response.body.should.have.property('option2');
                response.body.should.have.property('option3');
                response.body.should.have.property('option4');
                response.body.should.have.property('answer');
                response.body.should.have.property('difficulty');
            done();
        })
    
    })

    // it('it should not get the question by id', (done) => {
    //     chai.request(server)
    //         .get("/question/10")
            
    //         .set({'Cookie': token})
    //         .end((error, response) => {
    //             response.should.have.status(200);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('msg');
    //         done();
    //     })
    // })
});

describe('/update question', () => {
    const role="admin";
    const question = new Question({
        id: 3,
        question: "some question 2",
        option1: "abcdefgh",
        option2: "efghijkl",
        option3: "ijklmnop",
        option4: "mnopqrst",
        answer: "option3",
        difficulty: "hard"
    });

    it('it should update the question', (done) => {
 
        chai.request(server)
            .put("/question/20")
            .set({'Cookie': token})
            .send(question)
            .end((error, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
            done();
        })
    })

    // it('it should not update the question', (done) => {

    //     chai.request(server)
    //         .put("/question/10")
    //         .set({'Cookie': token})
    //         .send(question)
    //         .end((error, response) => {
    //             response.should.have.status(201);
    //             response.body.should.be.a('object');
    //             response.body.should.have.property('msg')
    //         done();
    //         })
    // })
});

describe('/delete question', () => {
    
    it('it should delete the question', (done) => {
        chai.request(server)
            .delete("/question/20")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('msg');
            done();
        })
    })

    it('it should not delete the question', (done) => {
        chai.request(server)
            .delete("/question/10")
            .set({'Cookie': token})
            .end((error, response) => {
                response.should.have.status(404);
                response.body.should.be.a('object');
                response.body.should.have.property('msg')
            done();
        })
    })
});


// Everybody wants to excel in their career, and to achieve that, one has to have a good jump start in their career. And I personally think that Zensar is one of those places. As part of the first 2022 freshers' batch, I was very excited join the organization. The people are very supportive and highly encouraging. The training team gives emphasis more on practical knowledge and is always ready to help. They not only teach you technical skills, but they also help you improve your behavioural abilities. I'm very excited to work with Zensar and also to contribute to the organization. Proud to be a Zensarian.