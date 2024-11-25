<template>
  <div class="auth-container">
    <div class="auth-box">
      <transition name="fade" mode="out-in">
        <!-- 로그인 폼 -->
        <form v-if="isLogin" @submit.prevent="handleLogin" key="login">
          <h1>로그인</h1>
          <div class="input-group">
            <input 
              type="email" 
              v-model="loginForm.email" 
              placeholder="이메일"
              @blur="validateEmail(loginForm.email)"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="loginForm.password" 
              placeholder="비밀번호"
              required
            >
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="loginForm.rememberMe">
              <span>Remember me</span>
            </label>
          </div>
          <button type="submit">로그인</button>
          <p class="switch-form">
            계정이 없으신가요? 
            <span @click="toggleForm">회원가입</span>
          </p>
        </form>

        <!-- 회원가입 폼 -->
        <form v-else @submit.prevent="handleRegister" key="register">
          <h1>회원가입</h1>
          <div class="input-group">
            <input 
              type="text" 
              v-model="registerForm.nickname" 
              placeholder="닉네임"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="email" 
              v-model="registerForm.email" 
              placeholder="이메일"
              @blur="validateEmail(registerForm.email)"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="registerForm.password" 
              placeholder="비밀번호"
              required
            >
          </div>
          <div class="input-group">
            <input 
              type="password" 
              v-model="registerForm.confirmPassword" 
              placeholder="비밀번호 확인"
              required
            >
          </div>
          <div class="checkbox-group">
            <label>
              <input type="checkbox" v-model="registerForm.termsAgreed">
              <span>약관에 동의합니다</span>
            </label>
          </div>
          <button type="submit">회원가입</button>
          <p class="switch-form">
            이미 계정이 있으신가요? 
            <span @click="toggleForm">로그인</span>
          </p>
        </form>
      </transition>
    </div>
  </div>
</template>


<script>
export default {
  name: 'SignInPage',
  data() {
    return {
      isLogin: true, // true: 로그인 폼 / false: 회원가입 폼
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      },
      registerForm: {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAgreed: false
      }
    };
  },
  methods: {
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(email)) {
        alert('잘못된 이메일 형식입니다.');
        return false;
      }
      return true;
    },
    handleLogin() {
      // 로컬 스토리지에서 저장된 사용자 정보 가져오기
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      if (this.loginForm.email === storedEmail && this.loginForm.password === storedPassword) {
        localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
        localStorage.setItem('userNickname', localStorage.getItem('userNickname')); // 닉네임 저장
        // Remember Me 기능
        if (this.loginForm.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        // 로그인 성공
        localStorage.setItem('isLoggedIn', 'true');
        alert('로그인 성공!');
        this.$router.push('/home'); // 메인 페이지로 이동
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    },
    handleRegister() {
      // 이메일 유효성 검사
      if (!this.validateEmail(this.registerForm.email)) return;

      // 비밀번호 일치 확인
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 약관 동의 확인
      if (!this.registerForm.termsAgreed) {
        alert('약관에 동의해주세요.');
        return;
      }

      // 사용자 정보 저장
      localStorage.setItem('userEmail', this.registerForm.email);
      localStorage.setItem('userPassword', this.registerForm.password);
      localStorage.setItem('userNickname', this.registerForm.nickname); // 닉네임 저장

      alert('회원가입 완료되었습니다!');
      this.isLogin = true; // 로그인 화면으로 전환
      this.loginForm.email = this.registerForm.email; // 이메일 자동 입력
    },
    toggleForm() {
      this.isLogin = !this.isLogin; // 폼 전환
    }
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f9;
}

.auth-box {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  border: none;
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
