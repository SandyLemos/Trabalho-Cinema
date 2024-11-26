
import { createContext, useContext, useState } from 'react';


const AssentoContext = createContext();

export const useAssentoContext = () => {
    return useContext(AssentoContext);
};

export const AssentoProvider = ({ children }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <AssentoContext.Provider value={{ selectedSeats, setSelectedSeats }}>
            {children}
        </AssentoContext.Provider>
    );
};