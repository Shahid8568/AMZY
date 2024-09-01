import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const GoTopBtn = () => {
    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 120) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {visible && (
                <button className='goTopBtn' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <FaChevronUp />
                </button>
            )}
        </div>
    );
};

export default GoTopBtn;
