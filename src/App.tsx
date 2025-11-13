import React, { useMemo, useState, useEffect } from "react";
import {
  PawPrint,
  HeartHandshake,
  Heart,
  Bone,
  Fish,
  Bird,
  Rabbit,
  Dog,
  Cat,
  Leaf,
  Flower2,
  Droplets,
  ShieldCheck,
  Home,
  House,
  Smile,
  Sparkles,
  Sun,
  Moon,
  Star,
  User,
  Users,
  UserPlus,
  UserCheck,
  ClipboardCheck,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  Clock,
  Wrench,
  Stethoscope,
  Award,
  ClipboardList,
  GraduationCap,
  Shield,
  Key,
  Crown,
  FileText,
  Folder,
  DollarSign,
  CreditCard,
  Receipt,
  Calculator,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageSquare,
  Printer,
  Camera,
  Link,
  Lock,
  Unlock,
  Megaphone,
  MessageCircle,
  Share2,
  AtSign,
  Image,
  Video,
  Gift,
  Bell,
} from "lucide-react";

/**
 * Fox Rescue Business Card Generator (polished)
 * - Inline export preserves lucide SVGs (DOM capture first)
 * - Export PNG (300 DPI)
 * - Print overlay auto-opens system dialog
 * - Swapped remaining emojis to lucide icons
 * - Heading tracking tightened; dotted back pattern hidden in print
 */

// ------------------ Icon Library (lucide only) ------------------
const ICON_LIBRARY = [
  { key: "paw", label: "PawPrint", Comp: PawPrint },
  { key: "heartHandshake", label: "HeartHandshake", Comp: HeartHandshake },
  { key: "heart", label: "Heart", Comp: Heart },
  { key: "bone", label: "Bone", Comp: Bone },
  { key: "fish", label: "Fish", Comp: Fish },
  { key: "bird", label: "Bird", Comp: Bird },
  { key: "rabbit", label: "Rabbit", Comp: Rabbit },
  { key: "dog", label: "Dog", Comp: Dog },
  { key: "cat", label: "Cat", Comp: Cat },
  { key: "leaf", label: "Leaf", Comp: Leaf },
  { key: "flower", label: "Flower2", Comp: Flower2 },
  { key: "droplets", label: "Droplets", Comp: Droplets },
  { key: "shieldCheck", label: "ShieldCheck", Comp: ShieldCheck },
  { key: "home", label: "Home", Comp: Home },
  { key: "house", label: "House", Comp: House },
  { key: "smile", label: "Smile", Comp: Smile },
  { key: "sparkles", label: "Sparkles", Comp: Sparkles },
  { key: "sun", label: "Sun", Comp: Sun },
  { key: "moon", label: "Moon", Comp: Moon },
  { key: "star", label: "Star", Comp: Star },

  { key: "user", label: "User", Comp: User },
  { key: "users", label: "Users", Comp: Users },
  { key: "userPlus", label: "UserPlus", Comp: UserPlus },
  { key: "userCheck", label: "UserCheck", Comp: UserCheck },
  { key: "clipboardCheck", label: "ClipboardCheck", Comp: ClipboardCheck },
  { key: "badgeCheck", label: "BadgeCheck", Comp: BadgeCheck },
  { key: "briefcase", label: "Briefcase", Comp: Briefcase },
  { key: "calendarCheck", label: "CalendarCheck", Comp: CalendarCheck },
  { key: "clock", label: "Clock", Comp: Clock },
  { key: "wrench", label: "Wrench", Comp: Wrench },
  { key: "stethoscope", label: "Stethoscope", Comp: Stethoscope },
  { key: "award", label: "Award", Comp: Award },
  { key: "clipboardList", label: "ClipboardList", Comp: ClipboardList },
  { key: "graduationCap", label: "GraduationCap", Comp: GraduationCap },
  { key: "shield", label: "Shield", Comp: Shield },
  { key: "key", label: "Key", Comp: Key },
  { key: "crown", label: "Crown", Comp: Crown },

  { key: "fileText", label: "FileText", Comp: FileText },
  { key: "folder", label: "Folder", Comp: Folder },
  { key: "dollarSign", label: "DollarSign", Comp: DollarSign },
  { key: "creditCard", label: "CreditCard", Comp: CreditCard },
  { key: "receipt", label: "Receipt", Comp: Receipt },
  { key: "calculator", label: "Calculator", Comp: Calculator },
  { key: "building", label: "Building", Comp: Building },
  { key: "mapPin", label: "MapPin", Comp: MapPin },
  { key: "phone", label: "Phone", Comp: Phone },
  { key: "mail", label: "Mail", Comp: Mail },
  { key: "messageSquare", label: "MessageSquare", Comp: MessageSquare },
  { key: "printer", label: "Printer", Comp: Printer },
  { key: "camera", label: "Camera", Comp: Camera },
  { key: "link", label: "Link", Comp: Link },
  { key: "globe", label: "Globe", Comp: Globe },
  { key: "lock", label: "Lock", Comp: Lock },
  { key: "unlock", label: "Unlock", Comp: Unlock },

  { key: "megaphone", label: "Megaphone", Comp: Megaphone },
  { key: "messageCircle", label: "MessageCircle", Comp: MessageCircle },
  { key: "share2", label: "Share2", Comp: Share2 },
  { key: "atSign", label: "AtSign", Comp: AtSign },
  { key: "image", label: "Image", Comp: Image },
  { key: "video", label: "Video", Comp: Video },
  { key: "gift", label: "Gift", Comp: Gift },
  { key: "bell", label: "Bell", Comp: Bell },
] as const;

