import { useState, useEffect, useRef } from "react";

const BOOK = "https://cal.com/abiefrommagnor/45min";
const CASE_PET = "https://docs.google.com/document/d/1O8Kjtt3q27KJ4o8rGpaPyDrFMp_1cEFNRugZawV-zm8/edit?tab=t.0#heading=h.2qb00v4d6lu1";
const CASE_RUSSEL = "https://gamma.app/docs/Case-Studies-Magnorium-i55yrc0bro89lq3";

function useReveal(threshold) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: threshold || 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Rv({ children, d }) {
  const [ref, vis] = useReveal();
  const delay = d || 0;
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: "opacity .7s cubic-bezier(.16,1,.3,1) " + delay + "s, transform .7s cubic-bezier(.16,1,.3,1) " + delay + "s" }}>
      {children}
    </div>
  );
}

function useParallax(speed) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = () => { if (ref.current) ref.current.style.transform = "translateY(" + window.scrollY * speed + "px)"; };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);
  return ref;
}

/* ── Pixel Art ────────────────────────────────────── */

function PxCross({ size, color, style: s }) {
  return (<svg width={size || 12} height={size || 12} viewBox="0 0 12 12" style={s}><rect x="5" y="0" width="2" height="12" fill={color || "var(--p)"} /><rect x="0" y="5" width="12" height="2" fill={color || "var(--p)"} /></svg>);
}
function PxDiamond({ size, color, style: s }) {
  return (<svg width={size || 10} height={size || 10} viewBox="0 0 10 10" style={s}><rect x="4" y="0" width="2" height="2" fill={color || "var(--pl)"} /><rect x="2" y="2" width="2" height="2" fill={color || "var(--pl)"} /><rect x="6" y="2" width="2" height="2" fill={color || "var(--pl)"} /><rect x="0" y="4" width="2" height="2" fill={color || "var(--pl)"} /><rect x="8" y="4" width="2" height="2" fill={color || "var(--pl)"} /><rect x="2" y="6" width="2" height="2" fill={color || "var(--pl)"} /><rect x="6" y="6" width="2" height="2" fill={color || "var(--pl)"} /><rect x="4" y="8" width="2" height="2" fill={color || "var(--pl)"} /></svg>);
}
function PxDot({ size, color, style: s }) {
  return <div style={{ width: size || 6, height: size || 6, background: color || "var(--p)", ...s }} />;
}
function PxGrid({ style: s }) {
  const rects = [];
  for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) rects.push(<rect key={x + "-" + y} x={x * 12} y={y * 12} width="8" height="8" fill="var(--p)" />);
  return <svg width="48" height="48" viewBox="0 0 48 48" style={{ opacity: 0.08, ...s }}>{rects}</svg>;
}
function PxArrow({ style: s }) {
  return (<svg width="20" height="20" viewBox="0 0 20 20" style={{ opacity: 0.15, ...s }}><rect x="8" y="0" width="4" height="4" fill="var(--p)" /><rect x="4" y="4" width="4" height="4" fill="var(--p)" /><rect x="12" y="4" width="4" height="4" fill="var(--p)" /><rect x="0" y="8" width="4" height="4" fill="var(--p)" /><rect x="16" y="8" width="4" height="4" fill="var(--p)" /><rect x="8" y="4" width="4" height="12" fill="var(--p)" /></svg>);
}

/* ── Section Icons (consistent 28px purple SVGs) ── */

function IconChartDown() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M7 10L12 15L16 12L21 18" stroke="var(--p)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 18H21V14" stroke="var(--p)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function IconCoinStack() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><ellipse cx="14" cy="18" rx="5" ry="2" stroke="var(--p)" strokeWidth="1.8" /><ellipse cx="14" cy="14" rx="5" ry="2" stroke="var(--p)" strokeWidth="1.8" /><ellipse cx="14" cy="10" rx="5" ry="2" stroke="var(--p)" strokeWidth="1.8" /><line x1="9" y1="10" x2="9" y2="18" stroke="var(--p)" strokeWidth="1.8" /><line x1="19" y1="10" x2="19" y2="18" stroke="var(--p)" strokeWidth="1.8" /></svg>);
}
function IconPhone() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><rect x="9" y="6" width="10" height="16" rx="2" stroke="var(--p)" strokeWidth="1.8" /><circle cx="14" cy="19" r="1" fill="var(--p)" /></svg>);
}
function IconClock() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><circle cx="14" cy="14" r="6" stroke="var(--p)" strokeWidth="1.8" /><path d="M14 11V14L16 16" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /></svg>);
}
function IconFlame() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M14 7C14 7 10 12 10 16C10 18.2 11.8 20 14 20C16.2 20 18 18.2 18 16C18 12 14 7 14 7Z" stroke="var(--p)" strokeWidth="1.8" fill="none" /><path d="M14 15C14 15 12.5 16.5 12.5 17.5C12.5 18.3 13.2 19 14 19C14.8 19 15.5 18.3 15.5 17.5C15.5 16.5 14 15 14 15Z" fill="var(--p)" /></svg>);
}
function IconGear() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><circle cx="14" cy="14" r="3" stroke="var(--p)" strokeWidth="1.8" /><path d="M14 7V9M14 19V21M7 14H9M19 14H21M8.9 8.9L10.3 10.3M17.7 17.7L19.1 19.1M8.9 19.1L10.3 17.7M17.7 10.3L19.1 8.9" stroke="var(--p)" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function IconPlay() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M11 9L20 14L11 19V9Z" fill="var(--p)" /></svg>);
}
function IconUsers() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><circle cx="11" cy="11" r="2.5" stroke="var(--p)" strokeWidth="1.8" /><circle cx="18" cy="11" r="2.5" stroke="var(--p)" strokeWidth="1.8" /><path d="M6 20C6 17.2 8.2 15 11 15C11.7 15 12.4 15.1 13 15.4" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /><path d="M22 20C22 17.2 19.8 15 17 15" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /></svg>);
}
function IconStar() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M14 8L15.8 12.2L20.4 12.6L17 15.5L18 20L14 17.6L10 20L11 15.5L7.6 12.6L12.2 12.2L14 8Z" fill="var(--p)" /></svg>);
}
function IconGrid() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><rect x="7" y="7" width="5" height="5" rx="1" fill="var(--p)" /><rect x="16" y="7" width="5" height="5" rx="1" fill="var(--p)" /><rect x="7" y="16" width="5" height="5" rx="1" fill="var(--p)" /><rect x="16" y="16" width="5" height="5" rx="1" fill="var(--p)" /></svg>);
}
function IconCalendar() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><rect x="7" y="9" width="14" height="12" rx="2" stroke="var(--p)" strokeWidth="1.8" /><line x1="7" y1="13" x2="21" y2="13" stroke="var(--p)" strokeWidth="1.5" /><line x1="11" y1="7" x2="11" y2="11" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /><line x1="17" y1="7" x2="17" y2="11" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /></svg>);
}
function IconBarChart() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><rect x="8" y="14" width="3" height="7" rx="0.5" fill="var(--p)" /><rect x="12.5" y="10" width="3" height="11" rx="0.5" fill="var(--p)" /><rect x="17" y="12" width="3" height="9" rx="0.5" fill="var(--p)" /></svg>);
}
function IconRefresh() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M18 10C16.9 8.8 15.5 8 14 8C10.7 8 8 10.7 8 14C8 17.3 10.7 20 14 20C16.8 20 19.1 18.1 19.8 15.5" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" /><path d="M15 10H19V7" stroke="var(--p)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function IconCompass() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><circle cx="14" cy="14" r="6" stroke="var(--p)" strokeWidth="1.8" /><path d="M16 10L12.5 12.5L10 16L13.5 13.5L16 10Z" fill="var(--p)" /></svg>);
}
function IconPen() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M17 8L20 11L11 20H8V17L17 8Z" stroke="var(--p)" strokeWidth="1.8" strokeLinejoin="round" /></svg>);
}
function IconPalette() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><circle cx="14" cy="14" r="6" stroke="var(--p)" strokeWidth="1.8" /><circle cx="12" cy="11.5" r="1.2" fill="var(--p)" /><circle cx="16.5" cy="12" r="1.2" fill="var(--p)" /><circle cx="11.5" cy="15" r="1.2" fill="var(--p)" /></svg>);
}
function IconFilm() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><rect x="7" y="9" width="14" height="10" rx="1.5" stroke="var(--p)" strokeWidth="1.8" /><circle cx="14" cy="14" r="2.5" stroke="var(--p)" strokeWidth="1.5" /><rect x="7" y="9" width="3" height="10" stroke="var(--p)" strokeWidth="1" fill="none" /><rect x="18" y="9" width="3" height="10" stroke="var(--p)" strokeWidth="1" fill="none" /></svg>);
}
function IconBolt() {
  return (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="2" width="24" height="24" rx="4" stroke="var(--p)" strokeWidth="2" fill="var(--p-bg)" /><path d="M15 7L9 15H14L13 21L19 13H14L15 7Z" fill="var(--p)" /></svg>);
}

