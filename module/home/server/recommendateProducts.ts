import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Product } from "@/db";
import { Category } from "@/db/model/categories.model";
import { Iorder, Order } from "@/db/model/Order.model";
import { Iproduct } from "@/db/model/product";
import { mongooseConnect } from "@/db/mongoose";
import { getServerSession } from "next-auth";

export const getRecommendateProducts = async () => {
  try {
    await mongooseConnect();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      const newProduct = await Product.find({}, null, {
        limit: 10,
      });

      return {
        recommendateProducts: JSON.parse(JSON.stringify(newProduct)),
      };
    }

    const orders = await Order.find({ clientuser: userId })
      .sort({ createdAt: -1 })
      .limit(2)
      .select("products");

    const productIds = orders.flatMap((order) => order.products);

    const products = await Product.find({ _id: { $in: productIds } }).populate(
      "category",
    ).select('category');

    const parentCategoryIds = products.map((p) => p.category.parent);

    const categories = await Category.find({
      parent: { $in: parentCategoryIds },
    }).select('_id');

    const recommendedProducts = await Product.find({
      category: { $in: categories },
      _id: { $nin: productIds }, // exclude already purchased
    }).limit(10);


    return {
      recommendateProducts: JSON.parse(JSON.stringify(recommendedProducts)),
    };
  } catch (error) {
    console.log(error);
  }
};
