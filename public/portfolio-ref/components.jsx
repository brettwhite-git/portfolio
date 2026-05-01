/* ============================================================
   Brett White portfolio · shared building blocks
   Available on window (no module scope, single file).
   ============================================================ */

const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------
   useScrollSpy — sets the active nav id based on which section
   is currently in view. Used by every TopNav.
   ------------------------------------------------------------ */
function useScrollSpy(ids, container) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const root = container || null;
    const opts = { root, rootMargin: "-40% 0px -50% 0px", threshold: 0 };
    const seen = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => seen.set(e.target.id, e.isIntersecting));
      const firstIn = ids.find(id => seen.get(id));
      if (firstIn) setActive(firstIn);
    }, opts);
    ids.forEach(id => {
      const el = (container || document).querySelector("#" + id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join(","), container]);
  return active;
}

/* ------------------------------------------------------------
   useReveal — fade-in on scroll for any element with .reveal
   Scoped to a root so each artboard works independently.
   ------------------------------------------------------------ */
function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------
   TopNav — sticky bar, smooth-scroll links, scroll spy.
   Each variation can pass an extraClass so it can style its own nav.
   ------------------------------------------------------------ */
function TopNav({ name, mark, items, extraClass, leftSlot, rightSlot, layout }) {
  const ids = items.map(i => i.id);
  const active = useScrollSpy(ids);

  const handleClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isCentered = layout === "centered";
  const left = leftSlot !== undefined
    ? leftSlot
    : (<div className="brand-mark">
        {mark || (<><span>{name}</span><span className="dot"> · </span><span style={{color: "var(--olive)"}}>Solutions Developer</span></>)}
       </div>);

  return (
    <header className={"topnav " + (isCentered ? "topnav-centered " : "") + (extraClass || "")}>
      <div className="topnav-left">{left}</div>
      <nav>
        {items.map(it => (
          <a key={it.id}
             href={"#" + it.id}
             onClick={(e) => handleClick(e, it.id)}
             className={active === it.id ? "is-current" : ""}>
            {it.label}
          </a>
        ))}
      </nav>
      <div className="topnav-right">{rightSlot}</div>
    </header>
  );
}

/* ------------------------------------------------------------
   IconButton — small square button used in TopNav right rail
   ------------------------------------------------------------ */
function IconButton({ href, onClick, label, children }) {
  const Tag = href ? "a" : "button";
  const props = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" }
    : { onClick, type: "button" };
  return (
    <Tag
      {...props}
      aria-label={label}
      title={label}
      className="icon-btn"
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------
   Sun / Moon / Document glyphs
   ------------------------------------------------------------ */
const SunIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);
const MoonIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const ResumeIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
    <path d="M14 3v6h6"/>
    <path d="M8 13h8M8 17h6"/>
  </svg>
);

/* ------------------------------------------------------------
   AnimatedNumber — counts from 0 → value when in view
   ------------------------------------------------------------ */
function AnimatedNumber({ value, suffix, duration = 1200, decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, start;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const tick = (t) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);
  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();
  return <span ref={ref}>{formatted}{suffix || ""}</span>;
}

/* ------------------------------------------------------------
   ArrChart — animated bar chart of ARR over time
   Used by data-forward variation.
   ------------------------------------------------------------ */
function ArrChart({ data, height = 240, animate = true }) {
  const max = Math.max(...data.map(d => d.arr));
  const ref = useRef(null);
  const [shown, setShown] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div ref={ref} style={{
      display: "grid",
      gridTemplateColumns: `repeat(${data.length}, 1fr)`,
      gap: "20px",
      alignItems: "end",
      height: height + "px",
      padding: "16px 0 0",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)"
    }}>
      {data.map((d, i) => {
        const h = shown ? (d.arr / max) * (height - 60) : 0;
        return (
          <div key={d.year} style={{
            display: "flex", flexDirection: "column", alignItems: "stretch",
            justifyContent: "flex-end", height: "100%", gap: "8px"
          }}>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "var(--brand)",
              textAlign: "center",
              opacity: shown ? 1 : 0,
              transition: "opacity 0.4s ease " + (i * 80 + 300) + "ms",
              fontVariantNumeric: "tabular-nums"
            }}>
              ${d.arr.toFixed(1)}M
            </div>
            <div style={{
              height: h + "px",
              background: i === data.length - 1 ? "var(--brand-light)" : "var(--brand)",
              borderRadius: "2px 2px 0 0",
              transition: "height 0.9s cubic-bezier(.2,.8,.2,1) " + (i * 80) + "ms"
            }}/>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "1px",
              color: "var(--stone)",
              textAlign: "center",
              borderTop: "1px solid var(--border)",
              paddingTop: "8px"
            }}>
              {d.year}
            </div>
            <div style={{
              fontSize: "11px",
              color: "var(--olive)",
              textAlign: "center",
              fontFamily: "var(--serif)"
            }}>
              {d.role}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------
   SkillBar — proficiency 1-5 rendered as a 5-segment bar
   ------------------------------------------------------------ */
function SkillBar({ name, level, note, animate = true }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(!animate);
  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.3 });
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 16px", padding: "10px 0", borderBottom: "1px solid var(--border-soft)" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: "15px", color: "var(--near-black)" }}>{name}</div>
      <div style={{ display: "flex", gap: "3px", alignSelf: "center" }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: "16px", height: "5px", borderRadius: "1px",
            background: shown && i <= level ? "var(--brand)" : "var(--border)",
            transition: "background 0.35s ease " + (i * 60) + "ms"
          }}/>
        ))}
      </div>
      {note && <div style={{ gridColumn: "1 / -1", fontSize: "13px", color: "var(--olive)", marginTop: "-2px" }}>{note}</div>}
    </div>
  );
}

/* ------------------------------------------------------------
   ContactRow — single contact channel line
   ------------------------------------------------------------ */
function ContactRow({ label, value, href, kind }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr auto",
      alignItems: "baseline",
      padding: "16px 0",
      borderBottom: "1px solid var(--border)",
      gap: "20px"
    }}>
      <div className="mono-label">{label}</div>
      <a href={href} style={{ fontFamily: "var(--serif)", fontSize: "20px", borderBottom: "0", color: "var(--near-black)" }}>{value}</a>
      <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--stone)", letterSpacing: "1px" }}>
        {kind}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   GitHub & LinkedIn glyphs (single-color, currentColor fill)
   ------------------------------------------------------------ */
const GitHubIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);
const LinkedInIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11zM7.12 20.45H3.56V9h3.56v11.45z"/>
  </svg>
);

/* ------------------------------------------------------------
   Section — wrapper that handles scroll-spy id + reveal
   ------------------------------------------------------------ */
function Section({ id, alt, children, className }) {
  return (
    <section id={id} className={"band reveal " + (alt ? "alt " : "") + (className || "")}>
      <div className="container">{children}</div>
    </section>
  );
}

/* expose globally */
Object.assign(window, {
  useScrollSpy, useReveal,
  TopNav, IconButton, AnimatedNumber, ArrChart, SkillBar, ContactRow, Section,
  GitHubIcon, LinkedInIcon, SunIcon, MoonIcon, ResumeIcon
});
