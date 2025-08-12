import Header from "@/components/Header";

export default function About() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">About OverseeNOI</h1>
        <p>
          OverseeNOI unifies asset & property management: channel-based comms,
          tasking, rent-roll intelligence, competitor pricing, and "Binoculars"
          activity coaching — designed by an asset manager for asset managers.
        </p>
        <p>
          Founder background: institutional asset management and operations leadership.
          This build includes Slack-style task threads, rent-roll anomaly triage,
          and mocked notifications/billing to demonstrate end-to-end flows.
        </p>
      </main>
    </>
  );
}