import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React,{useState} from 'react';
import { Head } from '@inertiajs/react';
import { Select, Option } from "@material-tailwind/react";
import GaugeChart from 'react-gauge-chart'
import GaugeComponent from 'react-gauge-component'
import { useEffect } from 'react';
export default function Dashboard({ auth,classes,register,grades }) {

  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedComment, setSelectedComment] = useState('');
  const [presentValue, setPresentValue] = useState(0);
  const [text,setText]  = useState('');
  const [maxCount, setMaxCount] = useState(0);

  const [color, setColor] = useState('#5BE12C');
       
 

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);

  }

  const handleCommentChange = (e) => {
    setSelectedComment(e.target.value);
    const comment = e.target.value;
    switch (comment) {
      case "Present":
        setColor('#5BE12C');
        setText('Present Pupils:' + " ")
        break;
      case "Absent":
        setColor('#FF0000');
        setText('Absent Pupils:' + " " )
        break;
      case "Sick":
        setColor('#F5CD19');
        setText('Sick Pupils:' + " ")
        break;
      default:
        setColor('#AAAAAA');
    }

  }
  
  useEffect(() => {
    handleChange();
  }, [selectedGrade, selectedClass, selectedComment]);


        const handleChange = () => {
          const filteredRegisters = register
            .filter(register => register.grade_id == selectedGrade)
            .filter(register => register.class_id == selectedClass);
          
          const count = filteredRegisters.length;
          setMaxCount(count);
        
          const comment = filteredRegisters.filter(register => register.comment == selectedComment).length;
          setPresentValue(comment);
        }; 
    

 
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
                    <select 
                    onChange={
                      ((e) => handleGradeChange(e))
                    }
                    className='select mt-3 select-ghost w-full text-black items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
                    value={selectedGrade}
                    label="Filter By Grade">
                      <option value="">- Filter By Grade -</option>
                        {grades.map((grade) => (
                          <option key={grade.id} value={grade.id}>{grade.name}</option>
                        ))}
                      </select>
                            </div>

                            <div className="flex-1">
                            <select 
                            onChange={
                              ((e) => handleClassChange(e))
                            }
                            className='select mt-3 select-ghost w-full text-black items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
                            value={selectedClass}
                            label="Filter by Class">
                           <option value="">- Filter by Class -</option>
                                {classes?.map((clas) => (
                                  <option key={clas.id} value={clas.id}>{clas.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex-1">
                            <select 
                            onChange={
                              ((e) => handleCommentChange(e))
                            }
                            className='select mt-3 select-ghost w-full text-black items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
                            value={selectedComment}
                            label="Filter by Comment">
                              <option value="">- Filter by comment -</option>
                              {Array.from(new Set(register.map((register) => register.comment)).values()).map((comment, index) => (
                                  <option key={index} value={comment}>
                                    {comment}
                                  </option>
                                ))}
                            </select>
                            </div>
                           
                    </div>
                    <div id="gauge" className='py-20  '>
                    <div>
        
                   </div>
                    <GaugeComponent
                     type="radial"
                      
                     arc={{
                     
                        width: 0.2,
                        padding: 0.005,
                        cornerRadius: 1,
                     
                        // subArcs: sortedarcs,
                        subArcs: [
                          
                          {
                            limit: presentValue,
                            color: color,                  
                            showTick: true,
                            tooltip: {
                              text: text + presentValue,
                            },
                          },
                          
                            { color: '#AAAAAA' }
                          
                        ],
                      }}
                          pointer={{
                            elastic: true,
                            animationDelay: 0
                          }}
                          labels={{
                         
                            tickLabels: {
                              type: 'outer',
                      
                              ticks: [
                               
                              ],
                            }
                          }}
                          textColor="black"
                          needleColor="F5CD19"  
                          maxValue={maxCount != 0 ?maxCount:100}
                          value={presentValue}
                    />
            
                    </div>
                    </div>

                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
