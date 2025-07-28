import axios from "axios";

interface LocationData {
  IP: string;
  country: string;
  state: string;
  city: string;
  postal: string;
}

/**
 * Get location data from IP address using ipapi.co (free tier)
 * @param ip - The IP address to lookup
 * @returns LocationData object with geolocation information
 */

export const getLocationFromIp = async (ip: string): Promise<LocationData> => {
  try {
    // Remove any IPv6 prefix if present (e.g., ::ffff:127.0.0.1 -> 127.0.0.1)
    const cleanIp = ip.includes(":") ? ip.split(":").pop() || ip : ip;
    
    // For local development, handle various localhost formats including IPv6 loopback
    if (
      cleanIp === "127.0.0.1" || 
      cleanIp === "localhost" || 
      cleanIp.startsWith("192.168.") ||
      ip === "::1" || // IPv6 loopback
      cleanIp === ""
    ) {
      return {
        IP: ip, // Keep original IP for reference
        country: "Development",
        state: "Local",
        city: "Localhost",
        postal: "00000",
      };
    }

    // Make API call to ipapi.co (free tier - 1000 requests/day)
    const response = await axios.get(`https://ipapi.co/${cleanIp}/json/`);

    return {
      IP: cleanIp,
      country: response.data.country_name || "Unknown",
      state: response.data.region || "Unknown",
      city: response.data.city || "Unknown",
      postal: response.data.postal || "Unknown",
    };
  } catch (error) {
    console.error("❌ Error fetching location data:", error);
    // Return default values if API call fails
    return {
      IP: ip,
      country: "Unknown",
      state: "Unknown",
      city: "Unknown",
      postal: "Unknown",
    };
  }
};
