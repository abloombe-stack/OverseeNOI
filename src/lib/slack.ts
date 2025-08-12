export async function postToSlack(text: string) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID;
  
  if (!token || !channel) {
    console.log("[SLACK:DEV]", text);
    return; // no-op in preview
  }
  
  try {
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ channel, text })
    });
  } catch (error) {
    console.error("Slack post failed:", error);
  }
}