import { createRouter, createWebHistory } from "vue-router";
import UserListPage     from "../views/UserListPage.vue";
import ChatRoomPage     from "../views/ChatRoomPage.vue";
import UserProfilePage  from "../views/UserProfilePage.vue";
import LoginPage        from "../views/LoginPage.vue";

const routes = [
    {   path: "/login",       name: "Login",      component: LoginPage },
    {   path: "/",            name: "UserList",   component: UserListPage,    meta: { requiresAuth: true } },
    {   path: "/profile",     name: "UserProfile",component: UserProfilePage, meta: { requiresAuth: true },},
    {   path: "/chat/:id",    name: "ChatRoom",   component: ChatRoomPage,    meta: { requiresAuth: true },},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ナビゲーションガードを設定
router.beforeEach((to, from, next) => {
    const token     = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    const now       = new Date();

    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!token || new Date(expiresAt) <= now){
            //トークンが存在しないか、期限切れの場合
            alert('認証情報が無効です。ログインしなおしてください。');
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_at');
            next({ name: 'Login' });
        }else{
            next();
        }
    }else{
        next();
    }
});

export default router;
