import Link from 'next/link';
import React from 'react';
import { Layout } from '../components/layout';

export default function Home() {
    return (
        <Layout>
            <div className="container">
                <h1 className="title">Welcome to Bullsh!t pyramid</h1>
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
                    <ul>
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
                    </ul>
                </section>
            </div>
        </Layout>
    );
}
