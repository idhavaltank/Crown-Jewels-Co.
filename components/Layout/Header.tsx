"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useAuth } from "@/contexts/AuthContext";

import CartIcon from "../Icons/CartIcon";
import LoginIcon from "../Icons/LogInIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import ProfileIcon from "../Icons/ProfileIcon";

import { getUser } from "@/Redux/slices/userSlice";
import { getCartItems } from "@/Redux/slices/cartSlice";

import { PRIVATE_NAVIGATION, PUBLIC_NAVIGATION } from "@/constants";
import { useEffect, useState } from "react";

const Header = () => {
  const { logout, isLoggedIn } = useAuth();
  const userInfo = useSelector(getUser);
  const cart = useSelector(getCartItems);

  const [isMounted, setIsMounted] = useState(false);

  // Mark component as “mounted” on client after first mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loggedIn = isMounted && isLoggedIn && !!userInfo?.token;

  const totalCartItems = isMounted
    ? cart?.items?.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="header flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="logo text-xl font-bold text-primary cursor-pointer">
        <Link href={PRIVATE_NAVIGATION.HOME.VIEW}>Crown Jewels Co.</Link>
      </div>

      <nav className="flex space-x-6">
        <Link href={PRIVATE_NAVIGATION.HOME.VIEW} className="navLink">
          Home
        </Link>
        <Link href={PRIVATE_NAVIGATION.PRODUCT.VIEW} className="navLink">
          Products
        </Link>
      </nav>

      <div className="iconGroup flex items-center space-x-5">
        <Link
          href={PRIVATE_NAVIGATION.CART.VIEW}
          className="icon relative"
          aria-label={`View cart (${totalCartItems || 0} items)`}
        >
          <CartIcon />
          {isMounted && totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {totalCartItems}
            </span>
          )}
        </Link>

        {loggedIn ? (
          <>
            <Link
              href={PRIVATE_NAVIGATION.PROFILE.VIEW}
              className="icon"
              aria-label="View profile"
            >
              <ProfileIcon />
            </Link>

            <button
              onClick={handleLogout}
              className="icon bg-transparent border-none cursor-pointer"
              aria-label="Logout"
              title="Logout"
              type="button"
            >
              <LogoutIcon />
            </button>
          </>
        ) : (
          <Link
            href={PUBLIC_NAVIGATION.LOGIN}
            className="icon"
            aria-label="Login to your account"
          >
            <LoginIcon />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
