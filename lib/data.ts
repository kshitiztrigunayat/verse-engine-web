// Dummy data shaped like the design-source constants. Marketing copy + Studio sample data.

export const PL_STATUS = ["Waking the engine…", "Unpacking the world…", "Signing your pass…", "Ready when you are."];

export const LP = [
  { blur: 0, tOp: 1, tS: 1, hs: 0.5, hr: -8, hOp: 1, wOp: 0, wS: 1.3, prog: 8 },
  { blur: 12, tOp: 0.45, tS: 1.04, hs: 1.05, hr: 0, hOp: 1, wOp: 0, wS: 1.3, prog: 34 },
  { blur: 26, tOp: 0.15, tS: 1.08, hs: 2.8, hr: 0, hOp: 1, wOp: 0.2, wS: 1.2, prog: 62 },
  { blur: 30, tOp: 0, tS: 1.1, hs: 7, hr: 0, hOp: 0, wOp: 1, wS: 1, prog: 100 },
];

export const CAPS = [
  "Your best scene lives on one machine. It never leaves.",
  "Clients won’t install an app just to take a look.",
  "So we stopped sending files — and built a lens instead.",
  "Step through it. The scene is already waiting.",
];

export const STATS = [
  { eyebrow: "SCALE", value: "1.8", unit: "B", label: "TRIANGLES IN ONE SCENE" },
  { eyebrow: "SPEED", value: "0.9", unit: "s", label: "TO THE FIRST PICTURE" },
  { eyebrow: "WORKFLOW", value: "45", unit: "s", label: "BLENDER PROJECT TO LINK" },
  { eyebrow: "FORMATS", value: "20", unit: "+", label: "FILE TYPES · UP TO 20 GB" },
];

export const CH = [
  { tag: "WEB 3D", lead: "Open", rest: "in any\nbrowser.", body: "On a laptop it’s just a tab. Orbit, zoom and walk through — no plug-ins, no GPU in the cloud.", label: "WEB 3D", device: "LAPTOP · BROWSER", w: 640, h: 420, r: 18 },
  { tag: "AR", lead: "Place", rest: "it in\nthe room.", body: "On a phone, the same link finds the floor and sets the sofa, car or house model right there.", label: "AUGMENTED", device: "PHONE · AR", w: 320, h: 620, r: 48 },
  { tag: "XR", lead: "Step", rest: "inside the\nscene.", body: "In a headset browser, you stop looking at the space and start standing in it, at full scale.", label: "EXTENDED", device: "HEADSET · XR", w: 640, h: 380, r: 190 },
];

export const PCARDS = [
  { name: "Blender", tag: "SCENE → LINK · 45s", icon: "orbit", desc: "Publish a scene in one click, straight from the sidebar." },
  { name: "Unity", tag: "SCENE → LINK · 101s", icon: "cube", desc: "Ship Unity scenes to the web without a WebGL build." },
  { name: "Unreal", tag: "LEVEL → LINK · 70s", icon: "peak", desc: "Cinematic Unreal levels that open on any phone." },
  { name: "Coming soon", tag: "ON THE WAY", icon: "soon", desc: "SketchUp, Revit, Rhino, 3ds Max, Archicad, Maya and more." },
] as const;

export const SEGS = ["01 UPLOAD", "02 PREPARE", "03 SHARE LINK", "04 OPEN ANYWHERE"];

export const LIB_ROWS = [
  { title: "REAL ESTATE", tags: "WEB 3D · AR", kind: "plan", caption: "WALKABLE 3BHK APARTMENT" },
  { title: "PRODUCT CONFIGURATORS", tags: "WEB 3D · AR", kind: "config", caption: "SOFA IN EVERY FABRIC" },
  { title: "INSTANT HOMES", tags: "WEB 3D · XR", kind: "home", caption: "FLOOR PLAN TO FURNISHED HOME" },
  { title: "DIGITAL TWINS", tags: "WEB 3D · XR", kind: "twin", caption: "SCANNED OFFICE FLOOR" },
] as const;

