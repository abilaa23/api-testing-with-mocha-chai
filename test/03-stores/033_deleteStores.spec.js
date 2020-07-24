const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")

chai.use(chaiHttp);

const api = chai.request('https://qaplay.dot.co.id')

describe('Delete Stores Test', function(){

    it('Success Delete Stores', function(done){

        api.delete(`/api/v1/users/${global.user_id}/stores/${global.store_id}`)
           .set('Content-Type', 'application/json')
           .set({"Authorization": `Bearer ${global.auth_token}`})
           .end(function (err, res){
               expect(res.status).to.equals(200);
               expect(response.body).to.have.property('message');
               expect(response.body).to.be.jsonSchema(require ('./schema/deleteStores_schema.json'));
               done();
           });
    });
});