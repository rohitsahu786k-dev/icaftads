import type { Metadata } from "next";
import type { Route } from "next";

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServicePageData = {
  slug: string;
  href: Route;
  eyebrow: string;
  title: string;
  intro: string;
  context: string;
  problems: string[];
  deliverables: string[];
  method: string[];
  proof: string[];
  caseStudy: {
    title: string;
    copy: string;
  };
  faqs: FaqItem[];
  related: Route[];
  cta: string;
  metadata: Metadata;
};

export const servicePages = [
  {
    slug: "seo-dubai",
    href: "/services/seo-dubai",
    eyebrow: "SEO Dubai",
    title: "SEO agency in Dubai for search visibility that compounds.",
    intro:
      "SEO is the work of making a business easier to discover, understand and trust through search. I Craft Ads supports technical SEO, page structure, search-intent planning and ongoing improvement.",
    context:
      "Dubai buyers often compare options before speaking to a team. SEO has to make the right pages visible, answer commercial questions clearly and support the next step from research to enquiry.",
    problems: [
      "Important service pages are not structured around buyer intent.",
      "Technical issues make the site harder for search engines and users to navigate.",
      "Content activity exists, but it is not connected to commercial pages or qualified demand."
    ],
    deliverables: [
      "Technical SEO audit and priority roadmap.",
      "Keyword and search-intent mapping.",
      "On-page optimisation for core pages.",
      "Content plan for service, industry and insight pages.",
      "Local SEO recommendations where business details are verified.",
      "Reporting structure for visibility, enquiries and improvement actions."
    ],
    method: [
      "Audit the site, market, search intent and existing content.",
      "Map commercial pages to the right queries and internal links.",
      "Improve technical foundations, metadata, headings and page copy.",
      "Plan content around buyer questions instead of empty volume chasing.",
      "Review performance and refine based on visibility, traffic quality and leads."
    ],
    proof: [
      "[OWNER MUST PROVIDE VERIFIED SEO RESULT]",
      "[OWNER MUST PROVIDE SEO REPORTING EXAMPLE]",
      "[OWNER MUST PROVIDE CLIENT PERMISSION]"
    ],
    caseStudy: {
      title: "SEO proof slot awaiting approval",
      copy: "This page is ready for an SEO case study once the owner supplies the client context, baseline, work delivered, timeframe and permission to publish."
    },
    faqs: [
      {
        question: "Can I Craft Ads support local SEO in Dubai?",
        answer:
          "Yes, but local office, address and map-related claims should only be used after the owner confirms the exact UAE business details."
      },
      {
        question: "Do you publish SEO results on this page?",
        answer:
          "Only verified results with client permission should be published. Until then, the page explains the method and required proof."
      },
      {
        question: "What makes SEO different from paid ads?",
        answer:
          "SEO improves discoverability over time through technical, content and authority signals. Paid ads can create faster campaign visibility but need budget and tracking discipline."
      }
    ],
    related: [
      "/services/ppc-google-ads-dubai",
      "/services/web-design-development-dubai",
      "/services/lead-generation-marketing-automation-dubai"
    ],
    cta: "Request an SEO audit",
    metadata: {
      title: "SEO Agency Dubai | Search Strategy and Technical SEO | I Craft Ads",
      description:
        "SEO strategy, technical SEO, content planning and local search support for businesses that want more qualified organic visibility."
    }
  },
  {
    slug: "ppc-google-ads-dubai",
    href: "/services/ppc-google-ads-dubai",
    eyebrow: "PPC and Google Ads Dubai",
    title: "Google Ads and PPC campaigns for Dubai businesses that need accountable growth.",
    intro:
      "Paid media needs more than budget. It needs a clear offer, clean tracking, relevant creative, strong landing pages and regular improvement.",
    context:
      "In a competitive Dubai market, paid search and PPC campaigns can quickly expose weak offers, broken tracking or unclear landing pages. The campaign and conversion path need to be planned together.",
    problems: [
      "Campaigns are active but lead quality is unclear.",
      "Budgets are spread across channels without a clear offer or testing plan.",
      "Landing pages and tracking are not strong enough to judge performance."
    ],
    deliverables: [
      "Google Ads account and campaign review.",
      "Campaign structure recommendations.",
      "Keyword, audience and offer alignment.",
      "Landing-page and conversion-path recommendations.",
      "Tracking requirements for enquiries, calls and form submissions.",
      "Reporting and optimisation cadence."
    ],
    method: [
      "Clarify the offer, audience, geography and budget.",
      "Review current campaigns, search terms, landing pages and tracking.",
      "Build or restructure campaigns around intent and conversion value.",
      "Improve ads, negative keywords, landing-page direction and reporting.",
      "Optimise around lead quality and business feedback."
    ],
    proof: [
      "[OWNER MUST PROVIDE GOOGLE ADS CERTIFICATION OR PARTNER PROOF IF CLAIMED]",
      "[OWNER MUST PROVIDE VERIFIED CPL / ROAS / LEAD QUALITY RESULT]",
      "[OWNER MUST PROVIDE APPROVED CAMPAIGN EXAMPLE]"
    ],
    caseStudy: {
      title: "PPC proof slot awaiting approval",
      copy: "A campaign case study should include the offer, targeting, budget context, conversion setup, optimisation work and verified outcome before publication."
    },
    faqs: [
      {
        question: "Can you guarantee a cost per lead?",
        answer:
          "No. Cost per lead depends on offer, competition, targeting, budget, landing page and follow-up. Any result claim needs verified evidence."
      },
      {
        question: "Do Google Ads need landing-page work?",
        answer:
          "Often yes. Paid traffic performs better when the landing page matches intent, builds trust and makes the action clear."
      },
      {
        question: "Can PPC work with SEO?",
        answer:
          "Yes. Paid search can test demand and messaging while SEO builds longer-term organic visibility."
      }
    ],
    related: [
      "/services/seo-dubai",
      "/services/web-design-development-dubai",
      "/services/lead-generation-marketing-automation-dubai"
    ],
    cta: "Audit my ad account",
    metadata: {
      title: "Google Ads and PPC Agency Dubai | I Craft Ads",
      description:
        "Paid media, Google Ads and PPC campaign support built around tracking, testing, landing pages and lead quality."
    }
  },
  {
    slug: "social-media-marketing-dubai",
    href: "/services/social-media-marketing-dubai",
    eyebrow: "Social Media Marketing Dubai",
    title: "Social media marketing for Dubai brands that need consistency and commercial intent.",
    intro:
      "Social media should make the brand easier to recognise, trust and buy from. I Craft Ads supports strategy, content direction, platform management and campaign coordination.",
    context:
      "For hospitality, real estate, ecommerce and service businesses, social presence is often part of how buyers validate credibility. It needs a clear voice, useful content and a link back to business goals.",
    problems: [
      "The content calendar is busy but not commercially focused.",
      "Visual direction and message consistency change from post to post.",
      "Social activity is not connected to campaigns, website journeys or enquiry handling."
    ],
    deliverables: [
      "Social media strategy and content pillars.",
      "Content calendar and creative direction.",
      "Platform management recommendations.",
      "Campaign and paid amplification coordination.",
      "Performance review and next-step planning.",
      "Approved work library structure for future proof."
    ],
    method: [
      "Understand the brand, audience, offer and current social presence.",
      "Define content themes that support trust, education and conversion.",
      "Plan creative formats around platform behaviour and business priorities.",
      "Coordinate organic and paid activity where relevant.",
      "Review performance and adjust based on engagement quality and enquiries."
    ],
    proof: [
      "[OWNER MUST PROVIDE APPROVED SOCIAL MEDIA WORK]",
      "[OWNER MUST PROVIDE CLIENT PERMISSION]",
      "[OWNER MUST PROVIDE VERIFIED SOCIAL OR LEAD RESULT IF CLAIMED]"
    ],
    caseStudy: {
      title: "Social media proof slot awaiting approval",
      copy: "An approved social case study should show the brand context, content system, creative examples and measurable business relevance."
    },
    faqs: [
      {
        question: "Is social media only for awareness?",
        answer:
          "No. It can support awareness, trust, retargeting and enquiries, but the role should be defined before content is produced."
      },
      {
        question: "Can you manage paid social too?",
        answer:
          "Paid social can be coordinated when it supports the campaign plan, audience and landing-page journey."
      },
      {
        question: "Will you publish client posts as examples?",
        answer:
          "Only approved work should be shown, and client permission is required before public use."
      }
    ],
    related: [
      "/services/ppc-google-ads-dubai",
      "/services/web-design-development-dubai",
      "/services/lead-generation-marketing-automation-dubai"
    ],
    cta: "Plan my social media system",
    metadata: {
      title: "Social Media Agency Dubai | Strategy, Content and Paid Social | I Craft Ads",
      description:
        "Social media strategy, content planning, management and paid amplification for brands that need consistent market presence."
    }
  },
  {
    slug: "web-design-development-dubai",
    href: "/services/web-design-development-dubai",
    eyebrow: "Web Design and Development Dubai",
    title: "Web design and development for Dubai brands that need credibility and conversion.",
    intro:
      "A website should explain the business quickly, make the offer credible and guide visitors toward the right next step.",
    context:
      "For Dubai buyers comparing vendors, the website often becomes the first serious trust check. Page structure, speed, copy, proof and contact flow all affect whether a visitor takes action.",
    problems: [
      "The site looks presentable but does not explain the offer clearly.",
      "Important pages lack SEO structure, proof and conversion paths.",
      "Campaign traffic is sent to pages that are not built for enquiry quality."
    ],
    deliverables: [
      "Website planning and page architecture.",
      "UX and conversion-focused page structure.",
      "Landing pages for campaigns and services.",
      "WordPress or Shopify support where appropriate.",
      "SEO-ready metadata, headings and internal links.",
      "Performance and accessibility recommendations."
    ],
    method: [
      "Map the audience, offer, proof requirements and conversion path.",
      "Plan pages around search intent and business priority.",
      "Design sections for clarity, trust and action.",
      "Build or improve the page experience with performance in mind.",
      "Review analytics and enquiry quality after launch."
    ],
    proof: [
      "[OWNER MUST PROVIDE APPROVED WEBSITE SCREENSHOTS]",
      "[OWNER MUST PROVIDE PORTFOLIO ACCESS]",
      "[OWNER MUST PROVIDE PERFORMANCE RESULTS IF CLAIMED]"
    ],
    caseStudy: {
      title: "Website proof slot awaiting approval",
      copy: "A web case study should show the old problem, new structure, design/development scope, approved media and verified outcome."
    },
    faqs: [
      {
        question: "Can you build landing pages as well as full websites?",
        answer:
          "Yes. Landing pages are useful when a specific campaign, service or offer needs a focused conversion path."
      },
      {
        question: "Will pages be SEO-ready?",
        answer:
          "The page structure can include metadata, headings, internal links and crawlable HTML. Ongoing SEO work depends on the broader search plan."
      },
      {
        question: "Can you use real portfolio screenshots?",
        answer: "Only approved project media should be used publicly."
      }
    ],
    related: [
      "/services/seo-dubai",
      "/services/shopify-development-dubai",
      "/services/ppc-google-ads-dubai"
    ],
    cta: "Start a website brief",
    metadata: {
      title: "Web Design and Development Dubai | I Craft Ads",
      description:
        "Website design and development for credibility, speed, SEO structure and conversion-focused user journeys."
    }
  },
  {
    slug: "shopify-development-dubai",
    href: "/services/shopify-development-dubai",
    eyebrow: "Shopify Development Dubai",
    title: "Shopify development for UAE ecommerce brands ready to sell better.",
    intro:
      "Shopify growth depends on more than launching a store. Product pages, navigation, apps, checkout, analytics, automation and traffic channels shape the buying journey.",
    context:
      "Ecommerce founders need a store that is clear, measurable and ready for acquisition. The build should support merchandising, conversion, repeat purchase and campaign learning.",
    problems: [
      "The store is live but product discovery and conversion are weak.",
      "Apps, tracking and automation are added without a clear operating plan.",
      "Paid traffic or social content sends shoppers into a store that is not ready."
    ],
    deliverables: [
      "Shopify store setup and improvement planning.",
      "Navigation, collection and product-page recommendations.",
      "App and automation recommendations.",
      "Upsell, cross-sell and merchandising planning.",
      "Analytics and campaign readiness review.",
      "SEO and content structure recommendations for ecommerce pages."
    ],
    method: [
      "Review the product catalogue, audience, current store and traffic plan.",
      "Prioritise the store journeys that affect buying decisions.",
      "Improve storefront structure, product detail and conversion elements.",
      "Coordinate analytics, automation and campaign readiness.",
      "Use performance and customer behaviour to guide further improvements."
    ],
    proof: [
      "[OWNER MUST PROVIDE APPROVED SHOPIFY STORE EXAMPLES]",
      "[OWNER MUST PROVIDE SHOPIFY PARTNER PROOF IF CLAIMED]",
      "[OWNER MUST PROVIDE VERIFIED ECOMMERCE RESULT IF CLAIMED]"
    ],
    caseStudy: {
      title: "Shopify proof slot awaiting approval",
      copy: "A Shopify case study should include store context, approved screenshots, scope, merchandising changes and verified ecommerce outcome."
    },
    faqs: [
      {
        question: "Can you improve an existing Shopify store?",
        answer:
          "Yes. Existing stores can be reviewed for UX, product pages, apps, analytics, automation and campaign readiness."
      },
      {
        question: "Do you claim Shopify Partner status?",
        answer:
          "Only if the owner supplies proof. Until then, this site does not publish partner claims."
      },
      {
        question: "Can Shopify work connect with paid media?",
        answer:
          "Yes. Store structure, landing pages and product information strongly affect paid traffic quality and conversion."
      }
    ],
    related: [
      "/services/web-design-development-dubai",
      "/services/ppc-google-ads-dubai",
      "/services/seo-dubai"
    ],
    cta: "Discuss my Shopify store",
    metadata: {
      title: "Shopify Development Dubai | Ecommerce Store Support | I Craft Ads",
      description:
        "Shopify store setup, UX improvements, apps, automation and ecommerce support for brands selling direct in the UAE and beyond."
    }
  },
  {
    slug: "lead-generation-marketing-automation-dubai",
    href: "/services/lead-generation-marketing-automation-dubai",
    eyebrow: "Lead Generation and Automation Dubai",
    title: "Lead generation and automation systems for Dubai businesses.",
    intro:
      "Lead generation is not only about bringing in enquiries. The business also needs the right message, landing page, tracking and follow-up process.",
    context:
      "Professional services, real estate, hospitality and B2B teams often lose value after the form submission. A cleaner lead system connects campaigns, landing pages, CRM handoff and follow-up.",
    problems: [
      "Campaigns generate enquiries but follow-up is inconsistent.",
      "Forms and landing pages do not capture enough useful context.",
      "Email, WhatsApp or CRM workflows are not aligned with the sales process."
    ],
    deliverables: [
      "Lead-generation campaign planning.",
      "Landing-page and form recommendations.",
      "Email marketing automation planning.",
      "WhatsApp workflow planning where compliant and approved.",
      "Lead capture, routing and follow-up workflow structure.",
      "Reporting and lead quality review."
    ],
    method: [
      "Map the offer, buyer journey, channels and current lead handling.",
      "Define the minimum information required to qualify enquiries.",
      "Improve landing pages, forms and follow-up logic.",
      "Coordinate automation with the team’s real sales process.",
      "Review lead quality and adjust the system."
    ],
    proof: [
      "[OWNER MUST PROVIDE FORM DESTINATION]",
      "[OWNER MUST PROVIDE WHATSAPP / EMAIL COMPLIANCE REQUIREMENTS]",
      "[OWNER MUST PROVIDE VERIFIED LEAD RESULT IF CLAIMED]"
    ],
    caseStudy: {
      title: "Lead-generation proof slot awaiting approval",
      copy: "A lead-generation case study should show the funnel context, campaign path, form/workflow design and verified lead quality outcome."
    },
    faqs: [
      {
        question: "Can WhatsApp automation be used?",
        answer:
          "It can be planned where compliant, but the owner must provide the real WhatsApp destination and compliance requirements before launch."
      },
      {
        question: "What should a lead form capture?",
        answer:
          "Enough information to understand fit without making the form painful: service need, company, budget range, timeline and message."
      },
      {
        question: "How do you judge lead-generation quality?",
        answer:
          "Lead quality should be reviewed through source, offer, form context, sales feedback and verified business outcomes."
      }
    ],
    related: [
      "/services/ppc-google-ads-dubai",
      "/services/web-design-development-dubai",
      "/services/seo-dubai"
    ],
    cta: "Map my lead funnel",
    metadata: {
      title: "Lead Generation and Marketing Automation Dubai | I Craft Ads",
      description:
        "Lead-generation campaigns, email automation, WhatsApp workflows and follow-up systems for qualified enquiries."
    }
  }
] as const satisfies ReadonlyArray<ServicePageData>;

