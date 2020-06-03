import React from 'react';
import Head from 'next/head';
import { MainNav } from '../main-nav/main-nav';
import styles from './layout.module.css';
export function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <>
            <Head>
                <title>Bullsh!t Pyramid</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/base-min.css" />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/purecss@2.0.3/build/buttons-min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/purecss@2.0.3/build/grids-responsive-min.css"
                />
                <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/forms-min.css" />
            </Head>
            <MainNav />
            <main className={styles.container}>{props.children}</main>
        </>
    );
}
