import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const product =
    await prisma.product.findFirst({

      where: {
        name:
          body.productName,
      },

    });

  if (!product) {

    return new Response(

      JSON.stringify({
        error:
          "Product not found",
      }),

      {
        status: 404,
      }

    );

  }

  if (product.stock <= 0) {

    return new Response(

      JSON.stringify({
        error:
          "Out of stock",
      }),

      {
        status: 409,
      }

    );

  }

  await prisma.product.update({

    where: {
      id: product.id,
    },

    data: {
      stock:
        product.stock - 1,
    },

  });

  const reservation =
    await prisma.reservation.create({

      data: {

        productName:
          body.productName,

        warehouse:
          body.warehouse,

        status:
          "Pending",

      },

    });

  return Response.json({

    message:
      "Reservation Created",

    reservation,

  });

}