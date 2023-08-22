import axios from 'axios';

describe('POST /api/v1/auth/login', () => {
  it('should authenticate user with correct login and password', async () => {
    const res = await axios.post(`/api/v1/auth/login`, {
      email: 'bar@foo.com',
      password: '1234',
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual('This action returns the #0 user');
  });

  test.todo('should deny user authentication with incorrect password');
});

describe('GET /api/v1/auth/profile', () => {
  test.todo('should return authenticated user profile');
});

describe('POST /api/v1/auth/profile', () => {
  test.todo('should update authenticated user profile');
});
