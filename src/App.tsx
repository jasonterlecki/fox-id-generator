import React, { useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { Camera, PawPrint, ShieldCheck, Sparkles } from "lucide-react";

type Theme = {
  key: string;
  name: string;
  base: string;
  ink: string;
  pattern: string;
  accent: string;
  seal: string;
  ribbon: string;
  photoBorder: string;
};

type CardForm = {
  agency: string;
  authority: string;
  cardTitle: string;
  foxName: string;
  callSign: string;
  org: string;
  enclosure: string;
  city: string;
  state: string;
  postal: string;
  idNumber: string;
  barcode: string;
  species: string;
  sex: string;
  snackClearance: string;
  favoriteSnack: string;
  temperament: string;
  handler: string;
  handlerTitle: string;
  issueDate: string;
  expirationDate: string;
  frcCode: string;
  remarks: string;
  theme: Theme["key"];
  photoDataUrl: string;
};

const FOX_THEMES: Theme[] = [
  {
    key: "sand",
    name: "Sandstone Official",
    base: "#f4e2c8",
    ink: "#1f2937",
    pattern: "#efc27c",
    accent: "#0f172a",
    seal: "#c97728",
    ribbon: "#f7d7a1",
    photoBorder: "#f3cfa0",
  },
  {
    key: "mint",
    name: "Mint Bureau",
    base: "#e0f0e6",
    ink: "#0f1a1c",
    pattern: "#a6d7be",
    accent: "#0c3c4c",
    seal: "#0d9488",
    ribbon: "#b6ead8",
    photoBorder: "#9fdac6",
  },
  {
    key: "midnight",
    name: "Midnight Ops",
    base: "#f1efe8",
    ink: "#111827",
    pattern: "#d7d2c3",
    accent: "#0f172a",
    seal: "#4338ca",
    ribbon: "#dcd8f7",
    photoBorder: "#c7c1eb",
  },
];

function buildDefaultDates() {
  const now = new Date();
  const fmt = (date: Date) => date.toISOString().split("T")[0];
  const issue = fmt(now);
  const expiry = fmt(new Date(now.getFullYear() + 15, now.getMonth(), now.getDate()));
  return { issue, expiry };
}

const DEFAULT_FORM: CardForm = {
  agency: "Fox Resident Card",
  authority: "Vulpine Snack Authority",
  cardTitle: "FOX RESIDENT CARD",
  foxName: "Roo",
  callSign: "R-07",
  org: "Felix Foundation Fox Rescue and Sanctuary",
  enclosure: "Dakota, Rusty, and Roo's enclosure",
  city: "Howell",
  state: "MI",
  postal: "48855",
  idNumber: "4328095467",
  barcode: "4328095467",
  species: "Vulpes vulpes (red fox)",
  sex: "F",
  snackClearance: "Snack Level 4",
  favoriteSnack: "Blueberries",
  temperament: "Warm + spicy",
  handler: "Dakota",
  handlerTitle: "Licensed Snack Officer",
  issueDate: buildDefaultDates().issue,
  expirationDate: buildDefaultDates().expiry,
  frcCode: "FRC-ROO-782A",
  remarks: "Cleared for enrichment adventures within sanctuary limits.",
  theme: "sand",
  photoDataUrl: "",
};

const FOX_EMOJI_PATTERN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">` +
    `<text x="20" y="50" font-size="36" fill="__COLOR__" fill-opacity="0.15">🦊</text>` +
    `<text x="90" y="90" font-size="32" fill="__COLOR__" fill-opacity="0.15">🦊</text>` +
    `<text x="40" y="130" font-size="34" fill="__COLOR__" fill-opacity="0.12">🦊</text>` +
    `<text x="110" y="40" font-size="30" fill="__COLOR__" fill-opacity="0.15">🦊</text>` +
  `</svg>`
);

function foxEmojiPattern(color: string) {
  const encodedColor = encodeURIComponent(color);
  return `url("data:image/svg+xml;utf8,${FOX_EMOJI_PATTERN.replace(/__COLOR__/g, encodedColor)}")`;
}