type IconKey = (typeof ICON_LIBRARY)[number]["key"];

const THEMES = [
  { key: "saveafox", name: "SaveAFox Orange", brandText: "text-orange-700", blobA: "bg-orange-100/70", blobB: "bg-amber-100/70", backBg: "bg-orange-600", backBorder: "border-orange-700" },
  { key: "felix", name: "Felix Teal", brandText: "text-teal-700", blobA: "bg-teal-100/70", blobB: "bg-cyan-100/70", backBg: "bg-teal-700", backBorder: "border-teal-800" },
  { key: "forest", name: "Forest Green", brandText: "text-emerald-700", blobA: "bg-emerald-100/70", blobB: "bg-lime-100/70", backBg: "bg-emerald-700", backBorder: "border-emerald-800" },
  { key: "slate", name: "Slate Gray", brandText: "text-slate-700", blobA: "bg-slate-100/70", blobB: "bg-zinc-100/70", backBg: "bg-slate-700", backBorder: "border-slate-800" },
  { key: "berry", name: "Berry", brandText: "text-fuchsia-700", blobA: "bg-fuchsia-100/70", blobB: "bg-pink-100/70", backBg: "bg-fuchsia-700", backBorder: "border-fuchsia-800" },
  { key: "gold", name: "Gold", brandText: "text-amber-700", blobA: "bg-amber-100/70", blobB: "bg-yellow-100/70", backBg: "bg-amber-600", backBorder: "border-amber-700" },
] as const;

const DEFAULT_FORM = {
  org: "Felix Foundation Fox Rescue",
  name: "Full Name",
  title: "Proper Title",
  roles: [
    { text: '"Bestower of Fluffy Monikers"', icon: "sparkles" as IconKey },
    { text: "Certified Tail-Wag Title Specialist", icon: "paw" as IconKey },
    { text: "Working closely with foxes", icon: "heart" as IconKey },
  ],
  location: "Michigan",
  tagline: "we can co-exist",
  est: "2018",
  email: "names@tfffoxsanctuary.org",
  website: "tfffoxsanctuary.org",
  theme: "felix",
  includeBack: true,
  backIcon: "leaf" as IconKey,
  backHeadline: "Rescue • Rehab • Release • Refuge",
  backItems: [
    "Committed to ethical, licensed rehabilitation and lifetime care for non-releasable foxes.",
  ],
  backTagline: "",
  backNote: "Please use official channels for real inquiries.",
};

// ------------------ UI helpers ------------------
function IconFromKey({
  iconKey,
  className = "w-[14px] h-[14px]",
  stroke = 2.2,
}: { iconKey?: IconKey; className?: string; stroke?: number }) {
  const item = ICON_LIBRARY.find((i) => i.key === iconKey);
  const Comp = item?.Comp || PawPrint;
  return <Comp className={className} strokeWidth={stroke} aria-hidden="true" />;
}

