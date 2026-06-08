const apiUrl = "http://localhost:3001";

export async function fetchBuilder(method, route, obj, headers) {
  const fullRoute = apiUrl + route;

  try {
    const result = await fetch(fullRoute, {
      method,
      credentials: "include",
      headers: headers ?? { "Content-Type": "application/json" },
      body: method.toUpperCase() !== "GET" ? JSON.stringify(obj) : undefined,
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}