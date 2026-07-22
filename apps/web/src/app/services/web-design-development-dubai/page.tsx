import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import { getServiceBySlug } from "@/lib/inner-pages";
import { createPageMetadata } from "@/lib/seo";

const service = getServiceBySlug("web-design-development-dubai");

export const metadata = service
  ? createPageMetadata({
      title: String(service.metadata.title),
      description: String(service.metadata.description),
      path: service.href
    })
  : {};

export default function WebDesignDevelopmentDubaiPage() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}
