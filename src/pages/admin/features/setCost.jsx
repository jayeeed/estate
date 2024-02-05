import React, { useState } from 'react';

const AirbnbAdminComponent = () => {
  const [propertyCost, setPropertyCost] = useState(0);
  const [subscriptionActivated, setSubscriptionActivated] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handlePropertyCostChange = (event) => {
    setPropertyCost(Number(event.target.value));
  };

  const handleSubscriptionToggle = () => {
    setSubscriptionActivated((prevValue) => !prevValue);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFeatureToggle = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((selectedFeature) => selectedFeature !== feature)
      );
    } else {
      setSelectedFeatures((prevFeatures) => [...prevFeatures, feature]);
    }
  };

  // Simulating fetching and displaying results based on filters
  const filteredResults = () => {
    // In a real application, you would fetch results from a backend or Airbnb's APIs.
    console.log('Fetching results with filters:');
    console.log('Region:', selectedRegion);
    console.log('Currency:', selectedCurrency);
    console.log('Property Cost:', propertyCost);
    console.log('Subscription Activated:', subscriptionActivated);
    console.log('Selected Features:', selectedFeatures);
    // Implement logic to fetch and display results dynamically.
  };

  // Call filteredResults whenever any filter changes
  React.useEffect(() => {
    filteredResults();
  }, [selectedRegion, selectedCurrency, propertyCost, subscriptionActivated, selectedFeatures]);

  return (
    <div>
      <div className="sidebar">
        <h2>Filter Sidebar</h2>
        <div>
          <label htmlFor="region">Region:</label>
          <select id="region" value={selectedRegion} onChange={handleRegionChange}>
            <option value="All">All</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            {/* Add other regions as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            {/* Add other currencies as needed */}
          </select>
        </div>
        <div>
          <h3>Features:</h3>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Wi-Fi')}
              onChange={() => handleFeatureToggle('Wi-Fi')}
            />
            Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedFeatures.includes('Parking')}
              onChange={() => handleFeatureToggle('Parking')}
            />
            Parking
          </label>
          {/* Add other feature checkboxes as needed */}
        </div>
      </div>
      <div className="main-content">
        <h1>Airbnb Admin Panel</h1>
        <div>
          <label htmlFor="propertyCost">Host Cost per Property:</label>
          <input
            type="number"
            id="propertyCost"
            value={propertyCost}
            onChange={handlePropertyCostChange}
          />
        </div>
        <div>
          <label>Subscription:</label>
          <input
            type="checkbox"
            checked={subscriptionActivated}
            onChange={handleSubscriptionToggle}
          />
          <span>{subscriptionActivated ? 'Activated' : 'Deactivated'}</span>
        </div>
      </div>
    </div>
  );
};

export default AirbnbAdminComponent;
