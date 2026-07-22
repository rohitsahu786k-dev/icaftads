import type { Route } from "next";

export type LinkItem = {
  href: Route;
  label: string;
};

export const primaryLinks: LinkItem[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" }
];

export const proofRail = [
  "SEO",
  "PPC and Google Ads",
  "Social media",
  "Shopify",
  "Web development",
  "Automation"
] as const;

export const outcomeSignals = [
  {
    label: "Visibility",
    title: "Demand buyers can find",
    copy: "Technical, on-page and content foundations for qualified organic discovery."
  },
  {
    label: "Acquisition",
    title: "Campaigns tied to the offer",
    copy: "Paid media and lead-generation plans shaped around budget, audience and conversion path."
  },
  {
    label: "Conversion",
    title: "Pages built for decisions",
    copy: "Websites, landing pages and Shopify experiences that make the next action clear."
  },
  {
    label: "Follow-up",
    title: "Lead flow with fewer gaps",
    copy: "Email, WhatsApp-ready and automation workflows for cleaner enquiry handling."
  }
] as const;

export const services = [
  {
    href: "/services/seo-dubai",
    title: "SEO Dubai",
    copy: "Technical, on-page and content-led search work for stronger organic visibility.",
    tag: "Search"
  },
  {
    href: "/services/ppc-google-ads-dubai",
    title: "PPC and Google Ads",
    copy: "Paid search and campaign management supported by tracking and landing-page thinking.",
    tag: "Paid media"
  },
  {
    href: "/services/social-media-marketing-dubai",
    title: "Social Media Marketing",
    copy: "Social strategy, content direction and platform management with commercial relevance.",
    tag: "Content"
  },
  {
    href: "/services/web-design-development-dubai",
    title: "Web Design and Development",
    copy: "Websites and landing pages planned around credibility, performance, SEO and conversion.",
    tag: "Web"
  },
  {
    href: "/services/shopify-development-dubai",
    title: "Shopify Development",
    copy: "Shopify setup and improvement for ecommerce brands selling direct.",
    tag: "Ecommerce"
  },
  {
    href: "/services/lead-generation-marketing-automation-dubai",
    title: "Lead Generation and Automation",
    copy: "Campaigns, forms, CRM handoff, email and automation for qualified enquiry handling.",
    tag: "Systems"
  }
] as const satisfies ReadonlyArray<{
  href: Route;
  title: string;
  copy: string;
  tag: string;
}>;

export const caseStudyNeeds = [
  "SEO case study with verified context, baseline and outcome",
  "Google Ads or PPC case study with permission to disclose",
  "Shopify or website development case study with approved media"
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Diagnose",
    copy: "Review the offer, audience, website, search demand, campaigns, analytics and lead flow."
  },
  {
    step: "02",
    title: "Plan",
    copy: "Define the channel mix, content priorities, landing-page needs, tracking and reporting."
  },
  {
    step: "03",
    title: "Build",
    copy: "Create or improve the pages, campaigns, content, store elements, forms and workflows."
  },
  {
    step: "04",
    title: "Improve",
    copy: "Review performance, test what matters and adjust around data, lead quality and feedback."
  }
] as const;

export const testimonialNeeds = [
  "Website development testimonial permission",
  "Shopify support testimonial permission",
  "Social media or campaign testimonial permission"
] as const;

export const insights = [
  {
    href: "/insights/how-to-choose-a-digital-marketing-agency-in-dubai" as Route,
    title: "How to choose a digital marketing agency in Dubai",
    meta: "Agency selection"
  },
  {
    href: "/insights/seo-cost-dubai" as Route,
    title: "SEO cost in Dubai: what changes the scope",
    meta: "SEO planning"
  },
  {
    href: "/insights/shopify-development-cost-dubai" as Route,
    title: "Shopify development cost in Dubai: what to plan before you build",
    meta: "Ecommerce"
  }
] as const satisfies ReadonlyArray<{
  href: Route;
  title: string;
  meta: string;
}>;
