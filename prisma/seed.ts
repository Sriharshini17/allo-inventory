import { prisma } from "../lib/prisma";

async function main() {

  await prisma.product.createMany({

    data: [

      {
        name:
          "iPhone 15 Pro Max",

        warehouse:
          "Hyderabad",

        stock: 5,

        price: 139999,

        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
      },

      {
        name:
          "Samsung Galaxy S24 Ultra",

        warehouse:
          "Bangalore",

        stock: 3,

        price: 124999,

        image:
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
      },

      {
        name:
          "MacBook Pro M3",

        warehouse:
          "Mumbai",

        stock: 4,

        price: 189999,

        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200",
      },

    ],

  });

  console.log(
    "Products Added Successfully"
  );

}

main();