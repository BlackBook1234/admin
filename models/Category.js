import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: String },
  properties: [{ type: Object }]
});

export const Category = models?.Category || model('Category', CategorySchema);

export const DefaultMainCategory = [
  { name: "Toyota", id: 1 },
  { name: "Lexus", id: 2 },
  { name: "Honda", id: 3 },
  { name: "Nissan", id: 4 },
  { name: "Hyundai", id: 5 },
  { name: "Kia", id: 6 },
  { name: "Mercedes-Benz", id: 7 },
  { name: "BMW", id: 8 },
  { name: "Audi", id: 9 },
  { name: "Volkswagen", id: 10 },
  { name: "Mazda", id: 11 },
  { name: "Ford", id: 12 },
  { name: "Chevrolet", id: 13 },
  { name: "Mitsubishi", id: 14 },
  { name: "Subaru", id: 15 }
];