function FloatingPixels() {
  const items = [
    { top: "4%", left: "3%", kind: "c", sz: 16, dl: 0 }, { top: "9%", right: "5%", kind: "d", sz: 14, dl: 1.4 },
    { top: "16%", left: "7%", kind: "g", sz: 48, dl: 0 }, { top: "22%", right: "2%", kind: "s", sz: 8, dl: 0.7 },
    { top: "30%", left: "2%", kind: "a", sz: 20, dl: 0 }, { top: "38%", right: "4%", kind: "c", sz: 12, dl: 2 },
    { top: "44%", left: "5%", kind: "d", sz: 16, dl: 0.4 }, { top: "50%", right: "8%", kind: "g", sz: 48, dl: 0 },
    { top: "56%", left: "3%", kind: "s", sz: 10, dl: 1.8 }, { top: "64%", right: "3%", kind: "a", sz: 20, dl: 0 },
    { top: "70%", left: "6%", kind: "c", sz: 14, dl: 1.1 }, { top: "76%", right: "6%", kind: "d", sz: 12, dl: 0.5 },
    { top: "82%", left: "4%", kind: "g", sz: 48, dl: 0 }, { top: "88%", right: "3%", kind: "s", sz: 8, dl: 2.3 },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>
      {items.map((it, i) => {
        const pos = { position: "absolute", top: it.top, left: it.left, right: it.right };
        const anim = { animation: "pxFloat 5s ease-in-out " + it.dl + "s infinite" };
        if (it.kind === "c") return <PxCross key={i} size={it.sz} color="var(--pl)" style={{ ...pos, ...anim, opacity: 0.18 }} />;
        if (it.kind === "d") return <PxDiamond key={i} size={it.sz} color="var(--pl)" style={{ ...pos, ...anim, opacity: 0.15 }} />;
        if (it.kind === "g") return <PxGrid key={i} style={pos} />;
        if (it.kind === "a") return <PxArrow key={i} style={{ ...pos, animation: "pxFloat 6s ease-in-out " + it.dl + "s infinite" }} />;
        return <PxDot key={i} size={it.sz} color="var(--pl)" style={{ ...pos, ...anim, opacity: 0.14 }} />;
      })}
    </div>
  );
}

/* ── Shared UI ────────────────────────────────────── */

function CTA({ text, href, variant, style: s }) {
  const primary = (variant || "p") === "p";
  return (
    <a href={href || BOOK} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{
      display: "inline-block", padding: primary ? "16px 36px" : "14px 30px",
      background: primary ? "var(--p)" : "transparent", color: primary ? "#fff" : "var(--p)",
      border: "3px solid var(--p)", fontFamily: "var(--font-head)", fontSize: primary ? 14 : 13,
      fontWeight: 800, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.04em",
      transition: "transform .2s, box-shadow .2s, background .2s, color .2s", ...s,
    }}>{text || "Book Your Strategy Call"}</a>
  );
}

function PBox({ children, style: s, hover, depth }) {
  const [h, setH] = useState(false);
  const dp = depth || 1;
  const sh = dp === 2 ? "8px 8px 0" : "5px 5px 0";
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => hover && setH(false)} style={{
      border: "3px solid " + (h ? "var(--p)" : "var(--bdr)"),
      background: h ? "rgba(124,58,237,0.04)" : "var(--cream-lt)", padding: 28,
      transition: "all .3s cubic-bezier(.16,1,.3,1)",
      transform: h ? "translate(-3px,-3px)" : "translate(0,0)",
      boxShadow: h ? "8px 8px 0 var(--pl)" : sh + " var(--bdr)", ...s,
    }}>{children}</div>
  );
}

