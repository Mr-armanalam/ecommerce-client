"use client";
import React, { useContext } from "react";
import { CartIcon } from "../../account/component/icons";
import { CartContext } from "@/context/CartContext";
import { isAddedtoCart } from "@/lib/utils";

interface IcartButton {
  productId: string;
  btnType: string;
  fill?: string;
  icon?: boolean;
}

const CartButton = ({ btnType, productId, icon = true, fill }: IcartButton) => {
  const { addProduct } = useContext(CartContext);
  return (
    <button
      onClick={() => addProduct(productId)}
      className={`btn-primary1 ${btnType} ${isAddedtoCart({ id: productId }) && "cursor-not-allowed opacity-30"} px-5 py-1.5 disabled:cursor-default`}
      disabled={isAddedtoCart({ id: productId })}
    >
      {icon && (
        <>
          <CartIcon className={fill} /> &nbsp;
        </>
      )}
      Add to cart
    </button>
  );
};

export default CartButton;
