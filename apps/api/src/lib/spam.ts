import type { ContactInquiryInput } from "@icraftads/validation";

export async function evaluateSpam(input: ContactInquiryInput) {
  return {
    tokenPresent: Boolean(input.spamToken),
    verdict: "unchecked" as const
  };
}
