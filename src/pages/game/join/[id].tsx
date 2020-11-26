import React from 'react';
import { useRouter } from 'next/router';
import { Join } from 'src/routes/join';

export default function JoinGame(): JSX.Element {
    const router = useRouter();
    const gameId = router.query.id as string;
    return <Join gameId={gameId} />;
}
