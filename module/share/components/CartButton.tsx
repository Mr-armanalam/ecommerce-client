"use client";
import React, { useContext } from "react";
import { CartIcon } from "../../account/component/icons";

interface IcartButton {
  productId: string;
  btnType: string;
  fill?: string;
  icon?: boolean;
  isAdded?: boolean; // New prop to indicate if the product is already in the cart
  onClick: (productId: string) => void; // Explicitly define onClick prop
}

const CartButton = ({
  btnType,
  productId,
  icon = true,
  fill,
  isAdded = false,
  onClick,
}: IcartButton) => {
  return (
    <button
      onClick={() => onClick(productId)}
      className={`btn-primary1 ${btnType} ${isAdded && "cursor-not-allowed opacity-30"} px-5 py-1.5 disabled:cursor-default`}
      disabled={isAdded}
    >
      {icon && (
        <>
          <CartIcon className={fill} /> &nbsp;
        </>
      )}
      {isAdded ? "Added" : "Add to cart"}
    </button>
  );
};

export default CartButton;
