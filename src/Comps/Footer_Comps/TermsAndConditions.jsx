import React, { useState } from 'react';

const TermsAndConditions = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this to backend/email service
    alert('Your message has been sent. We’ll get back to you soon!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        {/* --- LEGAL SECTIONS --- */}
        {[
          {
            title: '1. Introduction',
            content:
              'Welcome to Netram. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.',
          },
          {
            title: '2. Use of Our Website',
            content:
              'You agree to use our website only for lawful purposes. You must not use our website in any way that breaches any applicable laws or regulations, or is fraudulent or harmful.',
          },
          {
            title: '3. Intellectual Property',
            content:
              'All content on this site, including images, logos, text, and software, is the property of Netram or its content suppliers and is protected by intellectual property laws. Unauthorized use is strictly prohibited.',
          },
          {
            title: '4. Orders and Payments',
            content:
              'By placing an order, you agree to provide accurate and complete information. All payments are subject to validation and authorization by your payment provider.',
          },
          {
            title: '5. Shipping and Returns',
            content:
              'Shipping times may vary. We aim to process and dispatch orders promptly. Return policies are detailed on our Returns page and are subject to our discretion.',
          },
          {
            title: '6. Limitation of Liability',
            content:
              'Netram shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services.',
          },
          {
            title: '7. Privacy Policy',
            content:
              'Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your personal information.',
          },
          {
            title: '8. Changes to Terms',
            content:
              'We reserve the right to update these Terms at any time. Continued use of our services after changes are posted means you accept the updated Terms.',
          },
        ].map((section, index) => (
          <section key={index}>
            <h2 className="font-semibold text-lg mb-2">{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}

        {/* --- Contact Section --- */}
        <section>
          <h2 className="font-semibold text-lg mb-2">9. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these Terms, reach out to us:
            <br />
            <span className="block mt-1">Email: support@netram.com</span>
            <span>Phone: +91 98765 43210</span>
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <div>
              <label className="block mb-1 text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-3 py-2 rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 py-2 rounded hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
