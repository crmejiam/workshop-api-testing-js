const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const { assert } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('GitHub Api PUT Test', () => {
  function test() {
    describe(`Following the ${githubUserName} user with PUT Method`, () => {
      it(`Then the ${githubUserName} user should be followed`, () => agent.put(`${urlBase}/user/following/${githubUserName}`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.status).to.equal(statusCode.NO_CONTENT);
          expect(response.body).to.eql({});
        }));
    });

    describe(`Checking that we are following ${githubUserName}`, () => {
      it(`Then the ${githubUserName} must be on followed users`, () => agent.get(`${urlBase}/user/following`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          assert.exists(response.body.find((list) => list.login === `${githubUserName}`));
        }));
    });
  }

  test();
  describe('Calling endpoint to verify method imdempotence', () => {
    test();
  });
});
