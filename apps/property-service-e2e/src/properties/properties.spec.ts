import axios from 'axios';

describe('GET /properties', () => {
  it('should list all users', async () => {
    const res = await axios.get(`/properties`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual('This action returns all properties');
  });
});

describe('GET /properties/{id}', () => {
  it('should return details from a single property', async () => {
    const mockPropertyId = 1;
    const res = await axios.get(`/properties/${mockPropertyId}`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      `This action returns the #${mockPropertyId} property`
    );
  });

  test.todo('should return 404 error if property doesnt exist');
});

describe('POST /properties', () => {
  it('should create a new property', async () => {
    const res = await axios.post(`/properties`);

    expect(res.status).toBe(201);
    expect(res.data).toEqual('This action adds a new property');
  });

  test.todo('should return 4xx validation error if request is not invalid');
});

describe('PUT /properties/{id}', () => {
  // TODO: Fix circular dependency error on patch
  xit('should update one existing property', async () => {
    const mockPropertyId = 1;
    const res = await axios.put(`/properties/${mockPropertyId}`);

    expect(res.status).toBe(200);
    // expect(res.data).toEqual('This action adds a new user');
  });

  test.todo('should return 404 error if property doesnt exist');
  test.todo('should return 4xx validation error if request is not valid');
});

describe('DELETE /properties/{id}', () => {
  it('should delete one existing property', async () => {
    const mockPropertyId = 1;
    const res = await axios.delete(`/properties/${mockPropertyId}`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      `This action removes the #${mockPropertyId} property`
    );
  });

  test.todo('should return 404 error if property doesnt exist');
});
