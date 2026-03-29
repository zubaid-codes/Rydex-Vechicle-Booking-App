import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PublicHome from "@/components/PublicHome";
import Image from "next/image";

export default function Home() {
  return (
   <div className="w-full min-h-screen bg-white">
    <p className="bg-blue-500"></p>
    <Navbar/>
    <PublicHome/>
    <Footer/>
   </div>
  );
}
