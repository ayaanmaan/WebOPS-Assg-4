const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Product = require('../models/product');

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Product.deleteMany();
});

describe('Product API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
        category: 'Test',
        imageUrl: 'http://test.com/image.jpg'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all products', async () => {
    await Product.create({ name: 'Test Product', price: 19.99 });
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
  });

  // Add more tests for other endpoints
});
