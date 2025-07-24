import React from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/Details/Hero';
import OlsoTry from '../components/Details/OlsoTry';

const ProductDetails = () => {
    const { name } = useParams();

    return (
        <>
        <Hero name={name} />
        <OlsoTry name={name}/>
        </>
    );
};

export default ProductDetails;
