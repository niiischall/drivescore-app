"use client";

import { useMutation } from "@tanstack/react-query";
import { track } from "@/lib/analytics";
import { joinWaitlist } from "@/lib/waitlist-api";

export function useJoinWaitlist() {
  return useMutation({
    mutationFn: (email: string) => joinWaitlist(email),
    onSuccess: (_data, email) => {
      track("waitlist_joined", {
        email_domain: email.split("@")[1] || undefined,
      });
    },
    onError: (error) => {
      track("waitlist_submit_failed", {
        error: error instanceof Error ? error.message : "unknown",
      });
    },
  });
}
