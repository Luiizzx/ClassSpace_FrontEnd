const apiUrl = "http://localhost:3001";
// const apiUrl = " http://10.100.237.68:3001";

export async function fetchBuilder(method, route, obj, headers) {
  const fullRoute = apiUrl + route;

  try {
    const result = await fetch(fullRoute, {
      method,
      credentials: "include",
      headers: headers ?? { "Content-Type": "application/json" },
      body: method.toUpperCase() !== "GET" ? JSON.stringify(obj) : undefined,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}