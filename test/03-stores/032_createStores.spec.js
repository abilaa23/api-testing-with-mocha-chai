const chai = require('chai')
const expect = require ('chai').expect
const chaiHttp = require("chai-http")
const fs = require ('fs')
const jsonSchema = require('chai-json-schema')
const dotenv = require("dotenv");

dotenv.config();

chai.use(chaiHttp);
chai.use(jsonSchema);

const api = chai.request(process.env.API_URI)

describe('Create Stores Test', function (){

    it('Success Create Stores', function (done){

        let response = {};
        
        api.post(`/api/v1/users/${global.user_id}/stores`)
           .set('Content-Type', 'multipart/form-data')
           .set({"Authorization": `Bearer ${global.auth_token}`})
           .field('name', 'Bilibili Aprilia')
           .field('address', 'Jl Wukir Gg 2 RT 01 RW 03 Temas Batu')
           .field('description', 'Abila Jl Wukir Batu')
           .attach('cover_image', fs.readFileSync("fixtures/image.jpeg"), "image.jpg")
           .field('status', 'active')
           .end(function (err, res) {
               response = res
               global.store_id = response.body.data.id;
               expect(response.status).to.equals(200);
               expect(response.body.data).to.have.property('id');
               expect(response.body.data).to.have.property('name');
               expect(response.body).to.be.jsonSchema(require ('./schema/createStores_schema.json'));
               done();
           });

    });
});