/* ---------- plug-ins ---------- */
export type EditorKey = "blender" | "unity" | "unreal";
export const EDITOR_KEYS: EditorKey[] = ["blender", "unity", "unreal"];

export const TOOLS = [
  { id: "unity", name: "Unity", editor: "UNITY EDITOR", time: "101s", req: "UNITY 2022.3 LTS+ · .TGZ PACKAGE", tag: "Ship Unity scenes to the web without a WebGL build." },
  { id: "blender", name: "Blender", editor: "BLENDER", time: "45s", req: "BLENDER 3.6+ · .ZIP ADD-ON", tag: "Publish a scene in one click, straight from the sidebar." },
  { id: "unreal", name: "Unreal", editor: "UNREAL ENGINE", time: "70s", req: "UNREAL ENGINE 5.3+ · .ZIP PLUG-IN", tag: "Cinematic Unreal levels that open on any phone." },
];

export const PLUGIN_STEPS = [
  { n: "01", t: "Install it", d: "Grab the plug-in for your tool and add it like any other add-on." },
  { n: "02", t: "Paste a key", d: "Copy an API key from Studio → Plug-ins & API and sign in once." },
  { n: "03", t: "Hit publish", d: "Press Publish to Verse Engine. The scene is prepared for every device." },
  { n: "04", t: "Share & track", d: "The link shows up in Studio with privacy controls and analytics." },
];

export const SOON = ["SketchUp", "Revit", "Rhino", "3ds Max", "Archicad", "Maya", "Cinema 4D", "Houdini", "SolidWorks", "Figma (+Spline)"];

export const PLUGIN_GUIDES: Record<EditorKey, {
  name: string; file: string; req: string; reqLong: string; time: string; editor: string; tag: string;
  steps: [string, string, string][];
}> = {
  blender: { name: "Blender", file: ".ZIP ADD-ON", req: "BLENDER 3.6+", reqLong: "Blender 3.6 or newer", time: "45s", editor: "BLENDER — SIDEBAR (N)", tag: "Publish a scene in one click.", steps: [
    ["Download the add-on", "Save the .zip file. Don’t unzip it.", ""],
    ["Install it in Blender", "Install the .zip from disk, then tick it to enable.", "Edit › Preferences › Add-ons › Install from Disk"],
    ["Sign in with your API key", "Open the Verse Engine panel in the sidebar (N) and paste a key from Studio.", ""],
    ["Press Publish to Verse Engine", "The scene uploads and the link shows up in Studio.", ""],
  ] },
  unity: { name: "Unity", file: ".TGZ PACKAGE", req: "UNITY 2022.3 LTS+", reqLong: "Unity 2022.3 LTS or newer", time: "101s", editor: "UNITY — WINDOW › VERSE ENGINE", tag: "Ship Unity scenes to the web without a WebGL build.", steps: [
    ["Download the package", "Save the .tgz file.", ""],
    ["Add it with Package Manager", "Add the package from the tarball you saved.", "Window › Package Manager › + › Add package from tarball"],
    ["Sign in with your API key", "Open Window › Verse Engine and paste a key from Studio.", ""],
    ["Publish the open scene", "Press Publish to Verse Engine and wait for the link.", ""],
  ] },
  unreal: { name: "Unreal", file: ".ZIP PLUG-IN", req: "UNREAL ENGINE 5.3+", reqLong: "Unreal Engine 5.3 or newer", time: "70s", editor: "UNREAL — VERSE ENGINE TOOLBAR", tag: "Cinematic Unreal levels that open on any phone.", steps: [
    ["Download the plug-in", "Unzip it into your project’s Plugins folder.", "YourProject/Plugins/VerseEngine"],
    ["Enable it", "Restart the editor and turn the plug-in on.", "Edit › Plugins › Verse Engine"],
    ["Sign in with your API key", "Click the Verse Engine toolbar button and paste a key from Studio.", ""],
    ["Publish the level", "Press Publish to Verse Engine. Large levels can take a few minutes.", ""],
  ] },
};

