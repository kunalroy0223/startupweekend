"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let hasNavigated = false;

/**
 * Route transition: a quick green wipe and fade on client-side navigation only.
 * The first page load renders immediately (no hidden SSR content, no wipe over
 * the intro), and the wrapper animates opacity only so it never creates a
 * containing block that would break fixed/pinned elements.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[140] bg-green"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"] }}
          transition={{ duration: 0.85, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1] }}
        />
      ) : null}
      <motion.div initial={animate ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: animate ? 0.35 : 0 }}>
        {children}
      </motion.div>
    </>
  );
}
