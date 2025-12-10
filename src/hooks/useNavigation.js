import { useState } from "react";

export default function useNavigation() {
    const [page, setPage] = useState("start");

    const goToStart = () => setPage("start");
    const goToGame = () => setPage("game");
    const goToResults = () => setPage("results");

    return {
        page,
        goToStart,
        goToGame,
        goToResults,
    };
}