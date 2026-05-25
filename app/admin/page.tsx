"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function AdminPage() {

  const router =
    useRouter();

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    const admin =
      localStorage.getItem(
        "admin"
      );

    if (!admin) {

      router.push(
        "/login"
      );

      return;

    }

    fetchProducts();

  }, []);

  const fetchProducts =
    async () => {

      const response =
        await fetch(
          "/api/products"
        );

      const data =
        await response.json();

      setProducts(data);

      setLoading(false);

    };

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#020617",

          color: "white",

          fontSize: "24px",
        }}
      >
        Loading...
      </div>

    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "#020617",

        padding: "40px",

        fontFamily:
          "Arial",
      }}
    >

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          marginBottom:
            "30px",
        }}
      >

        <h1
          style={{
            color: "white",

            fontSize: "40px",
          }}
        >
          Admin Dashboard
        </h1>

        <button
          onClick={() => {

            localStorage.removeItem(
              "admin"
            );

            router.push(
              "/login"
            );

          }}
          style={{
            backgroundColor:
              "#ef4444",

            color: "white",

            border: "none",

            padding:
              "12px 20px",

            borderRadius:
              "12px",

            cursor:
              "pointer",
          }}
        >
          Logout
        </button>

      </div>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",

          gap: "30px",
        }}
      >

        {products.map(
          (product: any) => (

            <div
              key={product.id}
              style={{
                backgroundColor:
                  "white",

                borderRadius:
                  "24px",

                overflow:
                  "hidden",
              }}
            >

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",

                  height: "220px",

                  objectFit:
                    "cover",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >

                <h2>
                  {product.name}
                </h2>

                <h1>
                  ₹ {product.price}
                </h1>

                <p>
                  Warehouse:
                  {" "}
                  {product.warehouse}
                </p>

                <p
                  style={{
                    color:
                      "#16a34a",
                  }}
                >
                  Stock:
                  {" "}
                  {product.stock}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}