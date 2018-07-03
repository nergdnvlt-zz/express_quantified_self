const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert; // import { assert } from "chai" //
const expect = require('chai').expect; // import { expect } from "chai" //
const app = require('../../app');
const pry = require('pryjs');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)


describe('Food API Routes', function() {
  beforeEach(function(done) {
    database.seed.run()
    .then(function() {
      done();
    });
  });

  afterEach(function(done) {
    database.seed.run()
    .then(function() {
      done();
    });
  });

  describe("GET /api/v1/foods", () => {
    it('returns all foods in the database', (done) => {
      chai.request(app)
      .get('/api/v1/foods')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body.length).to.eql(13);
        expect(response.body[0].name).to.eq('Apple');
        expect(response.body[0].calories).to.eq(88);
        expect(response.body[12].name).to.eq('Mango');
        expect(response.body[12].calories).to.eq(78);
        done();
      })
    })
  })

  describe("GET /api/v1/foods/1", () => {
    it('returns a single food in the database', (done) => {
      chai.request(app)
      .get('/api/v1/foods/1')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body.name).to.eq('Apple');
        expect(response.body.calories).to.eq(88);
        done();
      })
    })
  })

  describe("POST /api/v1/foods", () => {
    it('creates a new food in the database', (done) => {
      chai.request(app)
      .post('/api/v1/foods')
      .send({ "food": { "name": "yummy ramen", "calories": 88} })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body.name).to.eq('yummy ramen');
        expect(response.body.calories).to.eq(88);
        done();
      })
    })
  })

  describe("PATCH /api/v1/foods/2", () => {
    it('updates a food in the database', (done) => {
      chai.request(app)
      .patch('/api/v1/foods/2')
      .send({ "food": { "name": "even more yummy ramen", "calories": 88} })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body.name).to.eq('even more yummy ramen');
        expect(response.body.calories).to.eq(88);
        done();
      })
    })
  })

  describe("DELETE /api/v1/foods/13", () => {
    it('deletes a food in the database', (done) => {
      chai.request(app)
      .delete('/api/v1/foods/13')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body.message).to.eq('Deleted food with id of 13');
        done();
      })
    })
  })

})
