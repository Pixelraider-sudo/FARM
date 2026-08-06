/* =========================================================
   AgriSense — Market Data (ES6 Module)
   MOCK DATA — not a live price feed. Replace with a real
   market-data API integration when a backend is available.
   Each entry has a 12-point trend series for the mini chart.
========================================================= */

export const MARKET_DATA = [
  {
    "crop": "Maize",
    "unit": "per 90kg bag",
    "currentPrice": 40.2,
    "changePercent": -12.6,
    "trend": [
      46.0,
      43.4,
      42.4,
      41.1,
      42.5,
      43.7,
      46.2,
      43.9,
      43.7,
      41.2,
      39.9,
      40.2
    ],
    "countyPrices": {
      "Nairobi": 40.8,
      "Nakuru": 42.7,
      "Kisumu": 47.8,
      "Eldoret": 46.6,
      "Mombasa": 43.0,
      "Meru": 47.1
    },
    "demand": "High"
  },
  {
    "crop": "Beans",
    "unit": "per kg",
    "currentPrice": 98.8,
    "changePercent": -20.7,
    "trend": [
      124.6,
      119.7,
      119.1,
      116.3,
      112.6,
      117.0,
      111.5,
      110.3,
      108.9,
      107.2,
      104.5,
      98.8
    ],
    "countyPrices": {
      "Nairobi": 121.8,
      "Nakuru": 111.7,
      "Kisumu": 135.7,
      "Eldoret": 110.4,
      "Mombasa": 116.8,
      "Meru": 126.9
    },
    "demand": "Moderate"
  },
  {
    "crop": "Tomatoes",
    "unit": "per kg",
    "currentPrice": 48.2,
    "changePercent": -20.9,
    "trend": [
      60.9,
      62.8,
      59.4,
      57.6,
      56.3,
      53.5,
      51.9,
      49.5,
      48.3,
      49.4,
      48.8,
      48.2
    ],
    "countyPrices": {
      "Nairobi": 57.1,
      "Nakuru": 58.0,
      "Kisumu": 68.0,
      "Eldoret": 63.7,
      "Mombasa": 63.1,
      "Meru": 56.6
    },
    "demand": "Low"
  },
  {
    "crop": "Potatoes",
    "unit": "per kg",
    "currentPrice": 36.8,
    "changePercent": 8.2,
    "trend": [
      34.0,
      34.0,
      33.2,
      35.2,
      36.2,
      35.1,
      34.4,
      35.8,
      33.9,
      35.5,
      37.1,
      36.8
    ],
    "countyPrices": {
      "Nairobi": 32.1,
      "Nakuru": 39.5,
      "Kisumu": 36.5,
      "Eldoret": 37.8,
      "Mombasa": 33.4,
      "Meru": 35.9
    },
    "demand": "Low"
  },
  {
    "crop": "Rice",
    "unit": "per kg",
    "currentPrice": 128.4,
    "changePercent": -1.2,
    "trend": [
      130.0,
      126.6,
      123.1,
      124.7,
      121.5,
      123.4,
      130.4,
      129.4,
      125.3,
      134.0,
      134.9,
      128.4
    ],
    "countyPrices": {
      "Nairobi": 118.5,
      "Nakuru": 120.6,
      "Kisumu": 137.4,
      "Eldoret": 142.7,
      "Mombasa": 130.7,
      "Meru": 119.1
    },
    "demand": "Moderate"
  },
  {
    "crop": "Coffee",
    "unit": "per kg",
    "currentPrice": 366.8,
    "changePercent": 12.7,
    "trend": [
      325.6,
      325.9,
      317.0,
      320.7,
      340.8,
      350.5,
      334.7,
      353.1,
      366.4,
      381.0,
      375.0,
      366.8
    ],
    "countyPrices": {
      "Nairobi": 300.7,
      "Nakuru": 288.3,
      "Kisumu": 345.8,
      "Eldoret": 345.6,
      "Mombasa": 365.8,
      "Meru": 349.0
    },
    "demand": "Low"
  },
  {
    "crop": "Tea",
    "unit": "per kg",
    "currentPrice": 61.2,
    "changePercent": 5.2,
    "trend": [
      58.2,
      61.3,
      60.0,
      61.4,
      62.6,
      60.1,
      62.4,
      63.1,
      65.7,
      66.2,
      62.3,
      61.2
    ],
    "countyPrices": {
      "Nairobi": 49.8,
      "Nakuru": 62.3,
      "Kisumu": 61.6,
      "Eldoret": 60.9,
      "Mombasa": 53.7,
      "Meru": 50.3
    },
    "demand": "Low"
  },
  {
    "crop": "Avocado",
    "unit": "per kg",
    "currentPrice": 41.2,
    "changePercent": -3.1,
    "trend": [
      42.5,
      40.4,
      40.6,
      38.5,
      40.0,
      41.6,
      39.8,
      39.9,
      40.3,
      39.3,
      41.4,
      41.2
    ],
    "countyPrices": {
      "Nairobi": 38.1,
      "Nakuru": 41.4,
      "Kisumu": 43.3,
      "Eldoret": 38.0,
      "Mombasa": 39.1,
      "Meru": 46.0
    },
    "demand": "Low"
  }
];

export function getAllMarketData() { return MARKET_DATA; }
export function getMarketDataByCrop(crop) { return MARKET_DATA.find((m) => m.crop === crop) || null; }
