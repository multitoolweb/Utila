import React, { useState } from 'react';
import { format, differenceInYears, differenceInMonths, differenceInDays, parseISO } from 'date-fns';
import { Calendar, Clock, Activity } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const calculateAge = () => {
    if (!birthDate || !targetDate) return null;
    
    const start = parseISO(birthDate);
    const end = parseISO(targetDate);
    
    if (start > end) return 'Invalid date range';

    const years = differenceInYears(end, start);
    const months = differenceInMonths(end, start) % 12;
    const days = differenceInDays(end, start) % 30; // Approximation

    return { years, months, days };
  };

  const age = calculateAge();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Age at the Date of</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={20} />
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-black/[0.02] rounded-[40px] border border-black/5 text-center">
        {typeof age === 'object' && age !== null ? (
          <div className="space-y-6 w-full">
            <div className="space-y-1">
              <div className="text-6xl font-black tracking-tighter">{age.years}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-black/40">Years Old</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="text-2xl font-black">{age.months}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">Months</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="text-2xl font-black">{age.days}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">Days</div>
              </div>
            </div>
            
            <div className="pt-4 text-xs text-black/40 italic">
              Next birthday in {11 - age.months} months and {30 - age.days} days
            </div>
          </div>
        ) : (
          <div className="text-black/20">
            <Activity size={48} className="mx-auto mb-4" />
            <p className="font-bold">Select your birth date</p>
            <p className="text-sm">to calculate your exact age</p>
          </div>
        )}
      </div>
    </div>
  );
};
