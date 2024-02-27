<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Username:</label>
          <el-input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <el-input type="password" id="password" v-model="password" required />
          <el-button type="submit"> Login</el-button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      submit:''
    };
  },
  methods: {
    login() {
      console.log('Logging in...');
    }
  }
};
</script>

<style scoped>
body{
  padding: 0;
  margin: 0;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
}

.login-box {
  width: 326px;
  padding: 68px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px; 
  display: flex;
  flex-direction: column;/* Increase the gap between fields */
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
.el-input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
}

button,
.el-button {
  width: 80%;
    align-self: center;
    padding: 11px;
    margin-top: 25px;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
}

</style>