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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = (e, id, closeMenu = false) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (closeMenu) setMobileMenuOpen(false);
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
      <div className="topnav-right">
        {rightSlot}
        <div className="mobile-nav">
          <button
            type="button"
            className={"icon-btn mobile-nav__trigger" + (mobileMenuOpen ? " is-open" : "")}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            title="Menu"
            onClick={() => setMobileMenuOpen(open => !open)}
          >
            <MenuIcon size={17} />
          </button>
          {mobileMenuOpen && (
            <nav id="mobile-nav-menu" className="mobile-nav__menu" aria-label="Mobile navigation">
              {items.map(it => (
                <a
                  key={it.id}
                  href={"#" + it.id}
                  onClick={(e) => handleClick(e, it.id, true)}
                  className={active === it.id ? "is-current" : ""}
                >
                  {it.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
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
const MenuIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16"/>
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
    <div className="contact-row" style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr auto",
      alignItems: "baseline",
      padding: "16px 0",
      borderBottom: "1px solid var(--border)",
      gap: "20px"
    }}>
      <div className="mono-label">{label}</div>
      <a className="contact-row__value" href={href} style={{ fontFamily: "var(--serif)", fontSize: "20px", borderBottom: "0", color: "var(--near-black)" }}>{value}</a>
      <div className="contact-row__kind" style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--stone)", letterSpacing: "1px" }}>
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

/* ----------------------- ScribbleFrame ------------------------ */
/* Animated rough.js border that scrubs in as four edges (top → bottom → left → right),
   each composed of three direction-alternating passes. Plays once on first reveal. */
function ScribbleFrame({ children }) {
  const wrapRef = React.useRef(null);
  const svgRef  = React.useRef(null);
  const playedRef = React.useRef(false);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg || !window.rough) return;

    const SVG_NS = "http://www.w3.org/2000/svg";
    const OVERSHOOT = 14;
    const rc = window.rough.svg(svg);
    const rand = (s) => { const x = Math.sin(s * 9999) * 10000; return x - Math.floor(x); };

    const generate = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const { width: w, height: h } = wrap.getBoundingClientRect();
      if (!w || !h) return;
      svg.setAttribute("viewBox", `${-OVERSHOOT} ${-OVERSHOOT} ${w + OVERSHOOT * 2} ${h + OVERSHOOT * 2}`);
      svg.setAttribute("width",  w + OVERSHOOT * 2);
      svg.setAttribute("height", h + OVERSHOOT * 2);
      svg.style.left = `-${OVERSHOOT}px`;
      svg.style.top  = `-${OVERSHOOT}px`;

      const stroke = "currentColor"; // resolves via wrap's color: var(--brand) — auto-tracks theme
      const fx = 0, fy = 0, fw = w, fh = h;

      const sidePass = (seed, opts) => {
        const jit = (n, amp) => (rand(seed + n) - 0.5) * amp;
        // Looser corners — strokes overshoot and miss the corners on purpose.
        const ovExt = 12;
        const cj    = 9; // corner jitter amplitude
        const TL  = [fx - ovExt + jit(1,  cj),      fy + jit(2,  cj)];
        const TR  = [fx + fw + ovExt + jit(3,  cj), fy + jit(4,  cj)];
        const BR  = [fx + fw + ovExt + jit(5,  cj), fy + fh + jit(6,  cj)];
        const BL  = [fx - ovExt + jit(7,  cj),      fy + fh + jit(8,  cj)];
        const TLv = [fx + jit(11, cj),              fy - ovExt + jit(12, cj)];
        const TRv = [fx + fw + jit(13, cj),         fy - ovExt + jit(14, cj)];
        const BRv = [fx + fw + jit(15, cj),         fy + fh + ovExt + jit(16, cj)];
        const BLv = [fx + jit(17, cj),              fy + fh + ovExt + jit(18, cj)];
        const midTop    = [fx + fw * 0.5 + jit(9, 14),   fy - 4 + jit(10, 6)];
        const midBottom = [fx + fw * 0.5 + jit(19, 14),  fy + fh + 4 + jit(20, 6)];
        const midLeft   = [fx - 4 + jit(21, 6),          fy + fh * 0.5 + jit(22, 14)];
        const midRight  = [fx + fw + 4 + jit(23, 6),     fy + fh * 0.5 + jit(24, 14)];
        const Q = (s, c, e) => `M ${s[0]} ${s[1]} Q ${c[0]} ${c[1]}, ${e[0]} ${e[1]}`;
        const off = opts.offset || 0; // perpendicular drift, outward from the frame
        const sh  = (p, dx, dy) => [p[0] + dx, p[1] + dy];
        const rev = !!opts.reverse;
        // Forward direction (top/bot: L→R, left/right: T→B); reverse flips start/end.
        const sides = {
          top:    rev ? Q(sh(TR,  0, -off), sh(midTop,    0, -off), sh(TL,  0, -off))
                      : Q(sh(TL,  0, -off), sh(midTop,    0, -off), sh(TR,  0, -off)),
          bottom: rev ? Q(sh(BR,  0,  off), sh(midBottom, 0,  off), sh(BL,  0,  off))
                      : Q(sh(BL,  0,  off), sh(midBottom, 0,  off), sh(BR,  0,  off)),
          left:   rev ? Q(sh(BLv, -off, 0), sh(midLeft,  -off, 0),  sh(TLv, -off, 0))
                      : Q(sh(TLv, -off, 0), sh(midLeft,  -off, 0),  sh(BLv, -off, 0)),
          right:  rev ? Q(sh(BRv,  off, 0), sh(midRight,  off, 0),  sh(TRv,  off, 0))
                      : Q(sh(TRv,  off, 0), sh(midRight,  off, 0),  sh(BRv,  off, 0)),
        };
        Object.entries(sides).forEach(([side, d]) => {
          const node = rc.path(d, {
            stroke,
            strokeWidth: opts.strokeWidth,
            roughness:   opts.roughness,
            bowing:      opts.bowing,
            disableMultiStroke: true,
          });
          svg.appendChild(node);
          node.dataset.side = side;
          const inner = node.tagName === "g" ? node.querySelector("path") : node;
          if (!inner) return;
          inner.setAttribute("stroke-linecap",  "round");
          inner.setAttribute("stroke-linejoin", "round");
          if (opts.opacity != null) inner.style.opacity = opts.opacity;
          const len = inner.getTotalLength();
          inner.style.strokeDasharray  = len;
          inner.style.strokeDashoffset = playedRef.current ? 0 : len;
        });
      };

      // Three passes per edge — sketchier roughness + more bowing so the lines
      // wobble like a real pen finding the rectangle.
      sidePass(1.7, { strokeWidth: 2.1, roughness: 2.0, bowing: 0.9, offset: 0,  reverse: false });
      sidePass(4.2, { strokeWidth: 1.9, roughness: 2.4, bowing: 1.2, offset: 5,  reverse: true,  opacity: 0.7 });
      sidePass(8.9, { strokeWidth: 1.7, roughness: 2.8, bowing: 1.6, offset: 10, reverse: false, opacity: 0.5 });
    };

    const play = () => {
      const bySide = { top: [], bottom: [], left: [], right: [] };
      svg.querySelectorAll("[data-side]").forEach((g) => {
        const side = g.dataset.side;
        const inner = g.tagName === "g" ? g.querySelector("path") : g;
        if (bySide[side] && inner) bySide[side].push(inner);
      });
      const drawStroke = (paths, startAt, edgeDur = 0.38, passStep = 98) => {
        paths.forEach((p, i) => setTimeout(() => {
          p.style.transition = `stroke-dashoffset ${edgeDur}s ease-out`;
          p.style.strokeDashoffset = 0;
        }, startAt + i * passStep));
        return startAt + (paths.length - 1) * passStep + edgeDur * 1000;
      };
      const liftPause = 165;
      let t = 60;
      t = drawStroke(bySide.top,    t) + liftPause;
      t = drawStroke(bySide.bottom, t) + liftPause;
      t = drawStroke(bySide.left,   t) + liftPause;
      t = drawStroke(bySide.right,  t);
    };

    generate();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          play();
          io.disconnect();
        }
      });
    }, { threshold: 0.08 });
    io.observe(wrap);

    // Only regenerate on real size changes — RO often fires a spurious callback
    // shortly after observation, which would race the IO and overwrite the
    // animating paths at their final dashoffset (visible as a static border in prod).
    let prevW = 0, prevH = 0;
    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect();
      if (Math.abs(rect.width - prevW) < 1 && Math.abs(rect.height - prevH) < 1) return;
      prevW = rect.width;
      prevH = rect.height;
      generate();
    });
    ro.observe(wrap);

    return () => { io.disconnect(); ro.disconnect(); };
  }, []);

  return (
    <div ref={wrapRef} className="scribble-frame">
      {children}
      <svg ref={svgRef} className="scribble-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
    </div>
  );
}

