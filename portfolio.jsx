import { useState, useEffect, useRef } from "react";
import {
    ArrowUpRight,
    Github,
    Linkedin,
    Twitter,
    Mail,
    ArrowRight,
    Plus,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 *  PORTFOLIO — Editorial Brutalist
 *  Replace placeholder copy, projects, posts and links with your own.
 * -------------------------------------------------------------------------- */

const PROFILE = {
    name: "Sade Okonkwo",
    role: "Software Engineer & Interface Designer",
    location: "Lagos / Remote",
    intro:
        "I build interfaces that feel a little less like software and a little more like the things they replace. Currently freelancing on systems for media, climate and small studios.",
    email: "hello@example.com",
    socials: [
        { label: "GitHub", icon: Github, href: "#" },
        { label: "LinkedIn", icon: Linkedin, href: "#" },
        { label: "Twitter", icon: Twitter, href: "#" },
    ],
};

const PROJECTS = [
    {
        n: "01",
        title: "Aperture",
        kind: "Design System",
        year: "2025",
        client: "for a national broadcaster",
        blurb:
            "A typographic-first component library powering thirty editorial properties. Variable fonts, optical sizing, and a layout grammar that keeps the newsroom shipping.",
        tags: ["React", "Figma", "Variable Fonts"],
    },
    {
        n: "02",
        title: "Halftide",
        kind: "Realtime Dashboard",
        year: "2025",
        client: "for a logistics platform",
        blurb:
            "Sub-second telemetry for ten thousand vessels. WebGL canvas, server-sent events, and a control room palette tuned for ten-hour shifts.",
        tags: ["WebGL", "TypeScript", "Rust"],
    },
    {
        n: "03",
        title: "Verdigris",
        kind: "Climate Tool",
        year: "2024",
        client: "for an environmental NGO",
        blurb:
            "An open data instrument for tracking emissions disclosures. Built in the open, donated to the field, currently used by twelve research desks.",
        tags: ["Next.js", "Postgres", "D3"],
    },
    {
        n: "04",
        title: "Mercator",
        kind: "Cartography Studio",
        year: "2024",
        client: "self-initiated",
        blurb:
            "A browser-based map editor for journalists. Vector tiles, exportable to print, with a type system that respects the geography it labels.",
        tags: ["MapLibre", "Svelte", "SVG"],
    },
];

const STACK = {
    Languages: ["TypeScript", "Rust", "Go", "Python", "SQL"],
    Frontend: ["React", "Next.js", "Svelte", "Astro", "Tailwind", "Three.js"],
    Backend: ["Node", "Postgres", "Redis", "tRPC", "GraphQL"],
    Craft: ["Figma", "Motion", "WebGL", "Type design", "Print"],
};

const POSTS = [
    {
        date: "Mar 2026",
        read: "12 min",
        title: "Notes on building with WebGPU, six months in",
        kicker: "Engineering",
    },
    {
        date: "Feb 2026",
        read: "7 min",
        title: "A pattern language for forms that don't feel like forms",
        kicker: "Design",
    },
    {
        date: "Dec 2025",
        read: "9 min",
        title: "The death of the design system, again",
        kicker: "Essay",
    },
    {
        date: "Oct 2025",
        read: "5 min",
        title: "Why I stopped reaching for component libraries",
        kicker: "Process",
    },
];

/* --- small reveal hook --------------------------------------------------- */
function useReveal() {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setShown(true),
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return [ref, shown];
}

function Reveal({ children, delay = 0, as: As = "div", className = "" }) {
    const [ref, shown] = useReveal();
    return (
        <As
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 800ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
            }}
        >
            {children}
        </As>
    );
}

/* --- live clock ---------------------------------------------------------- */
function Clock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return (
        <span style={{ fontFamily: "var(--mono)" }}>
            {hh}:{mm}:{ss}
            <span style={{ color: "var(--accent)" }}> ●</span>
        </span>
    );
}

