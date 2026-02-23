import React, { useState } from 'react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return null;

    let bmi = 0;
    if (unit === 'metric') {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (w / (h * h)) * 703;
    }
    return bmi.toFixed(1);
  };

  const bmi = calculateBMI();
  
  const getStatus = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Normal', color: 'text-emerald-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-orange-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="flex bg-black/5 p-1 rounded-xl">
          <button 
            onClick={() => setUnit('metric')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unit === 'metric' ? 'bg-white shadow-sm' : 'text-black/40'}`}
          >
            Metric (kg/cm)
          </button>
          <button 
            onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unit === 'imperial' ? 'bg-white shadow-sm' : 'text-black/40'}`}
          >
            Imperial (lb/in)
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Weight ({unit === 'metric' ? 'kg' : 'lb'})</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black transition-all"
              placeholder="Enter weight..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Height ({unit === 'metric' ? 'cm' : 'in'})</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black transition-all"
              placeholder="Enter height..."
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-black/[0.02] rounded-3xl border border-black/5 text-center">
        {bmi ? (
          <>
            <div className="text-5xl font-black mb-2 tracking-tighter">{bmi}</div>
            <div className={`text-xl font-bold ${getStatus(parseFloat(bmi)).color}`}>
              {getStatus(parseFloat(bmi)).label}
            </div>
            <div className="mt-6 w-full h-2 bg-black/5 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500" style={{ width: '18.5%' }} />
              <div className="h-full bg-emerald-500" style={{ width: '6.5%' }} />
              <div className="h-full bg-orange-500" style={{ width: '5%' }} />
              <div className="h-full bg-red-500" style={{ width: '70%' }} />
            </div>
            <div className="flex justify-between w-full mt-2 text-[10px] text-black/40 font-bold uppercase tracking-wider">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
            </div>
          </>
        ) : (
          <div className="text-black/20">
            <p className="font-bold">Enter your details</p>
            <p className="text-sm">to see your results</p>
          </div>
        )}
      </div>
    </div>
  );
};
