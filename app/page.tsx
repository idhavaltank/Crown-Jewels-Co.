// HomePage.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

import "./layout.css"; // Using CSS module

import { PRIVATE_NAVIGATION } from "@/constants";

const Home = () => (
  <>
    <section className="hero-section">
      <Image
        src="/royal-hero.jpg"
        alt="Royal Jewelry Collection"
        className="hero-bg"
        width={1200}
        height={650}
      />
      <div className="hero-content">
        <h1>Embrace Royal Elegance</h1>
        <p>Unveiling Timeless Luxury for the Modern Sovereign.</p>
        <Link className="cta-gold" href={PRIVATE_NAVIGATION.PRODUCT.VIEW}>
          Shop Now
        </Link>
      </div>
      {/* Optional glitter overlay for effect */}
      <div className="gold-glitter"></div>
    </section>

    <section className="brand-legacy">
      <div className="legacy-img">
        <Image
          src="/artisan.jpg"
          alt="Artisan at work"
          width={600}
          height={360}
        />
      </div>
      <div className="legacy-text">
        <h2>Crafted Through Generations</h2>
        <p>
          For over 3 decades, our artisans have transformed precious metals and
          stones into stories you can wear. Discover the rich heritage behind
          each masterpiece.
        </p>
        <Link className="cta-link" href={PRIVATE_NAVIGATION.HOME.VIEW}>
          About Our Story
        </Link>
      </div>
    </section>

    <section className="royal-collections">
      <h2>The Royal Collection</h2>
      <div className="carousel">
        <Image
          src="/collection1.jpg"
          alt="Crown Ruby Necklace"
          width={300}
          height={170}
        />
        <Image
          src="/product2.jpg"
          alt="Regal Diamond Set"
          width={300}
          height={170}
        />
        <Image
          src="/collection2.jpg"
          alt="Emerald Tiara"
          width={300}
          height={170}
        />
      </div>
      <div className="collection-desc">
        <p>
          Browse our finest: inspired by regalia worn by queens & emperors.
          <br />
          <strong>Crown Ruby Necklace</strong> &ndash; Inspired by Maharani
          traditions.
        </p>
      </div>
    </section>

    <section className="signature-pieces">
      <h2>Upcomoing Signature Pieces</h2>
      <div className="product-grid">
        {/* Example product cards, map your DB/products here */}
        <div className="product-card">
          <Image
            src="/product1.jpg"
            alt="Majestic Sapphire Ring"
            width={280}
            height={220}
          />
          <div className="product-info">
            <h3>Majestic Sapphire Ring</h3>
            <span className="product-price">₹ 54,999</span>
            <p>An opulent centerpiece worthy of royalty.</p>
            <span className="prod-details">Book In Advance</span>
          </div>
        </div>
        <div className="product-card">
          <Image
            src="/collection3.jpg"
            alt="Imperial Emerald Necklace"
            width={280}
            height={220}
          />
          <div className="product-info">
            <h3>Imperial Emerald Necklace</h3>
            <span className="product-price">₹ 1,25,000</span>
            <p>Breathtaking emerald clusters, a sovereign&apos;s favorite.</p>
            <span className="prod-details">Book In Advance</span>
          </div>
        </div>
        {/* Add more products as needed */}
      </div>
    </section>

    <section className="why-choose-us">
      <h2>Excellence You Can Trust</h2>
      <div className="icons-row">
        <div>
          <span role="img" aria-label="Ethically Sourced">
            🌿
          </span>
          <p>Ethically Sourced</p>
        </div>
        <div>
          <span role="img" aria-label="Lifetime Warranty">
            🛡️
          </span>
          <p>Lifetime Warranty</p>
        </div>
        <div>
          <span role="img" aria-label="Luxury Packaging">
            🎁
          </span>
          <p>Luxury Packaging</p>
        </div>
        <div>
          <span role="img" aria-label="Engraving">
            ✒️
          </span>
          <p>Custom Engraving</p>
        </div>
        <div>
          <span role="img" aria-label="Express Shipping">
            🚚
          </span>
          <p>Express Shipping</p>
        </div>
      </div>
    </section>

    <section className="royal-moments">
      <h2>Royal Moments</h2>
      <div className="testimonial-carousel">
        <div className="testimonial-card">
          <Image
            src="/customer1.jpg"
            alt="Customer in Jewelry"
            width={720}
            height={490}
          />
          <blockquote>
            “Felt like a queen on my anniversary. From the moment I opened the
            exquisite box, I was captivated by the artistry and brilliance of
            Crown Jewels Co.. The intricate design and flawless stones took my
            breath away, and every glance reminds me of my family’s royal
            heritage. I wore the Imperial Emerald Necklace at a grand gala in
            Jaipur and received endless admiration for its elegance. Owning a
            piece from Crown Jewels Co. is truly like wearing history. I highly
            recommend their craftsmanship to anyone seeking timeless beauty”
            <footer>&mdash; Lady Isabella St. James, London</footer>
          </blockquote>
        </div>
        {/* Add more testimonials as needed */}
      </div>
      {/* Optionally add Instagram embed or more customer spotlight */}
    </section>

    <section className="newsletter-cta">
      <div className="newsletter-box">
        <h2>Wear Your Legacy</h2>
        <p>Get exclusive offers & previews of new arrivals.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Join Royal Circle</button>
        </form>
      </div>
    </section>
  </>
);

export default Home;
