"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import Link from "next/link";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        // Attach the event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logoContainer}>
                <a href="/">
                    <Image
                        src={scrolled ? '/logo-colored.png' : '/logo-white.png'}
                        alt="Logo"
                        width={116}
                        height={26}
                    />
                </a>
            </div>
            <ul className={styles.navItems}>
                <li><Link href="/about-us">About Us</Link></li>
                <li><Link href="/product">Product</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
        </nav>
    );
};
