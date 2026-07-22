import "dotenv/config";
import { parseApiEnv } from "@icraftads/config";
import { connectMongo } from "./lib/mongo.js";
import { Service } from "./models/service.js";
import { Testimonial } from "./models/testimonial.js";

const env = parseApiEnv(process.env);

const verifiedServices = [
  {
    title: "SEO",
    slug: "seo-dubai",
    excerpt:
      "Technical, on-page and content-led search work for brands that want more qualified organic visibility.",
    bodyHtml:
      "<p>Verified existing service category from icraftads.com. Final Dubai/UAE details require owner approval.</p>",
    order: 1,
    seo: {
      title: "SEO Agency Dubai | I Craft Ads",
      description:
        "SEO strategy, technical SEO, content planning and local search support for businesses that want more qualified organic visibility.",
      noindex: false
    },
    proofStatus: "Verified service category. [OWNER MUST PROVIDE VERIFIED SEO RESULT]",
    state: "draft"
  },
  {
    title: "PPC and Google Ads",
    slug: "ppc-google-ads-dubai",
    excerpt:
      "Paid media and Google Ads support connected to campaign structure, tracking and reporting.",
    bodyHtml:
      "<p>Verified existing PPC and Google Ads service categories from icraftads.com. Performance claims require proof.</p>",
    order: 2,
    seo: {
      title: "Google Ads and PPC Agency Dubai | I Craft Ads",
      description:
        "Paid media, Google Ads and PPC campaign support built around tracking, testing, landing pages and lead quality.",
      noindex: false
    },
    proofStatus: "Verified service category. [OWNER MUST PROVIDE VERIFIED PPC RESULT]",
    state: "draft"
  },
  {
    title: "Shopify Development",
    slug: "shopify-development-dubai",
    excerpt: "Shopify store setup, UX improvements, apps, automation and ecommerce support.",
    bodyHtml:
      "<p>Verified existing Shopify service category from icraftads.com. Store examples and results require owner approval.</p>",
    order: 3,
    seo: {
      title: "Shopify Development Dubai | I Craft Ads",
      description:
        "Shopify store setup, UX improvements, apps, automation and ecommerce support for brands selling direct.",
      noindex: false
    },
    proofStatus: "Verified service category. [OWNER MUST PROVIDE SHOPIFY CASE STUDY]",
    state: "draft"
  }
];

const permissionPendingTestimonials = [
  {
    quote:
      "Existing testimonial references website and social media marketing support. Final wording requires owner and client approval.",
    name: "Veena Muddap",
    role: "Founder & Managing Partner",
    permissionStatus: "[OWNER MUST PROVIDE TESTIMONIAL PERMISSION]",
    state: "draft"
  },
  {
    quote:
      "Existing testimonial references a Shopify ecommerce build. Traffic and revenue claims require verification before publishing.",
    name: "Jabuca Dakor",
    role: "eCommerce Business Owner",
    permissionStatus: "[OWNER MUST PROVIDE TESTIMONIAL PERMISSION AND VERIFIED RESULT]",
    state: "draft"
  }
];

async function seed() {
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required for seeding.");
  }

  await connectMongo(env.MONGODB_URI);

  for (const service of verifiedServices) {
    await Service.updateOne({ slug: service.slug }, { $setOnInsert: service }, { upsert: true });
  }

  for (const testimonial of permissionPendingTestimonials) {
    await Testimonial.updateOne(
      { name: testimonial.name },
      { $setOnInsert: testimonial },
      { upsert: true }
    );
  }

  console.log("Seed data inserted as drafts with incomplete proof labels.");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
