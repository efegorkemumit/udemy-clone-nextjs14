// Import gerekli kütüphaneler
import { NextResponse } from "next/server";
import { PayTR } from "@/lib/paytr";
import { currentUser } from "@clerk/nextjs";
import { prismadb } from "@/lib/db";
import Iyzipay from 'iyzipay'; // Modülü Iyzipay olarak içe aktar

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prismadb.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await prismadb.purchase.findFirst({
      where: {
          userId: user.id,
          courseId: params.courseId
        
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const iyzipay  = new Iyzipay({
        apiKey: process.env.IYZIPAY_API_KEY!,
        secretKey: process.env.IYZIPAY_SECRET_KEY!,
        uri: process.env.IYZIPAY_URI!
      });
  
      const request = {
        locale: Iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '1',
    paidPrice: '1.2',
    currency: Iyzipay.CURRENCY.TRY,
    installment: '1',
    basketId: 'B67832',
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
        cardHolderName: 'John Doe',
        cardNumber: '5528790000000008',
        expireMonth: '12',
        expireYear: '2030',
        cvc: '123',
        registerCard: '0'
    },
    buyer: {
        id: 'BY789',
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: 'email@email.com',
        identityNumber: '74300864791',
        lastLoginDate: '2015-10-05 12:43:35',
        registrationDate: '2013-04-21 15:12:09',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
    },
    shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    basketItems: [
        {
            id: 'BI101',
            name: 'Binocular',
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.3'
        },
        {
            id: 'BI102',
            name: 'Game code',
            category1: 'Game',
            category2: 'Online Game Items',
            itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
            price: '0.5'
        },
        {
            id: 'BI103',
            name: 'Usb',
            category1: 'Electronics',
            category2: 'Usb / Cable',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.2'
        }
        ]
      };
  
      iyzipay.payment.create(request, async (err: any, result: any) => {
        if (err) {
          console.error("[IYZIPAY_CHECKOUT]", err);
          return new NextResponse("Internal Error", { status: 500 });
        }
        if (result.status === 'success') {
          // İşlem başarılı ise dönülen URL'ye yönlendirme yapılabilir.
          return new NextResponse({ url: result.paymentUrl });
        } else {
          console.error("[IYZIPAY_CHECKOUT]", result);
          return new NextResponse("Payment Error", { status: 400 });
        }
      });
  
  } catch (error) {
    console.error("[IYZIPAY_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
