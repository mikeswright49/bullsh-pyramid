import React from 'react';
import { Layout } from 'src/components/layout/layout';
import { shortId } from 'src/utilities/shortid';

const ID_LENGTH = 4;

export default function HostGame(): JSX.Element {
    const generateGameId = (): void => {
        const id = shortId(ID_LENGTH);
        window.location.assign(`/game/${id}`);
    };

    return (
        <Layout>
            <>
                <h1>Host Game</h1>
                <span>Holy shit this is gonna work</span>
                <div>
                    <button onClick={generateGameId}>Start a new game</button>
                </div>
            </>
        </Layout>
    );
}
