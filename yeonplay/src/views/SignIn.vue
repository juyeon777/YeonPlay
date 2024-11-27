<template>
  <div class="auth-container">
    <div class="auth-card">
      <transition name="slide-fade" mode="out-in">
        <!-- 로그인 폼 -->
        <form v-if="isLoginVisible && !isLoggedIn" @submit.prevent="handleLogin" key="login">
          <h2>로그인</h2>
          <div class="input-group">
            <input 
              type="email" 
              v-model="loginForm.email" 
              placeholder="이메일" 
              @blur="validateEmail(loginForm.email)" 
              required 
            />
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="loginForm.password" 
              placeholder="비밀번호" 
              required 
            />
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="loginForm.rememberMe" />
              <span>Remember me</span>
            </label>
          </div>
          <button type="submit" :disabled="!isLoginFormValid">로그인</button>
          <p class="switch-form">
            계정이 없으신가요? 
            <span @click="toggleCard">회원가입</span>
          </p>
        </form>

        <!-- 로그아웃 버튼 -->
        <div v-else-if="isLoggedIn" key="logout">
          <h2>안녕하세요, {{ storedNickname || '사용자' }}님!</h2>
          <button @click="handleLogout">로그아웃</button>
        </div>

        <!-- 회원가입 폼 -->
        <form v-else @submit.prevent="handleRegister" key="register">
          <h2>회원가입</h2>
          <div class="input-group">
            <input 
              type="text" 
              v-model="registerForm.nickname" 
              placeholder="닉네임" 
              required 
            />
          </div>
          <div class="input-group">
            <input 
              type="email" 
              v-model="registerForm.email" 
              placeholder="이메일" 
              @blur="validateEmail(registerForm.email)" 
              required 
            />
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="registerForm.password" 
              placeholder="비밀번호" 
              required 
            />
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="registerForm.confirmPassword" 
              placeholder="비밀번호 확인" 
              required 
            />
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="registerForm.acceptTerms" />
              <span>약관에 동의합니다</span>
            </label>
          </div>
          <button type="submit" :disabled="!isRegisterFormValid">회원가입</button>
          <p class="switch-form">
            이미 계정이 있으신가요? 
            <span @click="toggleCard">로그인</span>
          </p>
        </form>
      </transition>
    </div>
  </div>
</template>

---

### Script Section

```javascript
<script>
export default {
  name: "SignIn",
  data() {
    return {
      isLoginVisible: true, // 현재 폼 상태 (로그인/회원가입)
      isLoggedIn: false, // 로그인 상태
      storedNickname: "", // 저장된 사용자 닉네임
      loginForm: {
        email: "",
        password: "",
        rememberMe: false,
      },
      registerForm: {
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    // 로그인 상태 확인
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      this.storedNickname = localStorage.getItem("userNickname");
    },
    // 로그아웃
    handleLogout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("rememberMe");
      alert("로그아웃되었습니다.");
      this.isLoggedIn = false;
      this.$router.push("/signin");
    },
    // 이메일 유효성 검사
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        alert("잘못된 이메일 형식입니다.");
        return false;
      }
      return true;
    },
    // 로그인 처리
    handleLogin() {
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (
        this.loginForm.email === storedEmail &&
        this.loginForm.password === storedPassword
      ) {
        if (this.loginForm.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        localStorage.setItem("isLoggedIn", "true");
        alert("로그인 성공!");
        this.isLoggedIn = true;
        this.storedNickname = localStorage.getItem("userNickname");
        this.$router.push("/"); // 메인 페이지로 이동
      } else {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    },
    // 회원가입 처리
    handleRegister() {
      if (!this.validateEmail(this.registerForm.email)) return;
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!this.registerForm.acceptTerms) {
        alert("약관에 동의해주세요.");
        return;
      }
      localStorage.setItem("userEmail", this.registerForm.email);
      localStorage.setItem("userPassword", this.registerForm.password);
      localStorage.setItem("userNickname", this.registerForm.nickname);
      alert("회원가입 완료!");
      this.toggleCard(); // 로그인 화면으로 전환
    },
    // 폼 전환
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
  },
};
</script>


<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
}

.auth-card {
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.checkbox-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369d6c;
}

.switch-form {
  text-align: center;
  margin-top: 10px;
}

.switch-form span {
  color: #42b983;
  cursor: pointer;
  text-decoration: underline;
}
</style>
