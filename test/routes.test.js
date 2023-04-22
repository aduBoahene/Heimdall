require('dotenv').config()
const request = require('supertest')
const app = require('../server.js')
var jwt = require('jsonwebtoken');


afterAll(() => {
	console.clear();
});


describe('GET LINKS ENDPOINT', () => {
	it(('has to list all the applinks in the db'), async () => {
		const res = await request(app).get('/api/appLink/getAllLinks')
		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty('data')
	})
})

describe('CREATE USER', () => {
	it('should create a new user', async () => {
		const userData = {
			name: 'Ama Doe',
			email: 'ama@example.com',
			password: '12345'
		};

		// Create a JWT token with a secret key and a payload
		const tokenPayload = {
			id: `${userData.id}`,
			name: `${userData.name}`,
			email: `${userData.email}`
		};

		const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

		const response = await request(app)
			.post('/api/user/createUser')
			.set('Authorization', `${token}`) // Set the Authorization header
			.send(userData);

			console.log('#######3##3###33####3#3#3#3###33#333')
			console.log('#######3##3###33####3#3#3#3###33#333')
			console.log('#######3##3###33####3#3#3#3###33#333')


			console.log(response.body)

			console.log('#######3##3###33####3#3#3#3###33#333')
			console.log('#######3##3###33####3#3#3#3###33#333')
			console.log('#######3##3###33####3#3#3#3###33#333')


		expect(response.statusCode).toEqual(201);
		expect(response.body).toHaveProperty('data')

//		expect(response.name).toEqual('Ama Doe');
//		expect(response.email).toEqual('ama@example.com');
	});
})