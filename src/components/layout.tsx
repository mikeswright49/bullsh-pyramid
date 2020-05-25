import React from 'react';
import Head from 'next/head';
import { MainNav } from './main-nav';
import styles from './layout.module.css';
export function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <>
            <Head>
                <title>Bullsh!t Pyramid</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainNav />
            <main className={styles.container}>{props.children}</main>
        </>
    );
}
