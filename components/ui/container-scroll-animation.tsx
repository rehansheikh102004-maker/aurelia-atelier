"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue, useSpring } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.05, 1];
  };

  // High-performance spring dampening for liquid-smooth 3D perspective tilt
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const rotate = useTransform(smoothProgress, [0, 1], [18, 0]);
  const scale = useTransform(smoothProgress, [0, 1], scaleDimensions());
  const translate = useTransform(smoothProgress, [0, 1], [0, -80]);

  return (
    <div
      className="h-[55rem] md:h-[75rem] flex items-center justify-center relative p-2 md:p-16 select-none"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-16 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center will-change-transform transform-gpu"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
      }}
      className="max-w-5xl -mt-10 mx-auto h-[28rem] md:h-[38rem] w-full border border-[#BDD8E9]/15 p-2 md:p-6 bg-[#001224]/80 backdrop-blur-xl rounded-[30px] shadow-[0_30px_100px_rgba(0,18,36,0.7)] will-change-transform transform-gpu"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#001224] border border-[#BDD8E9]/15 relative">
        {children}
      </div>
    </motion.div>
  );
};
