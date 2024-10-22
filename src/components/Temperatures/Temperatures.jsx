import { useState } from "react";
import Variable from "../Variable/Variable";
import "./Temperatures.css";

function Temperatures() {
    const [celsius, setCelsius] = useState(25);
    const [fahrenheit, setFahrenheit] = useState((25 * 9) / 5 + 32);
    const [kelvin, setKelvin] = useState(25 + 273.15);

    const handleCelsiusChange = (value) => {
        const c = parseFloat(value);
        setCelsius(c);
        setFahrenheit((c * 9) / 5 + 32);
        setKelvin(c + 273.15);
    };

    const handleFahrenheitChange = (value) => {
        const f = parseFloat(value);
        setFahrenheit(f);
        setCelsius(((f - 32) * 5) / 9);
        setKelvin(((f - 32) * 5) / 9 + 273.15);
    };

    const handleKelvinChange = (value) => {
        const k = parseFloat(value);
        setKelvin(k);
        setCelsius(k - 273.15);
        setFahrenheit(((k - 273.15) * 9) / 5 + 32);
    };

    return (
        <div className="temperatures-container">
            <h3 className="temperature-title">Temperatures</h3>
            <div className="temperatures-variables">
                <Variable name="Celsius" value={celsius} setValue={handleCelsiusChange} type="float" />
                <Variable name="Fahrenheit" value={fahrenheit} setValue={handleFahrenheitChange} type="float" />
                <Variable name="Kelvin" value={kelvin} setValue={handleKelvinChange} type="float" />
            </div>
        </div>
    );
}

export default Temperatures;