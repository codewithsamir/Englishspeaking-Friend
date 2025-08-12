import React from "react";

const PlanPage = () => {
  // Pricing details
  const pricePerMinute = 0.10; // 0.10 dollars per minute (10 cents per minute)

  // Plans in hours
  const plans = [
    { hours: 1 },
    { hours: 5 },
    { hours: 10 },
    { hours: 20 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">
          Choose Your Subscription Plan
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(({ hours }) => {
            const price = (hours * 60 * pricePerMinute).toFixed(2);
            return (
              <div
                key={hours}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2">{hours} Hour{hours > 1 ? "s" : ""}</h2>
                <p className="text-lg font-bold text-indigo-600">${price}</p>
                <p className="text-sm text-gray-500 mt-1">Per subscription</p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-gray-600">
          * You will be charged $0.10 per minute of usage.
        </p>
      </div>
    </div>
  );
};

export default PlanPage;
