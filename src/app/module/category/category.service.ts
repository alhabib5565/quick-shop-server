import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { MainCategory } from "../mainCategory/mainCategory.model";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
import { generateCategoryId } from "./utils";

const create_category_into_DB = async (payload: TCategory) => {
    const mainCategory = await MainCategory.findById(payload.mainCategory)
    if (!mainCategory) {
        throw new AppError(httpStatus.NOT_FOUND, 'Main category does not exist')
    }
    payload._id = payload.categoryName.split(' ').join('-').toLowerCase()
    payload.categoryId = payload.categoryName.split('').slice(0, 2).join('').toUpperCase() + '-' + await generateCategoryId()
    const result = await Category.create(payload)
    return result
}

const get_all_category_from_DB = async () => {
    const result = await Category.find().populate('mainCategory')
    return result
}
const get_single_category_from_DB = async (id: string) => {
    const result = await Category.findById(id).populate('mainCategory')
    return result
}
export const category_services = {
    create_category_into_DB,
    get_all_category_from_DB,
    get_single_category_from_DB
}