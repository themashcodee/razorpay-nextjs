-- CreateTable
CREATE TABLE "Payment" (
    "order_id" TEXT NOT NULL,
    "payment_id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("order_id")
);
