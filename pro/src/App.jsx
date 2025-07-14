import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CryptoCard from "./components/CryptoCard";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const currencySymbols = {
  usd: "$",
  inr: "₹",
  eur: "€",
};

const App = () => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [alertCoins, setAlertCoins] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 8;
  const navigate = useNavigate();

  // Check login on load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token"); // optional if you store token
    navigate("/");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchCryptoData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: currency,
            per_page: 100,
            page: 1,
          },
        }
      );
      setCoins(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, [fetchCryptoData]);

  const handlePriceAlert = (coinId, price) => {
    setAlertCoins((prev) => ({
      ...prev,
      [coinId]: parseFloat(price),
    }));
  };

  useEffect(() => {
    coins.forEach((coin) => {
      const target = alertCoins[coin.id];
      if (target && coin.current_price >= target) {
        alert(
          `📢 Alert: ${coin.name} hit ${currencySymbols[currency]}${coin.current_price}`
        );
        toast.success(
          `${coin.name} hit ${currencySymbols[currency]}${coin.current_price} (Target: ${currencySymbols[currency]}${target})`
        );
        setAlertCoins((prev) => {
          const updated = { ...prev };
          delete updated[coin.id];
          return updated;
        });
      }
    });
  }, [coins, alertCoins, currency]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
    {/* Fixed logout button */}
    <div className="logout-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>

    {/* Rest of your content */}
    <div className="header">
      <h1>📈 Crypto Track</h1>
    </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="eur">EUR</option>
        </select>
      </div>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {currentCoins.length === 0 ? (
            <p>No coins found for your search.</p>
          ) : (
            <div className="crypto-container">
              {currentCoins.map((coin) => (
                <CryptoCard
                  key={coin.id}
                  coin={coin}
                  currency={currency}
                  currencySymbols={currencySymbols}
                  handlePriceAlert={handlePriceAlert}
                  existingTarget={alertCoins[coin.id] || ""}
                />
              ))}
            </div>
          )}
        </>
      )}

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default App;
