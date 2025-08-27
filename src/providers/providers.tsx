
import { useCallback, useEffect, useState } from "react";
import posthog from "posthog-js";
import { FrameContext } from "@farcaster/frame-node";
import sdk, { AddFrame } from "@farcaster/frame-sdk";
import { PostHogProvider } from "./PostHogProvider";
import WagmiiProvider from "./WagmiProvider";


export function WagmiPosthog({
  // session,
  children,
}: {
  // session: Session | null;
  children: React.ReactNode;
}) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }
      console.log(addFrameResult);
      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const frameContext = await sdk.context;
        if (!frameContext) {
          return;
        }

        setContext(frameContext as unknown as FrameContext);
        setIsSDKLoaded(true);
      } catch (error) {
        console.error('Failed to load frame context:', error);
      }
    };

    if (sdk && !isSDKLoaded) {
      const initializeSDK = async () => {
        try {
          await load();
          await sdk.actions.ready();
        } catch (error) {
          console.error('Failed to initialize SDK:', error);
        }
      };

      void initializeSDK();

      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame]);

  // Separate effect to handle frame adding after context is loaded
  useEffect(() => {
    if (context && !context?.client?.added) {
      void addFrame();
    }
  }, [context, addFrame]);

  useEffect(() => {
    if (!context?.user?.fid || !posthog?.isFeatureEnabled) return;

    const fidId = `fc_${context?.user?.fid}`;
    const currentId = posthog.get_distinct_id();

    // Skip if already identified with this FID
    if (currentId === fidId) return;

    // Create alias from session ID → FID
    posthog.alias(fidId, currentId);

    // Identify future events with FID
    posthog.identify(fidId, {
      farcaster_username: context.user?.username,
      farcaster_display_name: context.user?.displayName,
      farcaster_fid: context.user?.fid,
    });
  }, [context?.user]); // Only runs when FID changes

  return (
    <WagmiiProvider>
      <PostHogProvider>
        {children}
      </PostHogProvider>
    </WagmiiProvider>
  );
}