function Tag({ text }) {
  return <span style={{ display: "inline-block", padding: "5px 12px", background: "var(--p-bg)", color: "var(--p)", fontFamily: "var(--font-px)", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", border: "2px solid var(--pl)" }}>{text}</span>;
}

function Pu({ children }) {
  return <span style={{ color: "var(--p)", fontWeight: 700 }}>{children}</span>;
}

/* ═══════════════════════════════════════════════════ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(245,240,232,0.96)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "3px solid var(--bdr)" : "3px solid transparent", transition: "all .35s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-px)", fontSize: 10, color: "#fff" }}>M</div>
        <span style={{ fontFamily: "var(--font-head)", fontSize: 15, color: "var(--ink)", fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase" }}>Magnor</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {["How It Works", "Results", "Team", "FAQ"].map((t) => (
          <a key={t} href={"#" + t.toLowerCase().replace(/ /g, "-")} className="nav-lnk" style={{ color: "var(--ink-lt)", fontSize: 13, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 600, transition: "color .2s" }}>{t}</a>
        ))}
        <CTA text="Book a Call" style={{ padding: "9px 20px", fontSize: 11 }} />
      </div>
    </nav>
  );
}

function SocialProofBar() {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 300); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%) translateY(" + (show ? "0" : "100px") + ")", opacity: show ? 1 : 0, zIndex: 90, display: "flex", alignItems: "center", gap: 20, padding: "12px 28px", background: "rgba(26,19,24,0.94)", backdropFilter: "blur(14px)", border: "2px solid rgba(124,58,237,0.3)", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", transition: "transform .5s cubic-bezier(.16,1,.3,1), opacity .5s ease", whiteSpace: "nowrap" }}>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>Trusted by</span>
      <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.12)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "#fff", fontWeight: 800 }}>Forbes</span><span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#C4B5FD", fontWeight: 600 }}>30u30 Brands</span></div>
      <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.12)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "#fff", fontWeight: 800 }}>Financial Times</span><span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#C4B5FD", fontWeight: 600 }}>#3 Fastest Growing</span></div>
      <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.12)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "#fff", fontWeight: 800 }}>JustRussel</span><span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#C4B5FD", fontWeight: 600 }}>€10M+ ARR</span></div>
    </div>
  );
}

function Marquee({ items, dir, speed }) {
  const direction = dir || "left";
  const tripled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", padding: "14px 0", borderTop: "2px solid var(--bdr)", borderBottom: "2px solid var(--bdr)", background: direction === "left" ? "var(--cream-lt)" : "var(--cream)" }}>
      <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content", animation: "marquee-" + direction + " " + (speed || 35) + "s linear infinite" }}>
        {tripled.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <PxDot size={6} color="var(--p)" />
            <span style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingPhrase() {
  const phrases = ["Cheapest Customer Acquisition Channel", "Highest Authority Generating Channel"];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => { const iv = setInterval(() => { setFade(false); setTimeout(() => { setIdx((prev) => (prev + 1) % phrases.length); setFade(true); }, 450); }, 3800); return () => clearInterval(iv); }, []);
  return <span style={{ display: "inline", transition: "opacity .45s ease", opacity: fade ? 1 : 0 }}>{phrases[idx]}</span>;
}

/* ═══════════════════════════════════════════════════
   HERO (redesigned subtitle + guarantee badge)
   ═══════════════════════════════════════════════════ */

function Hero() {
  const p1 = useParallax(-0.04);
  const p2 = useParallax(-0.07);
  return (
    <section style={{ padding: "104px 24px 36px", maxWidth: 920, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <div ref={p1} style={{ position: "absolute", top: 10, left: -50, width: 130, height: 130, border: "3px solid var(--bdr)", opacity: 0.2, transform: "rotate(12deg)" }} />
      <div ref={p2} style={{ position: "absolute", top: 40, right: -40, width: 90, height: 90, border: "3px solid var(--pl)", opacity: 0.18, transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", top: 30, right: 80 }}><PxCross size={18} color="var(--pl)" style={{ opacity: 0.3, animation: "pxFloat 4s ease-in-out infinite" }} /></div>
      <div style={{ position: "absolute", bottom: 20, left: 50 }}><PxDiamond size={22} color="var(--pl)" style={{ opacity: 0.22, animation: "pxFloat 5s ease-in-out 1s infinite" }} /></div>

      {/* Guarantee badge - more visible */}
      <Rv>
        <div className="guarantee-badge" style={{
          display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 20px",
          border: "2px solid var(--p)", background: "rgba(124,58,237,0.08)", marginBottom: 20,
          boxShadow: "0 0 20px rgba(124,58,237,0.1), inset 0 0 12px rgba(124,58,237,0.05)",
        }}>
          <div className="blink-px" style={{ width: 8, height: 8, background: "var(--p)" }} />
          <span style={{ fontFamily: "var(--font-head)", fontSize: 12, color: "var(--p)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 800 }}>Results guaranteed or you don't pay</span>
        </div>
      </Rv>

      {/* Headline */}
      <Rv d={0.1}>
        <h1 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 900, lineHeight: 1.15, color: "var(--ink)", maxWidth: 840, margin: "0 auto 28px", letterSpacing: "-0.03em" }}>
          We'll Make <span style={{ color: "var(--p)" }}>Instagram</span> Your{" "}
          <span style={{ color: "var(--p)" }}><RotatingPhrase /></span>{" "}
          in 60 Days
        </h1>
      </Rv>

      {/* Subtitle - redesigned with visual hierarchy */}
      <Rv d={0.2}>
        <div style={{ maxWidth: 560, margin: "0 auto 36px" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 18, color: "var(--ink-lt)", lineHeight: 1.8, marginBottom: 16 }}>
            We build <Pu>AI UGC</Pu> and post it across dozens of Instagram accounts we create and manage for your brand. <Pu>You own every asset.</Pu>
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ height: 2, width: 40, background: "var(--pl)", opacity: 0.4 }} />
            <span style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 800, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>100% Done-for-you</span>
            <div style={{ height: 2, width: 40, background: "var(--pl)", opacity: 0.4 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {["No creators", "No ad spend", "No filming", "No guesswork"].map((t, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                color: i < 3 ? "var(--p)" : "var(--ink-lt)",
                padding: "4px 14px", border: "2px solid " + (i < 3 ? "var(--pl)" : "var(--bdr)"),
                background: i < 3 ? "var(--p-bg)" : "transparent",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </Rv>

      {/* CTAs */}
      <Rv d={0.3}>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <CTA text="Book Your Strategy Call →" />
          <CTA text="See Case Studies" href="#results" variant="s" />
        </div>
        <p style={{ marginTop: 14, fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-mu)" }}>Not a sales pitch. You'll leave with a custom campaign plan.</p>
      </Rv>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WORKS FOR - Glowing ICP boxes
   ═══════════════════════════════════════════════════ */

function WorksFor() {
  const icps = [
    { label: "D2C Ecom", icon: <IconGrid />, desc: "Build owned distribution that compounds. Social proof at scale." },
    { label: "SaaS", icon: <IconBolt />, desc: "Turn Instagram into a signup channel you own, not rent." },
    { label: "Founder Personal Brand", icon: <IconCompass />, desc: "Authority-building content without filming. IP you keep forever." },
  ];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActiveIdx((p) => (p + 1) % icps.length), 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{ padding: "36px 24px 48px", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
      <Rv>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ height: 2, width: 24, background: "var(--pl)", opacity: 0.4 }} />
          <span style={{ fontFamily: "var(--font-px)", fontSize: 7, color: "var(--p)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Works for</span>
          <div style={{ height: 2, width: 24, background: "var(--pl)", opacity: 0.4 }} />
        </div>
      </Rv>
      <Rv d={0.05}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {icps.map((icp, i) => {
            const active = i === activeIdx;
            return (
              <div key={i} style={{
                position: "relative", padding: "20px 16px",
                border: "3px solid " + (active ? "var(--p)" : "var(--bdr)"),
                background: active ? "rgba(124,58,237,0.06)" : "var(--cream-lt)",
                transition: "all .5s cubic-bezier(.16,1,.3,1)",
                transform: active ? "translateY(-4px)" : "translateY(0)",
                boxShadow: active ? "0 8px 32px rgba(124,58,237,0.12), 5px 5px 0 var(--pl)" : "4px 4px 0 var(--bdr)",
              }}>
                {/* Pulse glow behind active */}
                {active && (
                  <div className="icp-pulse" style={{
                    position: "absolute", inset: -6,
                    border: "2px solid var(--pl)", opacity: 0,
                    animation: "icpPulse 2.4s ease-out infinite",
                  }} />
                )}
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>{icp.icon}</div>
                <h4 style={{ fontFamily: "var(--font-head)", fontSize: 15, fontWeight: 800, color: active ? "var(--p)" : "var(--ink)", marginBottom: 6, transition: "color .3s" }}>{icp.label}</h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-lt)", lineHeight: 1.5 }}>{icp.desc}</p>
                {active && (
                  <div style={{ marginTop: 10 }}>
                    <span style={{ fontFamily: "var(--font-px)", fontSize: 6, color: "var(--p)", textTransform: "uppercase", letterSpacing: "0.06em" }}>✦ Custom strategy built for you</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Rv>
      <Rv d={0.1}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-mu)", marginTop: 14 }}>
          Every campaign is <Pu>bespoke</Pu>. Tailored avatars, tailored accounts, tailored strategy for your vertical.
        </p>
        <p style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "var(--p)", marginTop: 8, fontWeight: 700 }}>
          And you own 100% of the IP.
        </p>
      </Rv>
    </section>
  );
}

/* ── Benefit Sliders ──────────────────────────────── */

function BenefitSliders() {
  const top = ["Unlimited AI UGC Videos", "10+ Matched Avatars", "Dedicated Campaign Accounts", "Fully Managed Posting", "7-Day Setup", "No Creator Overhead", "Performance Dashboard", "Conversion-Scripted Content"];
  const bottom = ["Zero Ad Spend Required", "Organic Instagram Reach", "Brand Omnipresence", "Done-For-You End to End", "Results Guaranteed", "Scale Without Limits", "Real Views Real People", "Cheapest Acquisition Channel"];
  return <div><Marquee items={top} dir="left" speed={40} /><Marquee items={bottom} dir="right" speed={45} /></div>;
}

/* ══════════════════════════════════════════════════
   MATH SECTION v2 - Redesigned
   ══════════════════════════════════════════════════ */

function MathSection() {
  const scenarios = [
    { views: 500, accounts: 15, vids: 2 },
    { views: 2000, accounts: 10, vids: 2 },
    { views: 5000, accounts: 5, vids: 3 },
    { views: 500, accounts: 25, vids: 3 },
    { views: 20000, accounts: 10, vids: 1 },
    { views: 2000, accounts: 20, vids: 2 },
    { views: 5000, accounts: 25, vids: 2 },
    { views: 20000, accounts: 15, vids: 2 },
  ];

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [countUp, setCountUp] = useState(0);
  const [jackpotGlow, setJackpotGlow] = useState(false);

  const current = scenarios[idx];
  const daily = current.views * current.accounts * current.vids;
  const monthly = daily * 30;

  useEffect(() => {
    const iv = setInterval(() => {
      setPhase("pulse1");
      setTimeout(() => setPhase("pulse2"), 400);
      setTimeout(() => setPhase("pulse3"), 800);
      setTimeout(() => setPhase("reveal"), 1200);
      setTimeout(() => { setPhase("jackpot"); setJackpotGlow(true); setTimeout(() => setJackpotGlow(false), 800); }, 1600);
      setTimeout(() => { setPhase("idle"); setIdx((p) => (p + 1) % scenarios.length); }, 4200);
    }, 4500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (phase !== "jackpot") return;
    const target = monthly;
    const steps = 40;
    const inc = target / steps;
    let step = 0;
    const iv = setInterval(() => { step++; setCountUp(Math.min(Math.round(inc * step), target)); if (step >= steps) clearInterval(iv); }, 30);
    return () => clearInterval(iv);
  }, [phase, monthly]);

  useEffect(() => { setCountUp(0); }, [idx]);

  const fmtFull = (n) => n.toLocaleString();

  const isActive = (step) => {
    if (phase === "pulse" + step) return true;
    const phaseNum = parseInt(phase.replace("pulse", ""));
    if (!isNaN(phaseNum) && step < phaseNum) return true;
    if (phase === "reveal" || phase === "jackpot") return true;
    return false;
  };

  return (
    <section style={{ padding: "80px 24px", background: "var(--ink)", position: "relative", overflow: "hidden", borderTop: "3px solid var(--bdr)", borderBottom: "3px solid var(--bdr)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(196,181,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none", transition: "opacity .5s", opacity: jackpotGlow ? 1 : 0.5 }} />
      <div style={{ position: "absolute", top: 16, left: 20 }}><PxCross size={14} color="var(--pl)" style={{ opacity: 0.3 }} /></div>
      <div style={{ position: "absolute", bottom: 16, right: 20 }}><PxCross size={14} color="var(--pl)" style={{ opacity: 0.3 }} /></div>

      <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        {/* Bigger title */}
        <Rv>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 8 }}>
            The Math Is <span style={{ color: "#C4B5FD" }}>Simple</span>.
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 48, lineHeight: 1.6 }}>
            More accounts. More videos. <span style={{ color: "#C4B5FD", fontWeight: 600 }}>Exponential views. Every single day.</span>
          </p>
        </Rv>

        {/* Formula */}
        <Rv d={0.1}>
          <div style={{ position: "relative", marginBottom: 32 }}>
            {/* Pulse line */}
            <div style={{ position: "absolute", top: "38%", left: "8%", right: "8%", height: 3, background: "rgba(196,181,253,0.08)", zIndex: 0 }}>
              <div className="math-pulse" style={{ position: "absolute", top: -3, left: 0, width: 80, height: 9, borderRadius: 4, background: "linear-gradient(90deg, transparent, var(--p), var(--pl), transparent)", animation: "pulseSweep 4.5s ease-in-out infinite", boxShadow: "0 0 20px var(--p), 0 0 40px rgba(124,58,237,0.3)" }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px, 3vw, 36px)", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
              {/* Views */}
              <div style={{ textAlign: "center", transition: "transform .3s cubic-bezier(.16,1,.3,1)", transform: phase === "pulse1" ? "scale(1.12)" : "scale(1)" }}>
                <div style={{
                  fontFamily: "var(--font-head)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900,
                  color: isActive(1) ? "#fff" : "rgba(255,255,255,0.5)", lineHeight: 1, transition: "color .3s, text-shadow .3s",
                  textShadow: phase === "pulse1" ? "0 0 30px var(--p)" : "none",
                }}>{fmtFull(current.views)}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: isActive(1) ? "#C4B5FD" : "rgba(255,255,255,0.25)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color .3s" }}>Views per video</div>
              </div>

              <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: isActive(1) ? "var(--pl)" : "rgba(196,181,253,0.2)", transition: "color .3s" }}>×</div>

              {/* Accounts */}
              <div style={{ textAlign: "center", transition: "transform .3s cubic-bezier(.16,1,.3,1)", transform: phase === "pulse2" ? "scale(1.12)" : "scale(1)" }}>
                <div style={{
                  fontFamily: "var(--font-head)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900,
                  color: isActive(2) ? "#fff" : "rgba(255,255,255,0.5)", lineHeight: 1, transition: "color .3s, text-shadow .3s",
                  textShadow: phase === "pulse2" ? "0 0 30px var(--p)" : "none",
                }}>{current.accounts}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: isActive(2) ? "#C4B5FD" : "rgba(255,255,255,0.25)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color .3s" }}>Accounts</div>
              </div>

              <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: isActive(2) ? "var(--pl)" : "rgba(196,181,253,0.2)", transition: "color .3s" }}>×</div>

              {/* Videos/day */}
              <div style={{ textAlign: "center", transition: "transform .3s cubic-bezier(.16,1,.3,1)", transform: phase === "pulse3" ? "scale(1.12)" : "scale(1)" }}>
                <div style={{
                  fontFamily: "var(--font-head)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900,
                  color: isActive(3) ? "#fff" : "rgba(255,255,255,0.5)", lineHeight: 1, transition: "color .3s, text-shadow .3s",
                  textShadow: phase === "pulse3" ? "0 0 30px var(--p)" : "none",
                }}>{current.vids}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: isActive(3) ? "#C4B5FD" : "rgba(255,255,255,0.25)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color .3s" }}>Videos / Day</div>
              </div>

              {/* = Daily (inline) */}
              <div style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 300, color: isActive(3) ? "var(--pl)" : "rgba(196,181,253,0.2)", transition: "color .3s" }}>=</div>

              <div style={{ textAlign: "center", transition: "transform .3s cubic-bezier(.16,1,.3,1)", transform: (phase === "reveal" || phase === "jackpot") ? "scale(1.08)" : "scale(1)" }}>
                <div style={{
                  fontFamily: "var(--font-head)", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900,
                  color: (phase === "reveal" || phase === "jackpot") ? "#fff" : "rgba(255,255,255,0.3)", lineHeight: 1, transition: "color .5s, text-shadow .5s",
                  textShadow: (phase === "reveal" || phase === "jackpot") ? "0 0 40px var(--p)" : "none",
                }}>{fmtFull(daily)}</div>
                <div style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: (phase === "reveal" || phase === "jackpot") ? "#C4B5FD" : "rgba(255,255,255,0.2)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em", transition: "color .5s" }}>Views / Day</div>
              </div>
            </div>
          </div>
        </Rv>

        {/* Arrow down to monthly */}
        <Rv d={0.15}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginBottom: 20 }}>
            <div style={{ width: 3, height: 24, background: (phase === "reveal" || phase === "jackpot") ? "var(--pl)" : "rgba(196,181,253,0.15)", transition: "background .5s" }} />
            <span style={{ fontFamily: "var(--font-px)", fontSize: 7, color: (phase === "jackpot") ? "var(--pl)" : "rgba(196,181,253,0.25)", letterSpacing: "0.08em", transition: "color .5s" }}>× 30 DAYS</span>
            <div style={{ width: 3, height: 12, background: (phase === "reveal" || phase === "jackpot") ? "var(--pl)" : "rgba(196,181,253,0.15)", transition: "background .5s" }} />
          </div>
        </Rv>

        {/* Monthly jackpot */}
        <Rv d={0.2}>
          <div style={{
            display: "inline-block", padding: "36px 60px", position: "relative",
            border: "3px solid " + (phase === "jackpot" ? "var(--p)" : "rgba(124,58,237,0.15)"),
            background: phase === "jackpot" ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.03)",
            boxShadow: jackpotGlow ? "0 0 80px rgba(124,58,237,0.4), 0 0 160px rgba(124,58,237,0.15)" : "0 0 20px rgba(124,58,237,0.05)",
            transition: "all .6s cubic-bezier(.16,1,.3,1)",
          }}>
            {phase === "jackpot" && <>
              <PxDot size={6} color="var(--pl)" style={{ position: "absolute", top: 8, left: 8, opacity: 0.6 }} />
              <PxDot size={6} color="var(--pl)" style={{ position: "absolute", top: 8, right: 8, opacity: 0.6 }} />
              <PxDot size={6} color="var(--pl)" style={{ position: "absolute", bottom: 8, left: 8, opacity: 0.6 }} />
              <PxDot size={6} color="var(--pl)" style={{ position: "absolute", bottom: 8, right: 8, opacity: 0.6 }} />
            </>}
            <div style={{
              fontFamily: "var(--font-head)", fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 900,
              color: "#C4B5FD", lineHeight: 1, letterSpacing: "-0.03em",
              textShadow: jackpotGlow ? "0 0 40px rgba(196,181,253,0.6)" : "none", transition: "text-shadow .5s",
            }}>
              {phase === "jackpot" ? fmtFull(countUp) : fmtFull(monthly)}
            </div>
            <div style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.4)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Organic views / month
            </div>
          </div>
        </Rv>

        {/* Outcome messaging */}
        <Rv d={0.25}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            {["Super warm leads", "High conversion rates", "Pipeline on autopilot", "IP you own forever"].map((t, i) => (
              <span key={i} style={{
                fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700,
                color: "#C4B5FD", padding: "6px 16px",
                border: "2px solid rgba(196,181,253,0.2)", background: "rgba(124,58,237,0.06)",
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 440, margin: "20px auto 32px" }}>
            And that's just <span style={{ color: "#C4B5FD", fontWeight: 600 }}>one campaign</span>.
            Scale the accounts, scale the views. <span style={{ color: "#C4B5FD", fontWeight: 600 }}>Every asset compounds. You own it all.</span>
          </p>
          <CTA text="Build Your System →" style={{ background: "#fff", color: "var(--p)", borderColor: "#fff" }} />
        </Rv>
      </div>
    </section>
  );
}

/* ── Proof Strip ──────────────────────────────────── */
function ProofStrip() {
  const stats = [{ num: "$500K+", label: "Attributed pipeline" }, { num: "30+", label: "Campaigns launched" }, { num: "12M+", label: "Organic views" }, { num: "7 days", label: "Setup to live" }];
  return (
    <section style={{ borderBottom: "3px solid var(--bdr)", padding: "44px 24px", background: "var(--cream-lt)", position: "relative" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {stats.map((s, i) => (<Rv key={i} d={i * 0.08}><PBox style={{ textAlign: "center", padding: "20px 16px", border: "2px solid var(--bdr)", boxShadow: "none" }}><div style={{ fontFamily: "var(--font-head)", fontSize: 28, color: "var(--p)", fontWeight: 900 }}>{s.num}</div><div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-mu)", marginTop: 4, fontWeight: 500 }}>{s.label}</div></PBox></Rv>))}
      </div>
    </section>
  );
}

/* ── Video Gallery ────────────────────────────────── */
function VideoGallery() {
  const placeholders = [{ label: "Product Review", color: "#8B5CF6" }, { label: "Testimonial", color: "#7C3AED" }, { label: "Unboxing", color: "#6D28D9" }, { label: "Tutorial", color: "#5B21B6" }, { label: "Comparison", color: "#8B5CF6" }, { label: "Story Format", color: "#7C3AED" }, { label: "Hook Video", color: "#6D28D9" }, { label: "Social Proof", color: "#5B21B6" }];
  const doubled = [...placeholders, ...placeholders];
  const [hovered, setHovered] = useState(null);
  const Card = ({ v, id }) => (<div onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)} style={{ width: 200, height: 356, flexShrink: 0, background: "linear-gradient(145deg, " + v.color + "22, " + v.color + "44)", border: "3px solid " + (hovered === id ? "var(--pl)" : "rgba(255,255,255,0.08)"), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", transition: "border-color .3s, transform .3s", transform: hovered === id ? "scale(1.04)" : "scale(1)", boxShadow: hovered === id ? "0 20px 60px rgba(124,58,237,0.3)" : "0 4px 20px rgba(0,0,0,0.2)", cursor: "pointer" }}><div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)", pointerEvents: "none" }} /><div style={{ width: 56, height: 56, borderRadius: "50%", background: hovered === id ? "var(--p)" : "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "background .3s" }}><div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #fff", marginLeft: 3 }} /></div><span style={{ fontFamily: "var(--font-px)", fontSize: 7, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{v.label}</span><div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, rgba(0,0,0,0.3))", pointerEvents: "none" }} /><div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}><div style={{ fontFamily: "var(--font-head)", fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>Video Placeholder</div><div style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Replace with real content</div></div></div>);
  return (
    <section style={{ padding: "80px 0", borderTop: "3px solid var(--bdr)", borderBottom: "3px solid var(--bdr)", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(196,181,253,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div style={{ position: "absolute", top: "-20%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2, padding: "0 24px" }}>
        <Rv><span style={{ fontFamily: "var(--font-px)", fontSize: 8, color: "var(--pl)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 16 }}>◆ Content That Converts ◆</span><h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: 12 }}><span style={{ color: "#C4B5FD" }}>AI UGC</span> that's indistinguishable<br />from the real thing.</h2><p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto" }}>Every video is scripted for conversion, matched to your brand voice. <span style={{ color: "#C4B5FD", fontWeight: 600 }}>No filming required.</span></p></Rv>
      </div>
      <div style={{ overflow: "hidden", marginBottom: 16, position: "relative", zIndex: 2 }}><div style={{ display: "flex", gap: 16, animation: "gallery-left 30s linear infinite", width: "max-content" }}>{doubled.map((v, i) => <Card key={"a" + i} v={v} id={"a" + i} />)}</div></div>
      <div style={{ overflow: "hidden", position: "relative", zIndex: 2 }}><div style={{ display: "flex", gap: 16, animation: "gallery-right 35s linear infinite", width: "max-content" }}>{[...doubled].reverse().map((v, i) => <Card key={"b" + i} v={v} id={"b" + i} />)}</div></div>
      <div style={{ textAlign: "center", marginTop: 40, position: "relative", zIndex: 2 }}><Rv><CTA text="Get Content Like This →" style={{ background: "#fff", color: "var(--p)", borderColor: "#fff" }} /></Rv></div>
    </section>
  );
}

/* ── Problem Section ──────────────────────────────── */
function ProblemSection() {
  const struggles = [
    { icon: <IconChartDown />, sym: "::", title: "Your content doesn't convert", desc: <>You're posting, but <Pu>nothing turns into customers</Pu>. No DMs, no clicks, no signups. Views without revenue is just noise.</> },
    { icon: <IconCoinStack />, sym: "?!", title: "Creators are expensive and inconsistent", desc: <>One UGC video costs <Pu>$200 to $500</Pu>. You need dozens. Half come back off-brand. The other half ghost you.</> },
    { icon: <IconPhone />, sym: "_", title: "Your Instagram isn't working for you", desc: <>You post to one account with <Pu>limited organic reach</Pu>. The algorithm buries your content. Your audience never sees it.</> },
    { icon: <IconClock />, sym: "..", title: "You've been 'about to' fix this for months", desc: <>Scaling content has been on your to-do list for 6+ months. You can't find the time. Your competitors are <Pu>already doing it</Pu>.</> },
    { icon: <IconFlame />, sym: "//", title: "You got burned by agencies before", desc: <>You hired someone who sold you posts, not <Pu>pipeline</Pu>. Nothing changed. Now you're skeptical that any external help is worth it.</> },
    { icon: <IconGear />, sym: ">>", title: "There's no system to scale", desc: <>Every piece of content is a one-off effort. There's <Pu>no repeatable engine</Pu> turning views into revenue. You need volume, not vibes.</> },
  ];
  return (
    <section style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)", position: "relative" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <Rv><Tag text="The Struggle" /></Rv>
        <Rv d={0.05}><h2 className="sec-h" style={{ margin: "20px 0 12px" }}>You're great at your product. But <Pu>your Instagram is broken</Pu>.</h2></Rv>
        <Rv d={0.1}><p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-lt)", lineHeight: 1.8, marginBottom: 44, maxWidth: 640 }}>You know content drives growth. But between <Pu>creator costs</Pu>, <Pu>inconsistent output</Pu>, and <Pu>limited reach</Pu>, your Instagram isn't generating the pipeline it should be.</p></Rv>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {struggles.map((s, i) => (<Rv key={i} d={i * 0.07}><PBox hover={true} depth={i % 2 === 0 ? 1 : 2} style={{ height: "100%", position: "relative" }}><div style={{ position: "absolute", top: 12, right: 14, fontFamily: "var(--font-px)", fontSize: 8, color: "var(--pl)", opacity: 0.4 }}>{s.sym}</div><div style={{ marginBottom: 14 }}>{s.icon}</div><h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800, color: "var(--ink)", marginBottom: 10, lineHeight: 1.35 }}>{s.title}</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-lt)", lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p><a href={BOOK} target="_blank" rel="noopener noreferrer" className="fix-link" style={{ fontFamily: "var(--font-head)", fontSize: 11, color: "var(--p)", fontWeight: 700, textDecoration: "none" }}>Fix This →</a></PBox></Rv>))}
        </div>
        <Rv d={0.5}><div style={{ marginTop: 44, textAlign: "center" }}><PBox depth={2} style={{ display: "inline-block", padding: "20px 40px", borderLeft: "6px solid var(--p)" }}><p style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800, color: "var(--ink)", lineHeight: 1.5 }}>We replace all of it. <Pu>Unlimited AI UGC</Pu>, posted across <Pu>dedicated Instagram accounts</Pu> we build for your campaign. The reach of an influencer army at a <Pu>fraction of the cost</Pu>. And you <Pu>own every asset we create</Pu>. Forever.</p></PBox></div></Rv>
        <Rv d={0.55}><div style={{ marginTop: 28, textAlign: "center" }}><CTA text="See How We Fix This →" /></div></Rv>
      </div>
    </section>
  );
}

/* ── Case Studies ─────────────────────────────────── */
function CaseStudies() {
  return (
    <section id="results" style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)", position: "relative" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <Rv><Tag text="Case Studies" /></Rv>
        <Rv d={0.05}><h2 className="sec-h" style={{ margin: "20px 0 44px" }}>Real campaigns.<br /><span style={{ color: "var(--p)" }}>Real revenue impact.</span></h2></Rv>
        <Rv d={0.1}>
          <PBox depth={2} style={{ marginBottom: 24, padding: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div><Tag text="Proof of Concept" /><h3 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 900, color: "var(--ink)", marginTop: 14 }}>PET UNCLE</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-lt)", marginTop: 6, lineHeight: 1.6 }}><Pu>Asia's fastest growing pet influencer</Pu>. Built from scratch with <Pu>$0 ad spend</Pu>.</p></div>
              <span style={{ fontFamily: "var(--font-px)", fontSize: 8, color: "var(--p)", background: "var(--p-bg)", padding: "6px 14px", border: "2px solid var(--pl)" }}>$0 AD SPEND</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-lt)", lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>Our proof of concept. Education-led content, Manychat DM automation, email capture, all organic. Now <Pu>Asia's fastest growing pet influencer</Pu>.</p>
            <div style={{ padding: "14px 20px", background: "var(--p-bg)", borderLeft: "4px solid var(--p)", marginBottom: 28 }}>
              <p style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--ink)", lineHeight: 1.5 }}>Potential value of this IP = <Pu>infinite</Pu>. The account, the audience, the content library. <Pu>Ever compounding. Owned forever.</Pu></p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
              {[{ n: "0 → 25K", l: "Followers in 75 Days" }, { n: "4,200+", l: "Email Subscribers" }, { n: "$300K+", l: "Attributable Shopify Revenue" }, { n: "$0", l: "Ad Spend" }].map((s, i) => (<PBox key={i} style={{ textAlign: "center", padding: "16px 12px", border: "2px solid var(--bdr)", boxShadow: "none" }}><div style={{ fontFamily: "var(--font-head)", fontSize: i === 2 ? 16 : 20, color: "var(--p)", fontWeight: 900 }}>{s.n}</div><div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-mu)", marginTop: 4 }}>{s.l}</div></PBox>))}
            </div>
            <a href={CASE_PET} target="_blank" rel="noopener noreferrer" className="cs-link" style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "var(--p)", fontWeight: 700, textDecoration: "none", padding: "10px 20px", border: "2px solid var(--p)", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 8 }}>View Case Study →</a>
          </PBox>
        </Rv>
        <Rv d={0.2}>
          <PBox depth={2} style={{ padding: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
              <div><Tag text="Client Campaign" /><h3 style={{ fontFamily: "var(--font-head)", fontSize: 26, fontWeight: 900, color: "var(--ink)", marginTop: 14 }}>JUSTRUSSEL / "ELISE"</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-lt)", marginTop: 6, lineHeight: 1.6 }}><Pu>Forbes 30 Under 30</Pu> company · <Pu>#3 Fastest Growing European Startup</Pu> by <Pu>Financial Times</Pu> · <Pu>€10M+ ARR</Pu></p></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}><span style={{ fontFamily: "var(--font-px)", fontSize: 7, color: "var(--p)", background: "var(--p-bg)", padding: "5px 12px", border: "2px solid var(--pl)", textAlign: "center" }}>FORBES 30U30</span><span style={{ fontFamily: "var(--font-px)", fontSize: 7, color: "var(--p)", background: "var(--p-bg)", padding: "5px 12px", border: "2px solid var(--pl)", textAlign: "center" }}>FT #3 FASTEST</span></div>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-lt)", lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>JustRussel, a <Pu>Forbes 30 Under 30</Pu> European DTC brand doing <Pu>€10M+ in annual revenue</Pu>, rated <Pu>#3 fastest growing European startup</Pu> by the <Pu>Financial Times</Pu>, hired us to build the same system for their French-speaking market.</p>
            <div style={{ padding: "14px 20px", background: "var(--p-bg)", borderLeft: "4px solid var(--p)", marginBottom: 28 }}>
              <p style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 700, color: "var(--ink)", lineHeight: 1.5 }}>JustRussel owns every asset we built. The "Elise" account, the content, the audience. <Pu>Distribution they own, not rent. Compounding daily.</Pu></p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 28 }}>
              {[{ n: "€10M+", l: "Annual Revenue" }, { n: "Forbes 30u30", l: "Company Recognition" }, { n: "FT #3", l: "Fastest Growing EU" }, { n: "14-Day", l: "Deploy Time" }].map((s, i) => (<PBox key={i} style={{ textAlign: "center", padding: "16px 12px", border: "2px solid var(--bdr)", boxShadow: "none" }}><div style={{ fontFamily: "var(--font-head)", fontSize: i === 1 || i === 2 ? 14 : 18, color: "var(--p)", fontWeight: 900 }}>{s.n}</div><div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--ink-mu)", marginTop: 4 }}>{s.l}</div></PBox>))}
            </div>
            <a href={CASE_RUSSEL} target="_blank" rel="noopener noreferrer" className="cs-link" style={{ fontFamily: "var(--font-head)", fontSize: 13, color: "var(--p)", fontWeight: 700, textDecoration: "none", padding: "10px 20px", border: "2px solid var(--p)", transition: "all .2s", display: "inline-flex", alignItems: "center", gap: 8 }}>View Case Study →</a>
          </PBox>
        </Rv>
        <Rv d={0.35}><div style={{ marginTop: 36, textAlign: "center" }}><CTA text="Get Results Like These →" /></div></Rv>
      </div>
    </section>
  );
}

/* ── Remaining sections ───────────────────────────── */
function Omnipresence() { return (<section style={{ padding: "80px 24px", background: "var(--p-bg)", borderTop: "3px solid var(--pl)", borderBottom: "3px solid var(--pl)", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 16, left: 24 }}><PxCross size={16} color="var(--pl)" style={{ opacity: 0.4 }} /></div><div style={{ position: "absolute", bottom: 16, right: 24 }}><PxDiamond size={14} color="var(--pl)" style={{ opacity: 0.35 }} /></div><div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center" }}><Rv><h2 className="sec-h" style={{ marginBottom: 16 }}>Your brand. Everywhere on Instagram.<br /><span style={{ color: "var(--p)" }}>Without doing a thing.</span></h2></Rv><Rv d={0.1}><p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-lt)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}><Pu>No creators to manage.</Pu> No content calendar to maintain. <Pu>No accounts to grow.</Pu> No posting to schedule. We handle everything. You just become the brand that's <Pu>impossible to miss</Pu>. And every account, every video, every follower? <Pu>Yours to keep. Compounding in value every day.</Pu></p></Rv></div></section>); }

function Deliverables() {
  const items = [{ icon: <IconPlay />, title: "Unlimited AI UGC Videos", desc: "Product reviews, testimonials, walkthroughs. All scripted for conversion." }, { icon: <IconUsers />, title: "10+ Matched AI Avatars", desc: "Realistic creators matched to your brand voice and niche." }, { icon: <IconStar />, title: "Dedicated Campaign Accounts", desc: "Instagram accounts built, warmed, and managed from scratch." }, { icon: <IconCalendar />, title: "Managed Posting & Scheduling", desc: "Consistent cadence optimization across all accounts." }, { icon: <IconBarChart />, title: "Performance Dashboard", desc: "Track views, reach, and engagement in real time." }, { icon: <IconRefresh />, title: "Ongoing Optimization", desc: "We monitor account health and iterate for maximum reach." }];
  return (<section style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)" }}><div style={{ maxWidth: 920, margin: "0 auto" }}><Rv><Tag text="What You Get" /></Rv><Rv d={0.05}><h2 className="sec-h" style={{ margin: "20px 0 44px" }}>Everything included. <Pu>Nothing for you to manage. Everything yours to keep.</Pu></h2></Rv><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>{items.map((it, i) => (<Rv key={i} d={i * 0.07}><PBox hover={true} depth={i % 2 === 0 ? 1 : 2} style={{ height: "100%" }}><div style={{ marginBottom: 14 }}>{it.icon}</div><h3 style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 800, color: "var(--ink)", marginBottom: 8, lineHeight: 1.4 }}>{it.title}</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-lt)", lineHeight: 1.7 }}>{it.desc}</p></PBox></Rv>))}</div><Rv d={0.5}><div style={{ marginTop: 40, textAlign: "center" }}><CTA text="Get All of This →" /></div></Rv></div></section>);
}

