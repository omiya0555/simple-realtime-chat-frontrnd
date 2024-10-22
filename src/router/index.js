import { createRouter, createWebHistory } from "vue-router";
import UserListPage from "../views/UserListPage.vue";
import ChatRoomPage from "../views/ChatRoomPage.vue";
import UserProfilePage from "../views/UserProfilePage.vue";

const routes = [
    { path: "/", name: "UserList", component: UserListPage },
    { path: "/chat/:id", name: "ChatRoom", component: ChatRoomPage },
    { path: "/profile", name: "UserProfile", component: UserProfilePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
