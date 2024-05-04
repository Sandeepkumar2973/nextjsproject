"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header
  className={`fixed left-0 top-0 z-99999 w-full py-7 ${
    stickyMenu
      ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
      : ""
  }`}
>
  <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
    <div className="flex w-full items-center justify-between">
      {/* Logo on the left */}
      <a href="/" className="flex items-center">
        <Image
          src="/images/logo/Aspirations-Logo-for-website.png"
          alt="logo"
          width={150}
          height={50}
          className="hidden w-full dark:block"
        />
        <Image
          src="/images/logo/Aspirations-Logo-for-website.png"
          alt="logo"
          width={150}
          height={50}
          className="w-full dark:hidden"
        />
      </a>

      {/* Hamburger Toggle BTN */}
      <button
        aria-label="hamburger Toggler"
        className="block xl:hidden"
        onClick={() => setNavigationOpen(!navigationOpen)}
      >
        {/* Hamburger icon code */}
      </button>
      {/* Hamburger Toggle BTN */}

      <div
        className={`invisible w-full xl:visible xl:flex xl:h-auto xl:w-full ${
          navigationOpen &&
          "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
        }`}
      >
        <nav className="ml-auto">
          <ul className="flex flex-col gap-5 xl:flex-row xl:items-right xl:gap-10">
            {menuData.map((menuItem, key) => (
              <li key={key} className={menuItem.submenu && "group relative"}>
                {menuItem.submenu ? (
                  <>
                    <button
                      onClick={() => setDropdownToggler(!dropdownToggler)}
                      className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                    >
                      {menuItem.title}
                      <span>
                        <svg
                          className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          {/* Dropdown icon SVG code */}
                        </svg>
                      </span>
                    </button>

                    <ul className={`dropdown ${dropdownToggler ? "flex" : ""}`}>
                      {menuItem.submenu.map((item, key) => (
                        <li key={key} className="hover:text-primary">
                          <Link href={item.path || "#"}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={`${menuItem.path}`}
                    style={{ textAlign: "right" }}
                    className={
                      pathUrl === menuItem.path
                        ? "text-primary hover:text-primary"
                        : "hover:text-primary"
                    }
                  >
                    {menuItem.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Navigation list on the right */}
    </div>
  </div>
</header>

  );
};

// w-full delay-300

export default Header;
