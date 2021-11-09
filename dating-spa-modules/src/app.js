console.log("app.js is running 🎉");

import Nav from "./components/nav.js";
import router from "./router.js";

const nav = new Nav();
router.init();
