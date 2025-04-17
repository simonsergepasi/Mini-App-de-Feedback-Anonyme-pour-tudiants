console.log("✅ API URL:", import.meta.env.VITE_API_BASE_URL);

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/feedbacks`;

export async function createFeedback(values) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}
export async function getFeedbacks() {
  try {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const feedbacks = await response.json();
      return feedbacks;
    }
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
}
