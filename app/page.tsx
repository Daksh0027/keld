import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Archives from "@/components/Archives";
import LoadDistrict from "@/components/LoadDistrict";
import SurfaceWorks from "@/components/SurfaceWorks";
import ProvingGround from "@/components/ProvingGround";
import TransmissionOffice from "@/components/TransmissionOffice";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="max-w-[900px] mx-auto px-6 md:px-12 pt-20 md:pt-16">
        <Hero />
        <div className="space-y-24">
          <Archives />
          <LoadDistrict />
          <SurfaceWorks />
          <ProvingGround />
          <TransmissionOffice />
        </div>
      </main>
      <Footer />
    </>
  );
}
