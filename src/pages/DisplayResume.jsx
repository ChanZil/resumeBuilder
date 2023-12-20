import React, { useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import UserContext from '../context/users';

export default function DisplayResume() {
  const { addResume, userConnected, uploadFile } = useContext(UserContext);

  //recieving resume data
  const location = useLocation();
  const resumeDetails = location.state?.resumeDetails;
  const workExperience = location.state?.workExperience;
  const education = location.state?.education;
  const imgResume = location.state?.imgResume;
  const imgUpload = location.state?.imgUpload;

  const toDateFormat = (date) => {
    date.toString();
    const dateArray = date.split(" ");
    return <h3>{dateArray[1]} {dateArray[3]}</h3>
  }

  //back to home page btn
  const navigate = useNavigate();
  const backHomeBtnHandle = () => {
    navigate('/home');
  }

  //save the resume in database
  const saveResumeBtn = async (resumeName) => {
    console.log(userConnected);
    console.log("file to upload: ", imgUpload);
    uploadFile(imgUpload);
    const newResume = {
      city: resumeDetails.city,
      country: resumeDetails.country,
      email: resumeDetails.email,
      fullName: resumeDetails.fullName,
      profession: resumeDetails.profession,
      resumeName: resumeName,
      userId: userConnected,
      education: education,
      workExperience: workExperience,
    }
    console.log(newResume);
    addResume(newResume);
  }

  const beforeSave = () => {
    let resume = prompt("Please enter resume name:", "new resume");
    saveResumeBtn(resume);
    navigate('/home');
  }

  //pdf download
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('file.pdf');
    })
  }


  return (
    <div className='bg-[#07142B] min-h-screen flex justify-center'>
      <div className="container w-4/6 py-8 bg-white">
        <div className='flex justify-evenly'>
          <button className="bg-[#FFC85E] hover:bg-[#07142B] text-white py-2 px-4 rounded mb-4" onClick={backHomeBtnHandle}>Back</button>
          <button className="bg-[#FFC85E] hover:bg-[#07142B] text-white py-2 px-4 rounded mb-4" onClick={beforeSave}>Save</button>
          <button className="bg-[#FFC85E] hover:bg-[#07142B] text-white py-2 px-4 rounded mb-4" onClick={downloadPdf}>Download PDF</button>
        </div>
        <div className='w-full flex justify-center'>
          <form class="w-11/12 shadow-2xl" ref={pdfRef}>
            <div className='w-full bg-black h-56 flex justify-start items-center'>
              <img className='rounded-full w-40 h-40 ms-12 me-12' src={imgResume} />
              <div className='text-white text-end'>
                <h1 className='text-7xl font-semibold mt-8'>{resumeDetails.fullName}</h1>
                <h3 className='text-2xl'>{resumeDetails.profession}</h3>
                <div className='flex justify-between mt-12 mb-0'>
                  <h3>{resumeDetails.email}</h3>
                  <h3>{resumeDetails.city}</h3>
                  <h3>{resumeDetails.country}</h3>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <div className='w-10/12'>
                <h3 className='mt-12 mb-4 font-bold'>Work Experience: </h3>
                {workExperience.map((element, index) => (
                  <div key={index} className='w-full flex'>
                    <div className='flex text-xs font-bold ms-4 me-12'>
                      {toDateFormat(element.from)} -
                      {toDateFormat(element.to)}
                    </div>
                    <div>
                      <h3>{element.nameExp}</h3>
                      <h3 className='mb-12'>{element.description}</h3>
                    </div>
                  </div>
                ))}
                <h3 className='mb-4 font-bold'>Education: </h3>
                {education.map((element, index) => (
                  <div key={index} className='w-full flex'>
                    <div className='flex text-xs font-bold ms-4 me-12'>
                      {toDateFormat(element.from)} -
                      {toDateFormat(element.to)}
                    </div>
                    <div>
                      <h3>{element.nameExp}</h3>
                      <h3 className='mb-12'>{element.description}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
