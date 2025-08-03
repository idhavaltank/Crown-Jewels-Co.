"use client";

// 1. React core libraries
import React, { useEffect, useState } from "react";

// 2. Next.js and Redux imports
import Link from "next/link";
import { useSelector } from "react-redux";

// 3. Contexts
import { useAuth } from "@/contexts/AuthContext";

// 4. Icons components
import CartIcon from "../Icons/CartIcon";
import LoginIcon from "../Icons/LogInIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import ProfileIcon from "../Icons/ProfileIcon";

// 5. Redux selectors
import { getUser } from "@/Redux/slices/userSlice";
import { getCartItems } from "@/Redux/slices/cartSlice";

// 6. Constants
import { PRIVATE_NAVIGATION, PUBLIC_NAVIGATION } from "@/constants";

const Header = () => {
  // 2. Variables / state

  // Auth context to access logout and login state
  const { logout, isLoggedIn } = useAuth();

  // Select user info from Redux store
  const userInfo = useSelector(getUser);

  // Select cart items from Redux store
  const cart = useSelector(getCartItems);

  // Local state to track if component is mounted (to avoid hydration mismatch)
  const [isMounted, setIsMounted] = useState(false);

  // 3. useEffect - mark component as mounted after first render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine if user is logged in only after mounting to avoid SSR/client mismatch
  const loggedIn = isMounted && isLoggedIn && !!userInfo?.token;

  // Calculate total item quantity in cart, defaulting to 0 if not mounted
  const totalCartItems = isMounted
    ? cart?.items?.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // 4. Functions

  // Logout handler prevents default link behavior and calls logout from context
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  // 5. JSX return
  return (
    <header className="header flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      {/* Logo linking to Home */}
      <div className="logo text-xl font-bold text-primary cursor-pointer">
        <Link href={PRIVATE_NAVIGATION.HOME.VIEW}>Crown Jewels Co.</Link>
      </div>

      {/* Main navigation links */}
      <nav className="flex space-x-6">
        <Link href={PRIVATE_NAVIGATION.HOME.VIEW} className="navLink">
          Home
        </Link>
        <Link href={PRIVATE_NAVIGATION.PRODUCT.VIEW} className="navLink">
          Products
        </Link>
      </nav>

      {/* Icon group for Cart, Profile/Login/Logout */}
      <div className="iconGroup flex items-center space-x-5">
        {/* Cart icon with badge showing total item count */}
        <Link
          href={PRIVATE_NAVIGATION.CART.VIEW}
          className="icon relative"
          aria-label={`View cart (${totalCartItems || 0} items)`}
        >
          <CartIcon />
          {/* Show badge only if mounted and cart has items */}
          {isMounted && totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
              {totalCartItems}
            </span>
          )}
        </Link>

        {/* Conditionally render profile and logout if logged in, otherwise login link */}
        {loggedIn ? (
          <>
            {/* Profile link */}
            <Link
              href={PRIVATE_NAVIGATION.PROFILE.VIEW}
              className="icon"
              aria-label="View profile"
            >
              <ProfileIcon />
            </Link>

            {/* Logout button */}
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
          // Login link if not logged in
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
