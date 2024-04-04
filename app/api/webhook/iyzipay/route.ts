// app/api/webhook/iyzipay/route.ts
import { NextResponse } from "next/server";
import iyzipay from 'iyzipay';

export async function POST(req: Request) {
  const body = await req.text();

  const iyziPay = new iyzipay({
    apiKey: process.env.IYZIPAY_API_KEY!,
    secretKey: process.env.IYZIPAY_SECRET_KEY!,
    uri: process.env.IYZIPAY_URI!
  });

  iyziPay.callback.retrieve(body, async (err: any, result: any) => {
    if (err) {
      console.error("[IYZIPAY_WEBHOOK]", err);
      return new NextResponse("Webhook Error", { status: 500 });
    }
    console.log("[IYZIPAY_WEBHOOK]", result);

    // İşlem başarılı ise gerekli işlemleri gerçekleştirin
    // Örneğin, veritabanında ilgili kaydı güncelleyebilirsiniz.

    return new NextResponse(null, { status: 200 });
  });
}