function HowItWorks() {
  const steps = [{ num: "01", title: "We build your content engine", desc: <>10+ AI avatars matched to your brand produce <Pu>conversion-focused UGC</Pu>. Product reviews, testimonials, walkthroughs. Scripted to sell.</> }, { num: "02", title: "We create & warm your accounts", desc: <>Dedicated Instagram accounts built from scratch, tailored to your niche. <Pu>Warmed over 7 days</Pu> so they're primed for organic reach.</> }, { num: "03", title: "We post, optimize & scale", desc: <>Your AI UGC goes live across all campaign accounts on a <Pu>managed schedule</Pu>. We handle cadence, health, and optimization.</> }];
  return (<section id="how-it-works" style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)" }}><div style={{ maxWidth: 920, margin: "0 auto" }}><Rv><Tag text="How It Works" /></Rv><Rv d={0.05}><h2 className="sec-h" style={{ margin: "20px 0 48px" }}>Zero to live campaign in <Pu>7 days</Pu>.<br />Done-for-you, end to end.</h2></Rv>{steps.map((s, i) => (<Rv key={i} d={i * 0.1}><div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 28, padding: "32px 0", borderTop: "2px dashed var(--bdr)" }}><div style={{ fontFamily: "var(--font-head)", fontSize: 44, color: "var(--p)", fontWeight: 900, lineHeight: 1, opacity: 0.7 }}>{s.num}</div><PBox style={{ border: "2px solid var(--bdr)", padding: 24, boxShadow: "none" }}><h3 style={{ fontFamily: "var(--font-head)", fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 8, lineHeight: 1.35 }}>{s.title}</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--ink-lt)", lineHeight: 1.75 }}>{s.desc}</p></PBox></div></Rv>))}<Rv d={0.4}><div style={{ marginTop: 32 }}><CTA text="Start Your Campaign →" /></div></Rv></div></section>);
}

