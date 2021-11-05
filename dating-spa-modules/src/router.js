import createPage from "./pages/create.js";
import updatePage from "./pages/update.js";
import userPage from "./pages/user.js";
import usersPage from "./pages/users.js";

class Router {
    constructor() {
        this.routes = [
            {
                path: "#/",
                view: usersPage
            },
            {
                path: "#/create",
                view: createPage
            },
            {
                path: "#/update",
                view: updatePage
            },
            {
                path: "#/user",
                view: userPage
            }
        ];

        this.basePath = location.pathname.replace("index.html", ""); // remove index.html from path
        this.pages = document.querySelectorAll(".page");
        this.navLinks = document.querySelectorAll("nav a");
        this.initRouter();
    }

    /**
 * Changing display to none for all pages
 */
    hideAllPages() {
        for (const page of this.pages) {
            page.style.display = "none";
        }
    }

    /**
     * Navigating SPA to specific page by given path
     */
    navigateTo(path, params) {
        window.history.pushState({}, path, this.basePath + path);
        this.showPage(path, params);
    }

    showPage(path, params) {
        this.hideAllPages(); // hide all pages
        const view = this.routes.find(route => route.path === path).view;
        console.log(view);
        view.beforeShow(params);
        document.getElementById(view.id).style.display = "block"; // show page by given path
        this.setActiveTab(path);
    }

    /**
     * sets active menu item by given path
     */
    setActiveTab(path) {
        for (const link of this.navLinks) {
            if (path === link.getAttribute("href")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        }
    }

    /**
     * Attaching event to nav links and preventing default anchor link event
     */
    attachNavLinkEvents() {
        const navLinks = document.querySelectorAll(".nav-link");
        for (const link of navLinks) {
            link.addEventListener("click", event => {
                const path = link.getAttribute("href");
                this.navigateTo(path);
                event.preventDefault();
            });
        }
    }

    /**
     * Initialising the router, calling attachNavLinkEvents(), popstate event and navigateTo()
     */
    initRouter() {
        this.attachNavLinkEvents();
        window.addEventListener("popstate", () => this.showPage(location.hash)); // change page when using back and forth in browser

        let path = "#/"; // default path
        if (this.routes[location.hash]) {
            path = location.hash;
        }
        this.navigateTo(path);
    }

}

const router = new Router();
export default router;

