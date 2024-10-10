"use client";
import React, { useState, useEffect } from 'react';

const RtlMain = () => {
    const [isRtl, setIsRtl] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    useEffect(() => {
        // Check localStorage for the direction setting on component mount
        const storedDirection = localStorage.getItem('isRtl');
        if (storedDirection !== null) {
            const rtlValue = JSON.parse(storedDirection);
            setIsRtl(rtlValue);
            document.documentElement.dir = rtlValue ? 'rtl' : 'ltr';
        }
        else {
            // If there's no stored direction, set to default (RTL)
            document.documentElement.dir = 'ltr';
        }
    }, []);

    const handleDirectionToggle = () => {
        setIsRtl((prevIsRtl) => {
            const newIsRtl = !prevIsRtl;
            document.documentElement.dir = newIsRtl ? 'rtl' : 'ltr'; // Set the direction on the root element
            localStorage.setItem('isRtl', JSON.stringify(newIsRtl)); // Save the direction setting in localStorage
            return newIsRtl;
        });
    };

    const handleSettingsToggle = () => {
        setSettingsOpen((prevSettingsOpen) => !prevSettingsOpen);
    };

    return (
        <div className={`bd-theme-settings-area transition-3 settings-opened ${settingsOpen ? 'active' : ''}`}>
            <div className="bd-theme-wrapper">
                <div className="bd-theme-header text-center">
                    <h4 className="bd-theme-header-title">Template Settings</h4>
                </div>

                <div className="bd-theme-dir">
                    <label className="bd-theme-dir-main" htmlFor="bd-dir-toggler">
                        <button
                            type="button"
                            className='bd-theme-dir-ltr'
                            onClick={handleDirectionToggle}
                            aria-pressed={!isRtl}
                        >
                            LTR
                        </button>
                        <input
                            type="checkbox"
                            id="bd-dir-toggler"
                            checked={isRtl}
                            onChange={handleDirectionToggle}
                            style={{ display: 'none' }}
                        />
                        <i className="bd-theme-dir-slide"></i>
                        <button
                            type="button"
                            className='bd-theme-dir-rtl'
                            onClick={handleDirectionToggle}
                            aria-pressed={isRtl}
                        >
                            RTL
                        </button>
                    </label>
                </div>

                <div className="bd-theme-settings">
                    <div className="bd-theme-settings-wrapper">
                        <div className="bd-theme-settings-open">
                            <button
                                className="bd-theme-settings-open-btn"
                                onClick={handleSettingsToggle}
                                aria-expanded={settingsOpen}
                            >
                                <span className="bd-theme-settings-gear">
                                    <i className="far fa-cog"></i>
                                </span>
                                <span className="bd-theme-settings-close">
                                    <i className="far fa-times"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RtlMain;
