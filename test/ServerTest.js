/**************************************************************
 * DEPENDENCIES
 *************************************************************/
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app/server')
const should = chai.should()

chai.use(chaiHttp)


/**************************************************************
 * TEST EXAMPLE
 *************************************************************/
describe('', () => {
    it('', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})