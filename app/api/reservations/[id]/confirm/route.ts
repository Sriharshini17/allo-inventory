import { prisma } from "@/lib/prisma";

export async function POST() {

  const reservation =
    await prisma.reservation.findFirst({

      orderBy: {
        id: "desc",
      },

    });

  if (!reservation) {

    return new Response(

      JSON.stringify({
        error:
          "Reservation not found",
      }),

      {
        status: 404,
      }

    );

  }

  await prisma.reservation.update({

    where: {
      id: reservation.id,
    },

    data: {
      status:
        "Confirmed",
    },

  });

  return Response.json({

    message:
      "Reservation Confirmed",

  });

}