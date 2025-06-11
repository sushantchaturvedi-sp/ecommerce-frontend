import React from 'react';
import './index.scss';

const SkeletonCard = () => {
    // console.log('SkeletonCard rendered');
    return (
        <div className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-text short" />
            <div className="skeleton-text" />
            <div className="skeleton-text medium" />
        </div>
    );
};

export default SkeletonCard;