function sanitizeBarcodeInput(raw: string) {
  const trimmed = raw.replace(/[^0-9A-Za-z]/g, "");
  return trimmed || "FOX000000";
}

type BarcodeProps = {
  value: string;
  color: string;
  height?: number;
  className?: string;
  label?: string;
};

function CardBarcode({ value, color, height = 60, className = "", label = "Barcode" }: BarcodeProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const sanitized = sanitizeBarcodeInput(value);

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, sanitized, {
        format: "CODE128",
        lineColor: color,
        width: 2,
        height,
        margin: 0,
        background: "transparent",
        displayValue: false,
      });
    } catch (err) {
      console.warn("Barcode render failed", err);
    }
  }, [sanitized, color, height]);

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <svg ref={svgRef} role="img" aria-label={`${label} ${sanitized}`} className="h-full w-full" />
      <span className="sr-only">{label} {sanitized}</span>
    </div>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      {children}
    </label>
  );
}

type PhotoProps = {
  value: string;
  onChange: (next: string) => void;
};

function PhotoInput({ value, onChange }: PhotoProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold">Fox portrait</p>
          <p className="text-xs text-slate-500">Square-ish photos work best. PNG/JPEG up to 5 MB.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Camera className="h-4 w-4" /> Upload portrait
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
        <div className="h-24 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {value ? (
            <img src={value} alt="Uploaded fox preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">No photo</div>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
};

function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/60 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-800">{value || "—"}</div>
    </div>
  );
}

type PreviewProps = {
  data: CardForm;
  theme: Theme;
};

