import axios from 'axios';

describe('Auth', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should authenticate user with correct login and password', async () => {
      const res = await axios.post(`/api/v1/auth/login`, {
        username: 'bar@foo.com',
        password: '1234',
      });

      expect(res.status).toBe(200);
      expect(res.data).toEqual({ accessToken: '1234', refreshToken: '1234' });
    });

    test.todo('should deny user authentication with incorrect password');
  });
});
