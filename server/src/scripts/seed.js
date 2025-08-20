import "dotenv/config";
import mongoose from "mongoose";

import Item from "../models/Item.js";
import MenuItem from "../models/MenuItem.js";
import Package from "../models/Package.js";
import FAQ from "../models/FAQ.js";
import User from "../models/User.js";

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected. Clearing sample collections...");
  await Promise.all([
    Item.deleteMany({}),
    MenuItem.deleteMany({}),
    Package.deleteMany({}),
    FAQ.deleteMany({})
  ]);

  console.log("Seeding items...");
  const items = await Item.insertMany([
    {
      name: "20x20 Tent",
      slug: "20x20-tent",
      category: "Tents",
      pricePerDay: 299,
      stock: 4,
      requires_setup: true,
      tags: ["shade", "wedding"],
      images: [{ url: "/img/tent-20x20.jpg", alt: "20x20 white tent" }],
      description: "Sturdy 20x20 party tent — includes pro setup/takedown."
    },
    {
      name: "6ft Rectangular Table",
      slug: "6ft-table",
      category: "Tables",
      pricePerDay: 12,
      stock: 50,
      tags: ["banquet"],
      images: [{ url: "/img/6ft.jpg", alt: "6ft table" }],
      description: "Seats 6–8 guests comfortably."
    },
    {
      name: "White Folding Chair",
      slug: "white-chair",
      category: "Chairs",
      pricePerDay: 2,
      stock: 300,
      tags: ["chair"],
      images: [{ url: "/img/chair.jpg", alt: "white folding chair" }]
    },
    {
      name: "Patio Heater (Propane)",
      slug: "patio-heater",
      category: "Heaters",
      pricePerDay: 59,
      stock: 10,
      tags: ["outdoor", "heat"],
      images: [{ url: "/img/heater.jpg", alt: "patio heater" }]
    }
  ]);

  console.log("Seeding menu...");
  const menu = await MenuItem.insertMany([
    {
      name: "Carne Asada Tacos",
      cuisine: "Mexican",
      pricePerPerson: 14,
      allergens: [],
      images: [{ url: "/img/tacos.jpg", alt: "carne asada tacos" }],
      description: "Grilled steak tacos with handmade tortillas, salsas, and toppings."
    },
    {
      name: "Veggie Pasta",
      cuisine: "Italian",
      pricePerPerson: 12,
      allergens: ["gluten"],
      images: [{ url: "/img/pasta.jpg", alt: "vegetable pasta" }],
      description: "Roasted seasonal vegetables, garlic, olive oil, fresh herbs."
    }
  ]);

  console.log("Seeding packages...");
  await Package.insertMany([
    {
      name: "Backyard Party Pack",
      slug: "backyard-party-pack",
      base_price: 499,
      included_items: [
        { refId: items.find(i => i.slug === "6ft-table")._id, qty: 6 },
        { refId: items.find(i => i.slug === "white-chair")._id, qty: 40 }
      ],
      upsells: [{ label: "Add 20x20 Tent", price: 299 }],
      description: "Tables + chairs for ~40 guests. Delivery included in local zone."
    }
  ]);

  console.log("Seeding FAQs...");
  await FAQ.insertMany([
    {
      question: "Do you set up tents?",
      answer: "Yes, tents include professional setup and takedown.",
      sort: 1
    },
    {
      question: "Do you deliver across Los Angeles?",
      answer: "Yes. Delivery fees vary by distance; San Fernando Valley is our base.",
      sort: 2
    }
  ]);

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!exists) {
      console.log("Creating admin user...");
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    }
  } else {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin creation.");
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
// This script seeds the database with initial data for items, menu items, packages, FAQs, and an admin user if credentials are provided.