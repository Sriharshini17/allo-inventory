import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const product =
    await prisma.product.create({

      data: {

        name:
          body.name,

        price:
          body.price,

        warehouse:
          body.warehouse,

        stock:
          body.stock,

        image:
          body.image,

      },

    });

  return Response.json(
    product
  );

}

export async function DELETE(
  request: Request
) {

  const body =
    await request.json();

  await prisma.product.delete({

    where: {
      id: body.id,
    },

  });

  return Response.json({

    message:
      "Product Deleted",

  });

}

export async function PATCH(
  request: Request
) {

  const body =
    await request.json();

  const product =
    await prisma.product.update({

      where: {
        id: body.id,
      },

      data: {
        stock:
          body.stock,
      },

    });

  return Response.json(
    product
  );

}