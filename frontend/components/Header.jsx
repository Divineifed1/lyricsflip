
"use client";

import { useEffect, useState } from "react";
import LockBodyScroll from "./LockBodyScroll";
import { WalletModal } from "./WalletModal";
import Navbar from "./Navbar";
import { useUIStore } from "@/store/uiStore";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { connectModalIsOpen, mobileMenuOpen } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      <LockBodyScroll lock={connectModalIsOpen || mobileMenuOpen} />
      {isMounted && connectModalIsOpen && <WalletModal />}
      
      <div className="fixed w-full z-50">
        <header className="bg-[#040311] w-full flex justify-between items-center p-4">
          <Navbar />
          <ThemeToggleButton /> {/* ✅ Theme Toggle Button is always visible */}
        </header>
      </div>
    </div>
  );
};

export default Header;

