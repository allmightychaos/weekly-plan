// src/components/WeeklyTable.jsx

import React from "react";
import "./WeeklyTable.scss";

// Utility: Array mit 7 Tagen ab dem Montag dieser Woche
function getWeekDates() {
    const today = new Date();
    const day = today.getDay(); // 0=So,1=Mo…6=Sa
    const diffToMonday = (day + 6) % 7; // wie viele Tage zurück bis Mo
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dates.push(d);
    }
    return dates;
}

// Formatter für
const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "long",
});

// Zeilen Labels
const rows = ["Isa", "Jürgen", "Sam Schule", "Elina Schule", "Wir", "Notiz"];

export default function WeeklyTable() {
    const weekDates = getWeekDates();
    const headers = [
        "Datum",
        ...weekDates.map((d) =>
            dateFormatter
                .format(d)
                .replace(",", "")
        ),
    ];

    return (
        <div className="weekly-table-container">
            <table className="weekly-table">
                <thead>
                    <tr>
                        {headers.map((h, i) => (
                            <th
                                key={i}
                                className={
                                    i === 0 ? "header-first" : "header-rotated"
                                }
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((label, ri) => (
                        <tr key={ri}>
                            <td className="row-label">{label}</td>
                            {weekDates.map((_, ci) => (
                                <td key={ci}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
