require('dotenv').config()
const request = require('supertest')
const app = require('../server.js')
var jwt = require('jsonwebtoken');


describe('GET ALL USERS ENDPOINT', () => {
	it(('has to list all users db'), async () => {
		const res = await request(app).get('/api/user/getAllUsers')
		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty('data')
		expect(res.body).toHaveProperty('_msg')
		expect(res.body).toHaveProperty('error')
	})
})

describe('CREATE USER', (done) => {

	it('should return an error if not authenticated', async () => {
		const res = await request(app)
			.post('/api/user/createUser')
			.send({
				name: 'Ama Doe',
				email: 'ama@example.com',
				password: '12345678'
			});

		expect(res.statusCode).toEqual(401); 
	});

	it('should create a new user', async () => {
		const userData = {
			name: 'Ama Doe',
			email: 'ama@example.com',
			password: '12345678'
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
			.set('Authorization', `${token}`) 
			.send(userData);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toHaveProperty('data')
		expect(response.body).toHaveProperty('_msg')
		expect(response.body).toHaveProperty('error')

	});

})