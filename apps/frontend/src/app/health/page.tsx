export default function HealthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Healthy</h1>
        <p className="text-gray-600">All services are running normally</p>
        <p className="text-sm text-gray-500 mt-4">
          Timestamp: {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}