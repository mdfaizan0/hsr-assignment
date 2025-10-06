const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// GET request helper
export const get = async (endpoint, token) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: token
        ? {
          "Authorization": `Bearer ${token}`,
        }
        : {},
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "GET request failed");
    }

    return res.json();
  } catch (err) {
    console.error("GET Error:", err);
    return null;
  }
};

// POST request helper
export const post = async (endpoint, data, token) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "POST request failed");
    }

    return res.json();
  } catch (err) {
    console.error("POST Error:", err);
    return null;
  }
};