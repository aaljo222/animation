// src/EulerAnimation.js
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const EulerAnimation = () => {
    const [points, setPoints] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Fetch points from the Streamlit backend
        fetch("https://blank-app-6vbuqbt0lzl.streamlit.app/euler-points") // Ensure this endpoint returns raw JSON
            .then((response) => response.json())
            .then((data) => setPoints(JSON.parse(data)))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const { x, y } = useSpring({
        x: points.length ? points[index].cos : 0,
        y: points.length ? points[index].sin : 0,
        config: { tension: 170, friction: 26 },
    });

    // Cycle through points
    useEffect(() => {
        if (points.length > 0) {
            const interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % points.length);
            }, 100); // Adjust speed as needed
            return () => clearInterval(interval);
        }
    }, [points]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <svg width="400" height="400" viewBox="-2 -2 4 4">
                <circle cx="0" cy="0" r="1" stroke="black" fill="none" />
                <animated.circle cx={x} cy={y} r="0.05" fill="red" />
            </svg>
        </div>
    );
};

export default EulerAnimation;
