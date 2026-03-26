import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#1B3A6B",
  navyDeep: "#122647",
  navyMid: "#2A5298",
  sage: "#7EAF7E",
  sageLight: "#A8C9A8",
  sagePale: "#EDF5ED",
  cream: "#F9F8F4",
  white: "#FFFFFF",
  ink: "#1A1A18",
  inkMid: "#3D3D38",
  inkSoft: "#6B6B64",
  rule: "#E2E0D8",
  gold: "#C9A84C",
  riskLow: "#2E7D32",
  riskWatch: "#E68A00",
  riskHigh: "#C62828",
};

// ─── ICON COMPONENTS ───
const Icons = {
  Home: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Activity: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Users: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Settings: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Watch: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 17.35l-.35 3.83a2 2 0 01-2 1.82H9.83a2 2 0 01-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 019.83 1h4.35a2 2 0 012 1.82l.35 3.83"/>
    </svg>
  ),
  Wifi: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/>
    </svg>
  ),
  Camera: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={COLORS.gold} stroke={COLORS.gold} strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

// ─── RISK SCORE RING ───
const RiskRing = ({ score, size = 140, strokeW = 10 }) => {
  const radius = (size - strokeW) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(score / 100, 1);
  const offset = circ - pct * circ;
  const color = score <= 30 ? COLORS.riskLow : score <= 60 ? COLORS.riskWatch : COLORS.riskHigh;
  const label = score <= 30 ? "Low Risk" : score <= 60 ? "Watch" : "Elevated";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={COLORS.rule} strokeWidth={strokeW} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeW}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div style={{
        position: "relative", marginTop: -size + 20, height: size - 40,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ fontFamily: "'Georgia', serif", fontSize: size * 0.32, fontWeight: 700, color: COLORS.navy, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.inkSoft, marginTop: 2 }}>Risk Score</div>
      </div>
      <div style={{
        marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6,
        background: color + "14", border: `1px solid ${color}30`, borderRadius: 20, padding: "4px 14px"
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
        <span style={{ fontSize: 12, fontWeight: 500, color }}>{label} Today</span>
      </div>
    </div>
  );
};

