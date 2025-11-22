import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-700 pb-2">Return Policy</h1>
        
        <p>
          At <span className="font-semibold">Netram Optic</span>, we take pride in offering quality products with careful packaging and prompt shipping. 
          However, <span className="font-bold text-red-400">we currently do not accept returns or exchanges</span> for any items once sold.
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold underline underline-offset-4">Please Note:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All sales are <span className="font-bold text-red-400">final</span>.</li>
            <li>No refunds, returns, or exchanges under any circumstances.</li>
            <li>
              In rare cases of damaged or incorrect items, contact us within <span className="font-bold">48 hours</span> of delivery with photos at: 
              <span className="text-blue-400"> netramforever@gmail.com</span>.
            </li>
          </ul>
        </div>

        <p>
          We encourage you to double-check your order details and reach out with any questions before placing your order.
        </p>

        <p className="italic text-gray-400">Thank you for shopping with us and for understanding our policy.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
