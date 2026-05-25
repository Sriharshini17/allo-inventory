import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const reservation =
    await prisma.reservation.findFirst({

      orderBy: {
        id: "desc",
      },

    });

  if (reservation) {

    await prisma.reservation.update({

      where: {
        id: reservation.id,
      },

      data: {
        status:
          "Cancelled",
      },

    });

  }

  const product =
    await prisma.product.findFirst({

      where: {
        name:
          body.productName,
      },

    });

  if (product) {

    await prisma.product.update({

      where: {
        id: product.id,
      },

      data: {
        stock:
          product.stock + 1,
      },

    });

  }

  return Response.json({

    message:
      "Reservation Released & Stock Restored",

  });

}