<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="tit">Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username" class="un">Username:</label>
          <el-input type="email" class="in" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password" class="un">Password:</label>
          <el-input type="password" class="in" id="password" v-model="password" required />
          <el-button type="submit" @click="login">Login</el-button>
        </div>
      </form>
      <div>
        <el-button @click="googleLogin" type="button" class="login-with-google-btn">
          Sign in with Google
        </el-button>
      </div>
    </div>
    <FireStore v-if="isAdminLogin" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/plugins/firebase.js';



const username = ref('');
const password = ref('');
const isAdminLogin = ref(true);


const firebaseConfig = {
  apiKey: 'AIzaSyD8y84n0QcBffWi45YmvE3EmR5tpyfb-xs',
  authDomain: 'vlearning-e7dae.firebaseapp.com',
  databaseURL: 'https://sign-11111.firebaseio.com',
  projectId: 'vlearning-e7dae',
  storageBucket: 'vlearning-e7dae.appspot.com',
  messagingSenderId: '528784283470',
  appId: '1:528784283470:web:3b828000ed2d01749af01f',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Add this line to get Firestore instance


const login = async () => {

  try {
    isAdminLogin.value = true;

    // Log input values
    console.log('Username:', username.value);
    console.log('Password:', password.value);

    // Continue with your existing login logic
    const adminQuerySnapshot = await getDocs(collection(firestore, 'admins'));

    let isAdmin = false;
    adminQuerySnapshot.forEach((doc) => {
      const adminData = doc.data();
      if (username.value === adminData.username && password.value === adminData.password) {
        isAdmin = true;
      }
    });

    if (isAdmin) {
      window.location.href = "/FireStore";
    } else {
      alert("Please enter valid username and password.");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
};

const googleLogin = async () => {

  try {
    isAdminLogin.value = false;


    const result = await signInWithPopup(auth, provider);
    const credential = await GoogleAuthProvider.credentialFromResult(result);

    const user = result.user;
    console.log(user);
    console.log(credential);

    window.location.href = "/FireStoreDB";
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }
  
};
</script>



<style scoped>
body {
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}
.un{
  margin-left: 11px;
  font-family: monospace;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d7d6d7;
}
.tit{
  margin-left: 8rem;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 32px;
}
.login-with-google-btn {
  transition: background-color .3s, box-shadow .3s;
    
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  /* font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif; */
  
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  margin-left: 42px;
}
  

.login-box {
  width: 326px;
  padding: 68px;
  height: auto;
  border-radius: 40px;
  background-color: #fbfcfe;
  box-shadow: 15px 15px 15px 0px black !important;
  font-family: 'Poppins';
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; /* Increase the gap between fields */
}

#label {
  display: block;
  margin-bottom: 5px;
  font-family: 'Poppins', sans-serif;

}

input ,
.el-input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
}

button,
.el-button {
  width: 74%;
    align-self: center;
    padding: 11px;
    margin-top: 28px;
    border: none;
    height: 42px;
    background-color: #d3c5e3;
    color: #1e0202;
    cursor: pointer;
    border-radius: 23px;
}
</style>
<!-- <template>
  <FireStore />
</template>

<script>
import FireStore from '/Users/developer/Desktop/logignstatics/pages/FireStore.vue'; // Adjust the path based on your file structure

export default {
  components: {
    FireStore,
  },
};
</script> -->