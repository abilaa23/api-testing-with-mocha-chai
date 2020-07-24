const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")
const jsonSchema = require('chai-json-schema')

chai.use(chaiHttp);
chai.use(jsonSchema);

const api = chai.request(process.env.API_URI)

describe('Login Test', function () {
    
    it('Success Login', function (done) {
        let email = process.env.USER_EMAIL,
            password = process.env.USER_PASSWORD
            response = {};
    
        api.post('/api/v1/login')
            .set('Content-Type', 'application/json')
            .send({
                email: email,
                password: password
            })
            .end(function (err,res) {
                response = res;
                expect(response.status).to.equals(200);
                expect(response.body.data).to.have.property('token');
                expect(response.body).to.be.jsonSchema(require ('./schema/auth_schema.json'));
                done();
            });
    });
    after(done => {
        global.auth_token = response.body.data.token;
        global.user_id = response.body.data.id;
        done();
    });

    it('Failed Login', function (done) {
        let email = 'lesch.cortez@example.org',
            password = '1234567890'
        
        api.post('/api/v1/login')
           .set('Content-Type', 'application/json')
           .send({
               email: email,
               password: password
           })
           .end(function (err,res) {
               expect(res.status).to.equals(422);
               done();
           });
    });

})