export const PLUGIN_FAQ: [string, string][] = [
  ["I can’t see the Verse Engine panel after installing", "Check the plug-in is enabled, then restart the editor."],
  ["My upload stops part way", "Check your plan’s file size limit (2 GB on Free, 20 GB on paid plans) and your connection."],
  ["Materials look different in the browser", "Use standard PBR materials and bake procedural textures before publishing."],
];

/* ---------- developers ---------- */
export const DEV_TABS = [["embed", "EMBED SDK"], ["curl", "cURL"], ["js", "JAVASCRIPT"]] as const;
export const DEV_CODE: Record<string, string> = {
  embed: '<!-- Embed a scene -->\n<script src="https://[verse-sdk-url]"></script>\n\n<verse-scene id="sc-1039" controls="orbit"></verse-scene>',
  curl: '# Upload a file\ncurl -X POST https://[api-base]/v1/scenes \\\n  -H "Authorization: Bearer $VERSE_API_KEY" \\\n  -F "file=@living-room.glb"\n\n# { "id": "sc-1044", "status": "processing" }',
  js: '// Read a scene’s numbers\nconst res = await fetch("https://[api-base]/v1/scenes/sc-1039/analytics", {\n  headers: { Authorization: "Bearer " + key }\n});\nconst { views, sessions, watchTime } = await res.json();',
};
export const DEV_FLOW = [
  { code: "POST /v1/scenes", d: "Send a file, a scan or a floor plan." },
  { code: "processing", d: "Verse Engine prepares and signs it once." },
  { code: "scene.ready ⟶ webhook", d: "Your server hears the moment it’s live." },
  { code: "<verse-scene>", d: "Drop the ID into any page. Done." },
];
export const DEV_CARDS = [
  { tag: "API", lead: "API", rest: "management & docs", d: "A REST API for everything you can do in Studio.", cta: "API docs", keys: true, band: false,
    items: ["Upload files and scans", "Publish and get a signed link", "Embed anywhere", "Track views, sessions and watch time", "Webhooks when a scene is ready"] },
  { tag: "SDK", lead: "SDK", rest: "install & docs", d: "Embed a scene on any site with one script tag or a web component.", cta: "SDK install guide", keys: false, band: true,
    items: ["One script tag", "Web component for React and Vue", "Private, revocable links", "Works on phones, laptops and headsets", "Run your own server"] },
];
export const DEV_QUICK = [
  { n: "01", t: "Create an API key", d: "Sign in to Studio and create a key under Plug-ins & API.", link: "OPEN STUDIO", href: "/studio/keys" },
  { n: "02", t: "Upload your first scene", d: "POST a file, then wait for the scene.ready webhook.", link: "SET UP WEBHOOKS", href: "/studio/webhooks" },
  { n: "03", t: "Embed it", d: "Add the SDK script and drop in the scene ID.", link: "SDK GUIDE", href: "/docs/embed-sdk" },
];

/* ---------- docs ---------- */
export const DOCS: [string, string[]][] = [
  ["GETTING STARTED", ["What is Verse Engine?", "Upload your first scene", "Supported file types"]],
  ["VERSE ENGINE", ["How streaming works", "Materials and lighting"]],
  ["INSTANT HOMES", ["Floor plan to 3D home", "Fixing doors and windows"]],
  ["LIVE TOURS", ["Start a live tour"]],
  ["API & SDK", ["Authentication", "Scenes API", "Webhooks", "Embed SDK"]],
  ["PLUG-INS", ["Blender", "Unity", "Unreal"]],
];
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const DOC_PAGES = DOCS.flatMap(([group, items]) => items.map((title) => ({ group, title, slug: slugify(title) })));
export const DOC_CURL = 'curl -X POST https://[api-base]/v1/scenes \\\n  -H "Authorization: Bearer $VERSE_API_KEY" \\\n  -F "file=@living-room.glb"';

