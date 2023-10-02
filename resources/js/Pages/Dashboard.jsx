import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Select, Option } from "@material-tailwind/react";
import GaugeChart from 'react-gauge-chart'
import GaugeComponent from 'react-gauge-component'
export default function Dashboard({ auth }) {

       // The gauge value
        const presentValue = 15; // The value representing "present"
        const absentValue = 50; // The value representing "absent"
        const sickValue = 10; // 

        const totalValue = presentValue + absentValue + sickValue;
        
        const numberOfValues = 3; // Assuming you have three values
const average = totalValue / numberOfValues;

        const highestPercentage = Math.max(presentValue, absentValue, sickValue);

        const subArcs = [
            {
              limit: absentValue,
              color: '#EA4228',
              showTick: true,
              tooltip: {
                text: 'Absent Pupils:'+ " " +absentValue,
              },
            },
            {
              limit: sickValue,
              color: '#F5CD19',
              showTick: true,
              tooltip: {
                text: 'Sick Pupils:'+ " " +sickValue,
              },
            },
            {
              limit: presentValue,
              color: '#5BE12C',
              showTick: true,
              tooltip: {
                text: 'Present Pupils:'+ " " +presentValue,
              },
            },
            { color: '#EA4228' }
          ];

          
        const sortedarcs = subArcs.sort((a, b) => a.limit - b.limit);
    
// Use the highest percentage as the gauge value
const gaugeValue = highestPercentage;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white flex flex-col space-x-5 py-10 px-10 max-fit-h overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='flex space-x-10'>
                    <div className="flex-1">
                            <Select label="Filter By Grade">
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                            </div>

                            <div className="flex-1">
                            <Select label="Filter by Class">
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                            </div>

                            <div className="flex-1">
                            <Select label="Filter by Comment">
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                            </div>
                           
                    </div>
                    <div id="gauge" className='py-20  '>
                    <div>
        <p>Absent:  <span className='bg-[#EA4228] h-10 w-10 '></span></p>
        <p>Sick:  <span className='bg-[#EA4228] h-10 w-10 '></span></p>
        <p>Present:  <span className='bg-[#EA4228] h-10 w-10 '></span></p>
      </div>
                    <GaugeComponent
                     type="radial"
                         arc={{
                         
                            width: 0.2,
                            padding: 0.005,
                            cornerRadius: 1,
                         
                            subArcs: sortedarcs,
                          }}
                          pointer={{
                            elastic: true,
                            animationDelay: 0
                          }}
                          labels={{
                            valueLabel: { formatTextValue: value => value + '%' },
                            tickLabels: {
                              type: 'outer',
                              valueConfig: { formatTextValue: value => value + '%', fontSize: 10 },
                              ticks: [
                               
                              ],
                            }
                          }}
                          textColor="black"
                          maxValue={highestPercentage}
                          value={presentValue}
                    />
            
                    </div>
                    </div>

                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
