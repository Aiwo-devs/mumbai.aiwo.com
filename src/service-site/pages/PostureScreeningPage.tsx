import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { BookingForm } from "@/components/sections/BookingForm";
import { ArrowRight, Check } from "lucide-react";
import { MetaTags } from "@/components/MetaTags";
import { Navigation } from "@/components/sections/Navigation";
import postureComparisonImg from "@/assets/image_1779905825232.png";

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest block mb-4">
      {children}
    </span>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-muted-foreground tracking-widest">{n}</span>
      <span className="w-12 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
        {label}
      </span>
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-6 max-w-7xl py-2.5 flex items-center justify-between gap-4 text-xs font-mono tracking-widest">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>LIMITED TIME · AI POSTURE SCREENING · ₹4,999 · MUMBAI</span>
        </div>
        <a href="#book" onClick={scrollTo("book")} className="hidden md:inline underline underline-offset-4">
          BOOK NOW
        </a>
      </div>
    </div>
  );
}


function PostureSVG() {
  return (
    <svg viewBox="0 0 320 480" className="w-full h-full" aria-hidden>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="480" fill="url(#grid)" />
      {/* center reference line */}
      <line x1="200" y1="20" x2="200" y2="460" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4" />

      {/* Side profile silhouette — slouched */}
      <g stroke="white" strokeWidth="1.5" fill="none">
        {/* head (forward) */}
        <circle cx="155" cy="60" r="22" />
        {/* neck angled forward */}
        <line x1="160" y1="82" x2="185" y2="118" />
        {/* torso curved */}
        <path d="M 185 118 Q 195 180 200 240 Q 205 280 215 320" />
        {/* shoulder roll */}
        <line x1="185" y1="118" x2="160" y2="135" />
        {/* arm */}
        <path d="M 160 135 Q 170 200 175 260" />
        {/* hip */}
        <line x1="215" y1="320" x2="225" y2="330" />
        {/* thigh */}
        <line x1="225" y1="330" x2="215" y2="400" />
        {/* shin */}
        <line x1="215" y1="400" x2="220" y2="460" />
      </g>

      {/* annotations on left */}
      <g className="font-mono" fill="white" fontSize="8" letterSpacing="1.5">
        <g>
          <circle cx="155" cy="60" r="3" fill="white" />
          <line x1="130" y1="60" x2="60" y2="60" stroke="white" strokeOpacity="0.3" />
          <text x="20" y="58">FORWARD HEAD</text>
          <text x="20" y="70" fillOpacity="0.5">+23 KG LOAD</text>
        </g>
        <g>
          <circle cx="172" cy="125" r="3" fill="white" />
          <line x1="155" y1="125" x2="60" y2="125" stroke="white" strokeOpacity="0.3" />
          <text x="20" y="123">ROUNDED SHOULDER</text>
        </g>
        <g>
          <circle cx="195" cy="180" r="3" fill="white" />
          <line x1="180" y1="180" x2="60" y2="180" stroke="white" strokeOpacity="0.3" />
          <text x="20" y="178">THORACIC CURVE</text>
        </g>
        <g>
          <circle cx="205" cy="250" r="3" fill="white" />
          <line x1="190" y1="250" x2="60" y2="250" stroke="white" strokeOpacity="0.3" />
          <text x="20" y="248">LUMBAR DEVIATION</text>
        </g>
        <g>
          <circle cx="223" cy="335" r="3" fill="white" />
          <line x1="208" y1="335" x2="60" y2="335" stroke="white" strokeOpacity="0.3" />
          <text x="20" y="333">PELVIC TILT</text>
        </g>
      </g>

      <g className="font-mono" fill="white" fontSize="8" letterSpacing="2" fillOpacity="0.5">
        <text x="240" y="30">SIDE / LATERAL</text>
        <text x="240" y="455">25-POINT MAP</text>
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>AI Posture Screening · 25 Points · Mumbai</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.98] tracking-tight text-foreground mb-8">
                Know the truth
                <br />
                we're all
                <br />
                <span className="italic text-muted-foreground">living with.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-10">
                The dull ache between your shoulder blades. The stiff neck when you wake up. The way you catch yourself slouching on every video call.
                <br /><br />
                <span className="text-foreground font-medium">You're not broken. You're a human body trying to adapt to a world that changed faster than your spine could keep up.</span>
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
                  <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
                    Get My Posture Assessment <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl text-foreground">₹4,999</span>
                    <span className="font-mono text-xs font-bold border border-foreground px-2 py-1">LIMITED</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 font-mono tracking-wide">
                    AI report · 25 alignment points · 30 min visit
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={0.3} direction="none">
              <div className="aspect-[2/3] bg-black relative overflow-hidden border border-border">
                <PostureSVG />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/70">
                  <span>SCAN_ID: POS-001</span>
                  <span>AI_VISION · v2.1</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] tracking-widest text-white/70">
                  FRONT · SIDE · BACK · 25 POINTS
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-16 lg:mt-24 border-t border-border pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-5">
              <div className="font-mono text-[11px] tracking-widest text-muted-foreground mb-2">
                THE PHYSICS NOBODY TOLD YOU
              </div>
              <div className="font-serif text-2xl lg:text-3xl leading-snug text-foreground">
                Your head weighs 5 kg.
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="font-serif text-xl lg:text-2xl leading-snug text-foreground">
                With forward posture, your spine carries it like <span className="underline decoration-2 underline-offset-4">23 kg</span> — that's a small child sitting on your neck for every hour you're at a screen. <span className="italic text-muted-foreground">No wonder you're in pain.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsHappening() {
  const top = [
    {
      label: "Muscle Adaptation",
      body: "Hours looking down at screens tighten the muscles in the front of your chest while the ones between your shoulder blades stretch and weaken. It isn't laziness — it's biology responding to repetition.",
    },
    {
      label: "Weight Multiplication",
      body: "Move your head forward by just a few inches and the load your neck muscles carry can double. Imagine swapping a tennis ball for a bowling ball — all day, every day.",
    },
    {
      label: "Generational Impact",
      body: "Children mirror what they see. If you're always looking down with rolled shoulders, that becomes their normal. The habits you form today become their foundation tomorrow.",
    },
  ];
  const bottom = [
    { label: "Breathing gets shallow", body: "Your chest can't expand fully when your shoulders roll forward." },
    { label: "Sleep becomes restless", body: "Neck tension follows you to bed and stays there until morning." },
    { label: "Long-term goals feel distant", body: "When your body hurts, everything else feels harder than it should." },
  ];

  return (
    <section id="truth" className="py-24 lg:py-32 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <SectionLabel n="01" label="What's Really Happening" />
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-foreground">
              Your body has been
              <br />
              <span className="italic text-muted-foreground">quietly rewiring itself.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Posture isn't a moral failure or a question of willpower. It's a measurable, biomechanical adaptation — and once you can see it, you can change it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border mb-px">
          {top.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <div className="border-r border-b border-border p-8 lg:p-10 h-full bg-white">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
                  0{i + 1} · Adaptation
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4 leading-snug">{c.label}</h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-l border-border mb-20 lg:mb-28">
          {bottom.map((c) => (
            <div key={c.label} className="border-r border-b border-border p-8 bg-muted/30">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                Knock-on effect
              </div>
              <div className="font-serif text-xl text-foreground mb-2 leading-snug">{c.label}</div>
              <p className="text-muted-foreground text-[14px] leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="border-t border-border pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
              <div className="lg:col-span-5">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                  Reference Figure · 01
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight">
                  Ideal posture vs.
                  <br />
                  <span className="italic text-muted-foreground">the human body in 2025.</span>
                </h3>
              </div>
              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  The leftmost figure is the spine your body was built for. The three on the right are the most common deviations our scanner catches every day — forward head posture, thoracic hump and forward knee, anterior pelvic tilt, and posterior pelvic tilt.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 border border-border p-6 lg:p-12">
              <img
                src={postureComparisonImg}
                alt="Diagram comparing ideal human posture against four common postural deviations seen in 2025: forward head posture with thoracic hump and forward knee, anterior pelvic tilt, and posterior pelvic tilt"
                className="w-full h-auto"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />
              <div className="border-t border-border mt-6 pt-4 grid grid-cols-2 md:grid-cols-5 gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <div>01 · Ideal</div>
                <div>02 · Forward head + thoracic hump</div>
                <div>03 · Forward knee</div>
                <div>04 · Anterior pelvic tilt</div>
                <div>05 · Posterior pelvic tilt</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SilentDamage() {
  const cards = [
    {
      tag: "Tech Neck Epidemic",
      stat: "10–40 lbs",
      body: "Every hour hunched over screens adds 10 to 40 pounds of pressure on your cervical spine, eventually causing permanent deformation of the vertebrae themselves.",
    },
    {
      tag: "Desk Job Damage",
      stat: "8+ hrs / day",
      body: "Eight or more hours of daily sitting creates muscle imbalances, locks in forward head posture, and compresses the blood vessels carrying oxygen to your brain.",
    },
    {
      tag: "Cognitive Decline",
      stat: "−30%",
      body: "Poor posture reduces blood flow to the brain by up to thirty percent — measurable as fatigue, brain fog, slower decision-making, and reduced productivity.",
    },
    {
      tag: "Breathing Problems",
      stat: "−25% capacity",
      body: "Forward posture compresses the chest, reducing lung capacity and oxygen intake. The result is a constant, low-grade tiredness you can never quite explain away.",
    },
    {
      tag: "Confidence Killer",
      stat: "Visible signal",
      body: "Slouched shoulders and forward head posture make you appear shorter, older, and less confident in every meeting, presentation, and interaction.",
    },
    {
      tag: "Energy Drain",
      stat: "+40% effort",
      body: "Poor alignment forces your muscles to work overtime just to hold you upright, causing chronic fatigue and quietly reducing your overall vitality.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              02 · The Daily Damage
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02]">
              Your daily habits are
              <br />
              <span className="italic text-white/60">silently destroying your health.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-lg text-white/70 leading-relaxed">
              You won't feel any of these tomorrow. You'll feel all of them in ten years — and by then, the spine has already adapted around them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/20">
          {cards.map((c, i) => (
            <div key={c.tag} className="border-r border-b border-white/20 p-8 lg:p-10">
              <div className="flex items-baseline justify-between mb-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white font-bold">
                  {c.tag}
                </div>
                <div className="font-mono text-xs text-white/40">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="font-serif text-4xl text-white mb-4 leading-none">{c.stat}</div>
              <p className="text-white/70 leading-relaxed text-[15px]">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/20 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-3">
              THE REALITY OF IGNORING IT
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Chronic pain that quietly steers your daily decisions.",
              "Breathing problems from compressed chest muscles.",
              "Sleep disrupted by persistent neck tension.",
              "Loss of mobility and independence as you age.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <p className="text-white text-[15px] leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section id="solution" className="py-24 lg:py-32 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5">
            <SectionLabel n="03" label="AI-Powered · 25 Points" />
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-foreground mb-6">
              A precise blueprint of your body — built by computer vision.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our system analyses 25 specific alignment points across three planes to build the most complete postural map you've ever seen of yourself.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative bg-black border border-border aspect-video overflow-hidden">
              <video
                src="https://aiwo.com/cdn/shop/videos/c/vp/43e960b67e6c455a8191549d13b69555/43e960b67e6c455a8191549d13b69555.HD-1080p-7.2Mbps-49733457.mp4?v=0"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/80 z-10">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE · AI VISION
                </span>
                <span>25-POINT ANALYSIS</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-white/80 z-10">
                <span>SCAN_ID: POS-001</span>
                <span>v2.1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border mb-20">
          {[
            {
              title: "Front View Analysis",
              n: "08 POINTS",
              items: [
                "Shoulder joint alignment (3 points)",
                "Mid-thoracic position (2 points)",
                "ASIS hip alignment (2 points)",
                "Ankle joint position",
              ],
            },
            {
              title: "Side View Analysis",
              n: "04 POINTS",
              items: [
                "Forward head posture (mid-ear)",
                "Shoulder joint alignment",
                "Hip joint position",
                "Knee & ankle alignment",
              ],
            },
            {
              title: "Back View Analysis",
              n: "10+ POINTS",
              items: [
                "Spinal alignment (C7, T4, T8, T12, L3)",
                "AC joint position (2 points)",
                "PSIS hip alignment (2 points)",
                "Achilles tendon alignment",
              ],
            },
          ].map((b) => (
            <div key={b.title} className="border-r border-b border-border p-8 lg:p-10 bg-white">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                {b.n}
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-6">{b.title}</h3>
              <ul className="space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-foreground">
                    <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={2} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-12">
          <SectionLabel n="04" label="Advanced Analysis Features" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground max-w-3xl">
            What this scan actually catches.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {[
            {
              title: "Spinal Alignment Detection",
              body: "Precise measurement of cervical, thoracic, and lumbar spine positioning to identify subtle misalignments long before they become painful.",
            },
            {
              title: "Functional Movement Screening",
              body: "Hamstring stiffness, pelvic tilt analysis, and knee deformity assessment reveal the compensation patterns that quietly affect your daily activities.",
            },
            {
              title: "Muscle Imbalance Identification",
              body: "Computer vision detects asymmetries in shoulder height, hip alignment, and joint positioning with millimetre precision.",
            },
            {
              title: "Biomechanical Analysis",
              body: "Advanced algorithms calculate load distribution, joint stress patterns, and movement efficiency scores for a comprehensive assessment.",
            },
          ].map((c) => (
            <div key={c.title} className="border-r border-b border-border p-8 lg:p-10">
              <h3 className="font-serif text-2xl text-foreground mb-4 leading-snug">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      stat: "70%",
      title: "Early Detection",
      body: "Computer vision identifies postural deviations up to seventy percent earlier than traditional clinical methods — preventing chronic conditions before they develop.",
    },
    {
      stat: "30%",
      title: "Cognitive Clarity",
      body: "Correcting forward head posture can increase blood flow to the brain by up to thirty percent, improving focus, memory, and mental clarity.",
    },
    {
      stat: "15–25%",
      title: "Breathing Capacity",
      body: "Proper thoracic alignment increases lung capacity by fifteen to twenty-five percent, enhancing oxygen intake and reducing daily fatigue.",
    },
    {
      stat: "40%",
      title: "Energy & Vitality",
      body: "Balanced alignment reduces muscular effort by around forty percent, freeing energy for the things you actually want to do.",
    },
    {
      stat: "60%",
      title: "Injury Prevention",
      body: "Identifying compensation patterns reduces injury risk by up to sixty percent during sports and daily activities through better biomechanics.",
    },
    {
      stat: "Tracked",
      title: "Measurable Progress",
      body: "Objective data shows exact improvements over time — with visual proof of your postural transformation, not vague reassurance.",
    },
  ];

  return (
    <section id="benefits" className="py-24 lg:py-32 bg-muted/40 border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <SectionLabel n="05" label="Scientific Benefits" />
          <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-foreground">
            The numbers behind better alignment.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border bg-white">
          {items.map((b) => (
            <div key={b.title} className="border-r border-b border-border p-8 lg:p-10">
              <div className="font-serif text-5xl text-foreground mb-4 leading-none">{b.stat}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
                {b.title}
              </div>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "I had no idea how much my posture was affecting my presence in meetings. After the AI assessment and three weeks of the recommendations, my colleagues started commenting on how much more confident I looked. The neck pain that plagued me for two years is gone.",
      name: "Priya Sharma",
      role: "Marketing Director",
    },
    {
      quote:
        "The visual report showed me exactly what was wrong and how to fix it. Six months later I'm pain-free and more energetic than I've been in years.",
      name: "Amit Singh",
      role: "Finance Manager",
    },
    {
      quote:
        "Fifteen years of chronic upper back pain disappeared in eight weeks. The AI identified muscle imbalances my previous doctors never caught. The precision of the analysis is incredible — they measure things down to the millimetre.",
      name: "Kavitha Reddy",
      role: "Teacher",
    },
    {
      quote:
        "Brain fog was killing my work performance. Within a month of correcting my forward head posture using their recommendations, my focus improved dramatically. I feel energised throughout the day.",
      name: "Rajesh Kumar",
      role: "Software Engineer",
    },
    {
      quote:
        "When I started working on my posture, my twelve-year-old daughter noticed and asked for her assessment too. Now our whole family stands taller and feels better. We've made it a family health priority.",
      name: "Suresh Patel",
      role: "Business Owner",
    },
  ];

  return (
    <section id="stories" className="py-24 lg:py-32 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <SectionLabel n="06" label="What People Walk Out Saying" />
          <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-foreground">
            Stand taller.
            <br />
            <span className="italic text-muted-foreground">Live longer.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {items.map((t) => (
            <div key={t.name} className="border-r border-b border-border p-8 lg:p-10 flex flex-col">
              <p className="font-serif text-lg text-foreground leading-snug mb-8 flex-1">
                "{t.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-mono text-sm font-bold text-foreground">{t.name}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  const includes = [
    "Full biomechanical evaluation",
    "Digital posture mapping",
    "Fascia & soft tissue assessment",
    "Personalised correction plan",
    "Expert 1:1 consultation",
  ];

  return (
    <section id="book" className="py-24 lg:py-32 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              07 · Take Action
            </div>
            <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] mb-8">
              Take action today.
            </h2>
            <p className="text-white/70 leading-relaxed text-lg mb-10">
              The longer you wait, the harder and more expensive it becomes to fix. Every day of poor posture is another day of damage quietly accumulating in your spine.
            </p>

            <div className="border-t border-white/20 pt-6 mb-8">
              <div className="font-mono text-[11px] tracking-widest text-white/60 mb-3">
                WHAT YOU GET
              </div>
              <ul className="space-y-3">
                {includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-[15px]">
                    <Check className="w-4 h-4 mt-1 shrink-0" strokeWidth={2} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1 font-mono text-sm text-white/60">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-white">₹4,999</span>
                <span className="border border-white/40 px-2 py-0.5 text-xs">LIMITED TIME</span>
              </div>
              <div>AIWO Longevity Clinic · Mumbai</div>
              <div>Mon–Sat · 8 AM – 7 PM</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <BookingForm isInline={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PostureScreeningPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MetaTags 
        title="Posture Screening Mumbai | Neck & Back Pain Relief | AIWO"
        description="Correct posture issues with AI-powered screening at AIWO Mumbai. Identify imbalances, alignment issues & movement restrictions. Reduce pain, improve mobility. Book your assessment today."
      />
      <TopBar />
      <Navigation
        sections={[
          { label: "Solution", href: "#solution" },
          { label: "Benefits", href: "#benefits" },
          { label: "Stories", href: "#stories" },
        ]}
        ctaLabel="Book Screening"
      />
      <main>
        <Hero />
        <WhatsHappening />
        <SilentDamage />
        <Solution />
        <Benefits />
        <Testimonials />
        <Book />
      </main>
      <Footer />
    </div>
  );
}
