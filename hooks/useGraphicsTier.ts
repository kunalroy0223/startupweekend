"use client";
import { useEffect, useState } from "react";

export type GraphicsTier = "pending" | "full" | "lite";

/**
 * Decides whether heavy WebGL is worth running on this device.
 * "lite" → reduced motion, Save-Data, no WebGL, or very constrained hardware.
 */
export function useGraphicsTier(): GraphicsTier {
  const [tier, setTier] = useState<GraphicsTier>("pending");
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const saveData = Boolean(nav.connection?.saveData);
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory < 2;
    const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 3;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = Boolean(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setTier(!reduce && !saveData && !lowMem && !lowCpu && webgl ? "full" : "lite");
  }, []);
  return tier;
}
