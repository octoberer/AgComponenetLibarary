import React, { Component, useEffect } from 'react';
import draw from './draw';

export default function BarChart(props: any) {
    useEffect(() => {
        draw(props);
    }, []);
    return <div className="vis-barchart" />;
}
