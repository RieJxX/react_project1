import React from "react";
import cl from './ErrorBanner.module.css'

const ErrorBanner = ({error}) => {
    return(
    <div className={cl.overlay}>
        <div className={cl.errorBanner}>
            Произошла ошибка {error}
        </div>
    </div>
    )
}

export default ErrorBanner