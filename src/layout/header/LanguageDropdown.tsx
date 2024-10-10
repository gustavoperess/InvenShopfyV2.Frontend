import Link from 'next/link';
import React from 'react';

const LanguageDropdown = () => {
    return (
        <ul>
            <li><Link href="#">English</Link></li>
            <li><Link href="#">Turkish</Link></li>
            <li><Link href="#">Spanish</Link></li>
            <li><Link href="#">French</Link></li>
        </ul>
    );
};

export default LanguageDropdown;