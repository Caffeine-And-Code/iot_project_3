import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getSystemStatus, SystemStatus } from "../../../hooks/getSystemStatus";
import getTemperatures from "../../../hooks/getTemperatures";
import getWindowPercentage from "../../../hooks/getWindowPercentage";
import debug from "../../../config/systemVariables";

// il tipo dei dati condivisi
interface DataContextType {
    temperature: { letture: number; temperature: number }[];
    systemStatus: SystemStatus;
    windowPercentage: number;
}

// Creiamo il contesto
const DataContext = createContext<DataContextType | undefined>(undefined);

// Hook personalizzato per usare il contesto più facilmente
export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [temperature, setTemperature] = useState<{ letture: number; temperature: number }[]>([]);
    const [systemStatus, setSystemStatus] = useState<SystemStatus>(SystemStatus.Normal);
    const [windowPercentage, setWindowPercentage] = useState<number>(0);

    useEffect(() => {
        const socket = io();
        console.log("socket => ", socket);

        // Quando arriva un nuovo dato
        socket.on("data", (msg) => {
            console.log("Received new data:", msg);
            setTemperature(getTemperatures(msg));
            setSystemStatus(getSystemStatus(msg));
            setWindowPercentage(getWindowPercentage(msg));
        });

        if(debug){
            // debug mode
            // create an interval to simulate new data every 5 seconds
            setInterval(() => {
                const msg = '{"temperatureHistory":[20,21,22,23,24,25,26,27,28,29,30],"applicationState":"Normal","percentage":50}';
                setTemperature(getTemperatures(msg));
                setSystemStatus(getSystemStatus(msg));
                setWindowPercentage(getWindowPercentage(msg));
            }, 5000);
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <DataContext.Provider value={{ temperature, systemStatus, windowPercentage }}>
            {children}
        </DataContext.Provider>
    );
};