// ─── MINI CHART ───
const MiniChart = ({ data, color = COLORS.sage, height = 48, width = 100 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 8) - 4}`).join(" ");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.length > 0 && (
        <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * (height - 8) - 4} r="3" fill={color} />
      )}
    </svg>
  );
};

// ─── CONFIDENTIAL STAMP ───
const ConfidentialStamp = () => (
  <div style={{
    position: "fixed", top: 52, right: -28, zIndex: 999, transform: "rotate(32deg)",
    border: `2px solid ${COLORS.riskHigh}50`, borderRadius: 6, padding: "3px 18px",
    fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
    color: COLORS.riskHigh + "70", background: COLORS.cream + "80", pointerEvents: "none",
  }}>
    Confidential
  </div>
);

// ─── NOTIFICATION BADGE ───
const NotifBadge = ({ count }) => count > 0 ? (
  <div style={{
    position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%",
    background: COLORS.riskHigh, color: "#fff", fontSize: 9, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>{count}</div>
) : null;

// ─── STAT CARD ───
const StatCard = ({ label, value, unit, trend, trendDir = "up", icon, sparkData }) => (
  <div style={{
    background: COLORS.white, borderRadius: 16, padding: "18px 16px", border: `1px solid ${COLORS.rule}`,
    display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden",
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: COLORS.inkSoft, textTransform: "uppercase" }}>{label}</div>
      {icon && <div style={{ color: COLORS.sageLight }}>{icon}</div>}
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
      <span style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: COLORS.navy }}>{value}</span>
      {unit && <span style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 400 }}>{unit}</span>}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      {trend && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 500,
          color: trendDir === "up" ? COLORS.riskLow : COLORS.riskWatch,
        }}>
          <Icons.TrendUp />{trend}
        </div>
      )}
      {sparkData && <MiniChart data={sparkData} color={COLORS.sage} height={32} width={64} />}
    </div>
  </div>
);

// ─── PLATFORM CARD ───
const PlatformCard = ({ name, tagline, status, icon, color, onClick }) => (
  <div onClick={onClick} style={{
    background: COLORS.white, borderRadius: 16, padding: "16px", border: `1px solid ${COLORS.rule}`,
    display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
  >
    <div style={{
      width: 44, height: 44, borderRadius: 12, background: color + "18",
      display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0,
    }}>{icon}</div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700, color: COLORS.navy }}>{name}</div>
      <div style={{ fontSize: 12, color: COLORS.inkSoft, marginTop: 1 }}>{tagline}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 7, height: 7, borderRadius: "50%",
        background: status === "active" ? COLORS.riskLow : status === "setup" ? COLORS.riskWatch : COLORS.rule,
      }} />
      <Icons.ChevronRight />
    </div>
  </div>
);

// ─── ALERT ITEM ───
const AlertItem = ({ title, desc, time, severity, isNew }) => {
  const sevColor = severity === "info" ? COLORS.sage : severity === "watch" ? COLORS.riskWatch : COLORS.riskHigh;
  return (
    <div style={{
      background: isNew ? sevColor + "08" : COLORS.white, borderRadius: 14, padding: "14px 16px",
      border: `1px solid ${isNew ? sevColor + "25" : COLORS.rule}`, display: "flex", gap: 12,
    }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%", background: sevColor, marginTop: 6, flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{title}</div>
        <div style={{ fontSize: 13, color: COLORS.inkSoft, marginTop: 3, lineHeight: 1.5 }}>{desc}</div>
        <div style={{ fontSize: 11, color: COLORS.inkSoft + "99", marginTop: 6 }}>{time}</div>
      </div>
    </div>
  );
};

// ─── ACHIEVEMENT CARD ───
const Achievement = ({ title, desc, earned }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
    background: earned ? COLORS.gold + "10" : COLORS.white, borderRadius: 12,
    border: `1px solid ${earned ? COLORS.gold + "30" : COLORS.rule}`,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: earned ? COLORS.gold : COLORS.rule,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {earned ? <Icons.Star /> : <div style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.inkSoft + "30" }} />}
    </div>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: earned ? COLORS.navy : COLORS.inkSoft }}>{title}</div>
      <div style={{ fontSize: 11, color: COLORS.inkSoft }}>{desc}</div>
    </div>
  </div>
);

// ─── WEEKLY CHART ───
const WeeklyChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, paddingTop: 16 }}>
      {data.map((d, i) => {
        const h = (d.value / max) * 72;
        const color = d.value <= 30 ? COLORS.riskLow : d.value <= 60 ? COLORS.riskWatch : COLORS.riskHigh;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: COLORS.inkSoft }}>{d.value}</div>
            <div style={{ width: "100%", height: h, background: color + "30", borderRadius: 6, position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: h * 0.7, background: color + "60", borderRadius: 6 }} />
            </div>
            <div style={{ fontSize: 10, color: COLORS.inkSoft, fontWeight: 500 }}>{days[i]}</div>
          </div>
        );
      })}
    </div>
  );
};

// ─── DETAIL SCREENS ───
const SteadfastScreen = ({ onBack }) => (
  <div style={{ padding: "0 20px 100px" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.sage, fontWeight: 500, fontSize: 14, padding: "16px 0", cursor: "pointer" }}>← Back</button>
    <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Steadfast™</div>
    <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24, lineHeight: 1.6 }}>Passive In-Home Sensor Network — your home's quiet intelligence layer.</div>

    <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.rule}`, padding: 20, marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 14 }}>Room Status</div>
      {["Bedroom", "Bathroom", "Kitchen", "Living Room"].map((room, i) => (
        <div key={room} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i ? `1px solid ${COLORS.rule}` : "none" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.ink }}>{room}</div>
            <div style={{ fontSize: 12, color: COLORS.inkSoft }}>{["Active — 14 min ago", "Clear — 2 hr ago", "Active — 3 min ago", "Clear — 45 min ago"][i]}</div>
          </div>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: i % 2 === 0 ? COLORS.riskLow : COLORS.sageLight }} />
        </div>
      ))}
    </div>

    <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.rule}`, padding: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 14 }}>Sensor Health</div>
      {["SR-01 Bedroom", "SR-02 Bathroom", "SR-03 Kitchen", "SR-04 Living Room"].map((s, i) => (
        <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i ? `1px solid ${COLORS.rule}` : "none" }}>
          <div style={{ fontSize: 13, color: COLORS.ink }}>{s}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 12, color: COLORS.riskLow, fontWeight: 500 }}>Online</div>
            <Icons.Check />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const StrideScreen = ({ onBack }) => (
  <div style={{ padding: "0 20px 100px" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.sage, fontWeight: 500, fontSize: 14, padding: "16px 0", cursor: "pointer" }}>← Back</button>
    <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Stride™</div>
    <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24, lineHeight: 1.6 }}>Wearable Integration & Gait Intelligence — learning what normal looks like.</div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
      <StatCard label="Steps" value="4,872" icon={<Icons.Activity />} sparkData={[3200, 4100, 3800, 4600, 5100, 4300, 4872]} trend="↑12%" />
      <StatCard label="Stride Len" value="62" unit="cm" sparkData={[58, 60, 59, 61, 63, 62, 62]} trend="Stable" trendDir="up" />
      <StatCard label="Cadence" value="108" unit="spm" sparkData={[105, 106, 110, 108, 107, 109, 108]} />
      <StatCard label="Balance" value="84" unit="/100" sparkData={[76, 78, 80, 81, 82, 83, 84]} trend="↑11%" />
    </div>

    <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.rule}`, padding: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 6 }}>Connected Device</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.navyDeep, display: "flex", alignItems: "center", justifyContent: "center" }}><Icons.Watch /></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>Apple Watch Series 9</div>
          <div style={{ fontSize: 12, color: COLORS.riskLow }}>Synced 4 min ago</div>
        </div>
      </div>
    </div>
  </div>
);

