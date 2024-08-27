new Vue({
  el: "#loginApp",
  data: {
    loginForm: {
      email: "",
      password: "",
    },
    errorMessage: "",
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.loginForm.email,
          password: this.loginForm.password,
        });
        // Store the token and user role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.userRole);

        console.log("Token saved:", localStorage.getItem("token"));
        console.log("User Role saved:", localStorage.getItem("userRole"));

        // Redirect to index.html after successful login
        window.location.href = "index.html";
      } catch (error) {
        this.errorMessage = "Login failed: " + (error.response ? error.response.data.error : "Server Error");
      }
    },
  },
});
