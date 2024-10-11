

import React from 'react';

type TError = {
    ErrorMsg:string | undefined;
}

const ErrorMassage = ({ErrorMsg}:TError) => {
    return (
        <>
            <p style={{color:"red", fontSize:"12px"}}>{ErrorMsg}</p>
        </>
    );
};

export default ErrorMassage;