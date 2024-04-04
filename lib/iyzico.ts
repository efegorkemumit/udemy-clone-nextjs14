import iyzipay from 'iyzipay';

export const iyziPay = new iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY!,
  secretKey: process.env.IYZIPAY_SECRET_KEY!,
  uri: process.env.IYZIPAY_URI!
});