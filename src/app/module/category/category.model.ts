import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const category_schema = new Schema<TCategory>({
    _id: { type: String, required: true },
    mainCategoryName: { type: String, required: true, ref: 'MainCategory' },
    categoryName: { type: String, required: true, unique: true },
    imageURL: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
})

export const Category = model<TCategory>('Category', category_schema)
