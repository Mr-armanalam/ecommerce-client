/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CartButton from "./client/CartButton";
import React from "react";
import Image from "next/image";

interface props {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

const Featured = ({ product }: { product: props }) => {
  return (
    <div className="bg-[#222] h-90 rounded-md py-8 text-white">
      <div className="nav-center h-full">
        <div className="grid h-full items-center grid-cols-5 gap-8 max-sm:grid-cols-1">
          <div className=" flex justify-center gap-y-4 flex-col items-start h-full col-span-3 md:px-8">
              <h1 className="text-6xl font-semibold">{product?.title}</h1>
              <p className="description mt-3">{product?.description}</p>
              <div className="mt-6 flex gap-2">
                <Link
                  href={"/products/" + product?._id}
                  className="btn-primary1 btn_white_Outline px-4 py-2"
                >
                  Read more
                </Link>
                <CartButton
                  fill={"fill-black size-5"}
                  productId={product?._id}
                  btnType={"btn_white_noOutline "}
                />
              </div>
          </div>
          <div className="grid-column relative h-full col-span-2 flex max-h-50 items-center justify-center max-sm:-order-1">
            <div className="aspect-3/6 ml-aut mr-8 md:pr-10">
            
              <Image
                src={product?.images[0]}
                alt="home product"
                className="sm:ml-auto object-contain"
                fill
                // className="w-[85%] max-md:w-full sm:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

// import styled from "styled-components";
// import Center from "./Center";
// import Button from "./Button";
// import ButtonLink from "./ButtonLink";
// const Bg = styled.div`
//   background-color: #222;
//   color: #fff;
//   padding: 30px 0;
// `;

// const Title = styled.h1`
//   margin: 0;
//   font-weight: normal;
//   font-size: 3rem;
// `;

// const Desc = styled.p`
//   color: #aaa;
//   font-size: 0.8rem;
// `;

// const ColumnWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 1.1fr 0.9fr;
//   gap: 40px;
//   img {
//     max-width: 90%;
//   }
// `;

// const Column = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-top: 25px;
// `;