function toast(msg: string) {
  const el = document.createElement("div");
  el.className = "fixed bottom-4 left-1/2 -translate-x-1/2 px-3 py-2 rounded-xl bg-black text-white text-sm shadow z-[99999]";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

async function ensureCardsRendered() {
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  await new Promise((r) => requestAnimationFrame(() => r(null)));
  const hasFront = document.querySelector(".export-front");
  if (!hasFront) throw new Error("No rendered card found (enable Live Preview or open Full Preview).");
}

// ------------------ Cards ------------------
function FrontCard({ data, themeCfg }: any) {
  return (
    <div className="export-card export-front relative w-[3.5in] h-[2in] bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 print:shadow-none">
      <div className={`absolute -top-16 -left-16 w-64 h-64 rounded-full ${themeCfg.blobA}`} />
      <div className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full ${themeCfg.blobB}`} />

      <div className="relative h-full flex flex-col items-start justify-between p-4">
        <div className={`flex items-center gap-2 ${themeCfg.brandText} font-semibold uppercase tracking-[0.12em] leading-tight`}>
          <PawPrint className="w-4 h-4" />
          <span>{data.org}</span>
        </div>

        <div>
          <h2 className="text-xl font-bold leading-tight">{data.name}</h2>
          <p className="text-sm text-neutral-600">{data.title}</p>
        </div>

        <div className="text-[11px] text-neutral-700 leading-snug">
          {data.roles?.filter((r: any) => r.text?.trim()).map((r: any, idx: number) => (
            <p key={idx} className="flex items-center gap-1">
              <IconFromKey iconKey={r.icon} className="w-[14px] h-[14px] translate-y-[0.5px]" />
              {r.text}
            </p>
          ))}
        </div>

        <div className="w-full flex items-center justify-between text-[10px] text-neutral-500 pt-1">
          <span className="flex items-center gap-2">
            <MapPin className="w-[12px] h-[12px]" strokeWidth={2} />
            {data.location}
            <span className="opacity-60">•</span>
            <PawPrint className="w-[12px] h-[12px]" strokeWidth={2} />
            {data.tagline}
          </span>
          <span>est. {data.est}</span>
        </div>
      </div>
    </div>
  );
}

function BackCard({ data, themeCfg }: any) {
  const BackIcon = (ICON_LIBRARY.find((i) => i.key === data.backIcon)?.Comp || Leaf) as any;
  const showTagline = (data.backTagline && data.backTagline.trim()) ? data.backTagline.trim() : null;
  return (
    <div className={`export-card export-back relative w-[3.5in] h-[2in] ${themeCfg.backBg} text-white rounded-2xl shadow-xl overflow-hidden border ${themeCfg.backBorder} print:shadow-none`}>
      <div
        className="absolute inset-0 opacity-20 print:opacity-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,.5) 0 2px, transparent 3px), radial-gradient(circle at 70% 70%, rgba(255,255,255,.5) 0 2px, transparent 3px)",
          backgroundSize: "40px 40px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative h-full flex flex-col items-start justify-between p-4">
        <div className="flex items-center gap-2">
          <BackIcon className="w-5 h-5" strokeWidth={2.2} />
          <h3 className="text-lg font-semibold tracking-wide">{data.backHeadline}</h3>
        </div>

        <div className="space-y-1 text-[11px] leading-relaxed">
          {(data.backItems || [])
            .filter((t: string) => t?.trim())
            .map((t: string, i: number) => (
              <p key={i}>• {t}</p>
            ))}
          {showTagline && (
            <p className="italic opacity-90">Tagline: “{showTagline}”</p>
          )}
        </div>

        <div className="text-[10px] opacity-90">
          <p>Contact:</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1">
              <Mail className="w-[14px] h-[14px]" strokeWidth={2} />
              {data.email}
            </span>
            <span className="inline-flex items-center gap-1">
              <Globe className="w-[14px] h-[14px]" strokeWidth={2} />
              {data.website}
            </span>
          </div>
          <p>{data.backNote}</p>
        </div>
      </div>
    </div>
  );
}

// ------------------ Screens ------------------
function Preview({ data, onBack, onNew, onExport }: any) {
  const themeCfg = THEMES.find((t) => t.key === data.theme) || THEMES[0];
  return (
    <div className="min-h-screen w-full bg-neutral-100 flex flex-col items-center gap-6 p-6">
      <div className="flex gap-2">
        <button onClick={onBack} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">← Back to edit</button>
        <button onClick={onNew} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">＋ New card</button>
        <button onClick={() => onExport(data)} className="px-3 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700">Export HTML</button>
        <button onClick={() => exportSandboxWrapper(data)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export Sandbox Wrapper</button>
        <button onClick={() => openHtmlInNewTab(data)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Open HTML in new tab</button>
        <button onClick={() => printCards(data)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Print</button>
        <button onClick={() => exportCardsAsPng(data)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export PNG</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FrontCard data={data} themeCfg={themeCfg} />
        {data.includeBack && <BackCard data={data} themeCfg={themeCfg} />}
      </div>

      <p className="text-sm text-neutral-600 text-center max-w-xl">
        Print tip: Cards are sized at <strong>3.5&quot; × 2&quot;</strong>. In your browser, use <em>Print → Save as PDF</em> with
        scale 100%.
      </p>
    </div>
  );
}

function Field({ label, children }: any) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-neutral-700 mb-1">{label}</div>
      {children}
    </label>
  );
}

function RoleEditor({ role, onChange, onRemove }: any) {
  return (
    <div className="flex items-center gap-2">
      <select
        className="px-2 py-2 rounded-xl border w-40"
        value={role.icon}
        onChange={(e) => onChange({ ...role, icon: e.target.value })}
      >
        {ICON_LIBRARY.map((i) => (
          <option key={i.key} value={i.key}>
            {i.label}
          </option>
        ))}
      </select>
      <input
        className="px-3 py-2 rounded-xl border w-full"
        placeholder="Line of text (e.g., Licensed Rehabilitator)"
        value={role.text}
        onChange={(e) => onChange({ ...role, text: e.target.value })}
      />
      <button type="button" onClick={onRemove} className="px-3 py-2 rounded-xl border hover:bg-neutral-50">
        Remove
      </button>
    </div>
  );
}

function BackItemsEditor({ items, onChange }: any) {
  const update = (idx: number, val: string) => onChange(items.map((t: string, i: number) => (i === idx ? val : t)));
  const remove = (idx: number) => onChange(items.filter((_: string, i: number) => i !== idx));
  const add = () => onChange([...(items || []), ""]);
  return (
    <div className="space-y-2">
      {(items || []).map((t: string, idx: number) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            className="px-3 py-2 rounded-xl border w-full"
            value={t}
            placeholder="Bullet point (e.g., Licensed, ethical rehab)"
            onChange={(e) => update(idx, e.target.value)}
          />
          <button type="button" onClick={() => remove(idx)} className="px-3 py-2 rounded-xl border hover:bg-neutral-50">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="px-3 py-2 rounded-xl border hover:bg-neutral-50">
        ＋ Add bullet
      </button>
    </div>
  );
}

function Editor({ value, onChange, onGenerate }: any) {
  const [livePreview, setLivePreview] = useState(true);
  const themeCfg = useMemo(() => THEMES.find((t) => t.key === value.theme) || THEMES[0], [value.theme]);

  const addRole = () => onChange({ ...value, roles: [...value.roles, { text: "", icon: ICON_LIBRARY[0].key }] });
  const removeRole = (idx: number) => onChange({ ...value, roles: value.roles.filter((_: any, i: number) => i !== idx) });
  const updateRole = (idx: number, newRole: any) => onChange({ ...value, roles: value.roles.map((r: any, i: number) => (i === idx ? newRole : r)) });

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex flex-col items-center gap-8 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Business Card Builder</h1>
        <p className="text-neutral-600">Fill the form, pick icons & theme. Use Live Preview or generate a full preview.</p>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8">
        {/* Form column */}
        <div className="space-y-4">
          <Field label="Organization">
            <input className="px-3 py-2 rounded-xl border w-full" value={value.org} onChange={(e) => onChange({ ...value, org: e.target.value })} />
          </Field>
          <Field label="Name">
            <input className="px-3 py-2 rounded-xl border w-full" value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
          </Field>
          <Field label="Title">
            <input className="px-3 py-2 rounded-xl border w-full" value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
          </Field>
          <Field label="Location • Tagline • Est.">
            <div className="grid grid-cols-3 gap-2">
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="Location" value={value.location} onChange={(e) => onChange({ ...value, location: e.target.value })} />
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="Tagline" value={value.tagline} onChange={(e) => onChange({ ...value, tagline: e.target.value })} />
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="Est." value={value.est} onChange={(e) => onChange({ ...value, est: e.target.value })} />
            </div>
          </Field>
          <Field label="Contact (email • website)">
            <div className="grid grid-cols-2 gap-2">
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="email" value={value.email} onChange={(e) => onChange({ ...value, email: e.target.value })} />
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="website" value={value.website} onChange={(e) => onChange({ ...value, website: e.target.value })} />
            </div>
          </Field>
          <Field label="Theme">
            <select className="px-3 py-2 rounded-xl border w-full" value={value.theme} onChange={(e) => onChange({ ...value, theme: e.target.value })}>
              {THEMES.map((t) => (
                <option key={t.key} value={t.key}>{t.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Roles (icon + line)">
            <div className="space-y-2">
              {value.roles.map((r: any, idx: number) => (
                <RoleEditor key={idx} role={r} onChange={(nr: any) => updateRole(idx, nr)} onRemove={() => removeRole(idx)} />
              ))}
              <button type="button" onClick={addRole} className="px-3 py-2 rounded-xl border hover:bg-neutral-50">＋ Add role</button>
            </div>
          </Field>

          <Field label="Back side">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={value.includeBack} onChange={(e) => onChange({ ...value, includeBack: e.target.checked })} />
                <span>Include back</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select className="px-3 py-2 rounded-xl border w-full" value={value.backIcon} onChange={(e) => onChange({ ...value, backIcon: e.target.value })}>
                  {ICON_LIBRARY.map((i) => (<option key={i.key} value={i.key}>{i.label}</option>))}
                </select>
                <input className="px-3 py-2 rounded-xl border w-full" placeholder="Back headline" value={value.backHeadline} onChange={(e) => onChange({ ...value, backHeadline: e.target.value })} />
              </div>
              <BackItemsEditor items={value.backItems} onChange={(items: string[]) => onChange({ ...value, backItems: items })} />
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="Back tagline (optional)" value={value.backTagline} onChange={(e) => onChange({ ...value, backTagline: e.target.value })} />
              <input className="px-3 py-2 rounded-xl border w-full" placeholder="Back note" value={value.backNote} onChange={(e) => onChange({ ...value, backNote: e.target.value })} />
            </div>
          </Field>

          <div className="flex gap-2">
            <button onClick={onGenerate} className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700">Generate full preview</button>
            <label className="inline-flex items-center gap-2 select-none">
              <input type="checkbox" checked={livePreview} onChange={(e) => setLivePreview(e.target.checked)} />
              <span>Live preview</span>
            </label>
          </div>
        </div>

        {/* Live preview column */}
        <div className="space-y-4">
          {livePreview ? (
            <div className="sticky top-6">
              <div className="mb-2 text-sm text-neutral-600">Live preview</div>
              <div className="grid gap-6">
                <FrontCard data={value} themeCfg={themeCfg} />
                {value.includeBack && <BackCard data={value} themeCfg={themeCfg} />}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => exportAsHtml(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export HTML</button>
                <button onClick={() => exportAsInlineHtml(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export HTML (Inline CSS)</button>
                <button onClick={() => exportSandboxWrapper(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export Sandbox Wrapper</button>
                <button onClick={() => openHtmlInNewTab(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Open HTML in new tab</button>
                <button onClick={() => printCards(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Print</button>
                <button onClick={() => exportCardsAsPng(value)} className="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export PNG</button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-neutral-500">Enable live preview to see changes as you type.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ------------------ Export & Print helpers ------------------
function showHtmlFallback(html: string, title = "Your card's HTML") {
  let panel = document.getElementById("html-fallback");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "html-fallback";
    panel.className = "fixed inset-x-0 bottom-0 z-50 p-4 bg-white/95 border-t shadow-lg";
    panel.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-2">
          <div class="font-semibold">${title}</div>
          <button id="html-fallback-close" class="px-2 py-1 rounded border hover:bg-neutral-50">Close</button>
        </div>
        <p class="text-sm text-neutral-600 mb-2">Downloads or popups seem blocked. You can copy the generated HTML below and save it as <code>card.html</code> on your computer.</p>
        <div class="flex gap-2 mb-2">
          <button id="html-fallback-copy" class="px-3 py-2 rounded bg-emerald-600 text-white">Copy HTML</button>
        </div>
        <textarea id="html-fallback-textarea" class="w-full h-48 border rounded p-2 font-mono text-xs"></textarea>
      </div>`;
    document.body.appendChild(panel);
  }
  const ta = document.getElementById("html-fallback-textarea") as HTMLTextAreaElement | null;
  if (ta) ta.value = html;
  const closeBtn = document.getElementById("html-fallback-close");
  if (closeBtn) closeBtn.onclick = () => panel!.remove();
  const copyBtn = document.getElementById("html-fallback-copy");
  if (copyBtn) copyBtn.onclick = async () => {
    const setOK = () => { copyBtn.textContent = "Copied!"; setTimeout(() => (copyBtn.textContent = "Copy HTML"), 1200); };
    const text = (ta?.value || html);
    try {
      if (navigator.clipboard && (window as any).isSecureContext) {
        await navigator.clipboard.writeText(text);
        setOK();
        return;
      }
    } catch (_) {}
    try {
      let target = ta as HTMLTextAreaElement | null;
      if (!target) {
        target = document.createElement("textarea");
        target.style.position = "fixed";
        target.style.left = "-9999px";
        target.value = text;
        document.body.appendChild(target);
      } else {
        target.value = text;
      }
      target.focus();
      target.select();
      const ok = document.execCommand("copy");
      if (!ok) throw new Error("execCommand(copy) failed");
      setOK();
      if (target && target.id !== "html-fallback-textarea") target.remove();
    } catch {
      copyBtn.textContent = "Press Ctrl/Cmd + C";
      setTimeout(() => (copyBtn.textContent = "Copy HTML"), 2500);
    }
  };
}

/** Prefer rendered DOM capture so lucide SVGs are preserved. */
function grabCurrentCardsHtml(data: any): string | null {
  try {
    const containerCandidates = [
      document.querySelector(".min-h-screen.w-full.bg-neutral-100 .grid.md\\:grid-cols-2"),
      document.querySelector(".sticky.top-6 .grid"),
    ].filter(Boolean) as Element[];

    let frontHtml = "";
    let backHtml = "";

    for (const container of containerCandidates) {
      const front = container.querySelector(".export-front") as HTMLElement | null;
      if (front) frontHtml = front.outerHTML;

      if (data?.includeBack) {
        const back = container.querySelector(".export-back") as HTMLElement | null;
        if (back) backHtml = back.outerHTML;
      }

      if (frontHtml && (backHtml || !data?.includeBack)) break;
    }

    if (!frontHtml) return null;

    return `
      <div class="grid md:grid-cols-2 gap-8 place-content-center">
        ${frontHtml}
        ${data?.includeBack && backHtml ? backHtml : ""}
      </div>
    `;
  } catch {
    return null;
  }
}

function buildCardsHtml(data: any) {
  const captured = grabCurrentCardsHtml(data);
  if (captured) {
    return `<!doctype html><html><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${data.name} — Card</title>
<script src="https://cdn.tailwindcss.com"></script>
</head><body class="bg-neutral-100 p-6">
${captured}
</body></html>`;
  }

  // Fallback (emoji)
  const theme = THEMES.find((t) => t.key === data.theme) || THEMES[0];
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <title>${data.name} — Card</title></head>
  <body class="bg-neutral-100 p-6">
  <div class="grid md:grid-cols-2 gap-8 place-content-center">
    <div class="relative w-[3.5in] h-[2in] bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 print:shadow-none">
      <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full ${theme.blobA}"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 rounded-full ${theme.blobB}"></div>
      <div class="relative h-full flex flex-col items-start justify-between p-4">
        <div class="flex items-center gap-2 ${theme.brandText} font-semibold uppercase tracking-[0.12em] leading-tight"><span>🐾</span><span>${data.org}</span></div>
        <div><div class="text-xl font-bold leading-tight">${data.name}</div><div class="text-sm text-neutral-600">${data.title}</div></div>
        <div class="text-[11px] text-neutral-700 leading-snug">
          ${(data.roles||[]).filter((r:any)=>r.text?.trim()).map((r:any)=>`<p>• ${r.text}</p>`).join("")}
        </div>
        <div class="w-full flex items-center justify-between text-[10px] text-neutral-500 pt-1">
          <span> ${data.location} • ${data.tagline}</span><span>est. ${data.est}</span>
        </div>
      </div>
    </div>
    ${data.includeBack ? `<div class="relative w-[3.5in] h-[2in] ${theme.backBg} text-white rounded-2xl shadow-xl overflow-hidden border ${theme.backBorder} print:shadow-none">
      <div class="relative h-full flex flex-col items-start justify-between p-4">
        <div class="flex items-center gap-2"><span>🍃</span><div class="text-lg font-semibold tracking-wide">${data.backHeadline}</div></div>
        <div class="space-y-1 text-[11px] leading-relaxed">
          ${(data.backItems||[]).filter((t:string)=>t?.trim()).map((t:string)=>`<p>• ${t}</p>`).join("")}
          ${ (data.backTagline||'').trim() ? `<p class="italic opacity-90">Tagline: “${(data.backTagline||'').trim()}”</p>` : '' }
        </div>
        <div class="text-[10px] opacity-90"><p>Contact:</p><p>${data.email} • ${data.website}</p><p>${data.backNote}</p></div>
      </div>
    </div>`: ''}
  </div></body></html>`;
}

/** Builds a standalone HTML with inline CSS; prefers DOM capture for SVGs. */
function buildCardsHtmlInline(data: any, inlineCss: string) {
  const captured = grabCurrentCardsHtml(data);
  if (!captured) {
    toast("Couldn’t capture SVG icons — using emoji fallback.");
  }
  if (captured) {
    return `<!doctype html><html><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${data.name} — Card</title>
<style>${inlineCss}</style>
</head><body class="bg-neutral-100 p-6">
${captured}
</body></html>`;
  }

  // Fallback (emoji)
  const theme = THEMES.find((t) => t.key === data.theme) || THEMES[0];
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${data.name} — Card</title>
  <style>${inlineCss}</style>
  </head>
  <body class="bg-neutral-100 p-6">
  <div class="grid md:grid-cols-2 gap-8 place-content-center">
    <div class="relative w-[3.5in] h-[2in] bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 print:shadow-none">
      <div class="absolute -top-16 -left-16 w-64 h-64 rounded-full ${theme.blobA}"></div>
      <div class="absolute -bottom-20 -right-20 w-72 h-72 rounded-full ${theme.blobB}"></div>
      <div class="relative h-full flex flex-col items-start justify-between p-4">
        <div class="flex items-center gap-2 ${theme.brandText} font-semibold uppercase tracking-[0.12em] leading-tight"><span>🐾</span><span>${data.org}</span></div>
        <div><div class="text-xl font-bold leading-tight">${data.name}</div><div class="text-sm text-neutral-600">${data.title}</div></div>
        <div class="text-[11px] text-neutral-700 leading-snug">
          ${(data.roles||[]).filter((r:any)=>r.text?.trim()).map((r:any)=>`<p>• ${r.text}</p>`).join("")}
        </div>
        <div class="w-full flex items-center justify-between text-[10px] text-neutral-500 pt-1">
          <span>${data.location} • ${data.tagline}</span><span>est. ${data.est}</span>
        </div>
      </div>
    </div>
    ${data.includeBack ? `<div class="relative w-[3.5in] h-[2in] ${theme.backBg} text-white rounded-2xl shadow-xl overflow-hidden border ${theme.backBorder} print:shadow-none">
      <div class="relative h-full flex flex-col items-start justify-between p-4">
        <div class="flex items-center gap-2"><span>🍃</span><div class="text-lg font-semibold tracking-wide">${data.backHeadline}</div></div>
        <div class="space-y-1 text-[11px] leading-relaxed">
          ${(data.backItems||[]).filter((t:string)=>t?.trim()).map((t:string)=>`<p>• ${t}</p>`).join("")}
          ${ (data.backTagline||'').trim() ? `<p class="italic opacity-90">Tagline: “${(data.backTagline||'').trim()}”</p>` : '' }
        </div>
        <div class="text-[10px] opacity-90"><p>Contact:</p><p>${data.email} • ${data.website}</p><p>${data.backNote}</p></div>
      </div>
    </div>`: ''}
  </div></body></html>`;
}

async function exportAsHtml(data: any) {
  const filename = `${(data.name || "card").replace(/[^a-z0-9-_]+/gi, "_")}.html`;
  const html = buildCardsHtml(data);

  try {
    // @ts-ignore
    if ((window as any).showSaveFilePicker) {
      // @ts-ignore
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "HTML", accept: { "text/html": [".html"] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(new Blob([html], { type: "text/html;charset=utf-8" }));
      await writable.close();
      return;
    }
  } catch {}

  const fallbackTimer = setTimeout(() => {
    showHtmlFallback(html, "Download might be blocked — copy HTML below");
  }, 900);

  try {
    const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(html);
    const a1 = document.createElement("a");
    a1.href = dataUrl;
    a1.download = filename;
    a1.target = "_self";
    a1.style.display = "none";
    document.body.appendChild(a1);
    a1.click();
    document.body.removeChild(a1);
    clearTimeout(fallbackTimer);
    return;
  } catch {}

  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const URLRef: any = (window as any).URL || (window as any).webkitURL;
    const navAny: any = (window as any).navigator;
    if (navAny && typeof navAny.msSaveOrOpenBlob === "function") {
      navAny.msSaveOrOpenBlob(blob, filename);
      clearTimeout(fallbackTimer);
      return;
    }
    const url = URLRef.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    a.target = "_self";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URLRef.revokeObjectURL(url), 1500);
  } catch {
    showHtmlFallback(html);
  } finally {
    clearTimeout(fallbackTimer);
  }
}