function Comparison() {
  const rows = [{ label: "Cost per video", old: "$200–$500+", us: "Unlimited, flat rate" }, { label: "Turnaround", old: "2–4 weeks", us: "Live in 7 days" }, { label: "Distribution", old: "Your own account", us: "Dozens of managed accounts" }, { label: "Scale", old: "Limited by creators", us: "Unlimited AI avatars" }, { label: "Management", old: "You handle everything", us: "Fully managed" }, { label: "IP ownership", old: "Creator owns it", us: "You own 100%" }, { label: "Long-term value", old: "Dies after one post", us: "Compounds forever" }, { label: "Risk", old: "Pay upfront, hope", us: "We work free till goals hit" }];
  return (<section style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)" }}><div style={{ maxWidth: 820, margin: "0 auto" }}><Rv><h2 className="sec-h" style={{ marginBottom: 40, textAlign: "center" }}>Why brands are switching.</h2></Rv><Rv d={0.1}><div style={{ border: "3px solid var(--bdr)", boxShadow: "8px 8px 0 var(--bdr)", overflow: "hidden" }}><div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", borderBottom: "3px solid var(--bdr)", background: "var(--cream-lt)" }}><div style={{ padding: "14px 24px" }} /><div style={{ padding: "14px 24px", fontFamily: "var(--font-head)", fontSize: 11, color: "var(--ink-mu)", textTransform: "uppercase", fontWeight: 700 }}>Traditional UGC</div><div style={{ padding: "14px 24px", fontFamily: "var(--font-head)", fontSize: 11, color: "var(--p)", textTransform: "uppercase", fontWeight: 800 }}>Magnor Partners ✦</div></div>{rows.map((r, i) => (<div key={i} className="comp-row" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", borderBottom: i < rows.length - 1 ? "2px dashed var(--bdr)" : "none", transition: "background .2s" }}><div style={{ padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{r.label}</div><div style={{ padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-mu)", textDecoration: "line-through", opacity: 0.7 }}>{r.old}</div><div style={{ padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--p)", fontWeight: 700 }}>{r.us}</div></div>))}</div></Rv><Rv d={0.3}><div style={{ marginTop: 36, textAlign: "center" }}><CTA text="Make The Switch →" /></div></Rv></div></section>);
}

function Team() {
  const members = [{ role: "Content Strategist", desc: "Plans your roadmap", icon: <IconCompass /> }, { role: "Copywriter", desc: "Captures your voice", icon: <IconPen /> }, { role: "Graphic Designer", desc: "Visual storytelling", icon: <IconPalette /> }, { role: "Video Editor", desc: "Short & long form", icon: <IconFilm /> }, { role: "Success Manager", desc: "Your point of contact", icon: <IconBolt /> }];
  return (<section id="team" style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)", background: "var(--cream-lt)" }}><div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}><Rv><Tag text="Your Team" /></Rv><Rv d={0.05}><h2 className="sec-h" style={{ margin: "20px 0 10px" }}>Meet Your <Pu>Dedicated Team</Pu></h2></Rv><Rv d={0.1}><p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-lt)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 44px" }}>A squad of strategists, writers, designers, editors, and operators working behind the scenes to <Pu>grow your brand</Pu>.</p></Rv><div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>{members.map((m, i) => (<Rv key={i} d={i * 0.08}><PBox hover={true} depth={i % 2 === 0 ? 1 : 2} style={{ textAlign: "center", padding: "24px 16px" }}><div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>{m.icon}</div><h3 style={{ fontFamily: "var(--font-head)", fontSize: 14, fontWeight: 800, color: "var(--ink)", lineHeight: 1.4, marginBottom: 6 }}>{m.role}</h3><p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-mu)" }}>{m.desc}</p></PBox></Rv>))}</div><Rv d={0.5}><div style={{ marginTop: 40 }}><CTA text="Meet Your Team →" /></div></Rv></div></section>);
}

function Guarantee() {
  return (<section style={{ padding: "80px 24px", background: "var(--p-bg)", borderTop: "3px solid var(--pl)", borderBottom: "3px solid var(--pl)", position: "relative", overflow: "hidden", textAlign: "center" }}>{[{ top: 14, left: 20 }, { top: 14, right: 20 }, { bottom: 14, left: 20 }, { bottom: 14, right: 20 }].map((pos, i) => (<PxDot key={i} size={8} color="var(--pl)" style={{ position: "absolute", ...pos, opacity: 0.5 }} />))}<Rv><div style={{ fontSize: 40, color: "var(--p)", marginBottom: 20 }}>✦</div><h2 className="sec-h" style={{ marginBottom: 16 }}>We work for free<br /><span style={{ color: "var(--p)" }}>until we hit your goals.</span></h2></Rv><Rv d={0.1}><p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-lt)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 24px" }}>If we don't make Instagram your most <Pu>cost-effective customer acquisition channel</Pu> within <Pu>60 days</Pu>, we keep working for free until we do. <Pu>No extra charges. No questions asked.</Pu></p><div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>{["We work till it works", "You own 100% of the IP", "Assets compound forever"].map((t, i) => (<span key={i} style={{ fontFamily: "var(--font-head)", fontSize: 12, fontWeight: 700, color: "var(--p)", padding: "6px 16px", border: "2px solid var(--pl)", background: "rgba(124,58,237,0.06)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{t}</span>))}</div><p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-lt)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>Every account, every avatar, every piece of content we create is <Pu>yours to keep</Pu>. You own 100% of the IP. These assets don't disappear when the campaign ends. They <Pu>compound in value</Pu> over time.</p><CTA text="Claim Your Guarantee →" /></Rv></section>);
}

