import React, { useEffect, useState } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem('allAppointments') || '[]');
    setReports(allAppointments);
  }, []);

  const handleViewReport = (report) => {
    alert(`Report Details:\n\nDoctor: ${report.doctorName}\nSpeciality: ${report.doctorSpeciality}\nDate: ${report.date}\nTime: ${report.timeSlot}\nPatient: ${report.patientName}\nPhone: ${report.phoneNumber}`);
  };

  const handleDownloadReport = (report, index) => {
    // Download the existing PDF file
    const link = document.createElement('a');
    link.href = '/patient_report.pdf';
    link.download = `Patient_Report_${index + 1}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <h1>Reports</h1>
      
      {reports.length > 0 ? (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.doctorName}</td>
                <td>{report.doctorSpeciality}</td>
                <td>
                  <button className="btn view-btn" onClick={() => handleViewReport(report)}>
                    View Report
                  </button>
                </td>
                <td>
                  <button className="btn download-btn" onClick={() => handleDownloadReport(report, index)}>
                    Download Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-reports">
          <p>No reports available</p>
          <p>Book an appointment to generate reports</p>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;
