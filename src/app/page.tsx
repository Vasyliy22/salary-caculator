"use client"

import { FormEvent, useState } from "react";

// import Image from "next/image";

export default function Home() {
  const [rate, setRate] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [night, setNight] = useState<string>("");
  const [shifts, setShifts] = useState<string>("");
  const [salary, setSalary] = useState(0);
  const [daysSalary, setDaysSalary] = useState(0);
  const [nightsSalary, setNightsSalary] = useState(0);
  const [norms, setNorms] = useState(0);
  const [ratePerHour, setRatePerHour] = useState(0);
  const [ratePerHourAtNight, setRatePerHourAtNight] = useState(0);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normOfHours = 11 * +shifts;
    const ratePerHour = +(+rate / normOfHours).toFixed(1);
    const ratePerHourAtNight = +(+rate / normOfHours).toFixed(1) * 1.2;
    const dayHoursFromNight = (+night * 11) - (+night * 7);

    const nightHours = (+night * 11) - dayHoursFromNight;
    const dayHours = (+days * 11) + dayHoursFromNight;

    const resultOfDays = (dayHours * +ratePerHour ) + +bonus;
    const resultOfNights = (nightHours * +ratePerHour) * 1.2;

    setSalary(resultOfDays + resultOfNights);
    setDaysSalary(resultOfDays);
    setNightsSalary(resultOfNights);
    setNorms(normOfHours);
    setRatePerHour(ratePerHour);
    setRatePerHourAtNight(ratePerHourAtNight)
    setRate("");
    setDays("");
    setNight("");
    setBonus("");
    setShifts("");
  }

  return (
    <main className="flex flex-col gap-3 p-2 rounded-lg bg-gray-400">
      <h1 className="text-white font-semibold text-center uppercase"> {salary > 0 && !Number.isNaN(salary) ? "Your Salary" : "Salary Calculator"}</h1>
      {salary <= 0 || Number.isNaN(salary) ?
      <form className="p-2 bg-gray-500 flex flex-col gap-3 border border-white rounded-md" action="" onSubmit={handleSubmit}>
        <label className="p-2 flex items-center gap-4 text-white uppercase border rounded-md bg-gray-700" htmlFor="">
          Rate
          <input
            className="w-full outline-none border-b appearance-none"
            type={"number"}
            placeholder={"Enter your rate (Ставка)"}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </label>
        <label className="p-2 flex items-center gap-4 text-white uppercase border rounded-md bg-gray-700" htmlFor="">
          Bonus
          <input
            className="w-full outline-none border-b appearance-none"
            type="number"
            placeholder="Enter your bonus (Премія)"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </label>
        <label className="p-2 flex items-center gap-4 text-white uppercase border rounded-md bg-gray-700" htmlFor="">
          Changes
          <input 
            className="w-full outline-none border-b appearance-none"
            placeholder="Enter number of changes (Кількість змін)" 
            type="number" 
            value={shifts} 
            onChange={(e) => setShifts(e.target.value)}
          />
        </label>
        <label className="p-2 flex items-center gap-4 text-white uppercase border rounded-md bg-gray-700" htmlFor="">
          Days
          <input
            className="w-full outline-none border-b appearance-none" 
            placeholder="Enter day shift (Денні зміни)"
            type="number" 
            value={days} 
            onChange={(e) => setDays(e.target.value)}
          />
        </label>
        
        <label className="p-2 flex items-center gap-4 text-white uppercase border rounded-md bg-gray-700" htmlFor="">
          Nights
          <input
            className="w-full outline-none border-b appearance-none" 
            placeholder="Enter night shift (Нічні зміни)" 
            type="number" 
            value={night} 
            onChange={(e) => setNight(e.target.value)}
          />
        </label>
        
        
        <div className="mx-20 p-2 bg-gray-800 text-amber-50 flex flex-row-reverse justify-around border rounded-md">
          {/* <p className="py-1 px-2 border rounded-md">{salary ? salary : 'Your salary'}</p> */}
          <button type="submit">Calculate</button>
        </div>
      </form>
      :
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Salary: ${salary}`}</h2>
          <div className="p-2 bg-white border rounded-md border-amber-50">
            <h1 className="mb-5 py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-800 border rounded-md">Details</h1>
            <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Days: ${daysSalary}`}</h2>
            <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Nights: ${nightsSalary}`}</h2>
            <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Norms of hours: ${norms}`}</h2>
            <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Rate per hour: ${ratePerHour}`}</h2>
            <h2 className="py-1 px-4 font-bold text-2xl text-gray-300 text-center bg-gray-700 border rounded-md">{`Rate per hour in night: ${ratePerHourAtNight}`}</h2>
          </div>
          
        </div>
        <button className="p-2 w-[200px] m-auto text-white uppercase border rounded-md bg-gray-700" onClick={() => setSalary(0)}>Back to calculator</button>
      </div>
      }
    </main>
  );
}