const VigilScreen = ({ onBack }) => (
  <div style={{ padding: "0 20px 100px" }}>
    <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.sage, fontWeight: 500, fontSize: 14, padding: "16px 0", cursor: "pointer" }}>← Back</button>
    <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Vigil™</div>
    <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24, lineHeight: 1.6 }}>Camera-Enabled Computer Vision — maximum confidence for highest-risk needs.</div>

    <div style={{ background: COLORS.navyDeep, borderRadius: 16, padding: 20, marginBottom: 16, textAlign: "center" }}>
      <div style={{ color: COLORS.sageLight, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Privacy Mode Active</div>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: `2px solid ${COLORS.sage}40` }}>
        <Icons.Camera />
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Gait analysis runs on-device. No video stored. Family controls all privacy tiers.</div>
    </div>

    <div style={{ background: COLORS.white, borderRadius: 16, border: `1px solid ${COLORS.rule}`, padding: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 14 }}>Today's Analysis</div>
      {["Gait Symmetry: 92%", "Posture Score: 87/100", "Turn Stability: Normal", "Sit-to-Stand: 1.4s avg"].map((item, i) => (
        <div key={item} style={{ padding: "10px 0", borderTop: i ? `1px solid ${COLORS.rule}` : "none", fontSize: 14, color: COLORS.ink }}>{item}</div>
      ))}
    </div>
  </div>
);