const FoxCardPreview = React.forwardRef<HTMLDivElement, PreviewProps>(({ data, theme }, ref) => {
  const emojiPattern = foxEmojiPattern(theme.pattern);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[820px] overflow-hidden rounded-[32px] border border-black/5 shadow-2xl"
      style={{
        backgroundColor: theme.base,
        color: theme.ink,
        backgroundImage: `${emojiPattern}, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(0,0,0,0.02))`,
        backgroundSize: "160px 160px, cover",
      }}
    >
      <div className="absolute inset-6 rounded-[28px] border border-black/10" />
      <div className="relative z-10 flex h-full flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-600">{data.agency}</p>
            <h1 className="text-3xl font-black tracking-tight">{data.cardTitle}</h1>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-600">{data.authority}</p>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] uppercase tracking-[0.5em] text-slate-500">Grade</span>
            <span className="text-2xl font-black text-slate-900">{data.callSign}</span>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-slate-900/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-800">
              <ShieldCheck className="h-3.5 w-3.5" /> {data.snackClearance}
            </span>
          </div>
        </div>

        <div className="flex flex-1 gap-5">
          <div className="flex w-[240px] flex-col justify-between gap-4">
            <div
              className="overflow-hidden rounded-3xl border-[6px] shadow-lg"
              style={{ borderColor: theme.photoBorder }}
            >
              {data.photoDataUrl ? (
                <img src={data.photoDataUrl} alt={`${data.foxName} portrait`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-slate-200 text-slate-500">
                  <PawPrint className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-white/70 p-3 text-xs text-slate-600 shadow">
              <p>
                Residence: <span className="font-semibold text-slate-800">{data.org}</span>
              </p>
              <p>{data.enclosure}</p>
              <p>
                {data.city}, {data.state} {data.postal}
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Fox Resident</p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-4xl font-black tracking-tight text-slate-900">{data.foxName}</span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
                  {data.species}
                </span>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <InfoBlock label="Species" value={data.species} />
              <InfoBlock label="Sex" value={data.sex} />
              <InfoBlock label="Snack clearance" value={data.snackClearance} />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <InfoBlock label="Temperament" value={data.temperament} />
              <InfoBlock label="Favorite snack" value={data.favoriteSnack} />
              <InfoBlock label="Grade" value={data.callSign} />
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">Handler</div>
                  <div className="font-semibold">{data.handler}</div>
                  <div className="text-xs text-slate-500">{data.handlerTitle}</div>
                </div>
                <div className="h-px flex-1 bg-slate-200" />
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Issue</div>
                  <div className="font-semibold">{data.issueDate}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Expires</div>
                  <div className="font-semibold">{data.expirationDate}</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600">
              <span className="font-semibold">Remarks:</span> {data.remarks || "Snack duties pending."}
            </div>

            <div className="rounded-2xl border border-slate-900/10 bg-white/90 p-3 shadow-inner">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Resident ID</div>
                  <div className="text-2xl font-black tracking-wider text-slate-900">{data.idNumber}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">FRC Code</div>
                  <div className="font-semibold">{data.frcCode}</div>
                </div>
                <div className="flex flex-col items-end text-right text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  <span>Verified by</span>
                  <span className="text-base font-black text-slate-800">{data.handler}</span>
                </div>
              </div>
              <CardBarcode value={data.barcode} color={theme.accent} height={60} label="Barcode for resident ID" className="mt-2" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500">{data.authority}</div>
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/80 text-center text-[10px] font-black uppercase tracking-widest text-white"
            style={{ background: theme.seal }}
          >
            <div>
              <div className="text-3xl"><Sparkles className="mx-auto h-6 w-6" /></div>
              Snack Seal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
FoxCardPreview.displayName = "FoxCardPreview";

const POCKET_CARD_WIDTH = 640;
const POCKET_CARD_HEIGHT = Math.round(POCKET_CARD_WIDTH / (85.6 / 53.98));

const PocketCard = React.forwardRef<HTMLDivElement, PreviewProps>(({ data, theme }, ref) => {
  const emojiPattern = foxEmojiPattern(theme.pattern);

  return (
    <div
      ref={ref}
      className="relative mx-auto overflow-hidden rounded-[28px] border border-black/10 shadow-xl"
      style={{
        backgroundColor: theme.base,
        backgroundImage: `${emojiPattern}, linear-gradient(160deg, rgba(255,255,255,0.4), rgba(0,0,0,0.05))`,
        backgroundSize: "160px 160px, cover",
        width: `${POCKET_CARD_WIDTH}px`,
        height: `${POCKET_CARD_HEIGHT}px`,
      }}
    >
      <div className="absolute inset-3 rounded-[22px] border border-black/5" />
      <div className="relative z-10 flex h-full overflow-hidden rounded-[24px] bg-white/60 backdrop-blur-sm">
        <div className="flex w-[40%] flex-col border-r border-white/40 bg-white/40">
          <div className="flex-1 p-3">
            <div
              className="overflow-hidden rounded-2xl border-[5px] shadow"
              style={{ borderColor: theme.photoBorder }}
            >
              {data.photoDataUrl ? (
                <img src={data.photoDataUrl} alt={`${data.foxName} portrait`} className="h-full w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-slate-200 text-slate-500">
                  <PawPrint className="h-8 w-8" />
                </div>
              )}
            </div>
          </div>
          <div className="px-3 pb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-slate-700">
            Grade {data.callSign} • {data.snackClearance}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500">Fox Resident</p>
            <h2 className="text-2xl font-black text-slate-900">{data.foxName}</h2>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{data.authority}</p>
            <p className="mt-1 text-xs text-slate-600">
              {data.org}
            </p>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-slate-700">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Resident ID</div>
              <div className="font-semibold">{data.idNumber}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">FRC Code</div>
              <div className="font-semibold">{data.frcCode}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Issued</div>
              <div className="font-semibold">{data.issueDate}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Expires</div>
              <div className="font-semibold">{data.expirationDate}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Clearance</div>
              <div className="font-semibold">{data.snackClearance}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Region</div>
              <div className="font-semibold">{data.city}, {data.state}</div>
            </div>
          </div>

          <CardBarcode value={data.barcode} color={theme.accent} height={48} label="Pocket card barcode" className="mt-1" />
        </div>
      </div>
    </div>
  );
});
PocketCard.displayName = "PocketCard";

let htmlToImage: any = null;
async function ensureHtmlToImage() {
  if (htmlToImage) return htmlToImage;
  // @ts-ignore - remote ESM helper resolved at runtime
  htmlToImage = await import("https://esm.sh/html-to-image@1.11.11");
  return htmlToImage;
}

async function downloadCard(node: HTMLElement, fileName: string) {
  const lib = await ensureHtmlToImage();
  const rect = node.getBoundingClientRect();
  const width = Math.max(node.scrollWidth, Math.ceil(rect.width));
  const height = Math.max(node.scrollHeight, Math.ceil(rect.height));
  const computed = getComputedStyle(node);
  const bg = computed.backgroundColor || "#ffffff";
  const radius = parseFloat(computed.borderTopLeftRadius || "0") || 0;
  const dataUrl = await lib.toPng(node, {
    cacheBust: true,
    width,
    height,
    pixelRatio: 2,
    backgroundColor: bg,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      margin: "0",
    },
  });
  const finalUrl = radius > 0 ? await maskRoundedCorners(dataUrl, width * 2, height * 2, radius * 2) : dataUrl;
  const link = document.createElement("a");
  link.href = finalUrl;
  link.download = fileName;
  link.click();
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = dataUrl;
  });
}

function roundedRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function maskRoundedCorners(dataUrl: string, width: number, height: number, radius: number) {
  try {
    const img = await loadImage(dataUrl);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0, width, height);
    ctx.globalCompositeOperation = "destination-in";
    roundedRectPath(ctx, 0, 0, width, height, radius);
    ctx.fill();
    return canvas.toDataURL("image/png");
  } catch (err) {
    console.warn("Masking rounded corners failed", err);
    return dataUrl;
  }
}

export default function App() {
  const [form, setForm] = useState<CardForm>(DEFAULT_FORM);
  const [exportStatus, setExportStatus] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const primaryCardRef = useRef<HTMLDivElement | null>(null);
  const pocketCardRef = useRef<HTMLDivElement | null>(null);

  const theme = useMemo(
    () => FOX_THEMES.find((t) => t.key === form.theme) ?? FOX_THEMES[0],
    [form.theme]
  );

  const handleChange = (key: keyof CardForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    if (!primaryCardRef.current || !pocketCardRef.current) {
      setExportStatus("Render the preview before exporting.");
      return;
    }
    try {
      setIsExporting(true);
      setExportStatus("Generating PNG...");
      const safeName = (form.foxName || "fox").replace(/[^a-z0-9-_]+/gi, "_");
      await downloadCard(primaryCardRef.current, `${safeName}_resident_card.png`);
      await downloadCard(pocketCardRef.current, `${safeName}_pocket_card.png`);
      setExportStatus("PNG files downloaded successfully.");
    } catch (err) {
      console.error(err);
      setExportStatus("Export failed. Try again after the preview renders.");
    } finally {
      setIsExporting(false);
      setTimeout(() => setExportStatus(""), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 print:bg-white print:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <div className="w-full rounded-3xl bg-white p-6 shadow-xl lg:w-[360px] print:hidden">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Government-ish Fox ID Builder</h1>
          <p className="mt-1 text-sm text-slate-600">Craft a legitimate-looking (but obviously playful) fox resident credential.</p>

          <div className="mt-6 space-y-6">
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Identity</h2>
              <Field label="Fox name">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.foxName} onChange={(e) => handleChange("foxName")(e.target.value)} />
              </Field>
              <Field label="Grade (or station code)">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.callSign} onChange={(e) => handleChange("callSign")(e.target.value)} />
              </Field>
              <Field label="Species">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.species} onChange={(e) => handleChange("species")(e.target.value)} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Sex">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.sex} onChange={(e) => handleChange("sex")(e.target.value.toUpperCase())} />
                </Field>
                <Field label="Favorite snack">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.favoriteSnack} onChange={(e) => handleChange("favoriteSnack")(e.target.value)} />
                </Field>
              </div>
              <Field label="Snack clearance">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.snackClearance} onChange={(e) => handleChange("snackClearance")(e.target.value)} />
              </Field>
              <Field label="Temperament">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.temperament} onChange={(e) => handleChange("temperament")(e.target.value)} />
              </Field>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Residence</h2>
              <Field label="Agency title">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.cardTitle} onChange={(e) => handleChange("cardTitle")(e.target.value)} />
              </Field>
              <Field label="Authority tagline">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.authority} onChange={(e) => handleChange("authority")(e.target.value)} />
              </Field>
              <Field label="Sanctioning agency">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.agency} onChange={(e) => handleChange("agency")(e.target.value)} />
              </Field>
              <Field label="Organization">
                <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.org} onChange={(e) => handleChange("org")(e.target.value)} />
              </Field>
              <Field label="Enclosure / habitat">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.enclosure} onChange={(e) => handleChange("enclosure")(e.target.value)} />
              </Field>
              <div className="grid grid-cols-[2fr_1fr] gap-3">
                <Field label="City">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.city} onChange={(e) => handleChange("city")(e.target.value)} />
                </Field>
                <Field label="State">
                  <input className="w-full rounded-2xl border border-slate-200 px-4 py-2 uppercase" maxLength={2} value={form.state} onChange={(e) => handleChange("state")(e.target.value.toUpperCase())} />
                </Field>
              </div>
              <Field label="Postal code">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.postal} onChange={(e) => handleChange("postal")(e.target.value)} />
              </Field>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">IDs & dates</h2>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Issue date">
                  <input type="date" className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.issueDate} onChange={(e) => handleChange("issueDate")(e.target.value)} />
                </Field>
                <Field label="Expiration">
                  <input type="date" className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.expirationDate} onChange={(e) => handleChange("expirationDate")(e.target.value)} />
                </Field>
              </div>
              <Field label="Resident ID number">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.idNumber} onChange={(e) => handleChange("idNumber")(e.target.value)} />
              </Field>
              <Field label="Barcode value">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.barcode} onChange={(e) => handleChange("barcode")(e.target.value)} />
              </Field>
              <Field label="FRC code">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.frcCode} onChange={(e) => handleChange("frcCode")(e.target.value)} />
              </Field>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Handler</h2>
              <Field label="Handler name">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.handler} onChange={(e) => handleChange("handler")(e.target.value)} />
              </Field>
              <Field label="Handler title">
                <input className="w-full rounded-2xl border border-slate-200 px-4 py-2" value={form.handlerTitle} onChange={(e) => handleChange("handlerTitle")(e.target.value)} />
              </Field>
              <Field label="Remarks">
                <textarea className="w-full rounded-2xl border border-slate-200 px-4 py-2" rows={3} value={form.remarks} onChange={(e) => handleChange("remarks")(e.target.value)} />
              </Field>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Theme</h2>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-2"
                value={form.theme}
                onChange={(e) => handleChange("theme")(e.target.value)}
              >
                {FOX_THEMES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.name}
                  </option>
                ))}
              </select>
            </section>

            <PhotoInput value={form.photoDataUrl} onChange={handleChange("photoDataUrl")} />
          </div>
        </div>

        <div className="flex-1 space-y-6 print:w-full print:max-w-full">
          <div className="print:break-after-page">
            <FoxCardPreview ref={primaryCardRef} data={form} theme={theme} />
          </div>
          <PocketCard ref={pocketCardRef} data={form} theme={theme} />
          <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white/80 p-4 shadow-lg print:hidden">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? "Preparing PNG…" : "Download PNG"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Print page
            </button>
            {exportStatus && <p className="text-sm text-slate-600">{exportStatus}</p>}
            {!exportStatus && (
              <p className="text-xs text-slate-500">
                Print tip: use browser settings “Background graphics” on + margins set to “None”.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
