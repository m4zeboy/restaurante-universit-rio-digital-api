-- CreateTable
CREATE TABLE "dishes" (
    "id" TEXT NOT NULL,
    "main_dish" TEXT NOT NULL,
    "vegan_main_dish" TEXT NOT NULL,
    "follow_up" TEXT NOT NULL,
    "base_dish" TEXT NOT NULL,
    "salad" TEXT NOT NULL,
    "dessert" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);
