import React from 'react';
import styles from './main-nav.module.css';
export function MainNav() {
    return (
        <>
            <nav className={styles.mainNav}>
                <img src="/logo.svg" />
            </nav>
        </>
    );
}
