export async function GET() {

  const warehouses = [

    {
      id: 1,
      name: "Hyderabad Warehouse",
      location: "Hyderabad",
    },

    {
      id: 2,
      name: "Bangalore Warehouse",
      location: "Bangalore",
    },

    {
      id: 3,
      name: "Mumbai Warehouse",
      location: "Mumbai",
    },

  ];

  return Response.json(warehouses);

}