/* ----------------------- ScribbleUnderline ------------------------ */
/* Inline wrapper: hand-drawn underline below the word + a scribbled period to the right.
   Used to replace e.g. `<em>builder</em>.` with `<ScribbleUnderline><em>builder</em></ScribbleUnderline>` */
function ScribbleUnderline({ children, period = true }) {
  const wrapRef = React.useRef(null);
  const svgRef  = React.useRef(null);
  const playedRef = React.useRef(false);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const svg  = svgRef.current;
    if (!wrap || !svg || !window.rough) return;

    const rc = window.rough.svg(svg);
    const rand = (s) => { const x = Math.sin(s * 9999) * 10000; return x - Math.floor(x); };
    const jit = (n, amp) => (rand(n) - 0.5) * amp;

    const generate = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const { width: w, height: h } = wrap.getBoundingClientRect();
      if (!w || !h) return;

      const PAD_RIGHT  = period ? 34 : 8;
      const PAD_BOTTOM = 24;
      const totalW = w + PAD_RIGHT;
      const totalH = h + PAD_BOTTOM;

      svg.setAttribute("viewBox", `0 0 ${totalW} ${totalH}`);
      svg.setAttribute("width",  totalW);
      svg.setAttribute("height", totalH);
      svg.style.left = "0";
      svg.style.top  = "0";

      const underlineY = h + 2; // sits just below the descender

      // Both underline passes draw left-to-right; cross-weave via opposing slopes
      // (`tilt` is the y-delta added at the end of the stroke).
      const drawUnderline = (seed, opts) => {
        const startX = -4 + jit(seed + 1, 8);
        const endX   = w + PAD_RIGHT - 6 + jit(seed + 2, 8);
        const baseY  = underlineY + (opts.offset || 0);
        const tilt   = opts.tilt || 0;
        const startY = baseY + jit(seed + 3, 2);
        const endY   = baseY + tilt + jit(seed + 4, 2);
        const midX   = (startX + endX) / 2 + jit(seed + 5, 14);
        const midY   = (startY + endY) / 2 + jit(seed + 6, 4) - 1;
        const d = `M ${startX} ${startY} Q ${midX} ${midY}, ${endX} ${endY}`;
        const node = rc.path(d, {
          stroke: "currentColor",
          strokeWidth: opts.strokeWidth,
          roughness:   opts.roughness,
          bowing:      opts.bowing,
          disableMultiStroke: true,
        });
        node.dataset.group = "underline";
        svg.appendChild(node);
        const inner = node.tagName === "g" ? node.querySelector("path") : node;
        if (!inner) return;
        const len = inner.getTotalLength();
        inner.style.strokeDasharray  = len;
        inner.style.strokeDashoffset = playedRef.current ? 0 : len;
      };

      drawUnderline(11.7, { strokeWidth: 1.6, roughness: 1.4, bowing: 0.9, offset: 0, tilt:  4 });
      drawUnderline(14.2, { strokeWidth: 1.3, roughness: 1.9, bowing: 0.7, offset: 6, tilt: -4 });

      // Scribbled period to the right of the word — drawn as a small hand-traced
      // circular path so it reveals like a pen looping around, not a popped dot.
      if (period) {
        const cx = w + 10 + jit(31, 2);
        const cy = h * 0.78 + jit(32, 2);
        const r  = 2.3 + jit(33, 0.4);
        // Single circle expressed as 4 cubic-bezier arcs (kappa = 0.5522847498)
        const k = 0.5522847498 * r;
        const d =
          `M ${cx - r} ${cy} ` +
          `C ${cx - r} ${cy - k}, ${cx - k} ${cy - r}, ${cx} ${cy - r} ` +
          `S ${cx + r} ${cy - k}, ${cx + r} ${cy} ` +
          `S ${cx + k} ${cy + r}, ${cx} ${cy + r} ` +
          `S ${cx - r} ${cy + k}, ${cx - r} ${cy}`;
        const node = rc.path(d, {
          stroke: "currentColor",
          strokeWidth: 3.6, // thick enough to read as a filled dot once drawn
          roughness: 1.2,
          bowing: 0.6,
          disableMultiStroke: true,
        });
        node.dataset.group = "period";
        svg.appendChild(node);
        const inner = node.tagName === "g" ? node.querySelector("path") : node;
        if (inner) {
          inner.setAttribute("stroke-linecap", "round");
          inner.setAttribute("stroke-linejoin", "round");
          const len = inner.getTotalLength();
          inner.style.strokeDasharray  = len;
          inner.style.strokeDashoffset = playedRef.current ? 0 : len;
        }
      }
    };

    const play = () => {
      const underlines = svg.querySelectorAll('[data-group="underline"]');
      const periodNode = svg.querySelector('[data-group="period"]');
      const passStep = 180;
      const edgeDur  = 0.7;
      // Border animation finishes around 2.86s; start underline a touch after that
      // so it reads as the deliberate final flourish, then the period caps it off.
      const startDelay = 2800;
      underlines.forEach((g, i) => {
        const p = g.tagName === "g" ? g.querySelector("path") : g;
        setTimeout(() => {
          p.style.transition = `stroke-dashoffset ${edgeDur}s ease-out`;
          p.style.strokeDashoffset = 0;
        }, startDelay + i * passStep);
      });
      if (periodNode) {
        const inner = periodNode.tagName === "g" ? periodNode.querySelector("path") : periodNode;
        if (inner) {
          const totalDur = startDelay + (underlines.length - 1) * passStep + edgeDur * 1000 + 120;
          setTimeout(() => {
            inner.style.transition = "stroke-dashoffset 0.6s cubic-bezier(.5,0,.5,1)";
            inner.style.strokeDashoffset = 0;
          }, totalDur);
        }
      }
    };

    generate();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          play();
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(wrap);

    // Only regenerate on real size changes (see note in ScribbleFrame above).
    let prevW = 0, prevH = 0;
    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect();
      if (Math.abs(rect.width - prevW) < 1 && Math.abs(rect.height - prevH) < 1) return;
      prevW = rect.width;
      prevH = rect.height;
      generate();
    });
    ro.observe(wrap);

    return () => { io.disconnect(); ro.disconnect(); };
  }, [period]);

  return (
    <span ref={wrapRef} className="scribble-underline">
      {children}
      <svg ref={svgRef} className="scribble-svg-underline" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" />
    </span>
  );
}

