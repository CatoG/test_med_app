import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard/DoctorCard';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import './FindDoctorSearch/FindDoctorSearch.css';

const BookingConsultation = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        // Fetch doctors data
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    return (
        <div>
            <FindDoctorSearch onSearch={handleSearch} />
            
            {isSearched && (
                <center>
                    <div className="search-results-container" style={{ marginTop: '2rem' }}>
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
                </center>
            )}
        </div>
    );
};

export default BookingConsultation;
