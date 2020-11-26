import React from 'react';
import 'src/styles/app.css';
import 'src/styles/simple-grid.css';

export default function App({
    Component,
    pageProps,
}: {
    Component: () => JSX.Element;
    pageProps: unknown;
}) {
    return <Component {...pageProps} />;
}
