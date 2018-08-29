const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const pact = require('pact')
const expect = chai.expect
const API_PORT = 9130
const {
  okapiRequest
} = require('../client')
chai.use(chaiAsPromised)

const provider = pact({
  consumer: 'Consumer',
  provider: 'Provider',
  port: API_PORT,
  //log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  //logLevel: LOG_LEVEL,
  spec: 2
})

describe('Pact with Our Provider', () => {
  before(() => {
    return provider.setup()
  })

   describe('Folio consumerPact spec test', () => {
    describe('and a request is called', () => {
      before(() => {
        return provider.addInteraction({
          uponReceiving: 'a request for data',
          withRequest: {
            method: 'POST',
            path: '/authn/login',
            headers: {
              'Content-Type': 'application/json',
              'X-Okapi-Tenant': 'diku',
              'Accept': 'application/json'
            },
            body: {
              "tenant": "diku",
              "username": "diku_admin",
              "password": "admin"
            }
          },
          willRespondWith: {
            status: 201,
            headers: {
              'Content-Type': 'application/json;'
            },
            body: {
              "username" : "diku_admin",
              "password" : "admin",
              "tenant" : "diku"
            }
          }
        })
      })

      it('check payload from the provider', async (done) => {
        //Tests for API enpoints can be added here
        expect(okapiRequest()).to.eventually.have.property('status', 201)
        done()
      })

  it('should validate the interactions and create a contract', () => {
    return provider.verify()
  })
})
})


  // This will create contract pact file
  after(() => {
    return provider.finalize()
  })
})
