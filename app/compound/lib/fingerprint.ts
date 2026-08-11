'use client';
// Device Fingerprinting utility for cum£ound Protocol
// Restricts physical devices to max 2 accounts unless Secret Admin Bypass is activated.

export const generateDeviceFingerprint = (): string => {
  if (typeof window === "undefined") return "server-side";

  const userAgent = navigator.userAgent || "";
  const language = navigator.language || "";
  const screenRes = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

  // Canvas Fingerprinting
  let canvasHash = "";
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px 'Outfit', sans-serif";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("cum£ound_protocol_v1", 2, 15);
      canvasHash = canvas.toDataURL().slice(-50);
    }
  } catch (e) {
    canvasHash = "canvas_blocked";
  }

  const rawString = `${userAgent}|${language}|${screenRes}|${timeZone}|${canvasHash}`;
  
  // Simple hash string generator
  let hash = 0;
  for (let i = 0; i < rawString.length; i++) {
    const char = rawString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return `CUM_DEV_${Math.abs(hash).toString(16)}`;
};

export const checkDeviceLimit = (fingerprint: string): { allowed: boolean; count: number; isBypassed: boolean } => {
  if (typeof window === "undefined") return { allowed: true, count: 1, isBypassed: true };

  // Check Admin / Creator Secret Bypass
  const isBypassed = localStorage.getItem("cum_device_bypass") === "true";
  if (isBypassed) {
    return { allowed: true, count: 1, isBypassed: true };
  }

  const key = `cum_fp_${fingerprint}`;
  const currentCount = parseInt(localStorage.getItem(key) || "0", 10);

  if (currentCount >= 2) {
    return { allowed: false, count: currentCount, isBypassed: false };
  }

  return { allowed: true, count: currentCount, isBypassed: false };
};

export const registerDeviceAccount = (fingerprint: string) => {
  if (typeof window === "undefined") return;
  const key = `cum_fp_${fingerprint}`;
  const currentCount = parseInt(localStorage.getItem(key) || "0", 10);
  localStorage.setItem(key, (currentCount + 1).toString());
};

export const activateAdminBypass = (secretCode: string): boolean => {
  if (secretCode === "DEV_ADMIN_BYPASS" || secretCode === "COMPOUND_ADMIN_2026") {
    localStorage.setItem("cum_device_bypass", "true");
    return true;
  }
  return false;
};
