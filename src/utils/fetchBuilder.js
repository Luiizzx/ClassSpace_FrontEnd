const apiUrl = "localhost:3001"

export async function fetchBuilder(method, route, obj){
  const fullRoute = apiUrl + route;
  
  try{
    const result = await fetch(fullRoute, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })

    const data = await result.json();

    return data;
  }
  catch (error) { 
    console.log(error)
  }
}