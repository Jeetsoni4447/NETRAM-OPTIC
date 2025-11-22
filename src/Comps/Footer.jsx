import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Netram Optic</h2>
          <p className="text-sm">
            Your trusted source for stylish eyewear. We bring vision and fashion together.
          </p><br />
          <ul>
            Optical store online<li />

            Fiber Optical<li />

            Optical Nerve<li />

            Premium optical frames<li />

            Optical accessories<li />

            Contact lenses online<li />

            Lightweight & durable frames<li />

            Scratch-resistant lenses<li />
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/returnpolicy" className="hover:underline">Return Policy</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/termsandconditions" className="hover:underline">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/frames" className="hover:underline">Frames</a></li>
            <li><a href="/goggles" className="hover:underline">Goggles</a></li>
            <li><a href="/contact-lenses" className="hover:underline">Contact Lenses</a></li>
            <li><a href="/reading-glasses" className="hover:underline">Reading Glasses</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">Email: netramforever@gmail.com</p>
          <p className="text-sm mb-4">Phone: +91 98983 92525</p>
          <div className="flex space-x-4 text-lg">
            <a href="https://www.facebook.com/netramopticjunagadh/" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/netram_optic_junagadh/" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
            <a href="https://in.pinterest.com/netramforever/" className="hover:text-red-700"><i className="fab fa-pinterest"></i></a>
            <a href="www.youtube.com/@netramopticals9287" className="hover:text-red-600"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4 text-center">Visit Our Store</h3>
        <div className="w-full h-64 md:h-96">
          <iframe
            title="Netram Optic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1227.7165436982089!2d70.45337754823557!3d21.521923555108614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395801f33828d723%3A0x4823899cbaa03bff!2sNetram%20Optic%2C%20eye%20glasses%2C%20contactlens%2C%20goggles%2C%20optical%20frame%20bluecut%20lens%2C%20essilor%2CZeiss%2Ccrizal%20uv%2Cbest%20opticians%20Junagadh!5e1!3m2!1sen!2sin!4v1749725424418!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-7 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} Netram Optic. All rights reserved.
      </div>
      <div className="text-center mt-4">
        Developed By <a href="tel:+91 9904803601" className="transition duration-500 hover:text-blue-900 font-semibold text-center">Codecrafter</a>
      </div>

    </footer>
  );
};

export default Footer;
