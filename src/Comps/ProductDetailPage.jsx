import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./Pro_Details_Pages/StarRating";

const ProductDetailPage = () => {

  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const [lensType, setLensType] = useState("Single Vision");
  const [prescription, setPrescription] = useState({
    "Single Vision": {
      right: { spherical: "0.00", cylindrical: "0.00", axis: "0°" },
      left: { spherical: "0.00", cylindrical: "0.00", axis: "0°" },
    },
    Progressive: {
      right: { spherical: "0.00", cylindrical: "0.00", axis: "0°", near: "0.00" },
      left: { spherical: "0.00", cylindrical: "0.00", axis: "0°", near: "0.00" },
    },
    Bifocal: {
      right: { spherical: "0.00", cylindrical: "0.00", axis: "0°", near: "0.00", pd: "" },
      left: { spherical: "0.00", cylindrical: "0.00", axis: "0°", near: "0.00", pd: "" },
      singlePd: "",
    },
  });

  const [showPrescriptionReview, setShowPrescriptionReview] = useState(false);

  if (!product) {
    return <div className="p-6 text-center text-lg text-red-600">Product data not available 😢</div>;
  }

  const category = product.pro_category?.toLowerCase() || "";
  const isFrame = category.includes("frame");
  const isGoggles = category.includes("goggle");

  const option1 = isFrame ? "Only Frame" : isGoggles ? "Only Goggles" : "Product Only";
  const option2 = "With Power Glass";
  const [selectedOption, setSelectedOption] = useState(option1);

  // Dynamic value generators
  const generateRange = (start, end, step = 0.25) => {
    const values = [];
    for (let i = start; i <= end; i += step) {
      const val = i.toFixed(2);
      if (!values.includes(val)) values.push(val);
    }
    return values;
  };

  const generateDegrees = () => {
    const degrees = Array.from({ length: 181 }, (_, i) => `${i}°`);
    if (!degrees.includes("0°")) degrees.unshift("0°");
    return degrees;
  };

  const sphericalValues = generateRange(-20, 20);
  const cylindricalValues = generateRange(-10, 10);
  const axisValues = generateDegrees();
  const nearValues = generateRange(-10, 10);
  if (!nearValues.includes("0.00")) nearValues.push("0.00");

  // Ensure "0.00" is included
  if (!sphericalValues.includes("0.00")) sphericalValues.push("0.00");
  if (!cylindricalValues.includes("0.00")) cylindricalValues.push("0.00");

  const navigate = useNavigate();

  const handlePrescriptionChange = (lensType, eye, parameter, value) => {
    setPrescription((prev) => ({
      ...prev,
      [lensType]: {
        ...prev[lensType],
        [eye]: {
          ...prev[lensType][eye],
          [parameter]: value,
        },
      },
    }));
  };

  const handleSinglePdChange = (lensType, value) => {
    setPrescription((prev) => ({
      ...prev,
      [lensType]: {
        ...prev[lensType],
        singlePd: value,
      },
    }));
  };

  const handleAddToCartWithPrescription = () => {
    const productData = {
      id: product.pro_id,
      name: product.pro_name,
      price: product.pro_price,
      image: product.pro_image,
      prostyle: product.pro_style,
      category: product.pro_category,
      lensType: lensType,
      prescriptionDetails: prescription[lensType],
      uploadedPrescriptionFile: uploadedPrescription ? uploadedPrescription.name : null,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, productData];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");

    setUploadedPrescription(null);
  };

  const handleAddToCart = () => {
    const productData = {
      id: product.pro_id,
      name: product.pro_name,
      price: product.pro_price,
      image: product.pro_image,
      category: product.pro_category,
      prostyle: product.pro_style,
      lensType: selectedOption,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, productData];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleContinue = () => {
    setShowPrescriptionReview(true);
  };

  const [uploadedPrescription, setUploadedPrescription] = useState(null);

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedPrescription(file);
    }
  };

  const [selectedImage, setSelectedImage] = useState(product.pro_image);

  return (
    <div className="min-h-screen md:min-h-[90vh] p-2 sm:p-6" >
      {/* 🔷 Top Section - Details & Selection */}




      <div className="w-full mx-auto bg-white sm:rounded-2xl shadow-sm px-4 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        {/* Product Content Row */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 max-md:mt-12">

          {/* Left: Images */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-sm:justify-center">
              {product.pro_images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border object-cover cursor-pointer transition-all ${selectedImage === img ? "scale-95 border-indigo-500" : "border-gray-300"
                    }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border rounded-xl overflow-hidden bg-gray-50 flex justify-center items-center min-h-[250px] sm:min-h-[300px] max-h-[400px]">
              <img
                src={selectedImage}
                alt={product.pro_name}
                className="max-h-full max-w-full object-contain rounded-lg transition-all duration-300"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-1/2 space-y-5 sm:space-y-6">

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.pro_name}</h1>

            {/* Price + Main Price */}
            <div className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-bold text-indigo-700">₹{product.pro_price}</span>
              {product.pro_main_price && (
                <span className="text-base sm:text-lg text-gray-400 line-through">₹{product.pro_main_price}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.pro_rating || 4.6} />
              <span className="text-sm text-gray-500">{product.pro_rating || "4.6"} / 5</span>
            </div>

            {/* Description */}
            {product.pro_des && (
              <div className="mt-1 border-t pt-1">
                <h2 className="text-base font-semibold text-gray-800 mb-1">Product Description</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.pro_des}
                </p>
              </div>
            )}

            {/* Divider for visual break */}
            <div className="border-t" />

            {/* Product Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm sm:text-base text-gray-700">
              <div className="flex flex-col">
                <span className="text-gray-500">Material</span>
                <span className="font-medium">{product.pro_material}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Shape</span>
                <span className="font-medium">{product.pro_shape}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Brand</span>
                <span className="font-medium capitalize">{product.pro_brand}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom: Option + Button */}
        <div className="mt-6 pt-4 border-t">


          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-between flex-wrap">
            {/* Options (Stylish Toggle Buttons) */}
            <div className="flex flex-wrap gap-3">
              {[option1, option2].map((opt, index) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`px-4 py-2 rounded-full border text-sm sm:text-base font-medium transition-all duration-200
            ${isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Add to Cart Button */}
            <div className="w-full sm:w-auto">
              {selectedOption === option2 ? (
                <div className="py-2 px-4 text-center font-medium text-indigo-700 bg-indigo-100 rounded-lg text-sm sm:text-base">
                  Please select options below
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedOption}
                  className={`w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 ${selectedOption
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>



        </div>


      </div>



      {/* 🔻 Bottom Section - Only if Power Glass Selected */}

      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden mx-auto ${selectedOption === option2
          ? "w-full max-w-7xl md:h-[80vh] h-[90vh] opacity-100 mt-8 max-md:pt-2 sm:mt-10 px-2 sm:px-4"
          : "w-0 h-0 opacity-0 p-0"
          } bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col space-y-3 sm:space-y-4`}
      >
        {selectedOption === option2 && !showPrescriptionReview && (
          <div className="flex flex-col md:flex-row w-full h-full md:my-4 gap-4">
            {/* 🔵 Sidebar Options */}
            <div className="w-full md:w-1/3 bg-gray-100 md:mt-3 md:mb-3 rounded-xl p-4 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Lens Type</h3>
              {["Single Vision", "Progressive", "Bifocal"].map((type, i) => (
                <button
                  key={i}
                  onClick={() => setLensType(type)}
                  className={`w-full py-2 px-4 rounded-lg text-left font-medium transition-all ${lensType === type
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-indigo-100"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* 🔴 Content Area */}
            <div className="w-full md:w-2/3 bg-white rounded-xl border px-2 py-4 overflow-y-auto">
              {lensType === "Single Vision" && (
                <div>
                  <h4 className="text-lg font-bold mb-4 text-black">Single Vision</h4>
                  <div className="w-full">
                    <table className="w-full table-fixed border border-gray-300 rounded-xl text-sm shadow-md">
                      <thead>
                        <tr className="bg-indigo-100 text-black text-sm">
                          <th className="w-1/3 px-3 py-2 text-left font-semibold">Parameter</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Right Eye</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Left Eye</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[
                          { label: "Spherical", options: sphericalValues, param: "spherical" },
                          { label: "Cylindrical", options: cylindricalValues, param: "cylindrical" },
                          { label: "Axis", options: axisValues, param: "axis" },
                        ].map(({ label, options, param }) => (
                          <tr key={label} className="border-t hover:bg-gray-50 transition">
                            <td className="px-3 py-2 font-medium text-gray-800">{label}</td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription["Single Vision"].right[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Single Vision", "right", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription["Single Vision"].left[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Single Vision", "left", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow">
                      Continue
                    </button>
                  </div>
                </div>
              )}
              {lensType === "Progressive" && (
                <div>
                  <h4 className="text-lg font-bold mb-4 text-black">Progressive</h4>
                  <div className="w-full">
                    <table className="w-full table-fixed border border-gray-300 rounded-xl text-sm shadow-md">
                      <thead>
                        <tr className="bg-indigo-100 text-black text-sm">
                          <th className="w-1/3 px-3 py-2 text-left font-semibold">Parameter</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Right Eye</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Left Eye</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[
                          { label: "Spherical", options: sphericalValues, param: "spherical" },
                          { label: "Cylindrical", options: cylindricalValues, param: "cylindrical" },
                          { label: "Axis", options: axisValues, param: "axis" },
                          { label: "Near Value", options: nearValues, param: "near" },
                        ].map(({ label, options, param }) => (
                          <tr key={label} className="border-t hover:bg-gray-50 transition">
                            <td className="px-3 py-2 font-medium text-gray-800">{label}</td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription.Progressive.right[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Progressive", "right", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription.Progressive.left[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Progressive", "left", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow">
                      Continue
                    </button>
                  </div>
                </div>
              )}
              {lensType === "Bifocal" && (
                <div>
                  <h4 className="text-lg font-bold mb-4 text-black">Bifocal 👓</h4>
                  <div className="w-full">
                    <table className="w-full table-fixed border border-gray-300 rounded-xl text-sm shadow-md">
                      <thead>
                        <tr className="bg-indigo-100 text-black text-sm">
                          <th className="w-1/3 px-3 py-2 text-left font-semibold">Parameter</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Right Eye</th>
                          <th className="w-1/3 px-3 py-2 text-center font-semibold">Left Eye</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[
                          { label: "Spherical", options: sphericalValues, param: "spherical" },
                          { label: "Cylindrical", options: cylindricalValues, param: "cylindrical" },
                          { label: "Axis", options: axisValues, param: "axis" },
                          { label: "Near Value", options: nearValues, param: "near" },
                          { label: "Pupillary Distance", options: generateRange(17.5, 40, 0.5), param: "pd" },
                        ].map(({ label, options, param }) => (
                          <tr key={label} className="border-t hover:bg-gray-50 transition">
                            <td className="px-3 py-2 font-medium text-gray-800">{label}</td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription.Bifocal.right[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Bifocal", "right", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <select
                                className="w-full border border-gray-300 focus:border-indigo-500 rounded-md p-2 text-sm text-black text-center"
                                defaultValue={prescription.Bifocal.left[param]}
                                onChange={(e) =>
                                  handlePrescriptionChange("Bifocal", "left", param, e.target.value)
                                }
                              >
                                {options.map((value) => (
                                  <option key={value} value={value}>{value}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                        <tr className="border-t hover:bg-gray-50 transition">
                          <td className="px-3 py-2 font-medium text-black">Single PD</td>
                          <td className="px-3 py-2" colSpan={2}>
                            <select
                              className="w-full border border-indigo-400 focus:border-indigo-600 rounded-md p-2 text-sm text-indigo-900 bg-white shadow-sm"
                              defaultValue={prescription.Bifocal.singlePd}
                              onChange={(e) => handleSinglePdChange("Bifocal", e.target.value)}
                            >
                              <option value="">--</option>
                              {generateRange(35, 79, 1.0).map((value) => (
                                <option key={value} value={value}>{value}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow">
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedOption === option2 && showPrescriptionReview && (
          <div className="bg-gray-50 rounded-xl shadow-lg p-2 md:mt-2 sm:p-6 text-gray-900 overflow-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 overflow-auto text-center text-indigo-700">🩺 Review Your Prescription</h3>
            {/* Responsive Grid: Stacked on mobile, side-by-side on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side: Prescription details */}
              <div className="space-y-6  overflow-x-auto">
                {/* Single Vision */}
                {lensType === "Single Vision" && (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-indigo-600 mb-3">👁️ Single Vision</h4>
                      <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                        <thead className="bg-indigo-100 text-indigo-700">
                          <tr>
                            <th className="px-3 py-2 text-left">Eye</th>
                            <th className="px-3 py-2 text-left">Spherical</th>
                            <th className="px-3 py-2 text-left">Cylindrical</th>
                            <th className="px-3 py-2 text-left">Axis</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {["right", "left"].map((eye) => (
                            <tr key={eye} className="border-t">
                              <td className="px-3 py-2 font-medium capitalize">{eye}</td>
                              <td className="px-3 py-2">{prescription["Single Vision"][eye].spherical}</td>
                              <td className="px-3 py-2">{prescription["Single Vision"][eye].cylindrical}</td>
                              <td className="px-3 py-2">{prescription["Single Vision"][eye].axis}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4">
                      <h4 className="font-semibold text-indigo-600 mb-2">👁️ Single Vision</h4>
                      {["right", "left"].map((eye) => (
                        <div key={eye} className="border p-3 rounded-lg shadow-sm">
                          <p className="text-sm font-medium text-indigo-500 mb-1">{eye === "right" ? "Right Eye" : "Left Eye"}</p>
                          <p><strong>Spherical:</strong> {prescription["Single Vision"][eye].spherical}</p>
                          <p><strong>Cylindrical:</strong> {prescription["Single Vision"][eye].cylindrical}</p>
                          <p><strong>Axis:</strong> {prescription["Single Vision"][eye].axis}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Progressive */}
                {lensType === "Progressive" && (
                  <>
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-indigo-600 mb-3">👁️ Progressive</h4>
                      <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                        <thead className="bg-indigo-100 text-indigo-700">
                          <tr>
                            <th className="px-3 py-2 text-left">Eye</th>
                            <th className="px-3 py-2 text-left">Spherical</th>
                            <th className="px-3 py-2 text-left">Cylindrical</th>
                            <th className="px-3 py-2 text-left">Axis</th>
                            <th className="px-3 py-2 text-left">Near</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {["right", "left"].map((eye) => (
                            <tr key={eye} className="border-t">
                              <td className="px-3 py-2 font-medium capitalize">{eye}</td>
                              <td className="px-3 py-2">{prescription.Progressive[eye].spherical}</td>
                              <td className="px-3 py-2">{prescription.Progressive[eye].cylindrical}</td>
                              <td className="px-3 py-2">{prescription.Progressive[eye].axis}</td>
                              <td className="px-3 py-2">{prescription.Progressive[eye].near}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="block md:hidden space-y-4">
                      <h4 className="font-semibold text-indigo-600 mb-2">👁️ Progressive</h4>
                      {["right", "left"].map((eye) => (
                        <div key={eye} className="border p-3 rounded-lg shadow-sm">
                          <p className="text-sm font-medium text-indigo-500 mb-1">{eye === "right" ? "Right Eye" : "Left Eye"}</p>
                          <p><strong>Spherical:</strong> {prescription.Progressive[eye].spherical}</p>
                          <p><strong>Cylindrical:</strong> {prescription.Progressive[eye].cylindrical}</p>
                          <p><strong>Axis:</strong> {prescription.Progressive[eye].axis}</p>
                          <p><strong>Near:</strong> {prescription.Progressive[eye].near}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Bifocal */}
                {lensType === "Bifocal" && (
                  <>
                    <div className="hidden md:block">
                      <h4 className="font-semibold text-indigo-600 mb-3">👁️ Bifocal</h4>
                      <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                        <thead className="bg-indigo-100 text-indigo-700">
                          <tr>
                            <th className="px-3 py-2 text-left">Eye</th>
                            <th className="px-3 py-2 text-left">Spherical</th>
                            <th className="px-3 py-2 text-left">Cylindrical</th>
                            <th className="px-3 py-2 text-left">Axis</th>
                            <th className="px-3 py-2 text-left">Near</th>
                            <th className="px-3 py-2 text-left">PD</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {["right", "left"].map((eye) => (
                            <tr key={eye} className="border-t">
                              <td className="px-3 py-2 font-medium capitalize">{eye}</td>
                              <td className="px-3 py-2">{prescription.Bifocal[eye].spherical}</td>
                              <td className="px-3 py-2">{prescription.Bifocal[eye].cylindrical}</td>
                              <td className="px-3 py-2">{prescription.Bifocal[eye].axis}</td>
                              <td className="px-3 py-2">{prescription.Bifocal[eye].near}</td>
                              <td className="px-3 py-2">{prescription.Bifocal[eye].pd}</td>
                            </tr>
                          ))}
                          {prescription.Bifocal.singlePd && (
                            <tr className="border-t bg-gray-50">
                              <td className="px-3 py-2 font-medium text-indigo-600" colSpan={2}>Single PD</td>
                              <td className="px-3 py-2" colSpan={4}>{prescription.Bifocal.singlePd}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="block md:hidden space-y-4">
                      <h4 className="font-semibold text-indigo-600 mb-2">👁️ Bifocal</h4>
                      {["right", "left"].map((eye) => (
                        <div key={eye} className="border p-3 rounded-lg shadow-sm">
                          <p className="text-sm font-medium text-indigo-500 mb-1">{eye === "right" ? "Right Eye" : "Left Eye"}</p>
                          <p><strong>Spherical:</strong> {prescription.Bifocal[eye].spherical}</p>
                          <p><strong>Cylindrical:</strong> {prescription.Bifocal[eye].cylindrical}</p>
                          <p><strong>Axis:</strong> {prescription.Bifocal[eye].axis}</p>
                          <p><strong>Near:</strong> {prescription.Bifocal[eye].near}</p>
                          <p><strong>PD:</strong> {prescription.Bifocal[eye].pd}</p>
                        </div>
                      ))}
                      {prescription.Bifocal.singlePd && (
                        <div className="border p-3 rounded-lg shadow-sm bg-gray-50">
                          <p className="text-sm font-medium text-indigo-500 mb-1">Single PD</p>
                          <p>{prescription.Bifocal.singlePd}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

              </div>

              {/* Right side: Upload file */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-800">Upload Doctor's Prescription (PDF or Photo required)</label>
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={handlePrescriptionUpload}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm text-sm p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                />
                {uploadedPrescription && (
                  <p className="text-sm text-green-700">📎 File selected: {uploadedPrescription.name}</p>
                )}
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4">
              <button
                onClick={() => setShowPrescriptionReview(false)}
                className="text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                ✏️ Edit Prescription
              </button>
              <button
                onClick={handleAddToCartWithPrescription}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetailPage;