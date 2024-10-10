import Image from 'next/image';
import React from 'react';
import ErrorThumb from "../../../public/assets/img/icon/error-thumb.png";
import Link from 'next/link';

const page = () => {
    return (
        <div className="content-error-area py-[120px] px-7">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                    <div className="content-error-item text-center">
                        <div className="error-thumb inline-block">
                            <Image
                                src={ErrorThumb}
                                priority
                                style={{ width: "auto", height: "auto" }}
                                alt="img not found"
                            />
                        </div>
                        <div className="section-title text-center">
                            <h2 className="mb-5">Oops! That page can not be found.</h2>
                            <p>
                                We {`couldn't`} find any results for your search. Use more
                                generic words or double check your spelling.
                            </p>
                        </div>
                        <div className="error-btn text-center">
                            <Link href="/dashboard" className="inventual-btn primary-btn">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;