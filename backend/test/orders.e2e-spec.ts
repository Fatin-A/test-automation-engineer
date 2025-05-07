import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Orders API (e2e)', () => {
  let app: INestApplication;
  let createdOrderId: string;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a product to use in order (Orders require a valid productId)
    const productRes = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Banana for Order Test',
        description: 'Used in order test',
        price: 2.5,
      })
      .expect(201);

    createdProductId = productRes.body.id;
  });

  afterAll(async () => {
    // Cleanup: Delete test product
    await request(app.getHttpServer()).delete(`/products/${createdProductId}`);
    await app.close();
  });

  it('POST /orders - should create a new order', async () => {
    const response = await request(app.getHttpServer())
      .post('/orders')
      .send({
        productId: createdProductId,
        quantity: 5,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdOrderId = response.body.id;
  });

  it('GET /orders - should return orders list', async () => {
    const response = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /orders/:id - should return specific order', async () => {
    const response = await request(app.getHttpServer())
      .get(`/orders/${createdOrderId}`)
      .expect(200);

    expect(response.body).toHaveProperty('quantity', 5);
  });

  it('PUT /orders/:id - should update the order', async () => {
    const response = await request(app.getHttpServer())
      .put(`/orders/${createdOrderId}`)
      .send({
        productId: createdProductId,
        quantity: 10,
      })
      .expect(200);

    expect(response.body.quantity).toBe(10);
  });

  it('DELETE /orders/:id - should delete the order', async () => {
    await request(app.getHttpServer())
      .delete(`/orders/${createdOrderId}`)
      .expect(200);
  });
});
