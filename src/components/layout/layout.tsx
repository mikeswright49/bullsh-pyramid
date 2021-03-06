import React from 'react';
import Head from 'next/head';
import { MainNav } from 'src/components/main-nav/main-nav';
export function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <>
            <Head>
                <title>Bullsh!t Pyramid</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            <MainNav />
            <main>{props.children}</main>
        </>
    );
}