/** Collect current CSS into one <style> block (skip CORS-restricted sheets). */
async function collectCurrentCss(): Promise<string> {
  const parts: string[] = [];
  const sheets = Array.from(document.styleSheets) as CSSStyleSheet[];

  for (const sheet of sheets) {
    try {
      const rules = (sheet as CSSStyleSheet).cssRules;
      if (!rules) continue;
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i] as CSSRule;
        parts.push(rule.cssText);
      }
    } catch {
      continue;
    }
  }

  parts.push("@page{margin:0}.print\\:shadow-none{box-shadow:none!important}");
  return parts.join("\n");
}

/** Export with inline CSS (and captured SVGs when available). */
async function exportAsInlineHtml(data: any) {
  await ensureCardsRendered();
  const filename = `${(data.name || "card").replace(/[^a-z0-9-_]+/gi, "_")}.inline.html`;
  const css = await collectCurrentCss();
  const html = buildCardsHtmlInline(data, css);

  try {
    // @ts-ignore
    if ((window as any).showSaveFilePicker) {
      // @ts-ignore
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "HTML", accept: { "text/html": [".html"] } }],
      });
      const w = await handle.createWritable();
      await w.write(new Blob([html], { type: "text/html;charset=utf-8" }));
      await w.close();
      return;
    }
  } catch {}

  try {
    const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(html);
    const a1 = document.createElement("a");
    a1.href = dataUrl; a1.download = filename; a1.target = "_self"; a1.style.display = "none";
    document.body.appendChild(a1); a1.click(); document.body.removeChild(a1);
    return;
  } catch {}

  try {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = ((window as any).URL || (window as any).webkitURL).createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.target = "_self"; a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => (((window as any).URL || (window as any).webkitURL).revokeObjectURL(url)), 1500);
  } catch {
    showHtmlFallback(html, "Download blocked — copy inline HTML below");
  }
}

