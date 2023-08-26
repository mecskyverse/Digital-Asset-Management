import React, { useState } from "react";
import { motion } from "framer-motion";

function Slider({ min, max, value, handleChange }) {

    return (
        <div className=" mt-10 w-4/5">

            <motion.input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="slider "
                transition={{ duration: 0.3 }}
            />
        </div>


    );
}

export default Slider;
