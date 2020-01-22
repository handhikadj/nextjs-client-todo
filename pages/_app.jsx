import App from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
    render() {
        const { Component, pageProps, router } = this.props;

        return (
            <>
                <Component { ...pageProps } key={ router.route }/>
            </>
        );
    }
}

export default MyApp
