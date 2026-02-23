import React, { useState } from 'react';

const UNITS = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
    miles: 1609.34
  },
  weight: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495
  },
  temperature: {
    celsius: 'C',
    fahrenheit: 'F',
    kelvin: 'K'
  }
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<keyof typeof UNITS>('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return '0';

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = val - 273.15;

      if (toUnit === 'celsius') return celsius.toFixed(2);
      if (toUnit === 'fahrenheit') return (celsius * 9/5 + 32).toFixed(2);
      if (toUnit === 'kelvin') return (celsius + 273.15).toFixed(2);
      return celsius.toFixed(2);
    }

    const units = UNITS[category] as any;
    const baseValue = val * units[fromUnit];
    const result = baseValue / units[toUnit];
    return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Object.keys(UNITS).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat as any);
              const firstUnit = Object.keys(UNITS[cat as keyof typeof UNITS])[0];
              const secondUnit = Object.keys(UNITS[cat as keyof typeof UNITS])[1];
              setFromUnit(firstUnit);
              setToUnit(secondUnit);
            }}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all whitespace-nowrap ${category === cat ? 'bg-black text-white' : 'bg-black/5 text-black/40 hover:bg-black/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black font-bold text-xl"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="p-4 bg-white border border-black/10 rounded-2xl outline-none focus:border-black font-bold capitalize"
              >
                {Object.keys(UNITS[category]).map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-4 bg-white border border-black/10 rounded-2xl outline-none focus:border-black font-bold capitalize"
            >
              {Object.keys(UNITS[category]).map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-12 bg-black/[0.02] rounded-[40px] border border-black/5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Result</div>
          <div className="text-5xl font-black tracking-tighter break-all">{convert()}</div>
          <div className="text-sm font-bold text-black/40 mt-2 capitalize">{toUnit}</div>
        </div>
      </div>
    </div>
  );
};
