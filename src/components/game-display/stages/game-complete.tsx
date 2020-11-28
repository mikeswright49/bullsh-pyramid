import React from 'react';
import Link from 'next/link';

export function GameComplete() {
    return (
        <>
            <div className="stack-y-2">
                <button className="pure-button pure-button-primary">
                    Start a new game with same players
                </button>
                <Link href="/game/host">
                    <button className="pure-button pure-button-secondary">Host a new game</button>
                </Link>
            </div>
        </>
    );
}
