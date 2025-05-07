import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Products API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /products should return all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /products should create a product', async () => {
    const newProduct = {
      name: 'Test Mango',
      price: 12.5,
      description: 'Sweet and juicy',
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Mango');
    expect(response.body.price).toBe(12.5);
  });
});
