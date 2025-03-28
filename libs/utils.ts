
// Take a string and encode it in 64 to send to windev64
export function encodeBase64(input: string) {
  //FUNCTIONAL
  const encoded = btoa(unescape(encodeURIComponent(input)
    .replace(/%C3%A9/g, "%E9")  // "é" → ISO-8859-1
    .replace(/%C3%A8/g, "%E8"))); // "è" → ISO-8859-1
  return encoded
}

// Take a string and decode it from 64 to send to windev64
export function decodeBase64(input: string) {
  //NOT FUNCTIONAL
  const decoded = decodeURIComponent(escape(atob(input)));

  return decoded
}


export async function fetchTest() {
  try {
    const url = process.env.API_URL
    if (url == null) return

    const SQL = "U0VMRUNUICogRlJPTSBtb3RpZnJkdiBXSEVSRSBOb21BY3Rpdml06SA9ICdBdGVsaWVyUCc="
    // const encodedSQL = encodeBase64(SQL)
    console.log('OKOKOKOOK')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "token": 'mls5df5435fv3qvdfvqdfvd5fv5fkdgpvmjg'
      },
      body: JSON.stringify({ request: SQL }),
    })

    // console.log('RESPONSE'  + response.json())
    return response

  } catch (error) {
    console.log(error)
  }
}


// Take a SQL request and send it to the API
export const fetchToApi = async (sqlRequest: string) => {
  try {
    const url = process.env.API_URL || 'http://localhost:8024/Requete'
    const headers = {
      'Content-Type': 'application/json',
      'token': process.env.API_TOKEN || '',

    }

    // const encodedSql = encodeBase64(sqlRequest)
    const requestBody = JSON.stringify({
      "request": sqlRequest
    })

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: requestBody
    })
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);

      return {
        success: false,
        error: `Failed to fetch from API. Status: ${response.status}, Message: ${errorText}`,
        status: response.status,
      };
    }

    const data = await response.json()

    return { success: true, data };
  } catch (error) {
    console.error("Error in fetchToApi:", error);
    return { success: false, error: "An unexpected error occurred." };
  }

}



