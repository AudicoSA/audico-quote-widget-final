import React, { useEffect, useState } from "react";

// Example essential products for demo
const ESSENTIAL_PRODUCTS = ["Controller", "Main Sensor"];

function App() {
  const [quoteItems, setQuoteItems] = useState([
    { name: "Controller", essential: true },
    { name: "Speaker", essential: false },
  ]);
  const [alert, setAlert] = useState(null);

  // Load Botpress Webchat
  useEffect(() => {
    // Inject Botpress scripts
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://files.bpcontent.cloud/2025/04/21/13/20250421130646-QYOS5YIX.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  // Simulate adding item from Botpress
  const addItem = (item) => {
    setQuoteItems((prev) => [...prev, item]);
  };

  // Handle delete
  const deleteItem = (index) => {
    const item = quoteItems[index];
    setQuoteItems((prev) => prev.filter((_, i) => i !== index));
    if (item.essential) {
      setAlert(
        `You removed "${item.name}", which is essential. Would you like a suggestion for a replacement?`
      );
      // Here, you could trigger a Botpress event via webchat API
    }
  };

  // Actions
  const addToCart = () => {
    // Integrate with OpenCart API or redirect with quote data
    alert("Add to cart functionality goes here.");
  };
  const printQuote = () => window.print();
  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Quote",
        text: "Check out this quote!",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };
  const downloadPDF = () => {
    // For demo, just print. For real PDF, use jsPDF or similar.
    window.print();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-100">
      {/* Chat Section */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col bg-gray-200">
        <div className="flex-1 flex flex-col justify-end p-4 overflow-y-auto">
          <div id="botpress-webchat" className="w-full h-full" />
        </div>
      </div>
      {/* Quote Box Section */}
      <div className="md:w-1/2 w-full h-1/2 md:h-full flex flex-col bg-white shadow-lg">
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4">Your Quote</h2>
          {/* Alert */}
          {alert && (
            <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 rounded flex justify-between items-center">
              <span>{alert}</span>
              <button
                className="ml-4 text-sm text-blue-600"
                onClick={() => setAlert(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          {/* Quote Items */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {quoteItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-50 p-3 rounded"
              >
                <span>
                  {item.name}
                  {item.essential && (
                    <span className="ml-2 text-xs text-red-500">(Essential)</span>
                  )}
                </span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteItem(idx)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {/* Quote Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={printQuote}
            >
              Print
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={shareQuote}
            >
              Share
            </button>
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              onClick={downloadPDF}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;