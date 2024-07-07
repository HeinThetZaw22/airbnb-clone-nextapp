'use client';
import EmptyState from './components/EmptyState'
import { useEffect } from "react";


const error = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error])
    
    return (
        <div>
            <EmptyState title="Oops"
                error={error}
                subtitle="Something went wrong" />

        </div>
    )
}

export default error