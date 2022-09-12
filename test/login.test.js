process.env.NODE_ENV='test';

let mongoose=require('mongoose');
let login=require('../models/user')

let chai=require('chai');
let chaiHttp=require('chai-http');
let server=require('../app');

let should=chai.should();

chai.use(chaiHttp);

describe('/exam-portal/user', () => {
    it('it should GET all the user data', (done) => {
      chai.request(server)
          .get('/exam-portal/user')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });
});

describe('/exam-portal/user',()=>{
         const registerEmployee={
            firstname:"ronak",
            lastname:"vjay",
            phone:5643679876,
            email:"a@gmail.com",
            password:"abc#1234",
            confirmpassword:"abc#1234",
            role:"admin"         
        };
         it('it should SignUp the page',(done)=>{
            chai.request(server)
            .post("/exam-portal/user")
            .send(registerEmployee)
            .end((error,response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
            done();    
            })
         })
})


describe('/exam-portal/user/authenticate',()=>{
    const emp={
        email:"a@gmail.com",
        password:"abc#12"
      };
      it('it should give error because password is wrong',(done)=>{
        chai.request(server)
        .post("/exam-portal/user/authenticate")
        .send(emp)
        .end((error,response)=>{
            response.should.have.status(400);
            response.body.should.be.a('object');
        done();    
        })
     })
    const LoginEmp={
        email:"a@gmail.com",
        password:"abc#1234"
           
    };
    it('it should login the page',(done)=>{
       chai.request(server)
       .post("/exam-portal/user/authenticate")
       .send(LoginEmp)
       .end((error,response)=>{
           response.should.have.status(200);
           response.body.should.be.a('object');
       done();    
       })
    })
 
})

describe('/exam-portal/user/logout',()=>{
    
    
    it('it should logout the page',(done)=>{
       chai.request(server)
       .delete("/exam-portal/user/logout")
       
       .end((error,response)=>{
           response.should.have.status(200);
           response.body.should.be.a('object');
           response.body.should.have.property('message')
       done();    
       })
    })
})


