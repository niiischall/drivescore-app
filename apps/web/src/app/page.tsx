import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans'>
      <main className='flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center'>
        <h1 className='sr-only'>DriveScore</h1>
        <Image
          src='/drivescore-lockup-light.svg'
          alt='DriveScore'
          width={308}
          height={97}
          priority
          unoptimized
        />
      </main>
    </div>
  );
}
