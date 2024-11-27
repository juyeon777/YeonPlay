<template>
  <div class="auth-container">
    <div class="auth-card" :class="{ 'rotate-card': !isLoginVisible }">
      <!-- 로그인 폼 -->
      <div class="form-container login-form" v-if="isLoginVisible">
        <h2>로그인</h2>
        <div class="input-group">
          <input
            type="email"
            v-model="loginForm.email"
            placeholder="이메일"
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
        <button @click="handleLogin" :disabled="!isLoginFormValid">
          로그인
        </button>
        <p class="switch-form">
          계정이 없으신가요?
          <span @click="toggleCard">회원가입</span>
        </p>
      </div>

      <!-- 회원가입 폼 -->
      <div class="form-container register-form" v-else>
        <h2>회원가입</h2>
        <div class="input-group">
          <input
            type="email"
            v-model="registerForm.email"
            placeholder="이메일"
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
        <button @click="handleRegister" :disabled="!isRegisterFormValid">
          회원가입
        </button>
        <p class="switch-form">
          이미 계정이 있으신가요?
          <span @click="toggleCard">로그인</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      isLoginVisible: true, // 로그인/회원가입 전환 상태
      loginForm: {
        email: "",
        password: "",
        rememberMe: false,
      },
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      },
    };
  },
  computed: {
    isLoginFormValid() {
      return !!this.loginForm.email && !!this.loginForm.password;
    },
    isRegisterFormValid() {
      return (
        !!this.registerForm.email &&
        !!this.registerForm.password &&
        !!this.registerForm.confirmPassword &&
        this.registerForm.password === this.registerForm.confirmPassword &&
        this.registerForm.acceptTerms
      );
    },
  },
  methods: {
    toggleCard() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    handleLogin() {
      alert("로그인 성공!"); // 예시
      this.$router.push("/");
    },
    handleRegister() {
      alert("회원가입 완료!");
      this.toggleCard(); // 로그인 화면으로 전환
    },
  },
};
</script>

<style scoped>
/* 기본 컨테이너 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #74ebd5, #acb6e5);
  overflow: hidden;
}

/* 카드 스타일 */
.auth-card {
  width: 400px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center;
  transition: transform 0.8s ease-in-out;
}

.auth-card.rotate-card {
  transform: rotateY(180deg);
}

/* 폼 공통 스타일 */
.form-container {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.login-form {
  transform: rotateY(0deg);
}

.register-form {
  transform: rotateY(180deg);
}

/* 폼 요소 스타일 */
h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #369d6c;
}

.switch-form {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.switch-form span {
  color: #42b983;
  cursor: pointer;
  font-weight: bold;
}

/* 체크박스 */
.checkbox-group {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

/* 반응형 */
@media (max-width: 480px) {
  .auth-card {
    width: 90%;
    height: 450px;
  }
}
</style>
