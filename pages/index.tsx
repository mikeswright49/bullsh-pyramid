import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Bullsh!t Pyramid</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">Welcome to Bullsh!t pyramid</h1>
            </main>
            <section>
                <h2>Playing</h2>
                <ul>
                    <li>
                        <Link href="/game/host">
                            <a>Host a game</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/game/join">
                            <a>Join a game</a>
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h2>About</h2>
                <li>
                    <Link href="/about">
                        <a>Learn about the project</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about/how-to-play">
                        <a>Learn how to play the game</a>
                    </Link>
                </li>
            </section>
        </div>
    );
}
