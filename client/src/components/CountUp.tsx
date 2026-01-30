import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface CountUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export function CountUp({
    value,
    suffix = "",
    prefix = "",
    duration = 2.5,
    className = "",
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            animate(motionValue, value, {
                duration: duration,
                ease: "easeOut",
            });
        }
    }, [isInView, value, motionValue, duration]);

    useEffect(() => {
        return motionValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
            }
        });
    }, [motionValue, suffix, prefix]);

    return <span ref={ref} className={className} />;
}
