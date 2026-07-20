import IntroAnimation from "@/components/intro-animation";

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3efe9] px-6 text-center text-[#1c1a17]">
        <p className="max-w-md text-sm tracking-wide">
          Homepage content goes here — hero, nav, etc.
        </p>
      </main>
    </>
  );
}
