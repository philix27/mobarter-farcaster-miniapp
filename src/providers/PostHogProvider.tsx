import posthog from "posthog-js";
import { useEffect } from "react";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useFarcasterProfile } from "../features/profile/hook";

type OrderEvents = "create_order_successful"
type TopUpEvents = "top_up_airtime_failed" | "purchase_airtime" | "top_up_airtime_successful" | "purchase_data" | "purchase_electricity" | "top_up_airtime_initiated"
export type EventNames = OrderEvents | TopUpEvents | "visit_homepage" | "visit_faq_page" | "visit_about_page" | "open_app" | "install_app"

export const triggerEvent = (eventName: EventNames, properties?: Record<string, any>) => {
  if (!posthog || !eventName) return;
  posthog.capture(eventName, properties);

}


export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const profile = useFarcasterProfile()
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24',
      persistence: "memory",
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
          return
        }

        const user = profile.data?.user
        posthog.identify(user?.fid.toString(), {
          displayName: user?.displayName, // Optional: Include custom properties
          username: user?.username,
        })
        // Generate anonymous session ID without identifying
        const sessionId = posthog.get_distinct_id() || crypto.randomUUID();
        posthog.register({ session_id: sessionId });

        // Temporary distinct ID that will be aliased later
        if (!posthog.get_distinct_id()) {
          posthog.reset(true); // Ensure clean state
        }
      }
    })
  }, [profile.data?.user])

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
