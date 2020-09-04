import React from 'react';

export const HOME_ROUTE = "/";

export default function HomePage() {
    return (
        <div className="flex justify-center items-center" style={{height: "calc(100vh - 48px)"}}>
            <div className="text-xl uppercase text-red-500">
                INVIGILATOR
            </div>
        </div>
    )
}