function escapeForAttr(html: string) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function exportSandboxWrapper(data: any) {
  const inner = buildCardsHtml(data);
  const wrapper =
    `<!doctype html><html><head><meta charset="utf-8"/>` +
    `<meta name="viewport" content="width=device-width, initial-scale=1"/>` +
    `<title>${(data.name || "Card")} — Sandbox Wrapper</title>` +
    `<style>html,body,iframe{margin:0;padding:0;height:100%;width:100%;border:0}</style>` +
    `</head><body>` +
    `<iframe sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-popups-to-escape-sandbox" allow="clipboard-write" srcdoc="${escapeForAttr(inner)}"></iframe>` +
    `</body></html>`;

  const filename = `${(data.name || "card").replace(/[^a-z0-9-_]+/gi, "_")}.sandbox.html`;

  try {
    // @ts-ignore
    if ((window as any).showSaveFilePicker) {
      // @ts-ignore
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "HTML", accept: { "text/html": [".html"] } }],
      });
      const w = await handle.createWritable();
      await w.write(new Blob([wrapper], { type: "text/html;charset=utf-8" }));
      await w.close();
      return;
    }
  } catch {}

  try {
    const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(wrapper);
    const a1 = document.createElement("a");
    a1.href = dataUrl; a1.download = filename; a1.target = "_self"; a1.style.display = "none";
    document.body.appendChild(a1); a1.click(); document.body.removeChild(a1);
    return;
  } catch {}

  try {
    const blob = new Blob([wrapper], { type: "text/html;charset=utf-8" });
    const url = ((window as any).URL || (window as any).webkitURL).createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.target = "_self"; a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => (((window as any).URL || (window as any).webkitURL).revokeObjectURL(url)), 1500);
  } catch {
    showHtmlFallback(wrapper, "Download blocked — copy wrapper HTML below");
  }
}