function Faq() {
  const [open, setOpen] = useState(null);
  const faqs = [{ q: "How fast can we go live?", a: "7 days. Avatars created, accounts built and warmed, content posting. First week." }, { q: "Who owns the content and accounts?", a: "You do. 100% of the IP is yours. Every avatar, every video, every account we build belongs to you. When the campaign ends, you keep everything. This is distribution you own, not rent." }, { q: "What does pricing look like?", a: "Based on campaign scope: number of accounts, posting frequency, content volume. Book a call and we'll build a custom plan. And if we don't hit your goals in 60 days, we keep working for free until we do." }, { q: "How is this different from influencers?", a: "Influencers are expensive, inconsistent, and don't scale. Worse, you own nothing when it's over. With us, you get unlimited AI-generated content posted across accounts you own. The assets compound in value over time." }, { q: "What's the long-term value of this?", a: "Every account we build, every piece of content we create, grows your distribution permanently. These assets compound. A year from now, the accounts are still posting, still generating views, still driving pipeline. The ROI only goes up over time." }, { q: "What results should I expect?", a: "Most campaigns generate thousands of organic views in the first 2 to 4 weeks. We'll walk you through benchmarks for your specific vertical on the call." }, { q: "Is this compliant with Instagram?", a: "Yes. Every account is created and managed using best practices for organic reach and account health." }, { q: "Do I need to do anything?", a: "No. Fully managed. Content creation, account setup, posting, optimization. All handled. You get a dashboard and results. And you own every asset we create." }, { q: "What if it doesn't work?", a: "We keep working for free until it does. That's the guarantee. We don't stop until you hit your goals." }];
  return (<section id="faq" style={{ padding: "90px 24px", borderTop: "3px solid var(--bdr)" }}><div style={{ maxWidth: 680, margin: "0 auto" }}><Rv><h2 className="sec-h" style={{ marginBottom: 40, textAlign: "center" }}>Questions.</h2></Rv>{faqs.map((f, i) => (<Rv key={i} d={i * 0.04}><div onClick={() => setOpen(open === i ? null : i)} style={{ borderTop: "2px dashed var(--bdr)", cursor: "pointer" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0" }}><span style={{ fontFamily: "var(--font-head)", fontSize: 16, fontWeight: 700, color: open === i ? "var(--p)" : "var(--ink)", transition: "color .2s", lineHeight: 1.5 }}>{f.q}</span><span style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "var(--p)", transition: "transform .3s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0, marginLeft: 16 }}>+</span></div><div style={{ maxHeight: open === i ? 200 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.16,1,.3,1)" }}><p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--ink-lt)", lineHeight: 1.75, paddingBottom: 18 }}>{f.a}</p></div></div></Rv>))}<Rv d={0.35}><div style={{ marginTop: 32, textAlign: "center" }}><CTA text="Still Have Questions? Let's Talk →" /></div></Rv></div></section>);
}

