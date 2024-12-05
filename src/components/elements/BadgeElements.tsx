import React from 'react';

const BadgeElements = () => {
    return (
        <div className="invenShopfy-common-card mb-5">
            <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                <div className="col-span-12 md:col-span-6">
                    <div className="invenShopfy-form-field">
                        <h5>Selector Styles</h5>
                        <div className="flex flex-wrap gap-2.5 mb-5">
                            <span className='badge badge-primary'>Primary</span>
                            <span className='badge badge-success'>Success</span>
                            <span className='badge badge-warning'>Warning</span>
                            <span className='badge badge-danger'>Danger</span>
                            <span className='badge badge-teal'>Teal</span>
                            <span className='badge badge-gray'>Gray</span>
                            <span className='badge badge-dark'>Dark</span>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            <span className='badge-stroke badge-primary'>Primary</span>
                            <span className='badge-stroke badge-success'>Success</span>
                            <span className='badge-stroke badge-warning'>Warning</span>
                            <span className='badge-stroke badge-danger'>Danger</span>
                            <span className='badge-stroke badge-teal'>Teal</span>
                            <span className='badge-stroke badge-gray'>Gray</span>
                            <span className='badge-stroke badge-dark'>Dark</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BadgeElements;