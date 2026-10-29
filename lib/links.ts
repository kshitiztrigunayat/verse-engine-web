// Every external / placeholder URL lives here. Swap when real endpoints exist.
export const LINKS = {
  challenge: "https://verse.ctruh.com/challenge", // [PLACEHOLDER URL]
  apiBase: "[api-base]", // [PLACEHOLDER]
  sdkUrl: "[verse-sdk-url]", // [PLACEHOLDER]
  whatsapp: "+91 74115 97778", // [confirm number]
  email: "hello@ctruh.com",
  domain: "verse.ctruh.com",
  templates: "#", // [PLACEHOLDER template URLs]
  legal: { terms: "#", privacy: "#", refunds: "#" },
} as const;

export const ROUTES = {
  home: "/",
  plugins: "/plugins",
  plugin: (editor: string) => `/plugins/${editor}`,
  developers: "/developers",
  docs: "/docs",
  doc: (slug: string) => `/docs/${slug}`,
  explore: "/explore",
  pricing: "/pricing",
  enterprise: "/pricing#enterprise",
  about: "/about",
  signin: "/signin",
  studio: "/studio",
  analytics: (scene?: string) => (scene ? `/studio/analytics?scene=${scene}` : "/studio/analytics"),
  webhooks: "/studio/webhooks",
  keys: "/studio/keys",
  newScene: "/studio/new",
  newReview: "/studio/new/review",
  newShare: "/studio/new/share",
} as const;