function FinalCTA() {
  return (<section style={{ padding: "100px 24px", textAlign: "center", borderTop: "3px solid var(--bdr)", position: "relative", overflow: "hidden" }}><Rv><h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, color: "var(--ink)", lineHeight: 1.2, maxWidth: 700, margin: "0 auto 18px", letterSpacing: "-0.03em" }}>Your competitors are already doing this.<br /><span style={{ color: "var(--p)" }}>Don't get left behind.</span></h2></Rv><Rv d={0.1}><p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-lt)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 36px" }}>30-minute strategy call. We'll show you exactly what a campaign looks like for your brand. <Pu>No commitment. No obligation.</Pu></p></Rv><Rv d={0.2}><CTA text="Book Your Strategy Call →" /><p style={{ marginTop: 16, fontFamily: "var(--font-px)", fontSize: 7, color: "var(--ink-mu)", letterSpacing: "0.05em", textTransform: "uppercase" }}>30-min call · No commitment · Live in 7 days · Results guaranteed</p></Rv></section>);
}

function Footer() {
  return (<footer style={{ padding: "40px 24px 100px", borderTop: "3px solid var(--bdr)", textAlign: "center", background: "var(--cream-lt)" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18 }}><div style={{ width: 24, height: 24, background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-px)", fontSize: 8, color: "#fff" }}>M</div><span style={{ fontFamily: "var(--font-head)", fontSize: 13, fontWeight: 800, color: "var(--ink-mu)", textTransform: "uppercase" }}>Magnor</span></div><div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 18, flexWrap: "wrap" }}>{["How It Works", "Results", "Team", "FAQ", "Book a Call"].map((t) => (<a key={t} href={t === "Book a Call" ? BOOK : "#" + t.toLowerCase().replace(/ /g, "-")} style={{ color: "var(--ink-mu)", fontSize: 13, textDecoration: "none", fontFamily: "var(--font-body)", fontWeight: 500 }}>{t}</a>))}</div><p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--ink-mu)" }}>© 2026 Magnor Partners</p></footer>);
}

/* ═══════════════════════════════════════════════════ */

export default function MagnorLanding() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
        :root {
          --font-px: 'Press Start 2P', monospace;
          --font-head: 'Bricolage Grotesque', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --cream: #F5F0E8; --cream-lt: #FAF7F2;
          --p: #7C3AED; --pl: #C4B5FD; --p-bg: rgba(124,58,237,0.05);
          --ink: #1A1318; --ink-lt: #6B5E66; --ink-mu: #A89BA0; --bdr: #D9D0C7;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--cream); color: var(--ink); -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(124,58,237,0.2); }
        .sec-h { font-family: var(--font-head); font-size: clamp(22px,3vw,36px); font-weight: 800; color: var(--ink); line-height: 1.25; letter-spacing: -0.025em; }
        .cta-btn:hover { transform: translate(-3px,-3px) !important; box-shadow: 6px 6px 0 var(--pl) !important; }
        .nav-lnk:hover { color: var(--p) !important; }
        .cs-link:hover { background: var(--p) !important; color: #fff !important; }
        .comp-row:hover { background: rgba(124,58,237,0.03); }
        .guarantee-badge { animation: badgePulse 3s ease-in-out infinite; }
        @keyframes badgePulse { 0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.1), inset 0 0 12px rgba(124,58,237,0.05); } 50% { box-shadow: 0 0 30px rgba(124,58,237,0.2), inset 0 0 20px rgba(124,58,237,0.08); } }
        @keyframes pxFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .blink-px { animation: blink 1.2s step-end infinite; }
        @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        @keyframes marquee-right { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
        @keyframes gallery-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes gallery-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        @keyframes pulseSweep { 0% { left: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        @keyframes icpPulse { 0% { opacity: 0.6; transform: scale(1); } 100% { opacity: 0; transform: scale(1.15); } }
        @media (max-width: 768px) { nav > div:last-child > a.nav-lnk { display: none !important; } }
        @media (max-width: 900px) {
          div[style*="repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "var(--cream)", position: "relative" }}>
        <FloatingPixels />
        <Nav />
        <Hero />
        <WorksFor />
        <BenefitSliders />
        <MathSection />
        <ProofStrip />
        <VideoGallery />
        <ProblemSection />
        <CaseStudies />
        <Omnipresence />
        <Deliverables />
        <HowItWorks />
        <Comparison />
        <Team />
        <Guarantee />
        <Faq />
        <FinalCTA />
        <Footer />
        <SocialProofBar />
      </div>
    </div>
  );
}
