/* ───────────────────────────────────────────
   i18n — language is set per HTML entry:
     /          → <html lang="pt-BR">  (canonical)
     /en/       → <html lang="en">
     /es/       → <html lang="es">
   One JS bundle serves all three trees; components
   read LANG at module load and pick their copy.
   ─────────────────────────────────────────── */

const htmlLang =
  (typeof document !== "undefined" && document.documentElement.lang) || "pt-BR";

export const LANG = htmlLang.startsWith("en")
  ? "en"
  : htmlLang.startsWith("es")
  ? "es"
  : "pt";

// Base path of the current language tree ("" for PT at the root).
export const LANG_BASE = LANG === "pt" ? "" : `/${LANG}`;

// Where the insights archive lives for this language.
// ES has no translated articles yet — it points to the PT archive.
export const INSIGHTS_HREF = LANG === "en" ? "/en/insights/" : "/insights/";
