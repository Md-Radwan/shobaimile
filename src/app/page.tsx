import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import UpcomingDrives from "@/components/UpcomingDrives";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <UpcomingDrives/>
      <GallerySection/>
      <NewsletterSection/>
    </>
  );
}