function extractBodyInner(html: string): string {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return m ? m[1] : "";
}

function printCards(data: any) {
  const existing = document.getElementById("print-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "print-overlay";
  overlay.className = "fixed inset-0 z-[9999] bg-white flex flex-col";

  const bar = document.createElement("div");
  bar.className = "flex items-center gap-2 p-3 border-b bg-white sticky top-0 z-10 print:hidden";
  bar.innerHTML =
    '<div class="text-sm text-neutral-700">' +
      "<strong>Print-ready view</strong> — Press <kbd>Ctrl/Cmd + P</kbd> to print." +
    "</div>" +
    '<div class="ml-auto flex items-center gap-2">' +
      '<button id="po-export" class="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export HTML</button>' +
      '<button id="po-copy" class="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Copy HTML</button>' +
      '<button id="po-png" class="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Export PNG</button>' +
      '<button id="po-close" class="px-3 py-2 rounded-xl bg-white shadow border hover:bg-neutral-50">Close</button>' +
    "</div>";

  const content = document.createElement("div");
  content.className = "flex-1 overflow-auto bg-neutral-100 print:bg-white";

  const domCaptured = grabCurrentCardsHtml(data);
  const styleBlock =
    "<style>@page{margin:0}.print\\:shadow-none{box-shadow:none!important}" +
    "@media print{#po-close,#po-export,#po-copy,#po-png{display:none!important}}</style>";

  // Build fallback grid without backticks
  const fallbackGrid =
    '<div class="p-6 grid md:grid-cols-2 gap-8 place-content-center">' +
      extractBodyInner(buildCardsHtml(data)) +
    "</div>";

  const innerHtml = styleBlock + (domCaptured ? domCaptured : fallbackGrid);
  content.innerHTML = innerHtml;

  overlay.appendChild(bar);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  // Wire buttons
  const closeBtn = document.getElementById("po-close");
  if (closeBtn) closeBtn.addEventListener("click", () => overlay.remove());
  const exportBtn = document.getElementById("po-export");
  if (exportBtn) exportBtn.addEventListener("click", () => exportAsHtml(data));
  const copyBtn = document.getElementById("po-copy");
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildCardsHtml(data));
      (copyBtn as HTMLButtonElement).textContent = "Copied!";
      setTimeout(() => ((copyBtn as HTMLButtonElement).textContent = "Copy HTML"), 1200);
    } catch {
      showHtmlFallback(buildCardsHtml(data), "Copy failed — manual copy below");
    }
  });
  const pngBtn = document.getElementById("po-png");
  if (pngBtn) pngBtn.addEventListener("click", () => exportCardsAsPng(data));

  // Auto-open print dialog after paint
  requestAnimationFrame(function () {
    setTimeout(function () {
      try {
        (window as any).__printing__ = true;
        window.print();
      } finally {
        setTimeout(function () { (window as any).__printing__ = false; }, 1000);
      }
    }, 50);
  });
}