/* ---------- explore ---------- */
export type PostType = "Blog" | "Research" | "Event";
export const POSTS: { type: PostType; title: string; meta: string }[] = [
  { type: "Blog", title: "Publishing a 2 GB Blender scene in under a minute", meta: "Verse Engine team · 14 Oct 2026" },
  { type: "Research", title: "How Verse Engine streams only what the viewer can see", meta: "Engine team · 02 Oct 2026" },
  { type: "Event", title: "Verse Engine Challenge live finals", meta: "08 Nov 2026 · Bengaluru + online" },
  { type: "Blog", title: "Floor plan to furnished home: a walkthrough", meta: "Verse Engine team · 22 Sep 2026" },
  { type: "Research", title: "Faithful car paint and glass on WebGPU", meta: "Engine team · 10 Sep 2026" },
  { type: "Event", title: "Webinar: 3D links for real estate teams", meta: "20 Nov 2026 · Online" },
];
export const POST_TABS: [string, string][] = [["all", "All"], ["Blog", "Blogs"], ["Research", "Research"], ["Event", "Events"]];

/* ---------- pricing ---------- */
export const PLANS = [
  { name: "Free", who: "Try Verse Engine", price: "$0", per: "FOREVER", items: ["Up to 2 GB per file", "Private, revocable links", "Viewers never pay"], cta: "Start free", href: "/signin" },
  { name: "Pro", who: "Freelancers and creators", price: "$79", per: "/ MONTH", items: ["Up to 20 GB per file", "Analytics per scene", "14-day free trial"], cta: "Start 14-day trial", href: "/signin", hot: true },
  { name: "Studio", who: "Teams and agencies", price: "$299", per: "/ MONTH", items: ["Everything in Pro", "Webhooks and API", "Team seats"], cta: "Choose Studio", href: "/signin" },
  { name: "All Access", who: "Everything, billed yearly", price: "$7,200", per: "/ YEAR", items: ["Everything in Studio", "Live tours", "Priority support"], cta: "Choose All Access", href: "/signin" },
  { name: "Enterprise", who: "Large organisations", price: "Custom", per: "", items: ["SSO", "White-label", "SLA"], cta: "Talk to us", href: "#enterprise" },
];
export const PRICING_FAQ: [string, string][] = [
  ["What is Verse Engine?", "Our own 3D engine, built for the browser. It turns a 3D file, a Blender, Unity or Unreal project, or a floor plan into one link that opens on any device."],
  ["Do viewers need an app or plug-in?", "No. Links open in any modern browser on phones, laptops and headsets. Viewers never pay."],
  ["Which tools can publish to Verse Engine?", "Blender, Unity and Unreal today. SketchUp, Revit, Rhino, 3ds Max, Archicad, Maya, Cinema 4D, Houdini, SolidWorks and Figma (+Spline) are coming soon."],
  ["Is it free?", "Yes. The Free plan costs $0 and every new account gets a 14-day Pro trial."],
];

/* ---------- about ---------- */
export const ABOUT_FACTS = [
  { k: "WHERE WE BUILD", v: "Bengaluru & San Francisco", d: "One team across two time zones, shipping around the clock." },
  { k: "THE ENGINE", v: "Patents pending", d: "On the streaming engine that powers every Verse Engine link." },
  { k: "SAY HELLO", v: "hello@ctruh.com", d: "Partnerships, press and careers." },
];
export const ABOUT_PILLARS = [
  { n: "01", t: "Any device, any OS", d: "WebGPU or WebGL2 on phones, laptops and headsets." },
  { n: "02", t: "Lower streaming cost", d: "No rented cloud GPUs — the viewer’s own device does the drawing." },
  { n: "03", t: "20+ file types", d: "Models, scans, splats, point clouds and IFC." },
  { n: "04", t: "Faithful materials", d: "Glass, metal, car paint, fabric and real light." },
];
export const ABOUT_STATS = [
  { v: "1.8", u: "B", l: "TRIANGLES IN ONE SCENE" },
  { v: "0.9", u: "s", l: "TO FIRST PICTURE" },
  { v: "29", u: "s", l: "LARGE INTERIOR ON MOBILE DATA" },
  { v: "45", u: "s", l: "BLENDER PROJECT TO LINK" },
];
