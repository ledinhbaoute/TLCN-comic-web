import { useNavigate } from "react-router-dom";

export function useNavigateTo() {
    const nav = useNavigate();

    function navigateTo(path) {
        nav(`${path}`);
        window.location.reload();
        window.scrollTo({
            top: 0,
        });
    }

    return navigateTo;
};