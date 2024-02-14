import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import NotFound from "../img/NotFound.svg"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue}) => {
    const rowContainer = useRef();
    const [items , setItems] = useState([]);
    const [{cartItems}, dispatch] = useStateValue();
   

    const addtocart = ()=>{  
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems :items,
      })
      localStorage.setItem("cartItems", JSON.stringify(items))
    }

    useEffect(()=>{
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])

    useEffect(()=>{
      addtocart()
    },[items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth  ${
        flag ? "overflow-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center h-420"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  shadow-md bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly realtive"
          >
            <div className="w-full flex items-center justify-between">
                <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
                >
                <img
                src={item?.imageURL}
                alt=""
                className="w-full h-full object-contain"
              />
                </motion.div>
             
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={()=> setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8" >
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">${item?.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))) : 
        (<div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="" className="h-300" />
          <p className="text-xl font-semibold text-headingColor my-2">Items not available</p>
        </div> )}
    </div>
  );
};

export default RowContainer;
