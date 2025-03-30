import axios from "axios";

const UNISWAP_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
const BITSI_CONTRACT_ADDRESS = "0x94d58ceeceec489fc3c74556f8912608097ee3ab"; // Replace with BITSI contract address

export const getBitsiPrice = async (currency = "matic") => {
  try {
    // Query Uniswap for BITSI price in the given currency
    const query = {
      query: `
        {
          token(id: "${BITSI_CONTRACT_ADDRESS.toLowerCase()}") {
            derivedETH
          }
          bundle(id: "1") {
            ethPriceUSD
          }
        }
      `,
    };

    const response = await axios.post(UNISWAP_GRAPH_URL, query);
    const { token, bundle } = response.data.data;

    if (!token) {
      throw new Error("BITSI token not found on Uniswap");
    }

    // Get BITSI price in ETH
    const bitsiToETH = parseFloat(token.derivedETH);
    const ethToUSD = parseFloat(bundle.ethPriceUSD);

    // Fetch conversion rate for requested currency
    const conversionRate = await getCurrencyRate(currency);

    // Calculate BITSI price in chosen currency
    const bitsiPrice = bitsiToETH * ethToUSD * conversionRate;

    return { price: bitsiPrice, currency };
  } catch (error) {
    console.error("Error fetching BITSI price:", error);
    return { price: 0, currency };
  }
};

// Helper function to get currency rate
const getCurrencyRate = async (currency) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,${currency}&vs_currencies=usd`
    );
    return response.data[currency]?.usd || 1; // Default to 1 if currency not found
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    return 1;
  }
};
