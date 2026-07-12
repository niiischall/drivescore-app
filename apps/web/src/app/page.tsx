export default function Home() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center'>
        <h1 className='text-5xl font-semibold tracking-tight text-black dark:text-zinc-50'>
          DriveScore 🚗
        </h1>
        <p className='max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
          Know what it&apos;s really like to own a car before you buy it.
        </p>
        <p className='text-sm text-zinc-400 dark:text-zinc-500'>
          🚧 Under active development
        </p>
      </main>
    </div>
  );
}
