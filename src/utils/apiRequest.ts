const apiRequest = async <T>(
  url: string,
  body?: any,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default apiRequest;
