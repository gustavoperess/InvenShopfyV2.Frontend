import Link from 'next/link';
import React from 'react';

const LanguageDropdown = () => {
    return (
        <ul>
            <li><Link href="#">English</Link></li>
            <li><Link href="#">Portuguese</Link></li>
        </ul>
    );
};

export default LanguageDropdown;