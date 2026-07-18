import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-surface font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center gap-6 px-16 py-32 text-center">
        <h1 className="sr-only">DriveScore</h1>
        <Image
          src="/icon.svg"
          alt="DriveScore"
          width={128}
          height={128}
          priority
          unoptimized
        />
        <p className="max-w-md text-lg leading-7 font-normal text-text-secondary [text-wrap:balance]">
          Know what it&apos;s really like to own a car before you buy it.
        </p>
      </main>
    </div>
  );
}
