import React from 'react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>

            <div className="space-y-7 text-lg leading-relaxed">
                <section>
                    <ul className="list-disc list-outside space-y-2">
                        <li>We are a modern optic store dedicated to offering the perfect blend of style and vision.</li>

                        <li>Our goal is to provide every customer with a premium eyewear experience.</li>

                        <li>We offer a wide range of high-quality spectacles, sunglasses, and contact lenses.</li>

                        <li>Our collection features the latest trends and exclusive international brands.</li>

                        <li>Your eye health is our top priority, which is why we provide expert eye-testing services.</li>

                        <li>Our store is equipped with advanced technology and professional optometrists.</li>

                        <li>We help you find the perfect frame and lenses that suit your look and comfort.</li>

                        <li>Our team guides you with care, understanding your needs and preferences.</li>

                        <li>We are committed to quality, service, and complete customer satisfaction.</li>

                        <li>Our mission is to make your vision clearer, healthier, and more stylish.</li>

                        <li>Your trusted source for stylish eyewear. We bring vision and fashion together.</li>
                    </ul>
                </section>
                <section>
                    <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
                    <p>
                        Have questions or concerns? Reach out any time:<br />
                        <span className="block mt-1">Email: privacy@netram.com</span>
                        <span>Phone: +91 98765 43210</span>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
