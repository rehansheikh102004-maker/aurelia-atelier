"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function DraggableCardContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-pan-y ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            constraintsRef: containerRef,
          });
        }
        return child;
      })}
    </div>
  );
}

export function DraggableCardBody({
  children,
  initialX = 0,
  initialY = 0,
  initialRotate = 0,
  constraintsRef,
  className = "",
}: {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialRotate?: number;
  constraintsRef?: React.RefObject<HTMLDivElement>;
  className?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const rotate = useTransform(x, [-300, 300], [-15, 15]);
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.12}
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      style={{
        x,
        y,
        rotate: isDragging ? springRotate : initialRotate,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: 1.03, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
      className={`absolute transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
