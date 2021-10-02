import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function useAnimateIn({
  customVars,
  delay,
  distance,
  duration,
  repeat,
  threshold,
}) {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: threshold || 0.75,
    triggerOnce: repeat ? false : true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const vars = customVars || {
    hidden: { opacity: 0, y: distance || `2rem` },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay || 0,
        duration: duration || 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return { ref, ctrls, vars };
}
