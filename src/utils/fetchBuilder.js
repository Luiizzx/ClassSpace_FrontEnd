const apiUrl = "localhost:3001"

export async function fetchBuilder(method, route, obj, headers){
  const fullRoute = apiUrl + route;
  
  try{
    const result = await fetch(fullRoute, {
      method: method,
      headers: headers ?? { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })

    const data = await result.json();

    return data;
  }
  catch (error) { 
    console.log(error)
  }
}