/* ----------------------- JobEntry / MarginNote / BodyHighlight ------------------------ */
/* Hand-written marginalia on a job entry: rough.js brackets + handwritten lines that
   "write" in via clip-path, plus inline ink underlines in the body. Replays each time
   the entry scrolls into view. */

function BodyHighlight({ children, kind = "underline" }) {
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.rough) return;
    const svg = wrap.querySelector(".ink-mark__svg");
    if (!svg) return;

    const rand = (s) => { const x = Math.sin(s * 9999) * 10000; return x - Math.floor(x); };
    const jit  = (n, amp) => (rand(n) - 0.5) * amp;

    const generate = () => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const { width: w, height: h } = wrap.getBoundingClientRect();
      if (!w || !h) return;
      const totalH = h + 10;
      svg.setAttribute("viewBox", `0 0 ${w} ${totalH}`);
      svg.setAttribute("width",  w);
      svg.setAttribute("height", totalH);

      const rc = window.rough.svg(svg);
      if (kind === "underline") {
        const y  = h + 1;
        const d  = `M ${-2 + jit(1, 4)} ${y + jit(2, 2)} Q ${w / 2 + jit(3, 10)} ${y + 3 + jit(4, 2)}, ${w + 2 + jit(5, 4)} ${y + jit(6, 2)}`;
        const node = rc.path(d, {
          stroke: "currentColor",
          strokeWidth: 1.8,
          roughness: 1.5,
          bowing: 0.9,
          disableMultiStroke: true,
        });
        svg.appendChild(node);
        const inner = node.tagName === "g" ? node.querySelector("path") : node;
        if (inner) {
          inner.setAttribute("stroke-linecap", "round");
          const len = inner.getTotalLength();
          inner.style.setProperty("--len", len);
        }
      }
    };

    generate();
    const ro = new ResizeObserver(generate);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [children, kind]);

  return (
    <span ref={wrapRef} className="ink-mark" data-kind={kind}>
      {children}
      <svg ref={null} className="ink-mark__svg" aria-hidden="true" />
    </span>
  );
}

