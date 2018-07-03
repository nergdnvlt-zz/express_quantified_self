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


describe('Meal API Routes', function() {
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

  describe("POST /api/v1/meals", () => {
    it('creates a new relationship between food and meal', (done) => {
      chai.request(app)
      .post('/api/v1/meals/1/foods/3')
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.eq('Successfully added Chili to Breakfast');
        done();
      })
    })
  })

  describe("DELETE /api/v1/meals", () => {
    it('creates a new relationship between food and meal', (done) => {
      chai.request(app)
      .delete('/api/v1/meals/1/foods/1')
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.message).to.eq('Successfully removed Apple from Breakfast');
        done();
      })
    })
  })
})
