import type { Router } from "express";
import {
  blogArticleSchema,
  caseStudySchema,
  redirectSchema,
  seoEntrySchema,
  serviceSchema,
  siteSettingsSchema,
  teamMemberSchema,
  testimonialSchema
} from "@icraftads/validation";
import { BlogArticle } from "../models/blog-article.js";
import { CaseStudy } from "../models/case-study.js";
import { Redirect } from "../models/redirect.js";
import { SeoEntry } from "../models/seo-entry.js";
import { Service } from "../models/service.js";
import { SiteSetting } from "../models/site-setting.js";
import { TeamMember } from "../models/team-member.js";
import { Testimonial } from "../models/testimonial.js";
import { createCmsRouter, createPublicCmsRouter } from "./cms.js";

export function registerPublicRoutes(router: Router) {
  router.use("/services", createPublicCmsRouter(Service));
  router.use("/case-studies", createPublicCmsRouter(CaseStudy));
  router.use("/articles", createPublicCmsRouter(BlogArticle));
  router.use("/testimonials", createPublicCmsRouter(Testimonial));
  router.use("/team", createPublicCmsRouter(TeamMember));
}

export function registerAdminCmsRoutes(router: Router) {
  router.use(
    "/services",
    createCmsRouter({
      model: Service,
      schema: serviceSchema,
      slugged: true,
      sanitizeFields: ["bodyHtml"]
    })
  );
  router.use(
    "/case-studies",
    createCmsRouter({
      model: CaseStudy,
      schema: caseStudySchema,
      slugged: true,
      sanitizeFields: ["bodyHtml"]
    })
  );
  router.use(
    "/articles",
    createCmsRouter({
      model: BlogArticle,
      schema: blogArticleSchema,
      slugged: true,
      sanitizeFields: ["bodyHtml"]
    })
  );
  router.use("/testimonials", createCmsRouter({ model: Testimonial, schema: testimonialSchema }));
  router.use(
    "/team",
    createCmsRouter({
      model: TeamMember,
      schema: teamMemberSchema,
      slugged: true,
      sanitizeFields: ["bioHtml"]
    })
  );
  router.use(
    "/settings",
    createCmsRouter({ model: SiteSetting, schema: siteSettingsSchema, slugged: false })
  );
  router.use("/seo", createCmsRouter({ model: SeoEntry, schema: seoEntrySchema }));
  router.use("/redirects", createCmsRouter({ model: Redirect, schema: redirectSchema }));
}
