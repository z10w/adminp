import { logger } from "@/lib/logger";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function enqueueEmail(payload: EmailPayload) {
  logger.info("Queued email", payload);
}
