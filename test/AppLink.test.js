require('dotenv').config()
const request = require('supertest')
const app = require('../server.js')
var jwt = require('jsonwebtoken');
const Link = require('../models/applink.js');


describe('GET LINKS ENDPOINT', () => {
	it(('has to list all the applinks in the db'), async () => {
		const res = await request(app).get('/api/appLink/getAllLinks')
		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty('data')
	})
})


describe('CREATE LINK', () => {

	it('should create a new link', async () => {
		const linkData = {
			name: 'Ama Doe',
			icon: 'ama@example.com',
			url: '12345'
		};

		// Create a JWT token with a secret key and a payload
		const tokenPayload = {
			name: `${linkData.name}`,
			icon: `${linkData.url}`,
			url: `${linkData.icon}`
		};

		const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

		const response = await request(app)
			.post('/api/appLink/createLink')
			.set('Authorization', `${token}`) 
			.send(linkData);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toHaveProperty('data')
		expect(response.body).toHaveProperty('_msg')
		expect(response.body).toHaveProperty('error')

	});

})



describe("update", () => {
	const id = '1'; 
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

	it('should return 401 if no authorization header is provided', async () => {
		const res = await request(app)
			.put(`/api/appLink/updateLink/${id}`)
			.set('Authorization', ``)
			.send({
				icon: 'new iconnnnn',
				name: 'new nameeeeee',
				url: 'new urlllllll'
			});

		expect(res.status).toEqual(401);
	});

	it('should return 401 if an invalid authorization header is provided', async () => {
		const res = await request(app)
			.put(`/api/appLink/updateLink/${id}`)
			.set('Authorization', `abc`)
			.send({
				icon: 'new iconnnnn',
				name: 'new nameeeeee',
				url: 'new urlllllll'
			});

		expect(res.status).toEqual(401);
	});

	it('should return 200 if a valid authorization header is provided', async () => {
		const res = await request(app)
			.put(`/api/appLink/updateLink/${id}`)
			.set('Authorization', `${token}`)
			.send({
				icon: 'new iconnnnn',
				name: 'new nameeeeee',
				url: 'new urlllllll'
			});

		expect(res.status).toEqual(200);
	});
})


describe('DELETE /links/:id', () => {
	it('deletes a link by id', async () => {

		const linkData = {
			name: 'newLink',
			icon: 'link@example.com',
			url: '12345'
		};

		// Create a JWT token with a secret key and a payload
		const tokenPayload = {
			name: `${linkData.name}`,
			icon: `${linkData.url}`,
			url: `${linkData.icon}`
		};

		const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

		const newLink = await request(app)
			.post('/api/appLink/createLink')
			.set('Authorization', `${token}`) 
			.send(linkData);



		const response = await request(app)
			.delete(`/api/appLink/deleteLink/${newLink.id}`)
			.set('Authorization', `${token}`) 

		expect(response.status).toBe(204);
	});

	it('returns a 404 if the link is not found', async () => {
		const response = await request(app).delete('/links/1234567890');

		expect(response.status).toBe(404);
	});
});
