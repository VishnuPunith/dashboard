












// // utils/googleAuth.js

// // export const loginWithGoogle = async () => {
// //     try {
// //       const authCode = await getGoogleAuthCode(process.env.GOOGLE_CLIENT_ID);
// //       // Use the authCode as needed (e.g., send it to the server for authentication)
// //       console.log('Received auth code:', authCode);
// //     } catch (error) {
// //       console.error('Error during Google login:', error);
// //     }
// //   };
  
// //   const getGoogleAuthCode = async (clientId) => {
// //     // Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google client ID
// //     const redirectUri = 'http://localhost:3000/auth/google/callback';
// //     const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email&client_id=${clientId}`;
  
// //     // Make the request to get the auth code
// //     const response = await fetch(authUrl);
// //     const { code } = await response.json();
// //     return code;
// //   };
//   // utils/googleAuth.js

// export const loginWithGoogle = async () => {
//     try {
//       const authCode = await getGoogleAuthCode(process.env.GOOGLE_CLIENT_ID);
//       console.log('Received auth code:', authCode);
//       // Handle the auth code as needed, e.g., send it to the server for further processing
//     } catch (error) {
//       console.error('Error during Google login:', error);
//     }
//   };
  
//   const getGoogleAuthCode = async (clientId) => {
//     const redirectUri = 'http://localhost:3000/auth/google/callback';
//     const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email&client_id=${clientId}`;
  
//     try {
//       const response = await fetch(authUrl);
//       const { code } = await response.json();
//       return code;
//     } catch (error) {
//       console.error('Error getting auth code:', error);
//       throw error;
//     }
//   };
  

// utils/googleAuth.js

// export const loginWithGoogle = async () => {
//     try {
//       const authCode = await getGoogleAuthCode();
//       console.log('Received auth code:', authCode);
//       // Handle the auth code as needed, e.g., send it to the server for further processing
//     } catch (error) {
//       console.error('Error during Google login:', error);
//     }
//   };
  
//   const getGoogleAuthCode = async () => {
//     const redirectUri = 'http://localhost:3000/auth/google/callback';
//     const clientId = process.env.GOOGLE_CLIENT_ID;
  
//     const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email&client_id=${clientId}`;
  
//     try {
//       // Change the request method to 'POST' since Google OAuth expects a POST request
//       const response = await fetch(authUrl, { method: 'POST', mode: 'cors' });
  
//       // If Google OAuth response is in JSON format, use response.json()
//       const { code } = await response.json();
  
//       // If Google OAuth response is not in JSON format, use response.text()
//       // const code = await response.text();
  
//       return code;
//     } catch (error) {
//       console.error('Error getting auth code:', error);
//       throw error;
//     }
//   };
  