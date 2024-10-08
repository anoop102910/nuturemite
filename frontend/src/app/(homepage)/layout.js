import NavBar from "@/components/shared/home/Navbar";
import Footer from "@/components/shared/home/Footer";

export default function HomeLayout({ children }) {
  return (
    <div className="bg-gray-100 text-slate-900">
      <NavBar />
      <div>
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
