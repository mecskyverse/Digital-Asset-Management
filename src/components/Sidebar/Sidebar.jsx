import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(0px at 0px 0px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
};

export const Sidebar = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="side-nav z-50"
        >
            <motion.div className="background" variants={sidebar} />
            <div className="flex justify-center "><Navigation /></div>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};
