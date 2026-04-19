import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Zap, Sun, Battery, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';

const Calculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('solar-size');

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Calculators</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Calculate your savings, system requirements, and ROI with our interactive calculators
          </p>
        </div>
      </section>

      {/* Calculator Tabs */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2">
            {[
              { id: 'solar-size', icon: <Sun className="w-5 h-5" />, label: 'Solar System Size' },
              { id: 'bill', icon: <Zap className="w-5 h-5" />, label: 'Electricity Bill' },
              { id: 'panel', icon: <Calculator className="w-5 h-5" />, label: 'Panel Requirement' },
              { id: 'battery', icon: <Battery className="w-5 h-5" />, label: 'Battery Backup' },
              { id: 'emi', icon: <CreditCard className="w-5 h-5" />, label: 'EMI Calculator' },
              { id: 'roi', icon: <TrendingUp className="w-5 h-5" />, label: 'ROI Calculator' }
            ].map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {calc.icon}
                {calc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCalculator === 'solar-size' && <SolarSizeCalculator />}
          {activeCalculator === 'bill' && <BillCalculator />}
          {activeCalculator === 'panel' && <PanelCalculator />}
          {activeCalculator === 'battery' && <BatteryCalculator />}
          {activeCalculator === 'emi' && <EMICalculator />}
          {activeCalculator === 'roi' && <ROICalculator />}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-4">Get Accurate Quote</h2>
          <p className="text-primary-100 mb-6">These calculators give estimates. Get a detailed quote from our experts.</p>
          <Link to="/get-quote" className="btn bg-white text-primary-700 hover:bg-gray-100">
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const SolarSizeCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [electricityRate, setElectricityRate] = useState(7);
  const [sunHours, setSunHours] = useState(5);

  const dailyConsumption = (monthlyBill / electricityRate / 30).toFixed(2);
  const systemSizeKW = ((dailyConsumption * 1000) / (sunHours * 1000)).toFixed(2);
  const estimatedCost = (systemSizeKW * 40000).toFixed(0);
  const monthlySavings = (monthlyBill * 0.9).toFixed(0);
  const yearlySavings = (monthlySavings * 12).toFixed(0);

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Solar System Size Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate the solar system size based on your electricity bill.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Electricity Bill (₹)</label>
          <input
            type="range"
            min="500"
            max="20000"
            step="100"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>₹500</span>
            <span className="font-semibold text-primary-600">₹{monthlyBill}</span>
            <span>₹20,000</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Rate (₹/unit)</label>
          <input
            type="number"
            value={electricityRate}
            onChange={(e) => setElectricityRate(Number(e.target.value))}
            className="input"
            min="3"
            max="12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Average Sun Hours</label>
          <input
            type="number"
            value={sunHours}
            onChange={(e) => setSunHours(Number(e.target.value))}
            className="input"
            min="3"
            max="7"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">Results</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Daily Consumption</p>
            <p className="text-2xl font-bold text-primary-600">{dailyConsumption} kWh</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Recommended System</p>
            <p className="text-2xl font-bold text-primary-600">{systemSizeKW} kW</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estimated Cost</p>
            <p className="text-2xl font-bold text-primary-600">₹{Number(estimatedCost).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Savings</p>
            <p className="text-2xl font-bold text-primary-600">₹{monthlySavings}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">Yearly Savings: ₹{Number(yearlySavings).toLocaleString()}</p>
      </div>
    </div>
  );
};

const BillCalculator = () => {
  const [currentBill, setCurrentBill] = useState(3000);
  const [consumption, setConsumption] = useState(400);

  const solarSavings = (currentBill * 0.9).toFixed(0);
  const newBill = (currentBill * 0.1).toFixed(0);

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Electricity Bill Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate your expected savings after solar installation.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Bill (₹)</label>
          <input
            type="number"
            value={currentBill}
            onChange={(e) => setCurrentBill(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Consumption (kWh)</label>
          <input
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">Expected Savings (90%)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Monthly Savings</p>
            <p className="text-3xl font-bold text-primary-600">₹{solarSavings}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">New Monthly Bill</p>
            <p className="text-3xl font-bold text-primary-600">₹{newBill}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yearly Savings</p>
            <p className="text-2xl font-bold text-primary-600">₹{Number(solarSavings * 12).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">5-Year Savings</p>
            <p className="text-2xl font-bold text-primary-600">₹{Number(solarSavings * 60).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PanelCalculator = () => {
  const [roofArea, setRoofArea] = useState(200);
  const [efficiency, setEfficiency] = useState(17);

  const panelCount = Math.floor(roofArea / 1.7);
  const systemCapacity = (panelCount * 0.545).toFixed(2);
  const estimatedOutput = (systemCapacity * 5 * 365 / 1000).toFixed(0);

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Panel Requirement Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate number of panels based on available roof area.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Roof Area (sq ft)</label>
          <input
            type="number"
            value={roofArea}
            onChange={(e) => setRoofArea(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Panel Efficiency (%)</label>
          <input
            type="number"
            value={efficiency}
            onChange={(e) => setEfficiency(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">Results</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Panels Required</p>
            <p className="text-3xl font-bold text-primary-600">{panelCount} panels</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">System Capacity</p>
            <p className="text-3xl font-bold text-primary-600">{systemCapacity} kW</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Annual Generation</p>
            <p className="text-2xl font-bold text-primary-600">{estimatedOutput} kWh</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">CO2 Saved/Year</p>
            <p className="text-2xl font-bold text-primary-600">{Math.round(Number(estimatedOutput) * 0.7)} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BatteryCalculator = () => {
  const [load, setLoad] = useState(1000);
  const [backupHours, setBackupHours] = useState(6);

  const batteryAh = Math.ceil((load * backupHours) / 48);
  const batteryCount = Math.ceil(batteryAh / 150);
  const cost = batteryCount * 50000;

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Battery Backup Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate battery requirements for backup power.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Load (Watts)</label>
          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Hours Required</label>
          <input
            type="number"
            value={backupHours}
            onChange={(e) => setBackupHours(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">Battery Requirement</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Battery Capacity</p>
            <p className="text-3xl font-bold text-primary-600">{batteryAh} Ah</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Batteries Required</p>
            <p className="text-3xl font-bold text-primary-600">{batteryCount} units</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Estimated Cost</p>
            <p className="text-3xl font-bold text-primary-600">₹{cost.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(36);

  const monthlyRate = rate / 12 / 100;
  const emi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));
  const totalInterest = Math.round(emi * months - principal);

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate monthly EMI for solar financing.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Principal Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (months)</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">EMI Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Monthly EMI</p>
            <p className="text-3xl font-bold text-primary-600">₹{emi.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Interest</p>
            <p className="text-2xl font-bold text-primary-600">₹{totalInterest.toLocaleString()}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-500">Total Payment</p>
            <p className="text-2xl font-bold text-primary-600">₹{(principal + totalInterest).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const [systemCost, setSystemCost] = useState(150000);
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [lifespan, setLifespan] = useState(25);

  const yearlySavings = monthlyBill * 12 * 0.9;
  const totalSavings = yearlySavings * lifespan;
  const roi = (((totalSavings - systemCost) / systemCost) * 100).toFixed(0);
  const paybackYears = (systemCost / yearlySavings).toFixed(1);

  return (
    <div className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">ROI Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate return on investment for your solar system.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">System Cost (₹)</label>
          <input
            type="number"
            value={systemCost}
            onChange={(e) => setSystemCost(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Bill Before Solar (₹)</label>
          <input
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">System Lifespan (years)</label>
          <input
            type="number"
            value={lifespan}
            onChange={(e) => setLifespan(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">ROI Analysis</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Payback Period</p>
            <p className="text-3xl font-bold text-primary-600">{paybackYears} years</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total ROI</p>
            <p className="text-3xl font-bold text-primary-600">{roi}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Yearly Savings</p>
            <p className="text-2xl font-bold text-primary-600">₹{yearlySavings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{lifespan}-Year Savings</p>
            <p className="text-2xl font-bold text-primary-600">₹{totalSavings.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;