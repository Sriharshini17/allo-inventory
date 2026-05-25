"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ReservationPage() {

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const name =
    searchParams.get("name");

  const price =
    searchParams.get("price");

  const image =
    searchParams.get("image");

  const warehouse =
    searchParams.get("warehouse");

  const reservationId =
    searchParams.get(
      "reservationId"
    );

  const [timeLeft, setTimeLeft] =
    useState(600);

  const [status, setStatus] =
    useState("Pending");

  useEffect(() => {

    const timer =
      setInterval(() => {

        setTimeLeft((prev) => {

          if (prev <= 1) {

            clearInterval(timer);

            fetch(
              "/api/reservations/1/release",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({

                  productName:
                    name,

                }),

              }
            );

            setStatus(
              "Expired"
            );

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [name]);

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #020617, #0f172a)",

        padding: "40px",

        fontFamily:
          "Arial, sans-serif",
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",

          alignItems: "center",

          marginBottom: "35px",
        }}
      >

        <div>

          <h1
            style={{
              color: "white",
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            Reservation Portal
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            Enterprise Product
            Reservation &
            Verification
          </p>

        </div>

        <div
          style={{
            backgroundColor:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(10px)",

            padding:
              "18px 28px",

            borderRadius:
              "20px",
          }}
        >

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "5px",
            }}
          >
            Reservation ID
          </p>

          <h2
            style={{
              color: "white",
              margin: 0,
            }}
          >
            #{reservationId}
          </h2>

        </div>

      </div>

      {/* MAIN CARD */}

      <div
        style={{
          maxWidth: "1200px",

          margin: "0 auto",

          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "35px",
        }}
      >

        {/* LEFT SIDE */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(12px)",

            borderRadius:
              "30px",

            overflow: "hidden",

            boxShadow:
              "0px 15px 40px rgba(0,0,0,0.3)",
          }}
        >

          {image && (

            <img
              src={image}
              alt="Product"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
            />

          )}

        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(12px)",

            borderRadius:
              "30px",

            padding: "40px",

            boxShadow:
              "0px 15px 40px rgba(0,0,0,0.3)",
          }}
        >

          {/* STATUS */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",

              alignItems: "center",

              marginBottom: "30px",
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize: "40px",
                margin: 0,
              }}
            >
              {name}
            </h1>

            <div
              style={{
                padding:
                  "10px 18px",

                borderRadius:
                  "30px",

                fontWeight:
                  "bold",

                backgroundColor:
                  status ===
                  "Confirmed"
                    ? "#22c55e"
                    : status ===
                      "Cancelled"
                    ? "#ef4444"
                    : status ===
                      "Expired"
                    ? "#f59e0b"
                    : "#3b82f6",

                color: "white",
              }}
            >
              {status}
            </div>

          </div>

          {/* DESCRIPTION */}

          <p
            style={{
              color: "#cbd5e1",

              lineHeight: "1.8",

              marginBottom: "35px",

              fontSize: "17px",
            }}
          >
            Your reservation is
            securely processed
            through our enterprise
            inventory management
            system with live stock
            synchronization and
            intelligent warehouse
            handling.
          </p>

          {/* PRICE */}

          <div
            style={{
              marginBottom: "35px",
            }}
          >

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              Product Price
            </p>

            <h1
              style={{
                color: "white",
                fontSize: "46px",
                margin: 0,
              }}
            >
              ₹ {price}
            </h1>

          </div>

          {/* INFO CARDS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: "20px",

              marginBottom: "35px",
            }}
          >

            <div
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.05)",

                padding: "22px",

                borderRadius:
                  "20px",
              }}
            >

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "8px",
                }}
              >
                Warehouse
              </p>

              <h2
                style={{
                  color: "white",
                  margin: 0,
                }}
              >
                {warehouse}
              </h2>

            </div>

            <div
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.05)",

                padding: "22px",

                borderRadius:
                  "20px",
              }}
            >

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "8px",
                }}
              >
                Expires In
              </p>

              <h2
                style={{
                  color: "#22c55e",
                  margin: 0,
                }}
              >
                {minutes}:
                {seconds
                  .toString()
                  .padStart(2, "0")}
              </h2>

            </div>

          </div>

          {/* BUTTONS */}

          {status === "Pending" && (

            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >

              {/* CONFIRM */}

              <button
                onClick={async () => {

                  const response =
                    await fetch(
                      "/api/reservations/1/confirm",
                      {
                        method:
                          "POST",
                      }
                    );

                  const data =
                    await response.json();

                  setStatus(
                    "Confirmed"
                  );

                  alert(
                    data.message
                  );

                }}
                style={{
                  flex: 1,

                  background:
                    "linear-gradient(to right, #22c55e, #16a34a)",

                  color: "white",

                  padding: "18px",

                  border: "none",

                  borderRadius:
                    "18px",

                  fontSize: "17px",

                  fontWeight:
                    "bold",

                  cursor: "pointer",
                }}
              >
                Confirm Purchase
              </button>

              {/* CANCEL */}

              <button
                onClick={async () => {

                  const response =
                    await fetch(
                      "/api/reservations/1/release",
                      {
                        method:
                          "POST",

                        headers: {
                          "Content-Type":
                            "application/json",
                        },

                        body: JSON.stringify({

                          productName:
                            name,

                        }),

                      }
                    );

                  const data =
                    await response.json();

                  setStatus(
                    "Cancelled"
                  );

                  alert(
                    data.message
                  );

                }}
                style={{
                  flex: 1,

                  background:
                    "linear-gradient(to right, #ef4444, #dc2626)",

                  color: "white",

                  padding: "18px",

                  border: "none",

                  borderRadius:
                    "18px",

                  fontSize: "17px",

                  fontWeight:
                    "bold",

                  cursor: "pointer",
                }}
              >
                Cancel Reservation
              </button>

            </div>

          )}

          {/* BACK BUTTON */}

          <button
            onClick={() =>
              router.push("/")
            }
            style={{
              width: "100%",

              marginTop: "25px",

              backgroundColor:
                "rgba(255,255,255,0.08)",

              color: "white",

              padding: "18px",

              border:
                "1px solid rgba(255,255,255,0.1)",

              borderRadius:
                "18px",

              fontSize: "16px",

              fontWeight:
                "bold",

              cursor: "pointer",
            }}
          >
            Back To Products
          </button>

        </div>

      </div>

    </div>

  );

}