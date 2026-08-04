"use client";

import { useEffect, useRef, useState, RefObject } from "react";

// Tracks whether a DOM element is currently visible in the viewport.
// Used to pause expensive WebGL canvases when they scroll off-screen.
export function useInView<T extends HTMLElement>(rootMargin = "200px"): [RefObject<T | null>, boolean] {
    const ref = useRef<T>(null);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return [ref, isInView];
}