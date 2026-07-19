"use client";

import { useMutation } from "@tanstack/react-query";
import posthog from "posthog-js";
import { joinWaitlist } from "@/lib/waitlist-api";

export function useJoinWaitlist() {
  return useMutation({
    mutationFn: (email: string) => joinWaitlist(email),
    onSuccess: (_data, email) => {
      if (typeof posthog?.capture === "function") {
        posthog.capture("waitlist_joined", {
          email_domain: email.split("@")[1],
        });
      }
    },
  });
}
