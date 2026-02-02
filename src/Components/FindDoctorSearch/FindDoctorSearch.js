import React, { useState, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../DoctorCard/DoctorCard';


const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Fetch doctors data
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }, []);
    
    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        
        // Filter doctors by speciality
        const filtered = doctors.filter(doctor => 
            doctor.speciality.toLowerCase() === speciality.toLowerCase()
        );
        setFilteredDoctors(filtered);
        setIsSearched(true);
    }
    
    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>               <i style={{color:'#000000',fontSize:'20rem'}} className="fa fa-user-md"></i>
</div>                <div className="home-search-container"  style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <div className="doctor-search-box">
                    {/* <p>Perform a search to see the results.</p> */}

                        <input type="text" className="search-doctor-input-box" placeholder="Search doctors, clinics, hospitals, etc." onFocus={() => setDoctorResultHidden(false)} onBlur={() => setDoctorResultHidden(true)} value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
                        
                        <div className="findiconimg"><img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/></div>
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => <div className="search-doctor-result-item" key={speciality} onMouseDown={() => handleDoctorSelect(speciality)}>
                                    <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{height:"10px", width:"10px"}} width="12" /></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                
                {isSearched && (
                    <div className="search-results-container" style={{marginTop: '2rem'}}>
                        <h2>{filteredDoctors.length} doctors are available</h2>
                        <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
                                <DoctorCard 
                                    key={doctor.name} 
                                    name={doctor.name}
                                    speciality={doctor.speciality}
                                    experience={doctor.experience}
                                    ratings={doctor.ratings}
                                    profilePic={doctor.profilePic}
                                />
                            ))
                        ) : (
                            <p>No doctors found.</p>
                        )}
                    </div>
                )}
            </center>
        </div>
    )
}

export default FindDoctorSearch