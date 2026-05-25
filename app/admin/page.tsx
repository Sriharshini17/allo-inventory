"use client";

import {
  useEffect,
  useState,
} from "react";

export default function AdminPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [warehouse, setWarehouse] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {

    const admin =
      localStorage.getItem(
        "admin"
      );

    if (!admin) {

      window.location.href =
        "/login";

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

    };

  const addProduct =
    async () => {

      await fetch(
        "/api/admin/products",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            name,

            price:
              Number(price),

            warehouse,

            stock:
              Number(stock),

            image,

          }),

        }
      );

      setName("");
      setPrice("");
      setWarehouse("");
      setStock("");
      setImage("");

      fetchProducts();

    };

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom right, #020617, #111827)",

        padding: "40px",

        fontFamily:
          "Arial",
      }}
    >

      {/* LOGOUT */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",

          marginBottom: "20px",
        }}
      >

        <button
          onClick={() => {

            localStorage.removeItem(
              "admin"
            );

            window.location.href =
              "/login";

          }}
          style={{
            backgroundColor:
              "#ef4444",

            color: "white",

            border: "none",

            padding:
              "12px 22px",

            borderRadius:
              "14px",

            cursor: "pointer",

            fontWeight:
              "bold",
          }}
        >
          Logout
        </button>

      </div>

      {/* TITLE */}

      <h1
        style={{
          color: "white",

          fontSize: "42px",

          marginBottom: "40px",
        }}
      >
        Admin Dashboard
      </h1>

      {/* FORM */}

      <div
        style={{
          backgroundColor:
            "rgba(255,255,255,0.08)",

          padding: "30px",

          borderRadius:
            "24px",

          marginBottom:
            "40px",
        }}
      >

        <h2
          style={{
            color: "white",

            marginBottom:
              "25px",
          }}
        >
          Add Product
        </h2>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",

            gap: "20px",
          }}
        >

          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Warehouse"
            value={warehouse}
            onChange={(e) =>
              setWarehouse(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>

        <button
          onClick={addProduct}
          style={{
            marginTop: "25px",

            background:
              "linear-gradient(to right, #2563eb, #7c3aed)",

            color: "white",

            padding:
              "16px 28px",

            border: "none",

            borderRadius:
              "16px",

            fontWeight:
              "bold",

            cursor: "pointer",
          }}
        >
          Add Product
        </button>

      </div>

      {/* PRODUCTS */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",

          gap: "30px",
        }}
      >

        {products.map(
          (product: any) => (

            <div
              key={product.id}
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.08)",

                borderRadius:
                  "24px",

                overflow: "hidden",
              }}
            >

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >

                <h2
                  style={{
                    color: "white",
                  }}
                >
                  {product.name}
                </h2>

                <h1
                  style={{
                    color: "white",
                  }}
                >
                  ₹ {product.price}
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",
                  }}
                >
                  Warehouse:
                  {
                    product.warehouse
                  }
                </p>

                <p
                  style={{
                    color: "#22c55e",
                  }}
                >
                  Stock:
                  {
                    product.stock
                  }
                </p>

                {/* STOCK BUTTONS */}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >

                  {/* INCREASE */}

                  <button
                    onClick={async () => {

                      await fetch(
                        "/api/admin/products",
                        {
                          method:
                            "PATCH",

                          headers: {
                            "Content-Type":
                              "application/json",
                          },

                          body: JSON.stringify({

                            id:
                              product.id,

                            stock:
                              product.stock + 1,

                          }),

                        }
                      );

                      fetchProducts();

                    }}
                    style={{
                      flex: 1,

                      backgroundColor:
                        "#22c55e",

                      color: "white",

                      border: "none",

                      padding:
                        "12px",

                      borderRadius:
                        "12px",

                      cursor:
                        "pointer",
                    }}
                  >
                    + Stock
                  </button>

                  {/* DECREASE */}

                  <button
                    onClick={async () => {

                      if (
                        product.stock <= 0
                      ) return;

                      await fetch(
                        "/api/admin/products",
                        {
                          method:
                            "PATCH",

                          headers: {
                            "Content-Type":
                              "application/json",
                          },

                          body: JSON.stringify({

                            id:
                              product.id,

                            stock:
                              product.stock - 1,

                          }),

                        }
                      );

                      fetchProducts();

                    }}
                    style={{
                      flex: 1,

                      backgroundColor:
                        "#f59e0b",

                      color: "white",

                      border: "none",

                      padding:
                        "12px",

                      borderRadius:
                        "12px",

                      cursor:
                        "pointer",
                    }}
                  >
                    - Stock
                  </button>

                </div>

                {/* DELETE */}

                <button
                  onClick={async () => {

                    await fetch(
                      "/api/admin/products",
                      {
                        method:
                          "DELETE",

                        headers: {
                          "Content-Type":
                            "application/json",
                        },

                        body: JSON.stringify({

                          id:
                            product.id,

                        }),

                      }
                    );

                    fetchProducts();

                  }}
                  style={{
                    width: "100%",

                    marginTop: "15px",

                    backgroundColor:
                      "#ef4444",

                    color: "white",

                    border: "none",

                    padding:
                      "14px",

                    borderRadius:
                      "14px",

                    cursor:
                      "pointer",
                  }}
                >
                  Delete Product
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "15px",

  borderRadius:
    "14px",

  border: "none",

  outline: "none",

  backgroundColor:
    "rgba(255,255,255,0.1)",

  color: "white",

} as React.CSSProperties;