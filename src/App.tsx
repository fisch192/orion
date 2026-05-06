import { FormEvent, Suspense, lazy, useMemo, useState } from 'react';
import {
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Check,
  ChevronRight,
  Cpu,
  Github,
  LockKeyhole,
  Mail,
  RadioTower,
  Sparkles,
  Terminal,
  Zap
} from 'lucide-react';
import { buildOrderMailto, type OrderLead } from './lib/order';

const SignalScene = lazy(() =>
  import('./components/SignalScene').then((module) => ({ default: module.SignalScene }))
);

const metrics = [
  { value: '10x', label: 'lower distraction surface than a phone' },
  { value: '24/7', label: 'ambient capture, notes, audio, and local tools' },
  { value: 'Open', label: 'developer-first Linux PDA architecture' }
];

const pillars = [
  {
    icon: LockKeyhole,
    title: 'Private by design',
    body: 'A pocket computer for owners, not attention markets. Orion is built around local-first capture, portable workflows, and intentional connectivity.'
  },
  {
    icon: BrainCircuit,
    title: 'A thinking instrument',
    body: 'Write, listen, transcribe, command, and collect context without opening the endless phone loop. It is a calm tool for deep work in motion.'
  },
  {
    icon: Terminal,
    title: 'Programmable from day one',
    body: 'A PDA should be hackable. Orion speaks to developers, researchers, field teams, founders, and people who want their tools to stay theirs.'
  }
];

const roadmap = [
  'Industrial design validation',
  'Pilot production allocation',
  'Developer SDK and community launch',
  'Founder/investor preorder window'
];

const specs = [
  ['Mode', 'Pocket PDA for writing, listening, and local AI workflows'],
  ['Audience', 'Founders, developers, researchers, operators, creators'],
  ['Platform', 'Open hardware direction with developer-accessible software'],
  ['Launch', 'Pilot units and investor conversations now forming']
];

const leadTypes = ['Investor access', 'Preorder allocation', 'Pilot program', 'Press or partnership'];

const initialLead: OrderLead = {
  name: '',
  email: '',
  interest: leadTypes[0],
  quantity: '25 units',
  message: ''
};

export default function App() {
  const [lead, setLead] = useState<OrderLead>(initialLead);
  const mailto = useMemo(() => buildOrderMailto(lead), [lead]);

  const updateLead = (field: keyof OrderLead, value: string) => {
    setLead((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = mailto;
  };

  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Orion home">
          <span className="brand-mark">O</span>
          <span>Orion PDA</span>
        </a>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#investors">Investors</a>
          <a href="#order">Order</a>
        </div>
        <a className="nav-cta" href="#order">
          Reserve
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-media" aria-label="Orion PDA product">
          <img src="/assets/orion-hero.jpg" alt="Orion PDA device on a warm desk surface" />
          <Suspense fallback={null}>
            <SignalScene />
          </Suspense>
          <div className="hero-shade" />
        </div>

        <div className="hero-content">
          <p className="eyebrow">
            <RadioTower size={16} aria-hidden="true" />
            Founder/investor allocation now forming
          </p>
          <h1>Orion PDA</h1>
          <p className="hero-copy">
            The pocket computer for people who think, write, listen, build, and move faster
            than their phone allows.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#order">
              Request allocation
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button secondary" href="https://discord.gg/JbuqDW2D">
              Join community
              <Sparkles size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="metric-strip" aria-label="Orion highlights">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <span>{metric.value}</span>
              <p>{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="proof-band" id="product">
        <div className="section-kicker">Why it matters</div>
        <div className="proof-copy">
          <h2>A new category between the phone, the notebook, and the AI terminal.</h2>
          <p>
            Orion turns personal computing back into an owned instrument: compact enough to
            carry, focused enough to trust, and open enough to become a platform.
          </p>
        </div>
      </section>

      <section className="pillar-grid" aria-label="Product pillars">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article className="pillar" key={pillar.title}>
              <Icon size={26} aria-hidden="true" />
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          );
        })}
      </section>

      <section className="device-story">
        <div className="device-image tall">
          <img src="/assets/orion-hand.jpg" alt="Orion PDA held in hand" />
        </div>
        <div className="story-panel">
          <p className="eyebrow">
            <Zap size={16} aria-hidden="true" />
            Built for repeat daily use
          </p>
          <h2>Not another screen. A dedicated command surface.</h2>
          <p>
            Capture voice, draft text, control small automations, take field notes, and
            keep your attention pointed at the work. The product story is simple: phones
            became marketplaces for attention. Orion is a device for agency.
          </p>
          <div className="check-list">
            {['Pocketable', 'Developer-friendly', 'Investor-ready narrative'].map((item) => (
              <span key={item}>
                <Check size={16} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="device-image board">
          <img src="/assets/orion-pcb.jpg" alt="Orion PDA circuit board prototype" />
        </div>
      </section>

      <section className="investor-section" id="investors">
        <div>
          <p className="section-kicker">Investor signal</p>
          <h2>Orion can own the private pocket-computing category before it hardens.</h2>
        </div>
        <div className="investor-grid">
          <article>
            <BatteryCharging size={24} aria-hidden="true" />
            <h3>Hardware wedge</h3>
            <p>
              A tactile product gives the brand a visible moat, stronger community gravity,
              and preorder demand that pure software cannot manufacture.
            </p>
          </article>
          <article>
            <Cpu size={24} aria-hidden="true" />
            <h3>Platform upside</h3>
            <p>
              Developers can extend the workflows, making Orion more than a device: a
              programmable personal operating layer for AI-era work.
            </p>
          </article>
          <article>
            <Github size={24} aria-hidden="true" />
            <h3>Community pull</h3>
            <p>
              Early believers want tools that are beautiful, private, repairable, and open.
              Orion gives that audience a symbol to rally around.
            </p>
          </article>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="roadmap-card">
          <h2>Milestones for the next raise.</h2>
          <div className="timeline">
            {roadmap.map((item, index) => (
              <div className="timeline-row" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="spec-card">
          {specs.map(([label, value]) => (
            <div className="spec-row" key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="order-copy">
          <p className="section-kicker">Preorders and investor access</p>
          <h2>Get into the first serious Orion conversations.</h2>
          <p>
            Request allocation, pilot access, investor materials, or a direct founder
            conversation. The form opens a prepared email so no lead is trapped in a
            brittle static-site backend.
          </p>
          <a className="email-link" href="mailto:hello@orion.pda">
            <Mail size={18} aria-hidden="true" />
            hello@orion.pda
          </a>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              value={lead.name}
              onChange={(event) => updateLead('name', event.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              id="email"
              name="email"
              autoComplete="email"
              required
              type="email"
              value={lead.email}
              onChange={(event) => updateLead('email', event.target.value)}
              placeholder="you@company.com"
            />
          </label>
          <label>
            Interest
            <select
              id="interest"
              name="interest"
              value={lead.interest}
              onChange={(event) => updateLead('interest', event.target.value)}
            >
              {leadTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantity or check size
            <input
              id="quantity"
              name="quantity"
              value={lead.quantity}
              onChange={(event) => updateLead('quantity', event.target.value)}
              placeholder="25 units / strategic check"
            />
          </label>
          <label className="wide-field">
            Message
            <textarea
              id="message"
              name="message"
              value={lead.message}
              onChange={(event) => updateLead('message', event.target.value)}
              placeholder="Tell us what you want to reserve or discuss."
            />
          </label>
          <button className="button primary form-submit" type="submit">
            Open prepared email
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
