import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const PUSHER_APP_KEY = "4f2eccc31a509bd5e1ad";
const PUSHER_APP_CLUSTER = "ap1";

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: "pusher",
    key: PUSHER_APP_KEY,
    cluster: PUSHER_APP_CLUSTER,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
});

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
