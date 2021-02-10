const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  // GET Service
  it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  });

  // GET Service with query
  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await agent.get('https://httpbin.org/get').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  // HEAD Service
  it('Consume HEAD Service', async () => {
    const response = await agent.head('https://httpbin.org/headers');

    expect(response.status).to.equal(statusCode.OK);
  });

  // PATCH Service
  it('Consume PATCH Service with query parameters', async () => {
    const query = {
      name: 'Cristian',
      age: '20',
      city: 'Medellin'
    };

    const response = await agent.patch('https://httpbin.org/delay/0').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  // PUT Service
  it('Consume PUT Service with query parameters', async () => {
    const query = {
      name: 'User',
      age: '25',
      city: 'Planet Earth'
    };

    const response = await agent.put('https://httpbin.org/anything').query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
  });

  // DELETE Service
  it('Consume DELETE Service', async () => {
    const response = await agent.delete('https://httpbin.org/status/201');

    expect(response.status).to.equal(statusCode.CREATED);
  });
});
