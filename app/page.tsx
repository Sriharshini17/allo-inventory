"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function Home() {

  const router =
    useRouter();

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    fetch("/api/products")

      .then((response) =>
        response.json()
      )

      .then((data) => {

        setProducts(data);

      });

  }, []);

  const reserveProduct =
    async (product: any) => {

      const response =
        await fetch(
          "/api/reservations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              productName:
                product.name,

              warehouse:
                product.warehouse,

            }),

          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.error
        );

        return;

      }

      setProducts((prev: any) =>

        prev.map((p: any) =>

          p.id === product.id

            ? {

                ...p,

                stock:
                  p.stock - 1,

              }

            : p

        )

      );

      router.push(

        `/reservation?name=${encodeURIComponent(product.name)}
        &price=${product.price}
        &image=${encodeURIComponent(product.image)}
        &warehouse=${encodeURIComponent(product.warehouse)}
        &reservationId=${data.reservation.id}`

      );

    };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "40px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >

        <div>

          <h1
            style={{
              color: "white",
              fontSize: "48px",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Allo Inventory
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
            }}
          >
            Smart Enterprise
            Inventory &
            Reservation Platform
          </p>

        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >

          <div
            style={{
              backgroundColor:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(10px)",
              padding:
                "20px 30px",
              borderRadius: "20px",
              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >

            <h2
              style={{
                color: "white",
                margin: 0,
                fontSize: "28px",
              }}
            >
              {products.length}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "5px",
              }}
            >
              Products
            </p>

          </div>

          <div
            style={{
              backgroundColor:
                "rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(10px)",
              padding:
                "20px 30px",
              borderRadius: "20px",
              border:
                "1px solid rgba(255,255,255,0.1)",
            }}
          >

            <h2
              style={{
                color: "#22c55e",
                margin: 0,
                fontSize: "28px",
              }}
            >
              Live
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "5px",
              }}
            >
              Database Sync
            </p>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "35px",
        }}
      >

        {products.map(
          (product: any) => (

            <div
              key={product.id}
              style={{
                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                backdropFilter:
                  "blur(12px)",

                borderRadius: "28px",

                overflow: "hidden",

                boxShadow:
                  "0px 10px 30px rgba(0,0,0,0.25)",

                transition:
                  "0.3s",
              }}
            >

              {/* IMAGE */}

              <div
                style={{
                  position: "relative",
                }}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position:
                      "absolute",

                    top: "15px",

                    right: "15px",

                    backgroundColor:
                      product.stock > 0
                        ? "#22c55e"
                        : "#ef4444",

                    color: "white",

                    padding:
                      "8px 14px",

                    borderRadius:
                      "30px",

                    fontSize: "14px",

                    fontWeight:
                      "bold",
                  }}
                >

                  {product.stock > 0
                    ? "In Stock"
                    : "Sold Out"}

                </div>

              </div>

              {/* CONTENT */}

              <div
                style={{
                  padding: "28px",
                }}
              >

                <h2
                  style={{
                    color: "white",
                    fontSize: "28px",
                    marginBottom: "12px",
                  }}
                >
                  {product.name}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: "1.7",
                    marginBottom: "25px",
                  }}
                >
                  Premium enterprise
                  product reservation
                  with intelligent
                  warehouse stock
                  management and
                  real-time inventory
                  synchronization.
                </p>

                {/* PRICE */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                  }}
                >

                  <div>

                    <p
                      style={{
                        color:
                          "#94a3b8",
                        marginBottom:
                          "5px",
                      }}
                    >
                      Price
                    </p>

                    <h1
                      style={{
                        color: "white",
                        margin: 0,
                        fontSize: "32px",
                      }}
                    >
                      ₹ {product.price}
                    </h1>

                  </div>

                  <div
                    style={{
                      textAlign:
                        "right",
                    }}
                  >

                    <p
                      style={{
                        color:
                          "#94a3b8",
                        marginBottom:
                          "5px",
                      }}
                    >
                      Stock
                    </p>

                    <h2
                      style={{
                        color:
                          "#22c55e",
                        margin: 0,
                      }}
                    >
                      {product.stock}
                    </h2>

                  </div>

                </div>

                {/* WAREHOUSE */}

                <div
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.06)",

                    padding: "16px",

                    borderRadius:
                      "16px",

                    marginBottom:
                      "25px",
                  }}
                >

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      marginBottom:
                        "6px",
                    }}
                  >
                    Warehouse
                  </p>

                  <h3
                    style={{
                      color: "white",
                      margin: 0,
                    }}
                  >
                    {
                      product.warehouse
                    }
                  </h3>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() =>
                    reserveProduct(
                      product
                    )
                  }

                  disabled={
                    product.stock <= 0
                  }

                  style={{
                    width: "100%",

                    background:
                      product.stock <= 0
                        ? "#475569"
                        : "linear-gradient(to right, #2563eb, #7c3aed)",

                    color: "white",

                    padding: "18px",

                    border: "none",

                    borderRadius:
                      "18px",

                    fontSize: "17px",

                    fontWeight:
                      "bold",

                    cursor:
                      product.stock <= 0
                        ? "not-allowed"
                        : "pointer",

                    transition:
                      "0.3s",
                  }}
                >

                  {product.stock <= 0
                    ? "Out Of Stock"
                    : "Reserve Product"}

                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}