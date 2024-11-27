import { createContext, useContext, useState } from 'react';

const AssentoContext = createContext();

export const useAssentoContext = () => {
    return useContext(AssentoContext);
};

export const AssentoProvider = ({ children }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    console.log("Selected Seats no contexto:", selectedSeats); // Verifique o estado aqui

    return (
        <AssentoContext.Provider value={{ selectedSeats, setSelectedSeats }}>
            {children}
        </AssentoContext.Provider>
    );
};
