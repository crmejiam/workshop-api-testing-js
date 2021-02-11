// Commit: Consuming a DELETE and an non-existent resource
const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;
const urlBase = 'https://api.github.com';
let gistUrl;
let status;

const Example = `
function wait(method, time) {
  return new Promise((resolve) => {
    setTimeout(resolve(method()), time);
  });
}
`;

describe('Github Api DELETE Test', () => {
  const Gist = {
    description: 'This is a promise example',
    public: true,
    files: {
      'promiseExample.js': {
        content: Example
      }
    }
  };
  describe('Creating the Gist', () => {
    it('Then the gist should be created', () => agent.post(`${urlBase}/gists`)
      .send(Gist)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        gistUrl = response.body.url;
        expect(response.body).to.containSubset(Gist);
        expect(response.body.description).to.equal('This is a promise example');
        expect(response.body.public).to.equal(true);
        expect(response.status).to.equal(statusCode.CREATED);
      }));
  });
  describe('Checking that the gist exists', () => {
    it('Then the gist should exist', () => agent.get(gistUrl)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
      }));
  });
  describe('Deleting the gist', () => {
    it('Then the gist should be deleted', () => agent.delete(gistUrl)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
      }));
  });
  describe('Checking that the gist exists again', () => {
    before(async () => {
      try {
        await agent.get(gistUrl)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN);
      } catch (response) {
        status = response.status;
      }
    });
    it('Then the gist should not exist', () => {
      expect(status).to.equal(statusCode.NOT_FOUND);
    });
  });
});
