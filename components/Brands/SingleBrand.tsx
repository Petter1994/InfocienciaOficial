import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

type Props = {
  center: string
  index: number
}

const SingleBrand = ({ center, index }: Props) => {


  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: index }}
        viewport={{ once: true }}
        className="animate_top mx-w-full relative block h-10 w-[98px]"
      >
        <span className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white capitalize 
           tracking-wide leading-tight
           transform transition duration-300 hover:scale-105
           drop-shadow-lg hover:drop-shadow-xl
           bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {center}
        </span>
      </motion.a>
    </>
  );
};

export default SingleBrand;
