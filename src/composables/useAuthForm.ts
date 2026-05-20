import { reactive, ref, watch } from "vue";

export function useAuthForm() {
  const loginForm = reactive({
    user: '',
    password: '',
    policyNo: '',
  });
  const messeage = ref('');
  const isLogin = ref(false);

  watch(
    (loginForm),
    () =>{
        messeage.value=''
    }
  )

  async function login() {
    if (loginForm.user === 'ADMIN' && loginForm.password === 'A12345') {
      messeage.value = '登入成功';
      isLogin.value = true;
    } else {
      messeage.value = '登入失敗';
    }
  }

  const logout = () => {
    loginForm.user = '';
    loginForm.password = '';
    isLogin.value = false;
    messeage.value = '';
  };

  return { loginForm, messeage, isLogin, login, logout };
}