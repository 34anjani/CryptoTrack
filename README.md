 💲 # CryptoTrack – Real Time Cryptocurrency Tracker
 
 ## 📌 Overview
**CryptoTrack** is a **full-stack web application** that displays **real-time prices** of the **top 100 cryptocurrencies in INR, EUR, and USD** with auto-refresh option every **30** seconds. Users can set custom **price alerts** with browser notifications, visualize **7-day price history** through interactive line charts, and download **CSV files** for offline analysis. The app features secure **user authentication** for managing personal alerts, and supports multi-currency switching in a single click. Built with **React.js** on the frontend, **Node.js and Express.js** on the backend, and **MongoDB** for storing user data and alert configurations.
 
---
  
## 🚀 Features
  
* **💰 Real Time Prices** - View the latest prices of the top 100 cryptocurrencies in INR, EUR, and USD.
* **🔔 Price Alerts** - Set custom alerts for any coin. Receives browser notifications when a coin reaches the selected target price.
* **📊 Interactive Charts** - Visualize 7-day price history of individual coins using dynamic line charts.
* **🗂️ Offline Data** - Download CSV files of real-time prices or historical chart data for offline analysis.
* **🔐 User Authentication** - Sign up, log in securely, and manage personal alerts.
* **🔄 Auto-Refresh** - Coin data refreshes every 30 seconds for accurate tracking.
* **🌐 Multi-Currency Support** - Switch between INR, USD, and EUR in a single click with pagination to browse all 100 coins.

---
## 🛠️ Tech Stack
  
* **Frontend**: React.js, Chart.js, Toastify
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (with Mongoose)  
  
---
  
## 📈 Use Cases
  
* **🧑‍💻 Crypto Enthusiasts & Traders** - Stay up-to-date with real-time cryptocurrency prices and set personalized alerts to make timely investment decisions.
* **📊 Market Analysts** - Analyze price trends using interactive charts and download CSV data for deeper offline analysis and reporting.
* **🔔 Long-Term Investors** - Set target price alerts for your portfolio coins and get notified when buying or selling opportunities arise.
* **🌍 International Users** - View crypto values in your preferred currency (INR, EUR, or USD) for localized financial tracking and conversions.
* **🗂️ Finance Bloggers & Educators** - Use accurate market data and historical price charts to explain trends, make predictions, or share insights with an audience.
* **🧪 Developers & Data Scientists** - Use the exported data to test trading algorithms or analyze historical coin movements in academic or hobby projects.
* **🔐 Registered Users** - Create a secure account to manage personal alert settings and access a personalized coin-tracking experience.
  
---

## 🚀 How to Run
  
  1. Clone the repository
     ```bash
     git clone https://github.com/34anjani/CryptoTrack.git
     cd CryptoTrack
     ```
  
  2. Install frontend dependencies
     ```bash
     cd pro
     npm install
      ```
  
  3. Install backend dependencies
     ```bash
     cd ../server
     npm install
     ```
  
   4. Set up MongoDB
   * Download and install MongoDB from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   * Start the MongoDB server
       ```bash
       mongod
       ```
   * Or use MongoDB Atlas (cloud) and update the connection string in the server config
  
  5. Start the backend server
     ```bash
     cd server
     node index.js
     ```
  
  6. Start the frontend
      ```bash
     cd ../pro
     npm start
      ```
  
  7. Open in browser
  
     http://localhost:3000