// ─── SPLASH SCREEN ───
const SplashScreen = ({ phase }) => {
  const showLogo = phase >= 1;
  const showTagline = phase >= 2;
  const showGlow = phase >= 1;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, background: COLORS.navyDeep,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.sage}18 0%, transparent 70%)`,
        opacity: showGlow ? 1 : 0, transition: "opacity 2s ease",
        top: "30%", left: "50%", transform: "translate(-50%, -50%)",
      }} />

      {/* Haven wordmark */}
      <div style={{
        fontFamily: "'Georgia', serif", fontSize: 42, fontWeight: 700, color: COLORS.white,
        letterSpacing: "0.04em", opacity: showLogo ? 1 : 0,
        transform: showLogo ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", zIndex: 2,
      }}>
        Haven
      </div>

      {/* Sub-brand */}
      <div style={{
        fontSize: 11, fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase",
        color: COLORS.sageLight, marginTop: 6,
        opacity: showLogo ? 0.7 : 0,
        transform: showLogo ? "translateY(0)" : "translateY(10px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        position: "relative", zIndex: 2,
      }}>
        Home Wellness
      </div>

      {/* Divider line */}
      <div style={{
        width: showTagline ? 48 : 0, height: 1, background: COLORS.sage,
        margin: "28px 0", transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", zIndex: 2, opacity: 0.5,
      }} />

      {/* Tagline */}
      <div style={{
        fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 16,
        color: COLORS.sageLight, opacity: showTagline ? 0.8 : 0,
        transform: showTagline ? "translateY(0)" : "translateY(12px)",
        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        position: "relative", zIndex: 2,
      }}>
        Where home feels safe again.
      </div>
    </div>
  );
};

// ─── BEACON REVEAL ───
const BeaconReveal = ({ phase }) => {
  const showBeacon = phase >= 1;
  const showSub = phase >= 2;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 190, background: COLORS.navyDeep,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      {/* Radial pulse */}
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        border: `1px solid ${COLORS.sage}20`,
        opacity: showBeacon ? 1 : 0, transform: showBeacon ? "scale(1)" : "scale(0.5)",
        transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
        top: "50%", left: "50%", marginTop: -150, marginLeft: -150,
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200, borderRadius: "50%",
        border: `1px solid ${COLORS.sage}15`,
        opacity: showBeacon ? 1 : 0, transform: showBeacon ? "scale(1)" : "scale(0.3)",
        transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
        top: "50%", left: "50%", marginTop: -100, marginLeft: -100,
      }} />

      {/* Beacon icon glow */}
      <div style={{
        width: 72, height: 72, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.sage}30 0%, ${COLORS.sage}08 60%, transparent 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: showBeacon ? 1 : 0, transform: showBeacon ? "scale(1)" : "scale(0.6)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", zIndex: 2, marginBottom: 20,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%", background: COLORS.sage + "25",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ color: COLORS.sageLight }}><Icons.Shield /></div>
        </div>
      </div>

      {/* Beacon text */}
      <div style={{
        fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: COLORS.white,
        letterSpacing: "0.02em",
        opacity: showBeacon ? 1 : 0, transform: showBeacon ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        position: "relative", zIndex: 2,
      }}>
        Beacon
      </div>

      <div style={{
        fontSize: 12, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase",
        color: COLORS.sageLight, marginTop: 8,
        opacity: showSub ? 0.6 : 0, transform: showSub ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative", zIndex: 2,
      }}>
        Family Dashboard & Alert Intelligence
      </div>
    </div>
  );
};

// ─── SYNC SCREEN ───
const SyncScreen = ({ syncStates }) => {
  const platforms = [
    { name: "Steadfast™", desc: "In-Home Sensors", icon: <Icons.Wifi />, key: "steadfast" },
    { name: "Stride™", desc: "Wearable Intelligence", icon: <Icons.Watch />, key: "stride" },
    { name: "Vigil™", desc: "Computer Vision", icon: <Icons.Camera />, key: "vigil" },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 180, background: COLORS.navyDeep,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "0 40px", overflow: "hidden",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase",
        color: COLORS.sage, marginBottom: 32, opacity: 0.7,
      }}>Connecting Platforms</div>

      <div style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: 16 }}>
        {platforms.map((p, i) => {
          const state = syncStates[p.key]; // "waiting" | "syncing" | "done"
          return (
            <div key={p.key} style={{
              display: "flex", alignItems: "center", gap: 16,
              opacity: state === "waiting" ? 0.3 : 1,
              transform: state === "waiting" ? "translateX(-8px)" : "translateX(0)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              {/* Icon */}
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: state === "done" ? COLORS.sage + "25" : "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: state === "done" ? COLORS.sage : "rgba(255,255,255,0.3)",
                transition: "all 0.5s ease",
              }}>{p.icon}</div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{p.desc}</div>
              </div>

              {/* Status */}
              <div style={{ width: 28, display: "flex", justifyContent: "center" }}>
                {state === "syncing" && (
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: `2px solid ${COLORS.sage}40`, borderTopColor: COLORS.sage,
                    animation: "spin 0.8s linear infinite",
                  }} />
                )}
                {state === "done" && (
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: COLORS.sage,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: "scale(1)", animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}>
                    <Icons.Check />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        width: "100%", maxWidth: 280, height: 2, background: "rgba(255,255,255,0.08)",
        borderRadius: 2, marginTop: 36, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", background: COLORS.sage, borderRadius: 2,
          width: `${(Object.values(syncStates).filter(s => s === "done").length / 3) * 100}%`,
          transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </div>
    </div>
  );
};

// ─── ONBOARDING ───
const OnboardingScreen = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <Icons.Shield />,
      title: "Welcome to Beacon",
      desc: "Your family's daily window into wellness. Beacon brings together every sensor, every wearable, and every insight — so you always know how they're doing.",
      accent: COLORS.sage,
    },
    {
      icon: <Icons.Activity />,
      title: "Predictive, Not Reactive",
      desc: "Haven's AI builds a personal baseline for your loved one. When something changes — even subtly — Beacon catches it before it becomes a problem.",
      accent: COLORS.gold,
    },
    {
      icon: <Icons.Users />,
      title: "Built for Families",
      desc: "Risk scores, not medical jargon. Weekly narratives, not data dumps. Achievements that celebrate progress. This is wellness your whole family can understand.",
      accent: COLORS.navyMid,
    },
  ];

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 170, background: COLORS.navyDeep,
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {/* Skip */}
      <div style={{ padding: "56px 24px 0", textAlign: "right" }}>
        <button onClick={onComplete} style={{
          background: "none", border: "none", fontSize: 13, fontWeight: 500,
          letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", cursor: "pointer",
          padding: "8px 0",
        }}>Skip</button>
      </div>

      {/* Slide content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "0 40px", textAlign: "center",
      }}>
        {/* Animated icon */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: slide.accent + "18", border: `1px solid ${slide.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: slide.accent, marginBottom: 36,
          animation: "breathe 3s ease-in-out infinite",
        }}>{slide.icon}</div>

        <div style={{
          fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700,
          color: COLORS.white, lineHeight: 1.2, marginBottom: 16,
        }}>{slide.title}</div>

        <div style={{
          fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7, maxWidth: 300,
        }}>{slide.desc}</div>
      </div>

      {/* Bottom controls */}
      <div style={{ padding: "0 40px 60px" }}>
        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === currentSlide ? 24 : 8, height: 8, borderRadius: 4,
              background: i === currentSlide ? COLORS.sage : "rgba(255,255,255,0.15)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => isLast ? onComplete() : setCurrentSlide(c => c + 1)}
          style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none",
            background: isLast ? COLORS.sage : "rgba(255,255,255,0.1)",
            color: isLast ? COLORS.white : "rgba(255,255,255,0.8)",
            fontSize: 16, fontWeight: 600, cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "all 0.3s ease",
          }}
        >
          {isLast ? "Let's Go" : "Next"}
        </button>
      </div>
    </div>
  );
};

