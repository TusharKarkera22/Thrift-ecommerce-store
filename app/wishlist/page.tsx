"use client";

import { useState } from "react";
import Product from "@/components/Product";
import { useWishListContext } from "@/context/WishListContext";
import { useEffect } from "react";
import { RxClipboardCopy } from "react-icons/rx";
import { db } from "@/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";
import { ProductType } from "@/types";
import { productList } from "@/data/products";

const wishlist = ({ searchParams }: { searchParams: { uid: string } }) => {
  //Global state
  const { likedProducts } = useWishListContext();
  const {} = useAuthContext();

  //Local state
  const [dbProducts, setDbProducts] = useState([] as ProductType[]);

  useEffect(() => {
    const getUserData = async () => {
      if (searchParams.uid) {
        const docRef = doc(db, "wishlists", searchParams.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const products: ProductType[] = [];
          console.log("Document data:", docSnap.data());
          const res: number[] = docSnap.data().products;
          res.forEach((item) => {
            const resProduct = productList.find(
              (product) => product.id === item
            );
            if (resProduct) {
              products.push(resProduct);
            }
          });
          setDbProducts(products);
        } else {
          console.log("No such document!");
        }
      }
    };

    getUserData();
  }, []);
  return (
    <div className="py-[50px] px-[60px] ">
      <div className="w-full h-[200px] bg-[#ddd7dc]/70 px-[30px] flex flex-col ">
        {searchParams.uid ? (
          <>
            <h1 className="text-[3rem] font-braahOne">Your Friend's List</h1>
            <p className="mt-[30px] text-[1.2rem] font-secondary font-medium">
              No gree for am oo!!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[3rem] font-braahOne">
              Your Favourite Products
            </h1>
            <p className="text-[1.2rem] font-secondary font-medium">
              Share with your friends
            </p>
            <p className="self-end mt-[20px] text-[1.2rem] text-blue-700 flex items-center gap-[6px]">
              COPY LINK <RxClipboardCopy className="text-[30px]" />
            </p>
          </>
        )}
      </div>
      <div className="mt-[50px] w-full flex flex-wrap gap-[40px]">
        {searchParams.uid &&
          dbProducts?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        {!searchParams.uid &&
          likedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default wishlist;
