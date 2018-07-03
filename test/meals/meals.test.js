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

  describe("GET /api/v1/meals", () => {
    it('returns all meals in the database', (done) => {
      chai.request(app)
      .get('/api/v1/meals')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.length).to.eql(4);
        expect(response.body[0].name).to.eq('Breakfast');
        expect(response.body[1].name).to.eq('Snack');
        expect(response.body[2].name).to.eq('Lunch');
        expect(response.body[3].name).to.eq('Dinner');
        done();
      })
    })
  })

  describe("GET /api/v1/meals/1/foods", () => {
    it('returns a meal in the database', (done) => {
      chai.request(app)
      .get('/api/v1/meals/1/foods')
      .end((error, response) => {
        let meal = JSON.parse(response.text)
        expect(response).to.have.status(200);
        expect(meal.id).to.eq(1);
        expect(meal.name).to.eq('Breakfast');
        expect(meal.foods.length).to.eql(2);
        expect(meal.foods[0].id).to.eql(1);
        expect(meal.foods[0].name).to.eql('Apple');
        done();
      })
    })
  })
})
