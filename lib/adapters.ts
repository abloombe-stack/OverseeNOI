export const Slack = {
  notify: async (channel: string, message: string) => {
    console.log("[Slack mock] ->", { channel, message });
    return { ok: true };
  }
};

export const Email = {
  sendWelcome: async (to: string) => {
    console.log("[Email mock] welcome ->", to);
    return { id: "welcome_123" };
  },
  sendCancellation: async (to: string) => {
    console.log("[Email mock] cancellation ->", to);
    return { id: "cancel_123" };
  }
};

export const Billing = {
  createCheckout: async (plan: string) => {
    console.log("[Stripe mock] checkout ->", plan);
    return { url: "/#mock-checkout" };
  },
  managePortal: async () => {
    console.log("[Stripe mock] portal");
    return { url: "/#mock-portal" };
  }
};