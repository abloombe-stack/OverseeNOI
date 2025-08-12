import './globals.css';

export const metadata = {
  title: 'OverseeNOI',
  description: 'Slack-style task management for real estate NOI optimization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}