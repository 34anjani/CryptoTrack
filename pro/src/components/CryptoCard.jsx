import { useState, useEffect } from "react";
import CoinChart from "./CoinChart"; // Import CoinChart component
import "./CryptoCard.css";

const CryptoCard = ({
  coin,
  currency,
  currencySymbols,
  handlePriceAlert,
  existingTarget,
}) => {
  const [inputPrice, setInputPrice] = useState(existingTarget);
  const [showChart, setShowChart] = useState(false); // State to toggle chart visibility

  useEffect(() => {
    setInputPrice(existingTarget);
  }, [existingTarget]);

  const format = (value) =>
    typeof value === "number" ? value.toLocaleString() : "N/A";

  const submitAlert = () => {
    if (!isNaN(inputPrice) && parseFloat(inputPrice) > 0) {
      handlePriceAlert(coin.id, inputPrice);
      alert(`🔔 Alert set for ${coin.name} at ${currencySymbols[currency]}${inputPrice}`);
    } else {
      alert("⚠️ Please enter a valid number.");
    }
  };

  return (
    <div className="crypto-card">
      <img src={coin.image} alt={coin.name} />
      <h3>{coin.name}</h3>
      <p>({coin.symbol.toUpperCase()})</p>
      <p>
        Price: {currencySymbols[currency]} {format(coin.current_price)}
      </p>
      <p>
        Market Cap: {currencySymbols[currency]} {format(coin.market_cap)}
      </p>
      <p>
        24h Volume: {currencySymbols[currency]} {format(coin.total_volume)}
      </p>
      
      <input
        type="number"
        placeholder="Set target price"
        value={inputPrice}
        onChange={(e) => setInputPrice(e.target.value)}
      />
      
      {/* Set Alert Button */}
      <button onClick={submitAlert}>Set Alert</button>
      
      {/* Add gap between buttons */}
      <button className="show-chart-btn" onClick={() => setShowChart(!showChart)}>
        {showChart ? "Hide Chart" : "Show Chart"}
      </button>

      {/* Conditionally render CoinChart */}
      {showChart && <CoinChart coinId={coin.id} currency={currency} />}
    </div>
  );
};

export default CryptoCard;