import axios from 'axios';

describe('GET /users', () => {
  it('should list all users', async () => {
    const res = await axios.get(`/users`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual('This action returns all users');
  });
});

describe('GET /users/{id}', () => {
  it('should return details from a single user', async () => {
    const mockUserId = 1;
    const res = await axios.get(`/users/${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(`This action returns the #${mockUserId} user`);
  });

  test.todo('should return 404 error if user doesnt exist');
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const res = await axios.post(`/users`);

    expect(res.status).toBe(201);
    expect(res.data).toEqual('This action adds a new user');
  });

  test.todo('should return 4xx validation error if request is not invalid');
});

describe('PUT /users/{id}', () => {
  // TODO: Fix circular dependency error on patch
  xit('should update one existing user', async () => {
    const mockUserId = 1;
    const res = await axios.put(`/users/${mockUserId}`);

    expect(res.status).toBe(200);
    // expect(res.data).toEqual('This action adds a new user');
  });

  test.todo('should return 404 error if user doesnt exist');
  test.todo('should return 4xx validation error if request is not valid');
});

describe('DELETE /users/{id}', () => {
  it('should delete one existing user', async () => {
    const mockUserId = 1;
    const res = await axios.delete(`/users/${mockUserId}`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(`This action removes the #${mockUserId} user`);
  });

  test.todo('should return 404 error if user doesnt exist');
});
