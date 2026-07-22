"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cloneElement, isValidElement, useId, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import type { FieldErrors } from "react-hook-form";
import { useForm } from "react-hook-form";
import { contactInquirySchema, type ContactInquiryInput } from "@icraftads/validation";
import { serviceOptions } from "@/lib/inner-pages";
import { trackEvent } from "@/lib/analytics";

const budgets = [
  "Under AED 5,000",
  "AED 5,000 - AED 15,000",
  "AED 15,000 - AED 40,000",
  "AED 40,000+",
  "Not sure yet"
] as const;

const timelines = [
  "Immediately",
  "This month",
  "1-3 months",
  "3+ months",
  "Planning stage"
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const hasStarted = useRef(false);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      requiredServices: [],
      consent: false as unknown as true
    }
  });

  async function onSubmit(values: ContactInquiryInput) {
    setStatus("idle");
    const searchParams = new URLSearchParams(window.location.search);
    const payload: ContactInquiryInput = {
      ...values,
      serviceInterest: values.requiredServices[0],
      landingPage: window.location.href,
      referrer: document.referrer || undefined,
      utm: {
        source: searchParams.get("utm_source") ?? undefined,
        medium: searchParams.get("utm_medium") ?? undefined,
        campaign: searchParams.get("utm_campaign") ?? undefined,
        content: searchParams.get("utm_content") ?? undefined
      }
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });

      if (!response.ok) throw new Error("Inquiry submission failed.");

      trackEvent("contact_form_submit", {
        form_id: "contact_inquiry",
        service_interest: values.requiredServices[0]
      });
      setStatus("success");
      reset({ requiredServices: [], consent: false as unknown as true });
    } catch {
      trackEvent("form_error", {
        error_type: "api",
        form_id: "contact_inquiry"
      });
      setStatus("error");
    }
  }

  function onInvalid(formErrors: FieldErrors<ContactInquiryInput>) {
    trackEvent("form_error", {
      error_fields: Object.keys(formErrors).join(","),
      error_type: "validation",
      form_id: "contact_inquiry"
    });
  }

  function onFormStart() {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("contact_form_start", { form_id: "contact_inquiry" });
  }

  return (
    <form
      className="contact-form"
      onFocusCapture={onFormStart}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
    >
      <div className="form-grid">
        <Field label="Name" error={errors.name?.message}>
          <input autoComplete="name" {...register("name")} />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input autoComplete="email" inputMode="email" {...register("email")} />
        </Field>
        <Field label="Phone with country code" error={errors.phone?.message}>
          <input autoComplete="tel" inputMode="tel" placeholder="+971..." {...register("phone")} />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input autoComplete="organization" {...register("company")} />
        </Field>
        <Field label="Website" error={errors.website?.message}>
          <input
            autoComplete="url"
            inputMode="url"
            placeholder="https://example.com"
            {...register("website")}
          />
        </Field>
        <Field label="Approximate budget" error={errors.approximateBudget?.message}>
          <select {...register("approximateBudget")}>
            <option value="">Choose a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <select {...register("timeline")}>
            <option value="">Choose a timeline</option>
            {timelines.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="checkbox-panel">
        <legend>Required services</legend>
        {serviceOptions.map((service) => (
          <label key={service.value}>
            <input type="checkbox" value={service.value} {...register("requiredServices")} />
            <span>{service.label}</span>
          </label>
        ))}
        {errors.requiredServices?.message ? (
          <p className="field-error">{errors.requiredServices.message}</p>
        ) : null}
      </fieldset>

      <Field label="Message" error={errors.message?.message}>
        <textarea rows={7} {...register("message")} />
      </Field>

      <label className="consent-row">
        <input type="checkbox" {...register("consent")} />
        <span>
          I agree that I Craft Ads may contact me about this inquiry. See the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>
      {errors.consent?.message ? <p className="field-error">{errors.consent.message}</p> : null}

      <button className="button-link form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending inquiry" : "Send inquiry"}
      </button>

      {status === "success" ? (
        <p className="form-status success" role="status">
          Thank you. Your inquiry has been received.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-status error" role="alert">
          The inquiry could not be sent from this environment. [OWNER MUST PROVIDE FORM DESTINATION]
        </p>
      ) : null}
    </form>
  );
}

function Field({
  children,
  error,
  label
}: {
  children: ReactNode;
  error: string | undefined;
  label: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-describedby": error ? errorId : undefined,
        "aria-invalid": Boolean(error),
        id
      })
    : children;

  return (
    <label className="field">
      <span>{label}</span>
      {control}
      {error ? (
        <small className="field-error" id={errorId} role="alert">
          {error}
        </small>
      ) : null}
    </label>
  );
}
