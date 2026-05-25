"use client";

import {
  useEffect,
  useState,
  Suspense,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

function ReservationContent() {

  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const name =
    searchParams.get(
      "name"
    );

  const price =
    searchParams.get(
      "price"
    );

  const image =
    searchParams.get(
      "image"
    );

  const warehouse =
    searchParams.get(
      "warehouse"
    );

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

        setTimeLeft(
          (prev) => {

            if (prev <= 1) {

              clearInterval(
                timer
              );

              setStatus(
                "Expired"
              );

              return 0;

            }

            return prev - 1;

          }
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom right, #020617, #111827)",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding: "30px",

        fontFamily:
          "Arial",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "850px",

          backgroundColor:
            "white",

          borderRadius:
            "32px",

          overflow: "hidden",
        }}
      >

        {image && (

          <img
            src={image}
            alt="Product"
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />

        )}

        <div
          style={{
            padding: "40px",
          }}
        >

          <div
            style={{
              display: "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",
            }}
          >

            <h1
              style={{
                fontSize: "38px",
              }}
            >
              {name}
            </h1>

            <div
              style={{
                backgroundColor:

                  status ===
                  "Confirmed"

                    ? "#dcfce7"

                    : status ===
                      "Cancelled"

                    ? "#fee2e2"

                    : "#fef3c7",

                color:

                  status ===
                  "Confirmed"

                    ? "#166534"

                    : status ===
                      "Cancelled"

                    ? "#991b1b"

                    : "#92400e",

                padding:
                  "12px 24px",

                borderRadius:
                  "999px",

                fontWeight:
                  "bold",
              }}
            >
              {status}
            </div>

          </div>

          <p
            style={{
              color: "#64748b",

              marginTop: "20px",

              fontSize: "20px",

              lineHeight: "1.7",
            }}
          >
            Premium product reservation
            with real-time inventory
            management.
          </p>

          <h2
            style={{
              marginTop: "25px",

              fontSize: "34px",
            }}
          >
            ₹ {price}
          </h2>

          <div
            style={{
              marginTop: "35px",

              backgroundColor:
                "#f8fafc",

              padding: "30px",

              borderRadius:
                "24px",
            }}
          >

            <h2>

              Warehouse:
              {" "}
              {warehouse}

            </h2>

            <h2
              style={{
                marginTop: "20px",
              }}
            >

              Reservation ID:
              {" "}
              #
              {reservationId}

            </h2>

            <h2
              style={{
                marginTop: "20px",
              }}
            >
              Expires In:
            </h2>

            <h1
              style={{
                marginTop: "15px",

                color:
                  "#2563eb",

                fontSize: "42px",
              }}
            >

              {minutes}:
              {seconds
                .toString()
                .padStart(
                  2,
                  "0"
                )}

            </h1>

          </div>

          {status ===
            "Pending" && (

            <div
              style={{
                display: "flex",

                gap: "20px",

                marginTop: "35px",
              }}
            >

              {/* CONFIRM */}

              <button
                onClick={async () => {

                  const response =
                    await fetch(

                      `/api/reservations/${reservationId}/confirm`,

                      {
                        method:
                          "POST",
                      }

                    );

                  const data =
                    await response.json();

                  alert(
                    data.message
                  );

                  setStatus(
                    "Confirmed"
                  );

                }}
                style={{
                  flex: 1,

                  background:
                    "linear-gradient(to right,#2563eb,#7c3aed)",

                  color: "white",

                  border: "none",

                  padding: "18px",

                  borderRadius:
                    "18px",

                  fontSize: "18px",

                  fontWeight:
                    "bold",

                  cursor:
                    "pointer",
                }}
              >
                Confirm Purchase
              </button>

              {/* CANCEL */}

              <button
                onClick={async () => {

                  const response =
                    await fetch(

                      `/api/reservations/${reservationId}/release`,

                      {
                        method:
                          "POST",
                      }

                    );

                  const data =
                    await response.json();

                  alert(
                    data.message
                  );

                  setStatus(
                    "Cancelled"
                  );

                }}
                style={{
                  flex: 1,

                  backgroundColor:
                    "#ef4444",

                  color: "white",

                  border: "none",

                  padding: "18px",

                  borderRadius:
                    "18px",

                  fontSize: "18px",

                  fontWeight:
                    "bold",

                  cursor:
                    "pointer",
                }}
              >
                Cancel Reservation
              </button>

            </div>

          )}

          <button
            onClick={() =>
              router.push("/")
            }
            style={{
              width: "100%",

              marginTop: "35px",

              backgroundColor:
                "#e2e8f0",

              border: "none",

              padding: "18px",

              borderRadius:
                "18px",

              fontSize: "18px",

              fontWeight:
                "bold",

              cursor:
                "pointer",
            }}
          >
            Back To Products
          </button>

        </div>

      </div>

    </div>

  );

}

export default function ReservationPage() {

  return (

    <Suspense
      fallback={
        <div>
          Loading...
        </div>
      }
    >

      <ReservationContent />

    </Suspense>

  );

}