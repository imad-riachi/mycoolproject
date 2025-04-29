export default function DashboardPage() {
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='space-y-12'>
        {/* Welcome Section */}
        <div className='max-w-3xl space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Welcome to Your SAAS Dashboard
          </h1>
          <p className='text-muted-foreground text-lg'>
            Get started with building your SAAS application.
          </p>
        </div>
      </div>
    </div>
  );
}
