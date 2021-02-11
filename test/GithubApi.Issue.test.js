const agent = require('superagent');
// const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
let userInfo;
let repository;

describe('GitHub Api POST and PATCH Test', () => {
  describe('Checking that there is at least one public repo', () => {
    it('Then there should be at least one public repo', () => agent.get(`${urlBase}/user`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        userInfo = response.body;
        expect(response.body.public_repos).to.be.above(0);
      }));
  });
  describe('Choosing a random public repo and checking that it exists', () => {
    it('Then the choosed repo should exist', () => agent.get(userInfo.repos_url)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        [repository] = response.body;
        expect(repository).to.not.equal(null);
      }));
  });
  describe('Creating an issue', () => {
    it('Then the issue should be created', () => agent.post(`${urlBase}/repos/${userInfo.login}/${repository.name}/issues`)
      .send({ title: 'New issue created through GitHub Api' })
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.body.title).to.equal('New issue created through GitHub Api');
        expect(response.body).to.equal(null);
      }));
  });
});
