import Jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return Jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
