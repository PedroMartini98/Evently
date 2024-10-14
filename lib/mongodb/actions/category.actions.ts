"use server";

import { handleError } from "@/lib/utils";
import { connectToDB } from "../database";
import Category from "../database/models/category.model";
import { CreateCategoryParams } from "@/types";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDB();

    const newCategoty = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategoty));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDB();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
