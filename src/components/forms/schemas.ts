import { z } from "zod";

type T = (key: string) => string;

const phoneRe = /^[+()\d\s.-]{8,20}$/;

/** Shared identity block used by every form. */
export function contactFields(t: T) {
  return {
    firstName: z.string().trim().min(1, t("errors.required")),
    lastName: z.string().trim().min(1, t("errors.required")),
    email: z.email(t("errors.email")),
    phone: z.string().trim().regex(phoneRe, t("errors.phone")).or(z.literal("")),
    consent: z.literal(true, t("errors.consent")),
  };
}

export function contactSchema(t: T) {
  return z.object({
    ...contactFields(t),
    subject: z.string().min(1, t("errors.required")),
    message: z.string().trim().min(20, t("errors.min")),
  });
}

export function visitSchema(t: T) {
  return z.object({
    ...contactFields(t),
    phone: z.string().trim().regex(phoneRe, t("errors.phone")),
    slot: z.string().min(1, t("errors.required")),
    withArchitect: z.boolean().optional(),
    message: z.string().optional(),
  });
}
