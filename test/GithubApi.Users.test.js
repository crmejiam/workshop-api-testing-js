// Commit: Add Query Parameters
const agent = require('superagent');
const { expect } = require('chai');

let userQuery;

const urlBase = 'https://api.github.com';

describe('Github Api Query Parameters Test', () => {
  describe('Users in Query by defect', () => {
    it('Then there should have some users by defect', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        userQuery = response.body.length;
        console.log('Number of users in query by default: ', userQuery);
      }));
  });

  describe('Lower the number of users in query to 10', () => {
    it('Then the number of users in query should be 10', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .query({ per_page: 10 })
      .then((response) => {
        userQuery = response.body.length;
        expect(userQuery).to.equal(10);
      }));
  });

  describe('Lower the number of users in query to 50', () => {
    it('Then the number of users in query should be 50', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .query({ per_page: 50 })
      .then((response) => {
        userQuery = response.body.length;
        expect(userQuery).to.equal(50);
      }));
  });
});
