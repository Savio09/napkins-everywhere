"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/about-us", label: "about us" },
    { href: "/magazines", label: "magazine" },
    { href: "/events", label: "events" },
    { href: "/contact", label: "contact" },
  ];

  return (
    // Main sticky header container
    <div className="sticky top-0 py-3 z-50 bg-white shadow-md">
      <div className="flex justify-between h-[8vh] min-h-[60px] w-[90vw] items-center mx-auto">
        <div className="logo">
          <Link href="/">
            <Image
              src="/napkins_logo.png"
              width={70}
              height={70}
              alt="napkins-logo"
              style={{
                objectFit: "contain",
                height: "100px",
                width: "auto",
              }}
            />
          </Link>
        </div>
        <nav className="nav-links hidden md:flex">
          <ul className="flex gap-x-6 lg:gap-x-10 uppercase font-bold text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMobileMenuOpen ? (
              // X Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="
            md:hidden
            absolute top-full left-0 w-full 
            bg-white shadow-lg 
            border-t border-gray-200 
            z-40 
          "
        >
          <ul className="flex flex-col items-center gap-y-4 py-6 uppercase font-bold text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