function openHtmlInNewTab(data: any) {
  const html = buildCardsHtml(data);
  try {
    const w = window.open("", "_blank"); // don't replace current tab
    if (w && w.document) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      return;
    }
  } catch (_) {}
  showHtmlFallback(html, "Open in new tab blocked — copy this HTML");
}

function getEffectiveBgColor(el: HTMLElement): string | null {
  // Walk up the DOM until we find a non-transparent background color.
  let node: HTMLElement | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    // Treat 'transparent' and rgba(0,0,0,0) as transparent
    if (bg && bg !== "transparent" && !/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(bg)) {
      return bg;
    }
    node = node.parentElement;
  }
  return null;
}

// ------------------ PNG Export (lazy-load html-to-image) ------------------
let _htmlToImage: any = null;

async function ensureHtmlToImage() {
  if (_htmlToImage) return _htmlToImage;
  const mod = await import("https://esm.sh/html-to-image@1.11.11");
  _htmlToImage = mod;
  return _htmlToImage;
}

/** 3.5"×2" at 300 DPI → 1050×600px */
async function nodeToPngAndDownload(node: HTMLElement, fileName: string, w = 1050, h = 600) {
  const hti = await ensureHtmlToImage();

  const cardBg = getEffectiveBgColor(node) || "#ffffff";
  const cs = getComputedStyle(node);
  const radius = cs.borderRadius || "0px";

  const dataUrl = await hti.toPng(node, {
    width: w,
    height: h,
    style: {
      // scale to 300dpi
      transform: "scale(" + (w / node.clientWidth) + ")",
      transformOrigin: "top left",
      width: String(node.clientWidth) + "px",
      height: String(node.clientHeight) + "px",
      // ensure the cloned node itself renders with a solid background,
      // but the canvas around it stays transparent
      backgroundColor: cardBg,
      borderRadius: radius,
      overflow: "hidden",
    },
    // ⬇️ IMPORTANT: leave the canvas background transparent
    // backgroundColor: 'transparent', // (optional) you can add this line, or simply omit the option
    pixelRatio: 1,
    cacheBust: true,
    skipFonts: false,
  });

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function exportCardsAsPng(data: any) {
  const containers = [
    document.querySelector(".min-h-screen.w-full.bg-neutral-100 .grid.md\\:grid-cols-2"),
    document.querySelector(".sticky.top-6 .grid"),
  ].filter(Boolean) as Element[];

  let front: HTMLElement | null = null;
  let back: HTMLElement | null = null;

  for (const c of containers) {
    front = (c.querySelector(".export-front") as HTMLElement) || front;
    back = (c.querySelector(".export-back") as HTMLElement) || back;
  }

  if (!front) {
    alert("Couldn't find a rendered card to export. Generate a preview first.");
    return;
  }

  const safeName = ((data && data.name) ? data.name : "card").replace(/[^a-z0-9-_]+/gi, "_");
  await nodeToPngAndDownload(front, safeName + "_front.png");
  if (data && data.includeBack && back) {
    await nodeToPngAndDownload(back, safeName + "_back.png");
  }
}

// ------------------ Tiny self-tests ------------------
const DEV_TESTS = true;
function runSelfTests() {
  try {
    console.assert(ICON_LIBRARY.length > 10, "ICON_LIBRARY should have many entries");
    console.assert(THEMES.some((t) => t.key === "saveafox"), "Theme saveafox present");
    console.assert(typeof exportAsHtml === "function", "exportAsHtml exists");
    console.assert((DEFAULT_FORM.roles || []).length >= 3, "Default roles >= 3");
    const Fallback = (ICON_LIBRARY.find((i) => i.key === "nope") as any)?.Comp || PawPrint;
    console.assert(typeof Fallback === "function", "Icon fallback works");
    const htmlTest = buildCardsHtml({ ...DEFAULT_FORM, backTagline: "" });
    console.assert(!htmlTest.includes("Tagline:"), "Back tagline line should be hidden when empty");
    const roleHtml = buildCardsHtml({ ...DEFAULT_FORM, roles: [{ text: "" }] as any });
    console.assert(!roleHtml.includes("• </p>"), "Empty role lines should not render bullets");
    console.assert(typeof exportAsInlineHtml === "function", "exportAsInlineHtml exists");
    console.assert(typeof exportSandboxWrapper === "function", "exportSandboxWrapper exists");
    exportSandboxWrapper.toString &&
      console.assert(exportSandboxWrapper.toString().includes("allow-popups-to-escape-sandbox"), "Sandbox flags present");
  } catch (e) {
    // If a previous syntax error broke parsing, Babel may flag here—this keeps dev server alive.
    console.error("Self-tests failed", e);
  }
}

// ------------------ App ------------------
export default function App() {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [form, setForm] = useState<any>(DEFAULT_FORM);

  useEffect(() => { if (DEV_TESTS) runSelfTests(); }, []);

  return mode === "edit" ? (
    <Editor value={form} onChange={setForm} onGenerate={() => setMode("preview")} />
  ) : (
    <Preview
      data={form}
      onBack={() => setMode("edit")}
      onNew={() => { setForm(DEFAULT_FORM); setMode("edit"); }}
      onExport={(d: any) => exportAsHtml(d)}
    />
  );
}

