"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./profile.css";

import { getUser } from "@/Redux/slices/userSlice";

import { PUBLIC_NAVIGATION } from "@/constants";

const Profile = () => {
  const router = useRouter();
  const user = useSelector(getUser);

  useEffect(() => {
    if (!user?.email && !user.token) {
      router.push(PUBLIC_NAVIGATION.LOGIN);
    }
  }, [router, user?.email, user.token]);

  return (
    <section className="profile-card">
      {/* Placeholder avatar */}
      <div className="profile-avatar">
        <Image
          src="/admin.jpg"
          alt="User Avatar"
          width={110}
          height={110}
          style={{
            borderRadius: "50%",
            border: "4px solid #bfa35b",
            backgroundColor: "#131b2f",
          }}
        />
      </div>

      {/* User Details */}
      <h2 className="profile-name">{user.email}</h2>
      <p>Status: {user.isStaff ? "Staff Member" : "Customer"}</p>

      <div className="profile-permissions">
        {user.permissions.length > 0 ? (
          user.permissions.map((perm) => (
            <div key={perm}>
              {perm
                .toLowerCase()
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
          ))
        ) : (
          <p>No special permissions.</p>
        )}
      </div>
    </section>
  );
};

export default Profile;
