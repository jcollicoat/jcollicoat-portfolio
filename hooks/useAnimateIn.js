import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function useAnimateIn({ delay, distance, duration, threshold }) {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: threshold || 0.75,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const vars = {
    hidden: { opacity: 0, y: distance || `2rem` },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: duration || 1,
        ease: `easeOut`,
      },
    },
  };

  return { ref, ctrls, vars };
}
