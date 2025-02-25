import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowToPlay";
import Game from "@/components/game/GameSection";
import LeaderBoard from "@/components/LeaderBoard";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <HowItWorks />

      <ErrorBoundary>
        <Game />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