function MarginNote({ note, noteIndex }) {
  const rand = (s) => { const x = Math.sin(s * 9999) * 10000; return x - Math.floor(x); };
  return (
    <div className="margin-note" data-anchor={note.anchor}>
      <svg className="margin-note__bracket" aria-hidden="true" />
      <div className="margin-note__lines">
        {(note.lines || []).map((line, i) => {
          const lineDelay = 260 + i * 900 + (i % 2 ? 110 : 0);
          const tilt = (rand(noteIndex * 13 + i + 1) - 0.5) * 1.6;
          return (
            <div
              key={i}
              className="note-line"
              style={{ "--line-delay": `${lineDelay}ms`, "--line-tilt": `${tilt}deg` }}
            >
              <span className="ink">{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function JobEntry({ h, index }) {
  const entryRef   = React.useRef(null);
  const bodyRef    = React.useRef(null);
  const notesRef   = React.useRef(null);
  const anchorsRef = React.useRef({ blurb: null, bullets: null, stack: null });
  const timeoutsRef = React.useRef([]);

  React.useEffect(() => {
    const entry = entryRef.current;
    const notes = notesRef.current;
    const body  = bodyRef.current;
    if (!entry || !notes || !body || !window.rough) return;

    // ---------- Bracket rendering ----------
    // Single left-side bracket whose serifs face the body content (i.e., point left).
    const renderBracket = (svg, height) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const w = 14;
      svg.setAttribute("viewBox", `0 0 ${w} ${height}`);
      svg.setAttribute("width",   w);
      svg.setAttribute("height",  height);
      const rc = window.rough.svg(svg);
      const serif = 9;
      // Serifs point LEFT toward the body: `]` shape (start top-left, go right, down, back left).
      const d = `M 0 0 L ${serif} 0 L ${serif} ${height} L 0 ${height}`;
      const node = rc.path(d, {
        stroke: "currentColor",
        strokeWidth: 1.8,
        roughness: 1.3,
        bowing: 0.4,
        disableMultiStroke: true,
      });
      svg.appendChild(node);
      const inner = node.tagName === "g" ? node.querySelector("path") : node;
      if (inner) {
        inner.setAttribute("stroke-linecap",  "round");
        inner.setAttribute("stroke-linejoin", "round");
        const len = inner.getTotalLength();
        inner.style.setProperty("--len", len);
      }
    };

    // ---------- Positioning + bracket sizing ----------
    const positionNotes = () => {
      const noteEls = notes.querySelectorAll(".margin-note");
      const notesRect = notes.getBoundingClientRect();
      noteEls.forEach((noteEl) => {
        const anchorName = noteEl.dataset.anchor;
        let top, height;
        if (anchorName === "all") {
          // Spans from the blurb (subtitle) top down through the end of the bullets.
          const blurb   = anchorsRef.current.blurb;
          const bullets = anchorsRef.current.bullets;
          if (!blurb || !bullets) return;
          const blurbRect   = blurb.getBoundingClientRect();
          const bulletsRect = bullets.getBoundingClientRect();
          top    = blurbRect.top - notesRect.top;
          height = bulletsRect.bottom - blurbRect.top;
        } else {
          const anchor = anchorsRef.current[anchorName];
          if (!anchor) return;
          const r = anchor.getBoundingClientRect();
          top    = r.top - notesRect.top;
          height = Math.max(r.height, 24);
        }
        noteEl.style.top    = `${top}px`;
        noteEl.style.height = `${height}px`;
        renderBracket(noteEl.querySelector(".margin-note__bracket"), height);
      });
    };

    // Initial layout — defer one frame so fonts/grid settle.
    requestAnimationFrame(positionNotes);

    const ro = new ResizeObserver(positionNotes);
    ro.observe(entry);

    // ---------- Animation orchestration ----------
    const clearTimers = () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };

    const revealJob = () => {
      clearTimers();
      const noteEls  = Array.from(notes.querySelectorAll(".margin-note"));
      const inkMarks = Array.from(entry.querySelectorAll(".ink-mark"));
      const startBeat = 80; // tiny opening beat
      // Inline ink underlines fire on the same beat as the first margin note (in sync with the annotation).
      const hid = setTimeout(() => {
        inkMarks.forEach((el) => el.classList.add("is-playing"));
      }, startBeat);
      timeoutsRef.current.push(hid);
      let t = startBeat;
      noteEls.forEach((noteEl) => {
        const tid = setTimeout(() => noteEl.classList.add("is-playing"), t);
        timeoutsRef.current.push(tid);
        const lineCount = noteEl.querySelectorAll(".note-line").length;
        const lastLineStart = t + 260 + Math.max(0, lineCount - 1) * 900 + ((lineCount - 1) % 2 ? 110 : 0);
        t = lastLineStart + 1100;
      });
    };

    const resetJob = () => {
      clearTimers();
      entry.classList.add("is-resetting");
      notes.querySelectorAll(".margin-note").forEach((el) => el.classList.remove("is-playing"));
      entry.querySelectorAll(".ink-mark").forEach((el) => el.classList.remove("is-playing"));
      // Force two frames to flush the transition-disabling reset, then re-enable.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => entry.classList.remove("is-resetting"));
      });
    };

    // Play once per page load. No reset/replay on scroll out + back in.
    let hasPlayed = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !hasPlayed) {
          hasPlayed = true;
          entry.classList.add("is-in");
          revealJob();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -80px 0px" });
    io.observe(body);

    return () => {
      io.disconnect();
      ro.disconnect();
      clearTimers();
    };
  }, [h]);

  // Inline highlight splicer: rebuilds blurb + bullet text with <BodyHighlight>
  // wrappers around the first matched phrase per highlight (one underline per entry).
  // Reset each render so the wrap is preserved across re-renders.
  const firedHighlights = new Set();
  const renderWithHighlights = (text) => {
    const highlights = (h && h.highlights) || [];
    if (!highlights.length || !text) return text;
    let parts = [text];
    highlights.forEach((hl, hi) => {
      if (firedHighlights.has(hi)) return;
      const next = [];
      parts.forEach((part, pi) => {
        if (typeof part !== "string" || firedHighlights.has(hi)) { next.push(part); return; }
        const idx = part.indexOf(hl.phrase);
        if (idx === -1) { next.push(part); return; }
        if (idx > 0) next.push(part.slice(0, idx));
        next.push(
          <BodyHighlight key={`hl-${hi}-${pi}`} kind={hl.kind}>
            {hl.phrase}
          </BodyHighlight>
        );
        const rest = part.slice(idx + hl.phrase.length);
        if (rest) next.push(rest);
        firedHighlights.add(hi);
      });
      parts = next;
    });
    return parts;
  };

  const marginalia = (h && h.marginalia) || [];

  return (
    <div ref={entryRef} className="reveal job-entry" style={{
      display: "grid",
      gridTemplateColumns: "120px minmax(0, 620px) 1fr",
      gap: "32px",
      padding: "28px 0",
      position: "relative",
    }}>
      {/* spine dot */}
      <div style={{
        position: "absolute", left: "115px", top: "32px",
        width: "11px", height: "11px",
        background: index === 0 ? "var(--brand)" : "var(--ivory)",
        border: "1.5px solid var(--brand)",
        borderRadius: "50%",
        zIndex: 1,
      }}/>

      {/* dates */}
      <div style={{ paddingTop: "4px" }}>
        <div className="history-date" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--stone)", letterSpacing: "1px", lineHeight: 1.4 }}>
          <span className="history-date__start">{h.start}</span>
          <span className="history-date__arrow">↓</span>
          <span className="history-date__end" style={{ color: "var(--olive)" }}>{h.end}</span>
        </div>
      </div>

      {/* body */}
      <div ref={bodyRef} className="job-body" style={{ paddingLeft: "28px" }}>
        <div className="mono-label" style={{ marginBottom: "6px" }}>{h.company} · {h.location}</div>
        <h3 style={{ fontSize: "26px", fontWeight: 500, margin: "0 0 12px", lineHeight: 1.2 }}>{h.role}</h3>
        <p
          ref={(el) => { anchorsRef.current.blurb = el; }}
          data-margin-anchor="blurb"
          style={{ fontSize: "16px", color: "var(--olive)", margin: "0 0 14px", lineHeight: 1.55 }}
        >
          {renderWithHighlights(h.blurb)}
        </p>
        <ul
          ref={(el) => { anchorsRef.current.bullets = el; }}
          data-margin-anchor="bullets"
          className="dash"
          style={{ marginBottom: "14px" }}
        >
          {h.bullets.map((b, j) => <li key={j} style={{ fontSize: "15px" }}>{renderWithHighlights(b)}</li>)}
        </ul>
        <div ref={(el) => { anchorsRef.current.stack = el; }} data-margin-anchor="stack">
          {h.stack.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
      </div>

      {/* notes overlay */}
      <div ref={notesRef} className="job-notes">
        {marginalia.map((note, ni) => (
          <MarginNote key={ni} note={note} noteIndex={ni} />
        ))}
      </div>
    </div>
  );
}

/* expose globally */
Object.assign(window, {
  useScrollSpy, useReveal,
  TopNav, IconButton, AnimatedNumber, ArrChart, SkillBar, ContactRow, Section,
  ScribbleFrame, ScribbleUnderline,
  JobEntry, MarginNote, BodyHighlight,
  GitHubIcon, LinkedInIcon, SunIcon, MoonIcon, ResumeIcon
});
