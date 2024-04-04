"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="max-sm:hidden lg:w-[264px] sticky top-0 left-0 h-screen w-fit bg-dark-1 flex flex-col justify-between p-6 pt-28 text-white">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link, i) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={i}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-1": isActive
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
