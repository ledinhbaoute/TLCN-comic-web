import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useNavigateTo() {
    const nav = useNavigate();

    const navigateTo = useCallback((path) => {
        nav(`${path}`);
        window.location.reload();
        window.scrollTo({
            top: 0,
        });
    }, [nav]);

    return navigateTo;
};