export default function Portfolio() {
    const [sent, setSent] = useState(false);
    const [hoverProject, setHoverProject] = useState(null);

    return (
        <div
            style={{
                background: "var(--paper)",
                color: "var(--ink)",
                fontFamily: "var(--sans)",
            }}
            className="min-h-screen w-full overflow-x-hidden"
        >
            {/* ---------------- GLOBAL STYLES ---------------- */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@400;500&display=swap');

        :root {
          --paper:  #EFEAE0;
          --paper-2:#E6DFD0;
          --ink:    #14110D;
          --ink-2:  #4A4640;
          --accent: #FF3D00;
          --rule:   #1411101A;
          --serif:  'Fraunces', ui-serif, Georgia, serif;
          --sans:   'DM Sans', ui-sans-serif, system-ui, sans-serif;
          --mono:   'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
        }

        ::selection { background: var(--accent); color: var(--paper); }

        .display {
          font-family: var(--serif);
          font-variation-settings: "opsz" 144, "SOFT" 30, "WONK" 1;
          letter-spacing: -0.04em;
          line-height: 0.86;
        }
        .serif-body {
          font-family: var(--serif);
          font-variation-settings: "opsz" 14, "SOFT" 50, "WONK" 0;
        }
        .mono { font-family: var(--mono); }
        .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .grain::before {
          content: "";
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.05;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>");
        }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 40s linear infinite;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%,100% { opacity: 0; }
        }
        .caret { animation: blink 1.1s steps(1) infinite; }

        .project-row { transition: background 350ms ease, color 350ms ease; }
        .project-row .arrow {
          transition: transform 450ms cubic-bezier(.2,.7,.2,1), opacity 350ms ease;
          transform: translate(-12px, 0);
          opacity: 0;
        }
        .project-row:hover { background: var(--ink); color: var(--paper); }
        .project-row:hover .arrow { transform: translate(0, 0); opacity: 1; }
        .project-row:hover .rule-color { background: var(--paper); }

        .underline-grow { position: relative; display: inline-block; }
        .underline-grow::after {
          content: ""; position: absolute; left: 0; bottom: -2px;
          height: 1px; width: 100%; background: currentColor;
          transform: scaleX(0); transform-origin: left;
          transition: transform 450ms cubic-bezier(.2,.7,.2,1);
        }
        .underline-grow:hover::after { transform: scaleX(1); }

        input.brutal, textarea.brutal {
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--ink);
          padding: 14px 0;
          font-family: var(--serif);
          font-size: 22px;
          color: var(--ink);
          width: 100%;
          outline: none;
          transition: border-color 250ms ease;
        }
        input.brutal:focus, textarea.brutal:focus {
          border-color: var(--accent);
        }
        input.brutal::placeholder, textarea.brutal::placeholder {
          color: var(--ink-2);
          font-style: italic;
        }
      `}</style>

            <div className="grain" />

            {/* ---------------- TOP BAR ---------------- */}
            <header
                className="fixed top-0 left-0 right-0 z-40 px-6 md:px-10 py-4 flex items-center justify-between"
                style={{
                    background: "color-mix(in oklab, var(--paper) 85%, transparent)",
                    backdropFilter: "blur(8px)",
                    borderBottom: "1px solid var(--rule)",
                }}
            >
                <a href="#top" className="label flex items-center gap-2">
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: "var(--accent)" }}
                    />
                    {PROFILE.name.split(" ")[0]} / Studio
                </a>
                <nav className="hidden md:flex gap-8 label">
                    <a href="#work" className="underline-grow">Work</a>
                    <a href="#about" className="underline-grow">About</a>
                    <a href="#stack" className="underline-grow">Stack</a>
                    <a href="#writing" className="underline-grow">Writing</a>
                    <a href="#contact" className="underline-grow">Contact</a>
                </nav>
                <div className="label hidden sm:block">
                    <Clock />
                </div>
            </header>

            {/* ---------------- HERO ---------------- */}
            <section
                id="top"
                className="relative px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32"
            >
                {/* meta strip */}
                <div className="flex items-center justify-between mb-16 md:mb-24 label">
                    <span>Portfolio — Vol. 04 / 2026</span>
                    <span className="hidden md:inline">{PROFILE.location}</span>
                    <span>Available for select work</span>
                </div>

                {/* giant name */}
                <Reveal>
                    <h1
                        className="display"
                        style={{
                            fontWeight: 400,
                            fontSize: "clamp(64px, 16vw, 240px)",
                        }}
                    >
                        {PROFILE.name.split(" ").map((word, i) => (
                            <span key={i} className="block">
                                {word}
                                {i === 0 && (
                                    <span
                                        style={{
                                            color: "var(--accent)",
                                            fontStyle: "italic",
                                            fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
                                        }}
                                    >
                                        .
                                    </span>
                                )}
                            </span>
                        ))}
                    </h1>
                </Reveal>

                {/* role + intro grid */}
                <div className="grid grid-cols-12 gap-6 mt-16 md:mt-20">
                    <Reveal delay={150} className="col-span-12 md:col-span-5">
                        <div className="label mb-4" style={{ color: "var(--ink-2)" }}>
                            ※ Currently
                        </div>
                        <p
                            className="serif-body"
                            style={{
                                fontSize: "clamp(20px, 2vw, 26px)",
                                lineHeight: 1.35,
                                fontWeight: 350,
                            }}
                        >
                            {PROFILE.role}, working from {PROFILE.location}. Building things
                            that ought to exist for clients who care how they feel.
                        </p>
                    </Reveal>

                    <Reveal delay={300} className="col-span-12 md:col-start-8 md:col-span-5">
                        <div className="label mb-4" style={{ color: "var(--ink-2)" }}>
                            ※ About
                        </div>
                        <p
                            id="about"
                            className="serif-body"
                            style={{
                                fontSize: "clamp(18px, 1.6vw, 22px)",
                                lineHeight: 1.5,
                                fontWeight: 350,
                            }}
                        >
                            {PROFILE.intro}
                        </p>
                        <a
                            href="#contact"
                            className="label inline-flex items-center gap-2 mt-8 underline-grow"
                            style={{ color: "var(--accent)" }}
                        >
                            Start a project <ArrowRight size={14} />
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* ---------------- WORK ---------------- */}
            <section
                id="work"
                className="px-6 md:px-10 pt-24 md:pt-32 pb-24"
                style={{ borderTop: "1px solid var(--rule)" }}
            >
                <div className="flex items-baseline justify-between mb-12 md:mb-16">
                    <div>
                        <div className="label" style={{ color: "var(--ink-2)" }}>
                            § Selected Work
                        </div>
                        <h2
                            className="display mt-3"
                            style={{
                                fontWeight: 350,
                                fontSize: "clamp(40px, 7vw, 96px)",
                            }}
                        >
                            Things I've{" "}
                            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                                made
                            </span>
                            .
                        </h2>
                    </div>
                    <div className="label hidden md:block" style={{ color: "var(--ink-2)" }}>
                        {String(PROJECTS.length).padStart(2, "0")} projects
                    </div>
                </div>

                <div style={{ borderTop: "1px solid var(--ink)" }}>
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.n} delay={i * 80}>
                            <a
                                href="#"
                                className="project-row block"
                                onMouseEnter={() => setHoverProject(i)}
                                onMouseLeave={() => setHoverProject(null)}
                                style={{ borderBottom: "1px solid var(--ink)" }}
                            >
                                <div className="grid grid-cols-12 gap-4 items-center px-2 md:px-4 py-6 md:py-8">
                                    <div className="col-span-2 md:col-span-1 mono text-sm">
                                        {p.n}
                                    </div>
                                    <div className="col-span-10 md:col-span-4">
                                        <div
                                            className="display"
                                            style={{
                                                fontWeight: 400,
                                                fontSize: "clamp(28px, 4.5vw, 56px)",
                                            }}
                                        >
                                            {p.title}
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-3 label opacity-80">
                                        {p.kind}
                                    </div>
                                    <div className="hidden md:flex md:col-span-3 gap-2 flex-wrap">
                                        {p.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="label rule-color"
                                                style={{
                                                    padding: "4px 10px",
                                                    border: "1px solid currentColor",
                                                    borderRadius: 999,
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-3 mono text-sm">
                                        {p.year}
                                        <span className="arrow">
                                            <ArrowUpRight size={20} />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                {/* preview blurb that swaps on hover */}
                <div className="mt-10 min-h-[80px] grid grid-cols-12">
                    <div
                        className="col-span-12 md:col-start-5 md:col-span-7 serif-body"
                        style={{
                            fontSize: "clamp(18px, 1.5vw, 22px)",
                            lineHeight: 1.5,
                            fontWeight: 350,
                            color: "var(--ink-2)",
                        }}
                    >
                        {hoverProject !== null ? (
                            <>
                                <span className="label mr-3" style={{ color: "var(--accent)" }}>
                                    {PROJECTS[hoverProject].client}
                                </span>
                                {PROJECTS[hoverProject].blurb}
                            </>
                        ) : (
                            <span className="label">Hover a project to read more —</span>
                        )}
                    </div>
                </div>
            </section>

            {/* ---------------- STACK ---------------- */}
            <section
                id="stack"
                className="pt-24 md:pt-32 pb-24"
                style={{
                    borderTop: "1px solid var(--rule)",
                    background: "var(--ink)",
                    color: "var(--paper)",
                }}
            >
                <div className="px-6 md:px-10">
                    <div className="label opacity-60">§ Tools of the Trade</div>
                    <h2
                        className="display mt-3"
                        style={{
                            fontWeight: 350,
                            fontSize: "clamp(40px, 7vw, 96px)",
                        }}
                    >
                        What I{" "}
                        <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                            reach for
                        </span>
                        .
                    </h2>
                </div>

                {/* marquee of tech */}
                <div className="mt-16 overflow-hidden" style={{ borderTop: "1px solid #FFFFFF22", borderBottom: "1px solid #FFFFFF22" }}>
                    <div className="marquee-track flex whitespace-nowrap py-6">
                        {Array.from({ length: 2 }).flatMap((_, dup) =>
                            Object.values(STACK).flat().map((t, i) => (
                                <span
                                    key={`${dup}-${i}`}
                                    className="display mx-8"
                                    style={{
                                        fontWeight: 350,
                                        fontSize: "clamp(40px, 6vw, 80px)",
                                        fontStyle: i % 3 === 0 ? "italic" : "normal",
                                        color: i % 5 === 0 ? "var(--accent)" : "inherit",
                                    }}
                                >
                                    {t} <span className="opacity-30 mx-4">✦</span>
                                </span>
                            ))
                        )}
                    </div>
                </div>

                {/* categorized grid */}
                <div className="px-6 md:px-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
                    {Object.entries(STACK).map(([cat, items], idx) => (
                        <Reveal key={cat} delay={idx * 100}>
                            <div className="label opacity-60 mb-4">
                                0{idx + 1} — {cat}
                            </div>
                            <ul className="space-y-2">
                                {items.map((it) => (
                                    <li
                                        key={it}
                                        className="serif-body"
                                        style={{ fontSize: "20px", fontWeight: 350 }}
                                    >
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ---------------- WRITING ---------------- */}
            <section
                id="writing"
                className="px-6 md:px-10 pt-24 md:pt-32 pb-24"
                style={{ borderTop: "1px solid var(--rule)" }}
            >
                <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
                    <div className="col-span-12 md:col-span-7">
                        <div className="label" style={{ color: "var(--ink-2)" }}>
                            § Field Notes
                        </div>
                        <h2
                            className="display mt-3"
                            style={{
                                fontWeight: 350,
                                fontSize: "clamp(40px, 7vw, 96px)",
                            }}
                        >
                            Things I'm{" "}
                            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                                thinking
                            </span>{" "}
                            about.
                        </h2>
                    </div>
                    <div className="col-span-12 md:col-start-9 md:col-span-4 flex md:items-end">
                        <p
                            className="serif-body"
                            style={{
                                fontSize: "18px",
                                lineHeight: 1.5,
                                fontWeight: 350,
                                color: "var(--ink-2)",
                            }}
                        >
                            An irregular journal. Mostly engineering, sometimes design,
                            occasionally a rant about CSS.
                        </p>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid var(--ink)" }}>
                    {POSTS.map((post, i) => (
                        <Reveal key={post.title} delay={i * 60}>
                            <a
                                href="#"
                                className="block group"
                                style={{ borderBottom: "1px solid var(--rule)" }}
                            >
                                <div className="grid grid-cols-12 gap-4 items-baseline py-6 md:py-7 px-2">
                                    <div className="col-span-3 md:col-span-2 mono text-xs opacity-70">
                                        {post.date}
                                    </div>
                                    <div className="col-span-9 md:col-span-7">
                                        <div
                                            className="serif-body"
                                            style={{
                                                fontSize: "clamp(20px, 2.4vw, 32px)",
                                                fontWeight: 350,
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {post.title}
                                        </div>
                                    </div>
                                    <div className="col-span-6 md:col-span-2 label opacity-70">
                                        {post.kicker}
                                    </div>
                                    <div className="col-span-6 md:col-span-1 flex items-center justify-end mono text-xs opacity-70">
                                        {post.read}
                                        <ArrowUpRight
                                            size={14}
                                            className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </div>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                <div className="mt-10 label" style={{ color: "var(--ink-2)" }}>
                    <a href="#" className="underline-grow inline-flex items-center gap-2">
                        Read the full archive <Plus size={14} />
                    </a>
                </div>
            </section>

            {/* ---------------- CONTACT ---------------- */}
            <section
                id="contact"
                className="px-6 md:px-10 pt-24 md:pt-32 pb-16"
                style={{ borderTop: "1px solid var(--rule)" }}
            >
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-5">
                        <div className="label" style={{ color: "var(--ink-2)" }}>
                            § Get in Touch
                        </div>
                        <h2
                            className="display mt-3"
                            style={{
                                fontWeight: 350,
                                fontSize: "clamp(48px, 8vw, 120px)",
                            }}
                        >
                            Let's{" "}
                            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                                make
                            </span>
                            <br />
                            something.
                        </h2>

                        <div className="mt-12 space-y-6">
                            <div>
                                <div className="label" style={{ color: "var(--ink-2)" }}>
                                    Email
                                </div>
                                <a
                                    href={`mailto:${PROFILE.email}`}
                                    className="serif-body underline-grow inline-flex items-center gap-2 mt-1"
                                    style={{ fontSize: "22px" }}
                                >
                                    <Mail size={18} /> {PROFILE.email}
                                </a>
                            </div>
                            <div>
                                <div className="label" style={{ color: "var(--ink-2)" }}>
                                    Elsewhere
                                </div>
                                <div className="flex gap-5 mt-2">
                                    {PROFILE.socials.map(({ label, icon: Icon, href }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            className="underline-grow inline-flex items-center gap-2 mono text-sm"
                                        >
                                            <Icon size={16} /> {label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 md:col-start-7 md:col-span-6">
                        {sent ? (
                            <Reveal>
                                <div
                                    className="serif-body"
                                    style={{
                                        fontSize: "28px",
                                        fontWeight: 350,
                                        lineHeight: 1.4,
                                        padding: "32px 0",
                                    }}
                                >
                                    Got it.{" "}
                                    <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                                        Thank you
                                    </span>{" "}
                                    — I'll write back within a couple of days.
                                    <span className="caret"> ▍</span>
                                </div>
                            </Reveal>
                        ) : (
                            <div className="space-y-2 mt-6">
                                <div>
                                    <label className="label" style={{ color: "var(--ink-2)" }}>
                                        01 / Your name
                                    </label>
                                    <input className="brutal" placeholder="Ada Lovelace" />
                                </div>
                                <div>
                                    <label className="label" style={{ color: "var(--ink-2)" }}>
                                        02 / Email
                                    </label>
                                    <input
                                        className="brutal"
                                        placeholder="ada@analytical-engine.co"
                                    />
                                </div>
                                <div>
                                    <label className="label" style={{ color: "var(--ink-2)" }}>
                                        03 / What are you building?
                                    </label>
                                    <textarea
                                        className="brutal"
                                        rows={3}
                                        placeholder="A few lines about the project, the timeline, the budget…"
                                    />
                                </div>
                                <div className="pt-8">
                                    <button
                                        onClick={() => setSent(true)}
                                        className="group inline-flex items-center gap-3 px-6 py-4 transition-colors"
                                        style={{
                                            background: "var(--ink)",
                                            color: "var(--paper)",
                                            fontFamily: "var(--mono)",
                                            fontSize: "12px",
                                            letterSpacing: "0.16em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        Send the message
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ---------------- FOOTER ---------------- */}
            <footer
                className="px-6 md:px-10 py-8"
                style={{
                    borderTop: "1px solid var(--ink)",
                    background: "var(--paper-2)",
                }}
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 label">
                    <span>
                        © {new Date().getFullYear()} {PROFILE.name}. Set in Fraunces &amp;
                        JetBrains Mono.
                    </span>
                    <span style={{ color: "var(--ink-2)" }}>
                        Hand-built. No templates harmed in the making of this site.
                    </span>
                    <span>
                        <Clock />
                    </span>
                </div>
            </footer>
        </div>
    );
}