import * as dotenv from 'dotenv';

dotenv.config();

const key = process.env.SECRET;

export const jwtConstants = {
  secret: key,
};