export function getServiceBySlug(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export function getServiceLabel(href: Route) {
  return servicePages.find((service) => service.href === href)?.eyebrow ?? "Related service";
}

export const serviceOptions = [
  { value: "seo", label: "SEO" },
  { value: "ppc-google-ads", label: "PPC and Google Ads" },
  { value: "social-media", label: "Social media marketing" },
  { value: "web-design-development", label: "Web design and development" },
  { value: "shopify-development", label: "Shopify development" },
  { value: "lead-generation-automation", label: "Lead generation and automation" },
  { value: "branding", label: "Branding" },
  { value: "not-sure", label: "Not sure yet" }
] as const;

export const insightArticles = [
  {
    slug: "how-to-choose-a-digital-marketing-agency-in-dubai",
    title: "How to choose a digital marketing agency in Dubai",
    category: "Agency selection",
    excerpt:
      "A practical checklist for comparing agencies without relying on unsupported awards, fake rankings or vague promises.",
    relatedService: "/services/lead-generation-marketing-automation-dubai" as Route
  },
  {
    slug: "seo-cost-dubai",
    title: "SEO cost in Dubai: what changes the scope",
    category: "SEO planning",
    excerpt:
      "The real drivers of SEO scope: technical condition, content depth, competition, local proof and reporting needs.",
    relatedService: "/services/seo-dubai" as Route
  },
  {
    slug: "shopify-development-cost-dubai",
    title: "Shopify development cost in Dubai: what to plan before you build",
    category: "Ecommerce",
    excerpt:
      "What changes Shopify build scope before design starts: catalogue structure, apps, checkout needs, automation and campaign readiness.",
    relatedService: "/services/shopify-development-dubai" as Route
  }
] as const;

export function getArticleBySlug(slug: string) {
  return insightArticles.find((article) => article.slug === slug);
}
