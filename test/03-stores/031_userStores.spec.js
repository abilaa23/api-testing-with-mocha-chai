const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")
const jsonSchema = require('chai-json-schema')
const dotenv = require("dotenv");

dotenv.config();

chai.use(chaiHttp);
chai.use(jsonSchema);

const api = chai.request(process.env.API_URI)

describe('User Stores Test', function(){

    it('Success get User Stores', function(done){
        
        api.get(`/api/v1/users/${global.user_id}/stores`)
           .set('Content-Type', 'application/json')
           .set({"Authorization": `Bearer ${global.auth_token}`})
           .end(function (err, res){
               response = res
               expect(res.status).to.equals(200);
               expect(response.body).to.be.jsonSchema(require ('./schema/userStores_schema.json'));
               done();
           });
    });

    it('Failed get User Stores', function(done){
        
        api.get('/api/v1/users/84305fdf')
           .set({"Authorization": `Bearer ${global.auth_token}`})
           .end(function (err, res){
               expect(res.status).to.equals(422);
               done();
           });
    });
});