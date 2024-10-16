export const apiLogin = async (email, password) => {
    try {
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // Check if response is ok and parse JSON
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json(); // Assuming response is in JSON format
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Login failed. Please try again.'); 
    }
  };
  