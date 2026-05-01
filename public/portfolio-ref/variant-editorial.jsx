/* ============================================================
   Variation A · EDITORIAL
   Closest to Kami: parchment, serif-led, ink-blue, brand left-bar.
   Hero is split: portrait left, manifesto right.
   ============================================================ */

const { useEffect: useEffectA, useRef: useRefA } = React;

function VariantEditorial() {
  const D = window.PORTFOLIO;
  const rootRef = useRefA(null);
  useReveal(rootRef);

  // Theme toggle — flips body class immediately AND persists to disk
  // by posting an __edit_mode_set_keys message the host echoes back.
  const toggleTheme = () => {
    const isDark = document.body.classList.contains("theme-dark");
    const next = isDark ? "light" : "dark";
    document.body.classList.toggle("theme-dark", !isDark);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { theme: next } }, "*");
  };
  const [isDark, setIsDark] = React.useState(() => document.body.classList.contains("theme-dark"));
  React.useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.body.classList.contains("theme-dark")));
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="page var-editorial" ref={rootRef}>
      <TopNav
        name={D.name}
        items={D.nav}
        layout="centered"
        leftSlot={null}
        rightSlot={<>
          <IconButton onClick={toggleTheme} label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </IconButton>
          <IconButton href={D.github} label="GitHub"><GitHubIcon size={15} /></IconButton>
          <IconButton href={D.linkedin} label="LinkedIn"><LinkedInIcon size={15} /></IconButton>
          <IconButton href="#" label="Resume (PDF)"><ResumeIcon size={16} /></IconButton>
        </>}
      />

      {/* INTRO ===================================================== */}
      <section id="intro" className="band" style={{ paddingTop: "calc(var(--section-pad-y) * 0.55)", borderTop: 0 }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 320px) 1fr",
            gap: "var(--gap-xl)",
            alignItems: "center"
          }}>
            {/* portrait */}
            <div className="reveal" style={{ position: "relative" }}>
              <div style={{
                background: "var(--ivory)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "14px",
                position: "relative"
              }}>
                <img src="assets/portrait.png" alt={D.name} style={{
                  width: "100%", display: "block", borderRadius: "4px",
                  filter: "saturate(0.9)"
                }}/>
              </div>
            </div>

            {/* lead */}
            <div className="reveal">
              <h1 className="display" style={{ marginTop: "20px", marginBottom: "20px" }}>
                {D.name}.<br/>
                Pre-sales engineer, sometimes <em>shipping</em> code.
              </h1>
              <div style={{
                width: "60px", height: "2px", background: "var(--brand)",
                margin: "16px 0 22px"
              }}/>
              <p className="lede" style={{ fontSize: "22px", maxWidth: "44ch" }}>{D.tagline}</p>
              <div style={{ marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); }}>
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ===================================================== */}
      <Section id="about" alt={true}>
        <span className="eyebrow">About</span>
        <h2 className="section-title" style={{ fontSize: "36px", marginTop: "20px", marginBottom: "32px" }}>
          The long way around to software.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-xl)" }}>
          <div className="reveal">
            {D.about.long.map((para, i) => (
              <p key={i} style={{ fontSize: "18px", lineHeight: 1.6, marginBottom: "18px", color: "var(--dark-warm)" }}>{para}</p>
            ))}
          </div>
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="card">
              <div className="mono-label" style={{ marginBottom: "10px" }}>Now</div>
              <p style={{ margin: 0, fontSize: "16px", color: "var(--dark-warm)" }}>
                Principal SC at Oracle NetSuite. Building enablement for agentic coding workflows and integrating GenAI into pre-sales.
              </p>
            </div>
            <div className="card">
              <div className="mono-label" style={{ marginBottom: "10px" }}>Studying</div>
              <p style={{ margin: 0, fontSize: "16px", color: "var(--dark-warm)" }}>
                M.S. Analytics at Georgia Tech, online — wrapping spring 2026.
              </p>
            </div>
            <div className="card">
              <div className="mono-label" style={{ marginBottom: "10px" }}>Off the clock</div>
              <p style={{ margin: 0, fontSize: "16px", color: "var(--dark-warm)" }}>
                Building <em>BitBasis</em> — a Bitcoin cost-basis tracker — and writing analytics tutorials in Quarto.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS / METRICS ============================================ */}
      <Section id="skills">
        <span className="eyebrow">Performance & skills</span>
        <h2 className="section-title" style={{ fontSize: "36px", marginTop: "20px", marginBottom: "32px" }}>
          What the numbers say.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--gap-lg)", padding: "16px 0 36px", borderBottom: "1px dotted var(--border)", marginBottom: "44px" }}>
          {D.metrics.map((m, i) => (
            <div key={i} className="reveal">
              <div style={{
                fontFamily: "var(--serif)",
                fontSize: "64px",
                fontWeight: 500,
                color: "var(--brand)",
                lineHeight: 1,
                letterSpacing: "-1px",
                fontVariantNumeric: "tabular-nums",
                marginBottom: "10px"
              }}>
                <AnimatedNumber value={Number(m.value)} suffix={m.suffix} />
              </div>
              <div style={{ fontSize: "15px", color: "var(--near-black)", fontWeight: 500, marginBottom: "4px" }}>{m.label}</div>
              <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.45 }}>{m.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "var(--gap-xl)" }}>
          <div className="reveal">
            <h3 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: 500 }}>Skills matrix</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px 40px" }}>
              {D.skills.map(g => (
                <div key={g.group}>
                  <div className="mono-label" style={{ marginBottom: "12px", color: "var(--brand)" }}>{g.group}</div>
                  {g.items.map(s => <SkillBar key={s.name} {...s} />)}
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <h3 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: 500 }}>Certifications</h3>
            <div style={{ background: "var(--ivory)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
              {D.certs.map((c, i) => (
                <div key={i} style={{ padding: "18px 22px", borderBottom: i < D.certs.length - 1 ? "1px solid var(--border)" : "0" }}>
                  <div className="mono-label" style={{ marginBottom: "4px" }}>{c.issuer}</div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: "var(--near-black)" }}>{c.name}</div>
                  {c.note && <div style={{ fontSize: "13px", color: "var(--olive)", marginTop: "4px" }}>{c.note}</div>}
                </div>
              ))}
            </div>
            <h3 style={{ fontSize: "20px", margin: "32px 0 16px", fontWeight: 500 }}>Education</h3>
            <div style={{ background: "var(--ivory)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
              {D.education.map((e, i) => (
                <div key={i} style={{ padding: "16px 22px", borderBottom: i < D.education.length - 1 ? "1px solid var(--border)" : "0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 500 }}>{e.degree}</div>
                    <div style={{ fontSize: "13px", color: "var(--olive)" }}>{e.school} {e.note && "· " + e.note}</div>
                  </div>
                  <div className="mono-label">{e.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* HISTORY =================================================== */}
      <Section id="history" alt={true}>
        <span className="eyebrow">History</span>
        <h2 className="section-title" style={{ fontSize: "36px", marginTop: "20px", marginBottom: "44px" }}>
          Twelve years, two industries, one throughline.
        </h2>
        <div style={{ position: "relative" }}>
          {/* spine */}
          <div style={{
            position: "absolute",
            left: "120px", top: 0, bottom: 0,
            width: "1px",
            background: "var(--border)"
          }}/>
          {D.history.map((h, i) => (
            <div key={i} className="reveal" style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "32px",
              padding: "28px 0",
              position: "relative"
            }}>
              <div style={{ paddingTop: "4px" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--stone)", letterSpacing: "1px", lineHeight: 1.4 }}>
                  {h.start}<br/>
                  <span style={{ color: "var(--olive)" }}>↓ {h.end}</span>
                </div>
              </div>
              {/* dot */}
              <div style={{
                position: "absolute", left: "115px", top: "32px",
                width: "11px", height: "11px",
                background: i === 0 ? "var(--brand)" : "var(--ivory)",
                border: "1.5px solid var(--brand)",
                borderRadius: "50%",
                zIndex: 1
              }}/>
              <div style={{ paddingLeft: "28px" }}>
                <div className="mono-label" style={{ marginBottom: "6px" }}>{h.company} · {h.location}</div>
                <h3 style={{ fontSize: "26px", fontWeight: 500, margin: "0 0 12px", lineHeight: 1.2 }}>{h.role}</h3>
                <p style={{ fontSize: "16px", color: "var(--olive)", margin: "0 0 14px", maxWidth: "62ch", lineHeight: 1.55 }}>{h.blurb}</p>
                <ul className="dash" style={{ marginBottom: "14px" }}>
                  {h.bullets.map((b, j) => <li key={j} style={{ fontSize: "15px" }}>{b}</li>)}
                </ul>
                <div>{h.stack.map(s => <span key={s} className="tag">{s}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS ================================================== */}
      <Section id="projects">
        <span className="eyebrow">Selected projects</span>
        <h2 className="section-title" style={{ fontSize: "36px", marginTop: "20px", marginBottom: "32px" }}>
          Things shipped, things shipping.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--gap-lg)" }}>
          {D.projects.map((p, i) => (
            <div key={i} className="card reveal" style={{ padding: "26px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div className="mono-label">{p.kind}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--stone)", letterSpacing: "1px" }}>0{i+1}</div>
              </div>
              <h3 style={{ fontSize: "22px", fontWeight: 500, lineHeight: 1.25, margin: 0 }}>{p.name}</h3>
              <p style={{ fontSize: "15px", color: "var(--dark-warm)", margin: 0, lineHeight: 1.55 }}>{p.summary}</p>
              <div style={{
                borderLeft: "2px solid var(--brand)",
                padding: "2px 0 2px 12px",
                fontSize: "14px",
                color: "var(--olive)",
                marginTop: "4px"
              }}>{p.outcome}</div>
              <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT ================================================== */}
      <Section id="contact" alt={true}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--gap-xl)", alignItems: "start" }}>
          <div className="reveal">
            <span className="eyebrow">Contact</span>
            <h2 className="display" style={{ fontSize: "56px", marginTop: "16px", marginBottom: "20px" }}>
              Let's talk.
            </h2>
            <p className="lede" style={{ fontSize: "19px", maxWidth: "44ch", marginBottom: "20px" }}>
              Best for inbound about pre-sales engineering roles, NetSuite development work, or interesting GenAI integrations.
            </p>
            <div style={{ width: "60px", height: "2px", background: "var(--brand)", margin: "20px 0" }}/>
            <div className="mono-label">Houston, TX · CST</div>
          </div>
          <div className="reveal">
            <ContactRow label="Email"    value={D.email} href={"mailto:" + D.email} kind="primary" />
            <ContactRow label="GitHub"   value="github.com/brettwhite-git" href={D.github} kind="code" />
            <ContactRow label="LinkedIn" value="linkedin.com/in/bwhite90" href={D.linkedin} kind="professional" />
          </div>
        </div>
      </Section>

      <footer className="site-footer">
        <span>© {D.name} · 2026</span>
      </footer>
    </div>
  );
}

window.VariantEditorial = VariantEditorial;