// ─── KEYFRAMES (injected via style tag) ───
const GlobalStyles = () => (
  <style>{`
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }
    @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `}</style>
);

// ─── MAIN APP ───
export default function HavenApp() {
  const [tab, setTab] = useState("home");
  const [detailScreen, setDetailScreen] = useState(null);

  // Startup state machine: splash → beacon → sync → onboarding → ready
  const [appPhase, setAppPhase] = useState("splash");
  const [splashPhase, setSplashPhase] = useState(0);
  const [beaconPhase, setBeaconPhase] = useState(0);
  const [syncStates, setSyncStates] = useState({ steadfast: "waiting", stride: "waiting", vigil: "waiting" });
  const [dashReady, setDashReady] = useState(false);

  // ─── STARTUP SEQUENCE ORCHESTRATOR ───
  useEffect(() => {
    if (appPhase !== "splash") return;
    const t1 = setTimeout(() => setSplashPhase(1), 300);      // Logo appears
    const t2 = setTimeout(() => setSplashPhase(2), 1400);     // Tagline appears
    const t3 = setTimeout(() => setAppPhase("beacon"), 3200); // Move to beacon
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [appPhase]);

  useEffect(() => {
    if (appPhase !== "beacon") return;
    const t1 = setTimeout(() => setBeaconPhase(1), 200);      // Beacon name
    const t2 = setTimeout(() => setBeaconPhase(2), 900);      // Subtitle
    const t3 = setTimeout(() => setAppPhase("sync"), 2800);   // Move to sync
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [appPhase]);

  useEffect(() => {
    if (appPhase !== "sync") return;
    const t1 = setTimeout(() => setSyncStates(s => ({ ...s, steadfast: "syncing" })), 400);
    const t2 = setTimeout(() => setSyncStates(s => ({ ...s, steadfast: "done" })), 1200);
    const t3 = setTimeout(() => setSyncStates(s => ({ ...s, stride: "syncing" })), 1500);
    const t4 = setTimeout(() => setSyncStates(s => ({ ...s, stride: "done" })), 2400);
    const t5 = setTimeout(() => setSyncStates(s => ({ ...s, vigil: "syncing" })), 2700);
    const t6 = setTimeout(() => setSyncStates(s => ({ ...s, vigil: "done" })), 3500);
    const t7 = setTimeout(() => setAppPhase("onboarding"), 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); };
  }, [appPhase]);

  useEffect(() => {
    if (appPhase !== "ready") return;
    const t = setTimeout(() => setDashReady(true), 100);
    return () => clearTimeout(t);
  }, [appPhase]);

  const weeklyData = [
    { value: 18 }, { value: 22 }, { value: 15 }, { value: 28 }, { value: 19 }, { value: 14 }, { value: 14 },
  ];

  const alerts = [
    { title: "Balance trend improving", desc: "Margaret's 7-day balance score is up 11%. Stride is quietly learning what her new normal looks like.", time: "Today, 9:14 AM", severity: "info", isNew: true },
    { title: "Bathroom visit pattern shift", desc: "Steadfast noticed 2 extra nighttime bathroom visits this week. Worth a conversation, not a concern yet.", time: "Yesterday, 7:02 AM", severity: "watch", isNew: true },
    { title: "Weekly Wellness Summary", desc: "Great week overall — 4,200 avg daily steps, stable sleep, improving gait metrics. Margaret's doing well.", time: "Mon, Mar 16", severity: "info", isNew: false },
  ];

  const renderContent = () => {
    if (detailScreen === "steadfast") return <SteadfastScreen onBack={() => setDetailScreen(null)} />;
    if (detailScreen === "stride") return <StrideScreen onBack={() => setDetailScreen(null)} />;
    if (detailScreen === "vigil") return <VigilScreen onBack={() => setDetailScreen(null)} />;

    switch (tab) {
      case "home":
        return (
          <div style={{ padding: "0 20px 100px" }}>
            {/* Greeting */}
            <div style={{ marginBottom: 24, opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 6 }}>Beacon · Today via Steadfast & Stride</div>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: COLORS.navy, lineHeight: 1.2 }}>
                Good afternoon
              </div>
              <div style={{ fontSize: 14, color: COLORS.inkSoft, marginTop: 4 }}>Margaret is having a good day.</div>
            </div>

            {/* Risk Ring */}
            <div style={{
              background: COLORS.white, borderRadius: 20, padding: "28px 20px 24px", border: `1px solid ${COLORS.rule}`,
              display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16,
              opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}>
              <RiskRing score={14} />
              <div style={{ marginTop: 16, fontSize: 13, color: COLORS.inkSoft, textAlign: "center", lineHeight: 1.6, maxWidth: 280 }}>
                Her balance and gait patterns look steady. No changes flagged today.
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20,
              opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}>
              {[
                { l: "Steps", v: "4,872", s: "Stride" },
                { l: "Sleep", v: "7.9h", s: "Steadfast" },
                { l: "Balance", v: "↑11%", s: "Stride" },
              ].map(s => (
                <div key={s.l} style={{
                  background: COLORS.white, borderRadius: 14, padding: "14px 12px", border: `1px solid ${COLORS.rule}`, textAlign: "center",
                }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: COLORS.navy }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 9, color: COLORS.sage, fontWeight: 600, letterSpacing: "0.08em", marginTop: 4, textTransform: "uppercase" }}>{s.s}</div>
                </div>
              ))}
            </div>

            {/* Weekly Trend */}
            <div style={{ background: COLORS.white, borderRadius: 16, padding: "18px 16px", border: `1px solid ${COLORS.rule}`, marginBottom: 20,
              opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.sage }}>7-Day Risk Trend</div>
                <div style={{ fontSize: 11, color: COLORS.riskLow, fontWeight: 500 }}>Avg: 19</div>
              </div>
              <WeeklyChart data={weeklyData} />
            </div>

            {/* Platforms */}
            <div style={{ marginBottom: 20,
              opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 12 }}>Connected Platforms</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <PlatformCard name="Steadfast™" tagline="In-Home Sensors" status="active" icon={<Icons.Wifi />} color={COLORS.navy} onClick={() => setDetailScreen("steadfast")} />
                <PlatformCard name="Stride™" tagline="Wearable Intelligence" status="active" icon={<Icons.Watch />} color={COLORS.sage} onClick={() => setDetailScreen("stride")} />
                <PlatformCard name="Vigil™" tagline="Computer Vision" status="setup" icon={<Icons.Camera />} color={COLORS.navyMid} onClick={() => setDetailScreen("vigil")} />
              </div>
            </div>

            {/* Achievements */}
            <div style={{
              opacity: dashReady ? 1 : 0, transform: dashReady ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.85s",
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: COLORS.sage, marginBottom: 12 }}>Milestones</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Achievement title="7-Day Streak" desc="Active every day this week" earned />
                <Achievement title="Balance Builder" desc="Balance improved 3 weeks running" earned />
                <Achievement title="5K Club" desc="Hit 5,000 steps in a day" earned={false} />
              </div>
            </div>
          </div>
        );

      case "alerts":
        return (
          <div style={{ padding: "0 20px 100px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 6 }}>Beacon Alert Intelligence</div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Alerts & Insights</div>
            <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24 }}>Context, not panic. Insights, not alarms.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {alerts.map((a, i) => <AlertItem key={i} {...a} />)}
            </div>
          </div>
        );

      case "insights":
        return (
          <div style={{ padding: "0 20px 100px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: 6 }}>Beacon Weekly Report</div>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Weekly Narrative</div>
            <div style={{ fontSize: 13, color: COLORS.inkSoft, marginBottom: 24 }}>AI-generated wellness summary — your week at a glance.</div>
            <div style={{ background: COLORS.white, borderRadius: 16, padding: 22, border: `1px solid ${COLORS.rule}`, marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12 }}>Week of Mar 10 – 16</div>
              <div style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 18, color: COLORS.navy, lineHeight: 1.4, marginBottom: 16 }}>
                "Your mom had a great week — her balance score improved 8%."
              </div>
              <div style={{ fontSize: 14, color: COLORS.inkMid, lineHeight: 1.75 }}>
                Margaret averaged 4,200 steps daily, up from 3,800 the week before. Steadfast tracked consistent morning routines with no unusual patterns. Stride detected a subtle improvement in stride symmetry, suggesting the new walking shoes may be helping.
              </div>
              <div style={{ fontSize: 14, color: COLORS.inkMid, lineHeight: 1.75, marginTop: 12 }}>
                Sleep quality remained strong at 7.6 hours average with only one brief nighttime wake period. Her risk score stayed in the low range all week — the lowest sustained period in the last 30 days.
              </div>
              <div style={{ fontSize: 14, color: COLORS.inkMid, lineHeight: 1.75, marginTop: 12 }}>
                One thing to note: two additional bathroom visits on Thursday night. Likely nothing, but worth a gentle check-in.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <StatCard label="Avg Steps" value="4,200" trend="↑10.5%" sparkData={[3600, 3800, 3900, 4000, 4100, 4300, 4200]} />
              <StatCard label="Avg Sleep" value="7.6" unit="hrs" trend="Stable" sparkData={[7.4, 7.8, 7.5, 7.7, 7.6, 7.9, 7.6]} />
            </div>
          </div>
        );

      case "settings":
        return (
          <div style={{ padding: "0 20px 100px" }}>
            <div style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 700, color: COLORS.navy, marginBottom: 24 }}>Settings</div>

            <div style={{ background: COLORS.white, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.rule}`, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${COLORS.rule}` }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", background: COLORS.navyDeep,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: COLORS.white,
                }}>M</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.ink }}>Margaret's Home</div>
                  <div style={{ fontSize: 12, color: COLORS.inkSoft }}>3 platforms active · Low risk</div>
                </div>
              </div>

              {["Alert Preferences", "Family Members", "Privacy Controls", "Sensor Configuration", "Wearable Settings", "Account & Billing"].map((item, i) => (
                <div key={item} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0", borderTop: i ? `1px solid ${COLORS.rule}` : "none", cursor: "pointer",
                }}>
                  <div style={{ fontSize: 15, color: COLORS.ink }}>{item}</div>
                  <Icons.ChevronRight />
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 700, color: COLORS.navy }}>Haven Home Wellness</div>
              <div style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 4 }}>v1.0.0 · havenhomewellness.ai</div>
              <div style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: 13, color: COLORS.sage, marginTop: 8 }}>Where home feels safe again.</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: "home", label: "Beacon", icon: <Icons.Home /> },
    { id: "alerts", label: "Alerts", icon: <Icons.Bell />, badge: 2 },
    { id: "insights", label: "Insights", icon: <Icons.Activity /> },
    { id: "settings", label: "Settings", icon: <Icons.Settings /> },
  ];

  return (
    <div style={{
      maxWidth: 390, margin: "0 auto", minHeight: "100vh", background: COLORS.cream,
      fontFamily: "'Jost', 'Calibri', system-ui, sans-serif", position: "relative",
      borderLeft: `1px solid ${COLORS.rule}`, borderRight: `1px solid ${COLORS.rule}`,
    }}>
      <GlobalStyles />

      {/* ─── STARTUP SCREENS ─── */}
      {(appPhase === "splash") && <SplashScreen phase={splashPhase} />}
      {(appPhase === "beacon") && <BeaconReveal phase={beaconPhase} />}
      {(appPhase === "sync") && <SyncScreen syncStates={syncStates} />}
      {(appPhase === "onboarding") && <OnboardingScreen onComplete={() => setAppPhase("ready")} />}

      {/* ─── MAIN APP (only when ready) ─── */}
      {appPhase === "ready" && (
        <>
          <ConfidentialStamp />

      {/* Status Bar */}
      <div style={{
        padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: COLORS.cream,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>9:41</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 16, height: 10, border: `1.5px solid ${COLORS.ink}`, borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", inset: 2, background: COLORS.ink, borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Top Bar */}
      <div style={{
        padding: "8px 20px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, background: COLORS.cream + "F0", backdropFilter: "blur(12px)",
        zIndex: 50, borderBottom: `1px solid ${COLORS.rule}40`,
      }}>
        <div>
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: COLORS.navy, letterSpacing: "0.01em" }}>
            Beacon
          </div>
          <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.inkSoft, marginTop: -1 }}>
            by Haven Home Wellness
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Icons.Bell />
            <NotifBadge count={2} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ paddingTop: 16 }}>
        {renderContent()}
      </div>

      {/* Tab Bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 390,
        background: COLORS.white + "F5", backdropFilter: "blur(16px)",
        borderTop: `1px solid ${COLORS.rule}`, display: "flex", justifyContent: "space-around",
        padding: "8px 0 28px", zIndex: 50,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setDetailScreen(null); }}
            style={{
              background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3, padding: "4px 16px", position: "relative",
              color: tab === t.id ? COLORS.navy : COLORS.inkSoft, transition: "color 0.2s",
            }}
          >
            <div style={{ position: "relative" }}>
              {t.icon}
              {t.badge && <NotifBadge count={t.badge} />}
            </div>
            <span style={{
              fontSize: 10, fontWeight: tab === t.id ? 600 : 400,
              letterSpacing: "0.04em",
            }}>{t.label}</span>
            {tab === t.id && <div style={{
              position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
              width: 20, height: 2, background: COLORS.sage, borderRadius: 2,
            }} />}
          </button>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
