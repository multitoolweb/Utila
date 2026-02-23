import React, { useState } from 'react';
import { DollarSign, Percent, Calendar, RefreshCw } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('100000');
  const [rate, setRate] = useState<string>('7.5');
  const [tenure, setTenure] = useState<string>('12');

  const calculateEMI = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);

    if (!p || !r || !n) return null;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    };
  };

  const results = calculateEMI();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Loan Amount</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all font-bold text-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Interest Rate (%)</label>
            <div className="relative">
              <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Tenure (Months)</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-black/[0.02] rounded-[40px] border border-black/5 text-center">
        {results ? (
          <div className="space-y-8 w-full">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">Monthly EMI</div>
              <div className="text-5xl font-black tracking-tighter text-emerald-600">${results.emi}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="text-lg font-black">${results.totalInterest}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">Total Interest</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="text-lg font-black">${results.totalPayment}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">Total Payment</div>
              </div>
            </div>

            <button 
              onClick={() => { setAmount('100000'); setRate('7.5'); setTenure('12'); }}
              className="text-xs font-bold text-black/40 hover:text-black flex items-center gap-2 mx-auto transition-colors"
            >
              <RefreshCw size={14} />
              Reset Calculator
            </button>
          </div>
        ) : (
          <div className="text-black/20">
            <p className="font-bold">Enter loan details</p>
            <p className="text-sm">to calculate your monthly EMI</p>
          </div>
        )}
      </div>
    </div>
  );
};
