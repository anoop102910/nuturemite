"use client";
import Image from "next/image";
import SearchInput from "../../filters/search";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/authprovider";
import { formatString } from "@/lib/utils";
import DashboardDrawer from "@/components/drawers/DashboardDrawer";
import Link from "next/link";

function Navbar({ sidebarItems }) {
  const { user } = useAuthContext();
  const activePath =
    usePathname()?.split("/")[2]?.charAt(0)?.toUpperCase() +
    usePathname()?.split("/")[2]?.slice(1);

  return (
    <>
      <header className="sticky top-0 z-[5] w-full gap-4 h-16 flex items-center px-6 justify-between bg-white">
        <div className="md:hidden">
          <DashboardDrawer sidebarItems={sidebarItems} />
        </div>
        <h2 className="text-xl uppercase font-medium">
          {activePath || "Dashboard"}
        </h2>
        <SearchInput className={"md:w-full bg-slate-50"} />
        <Link
          href={"/account"}
          className="max-sm:hidden flex gap-10 justify-between items-center   px-2 py-1 "
        >
          <div className="flex  items-center gap-4">
            <Image
              width={48}
              height={48}
              src="/avatar.png"
              className=" rounded-full"
              alt="profile image"
            />
            <div className="flex flex-col max-sm:hidden ">
              <span className="text-sm">{user.name || "Admin Test"}</span>
              <span className="text-xs text-slate-600">
                {formatString(user.role || "Admin")}
              </span>
            </div>
          </div>
        </Link>
      </header>
    </>
  );
}

export default Navbar;
