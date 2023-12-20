import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/users';

export default function Home() {
  const { logOut, userConnected, resumeList, downloadFile } = useContext(UserContext);
  const navigate = useNavigate();

  const createResumeBtnHandle = () => {
    navigate('/createResume');
  };

  const signOutBtn = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  const displayResumeBtn = async (resume) => {
    const resumeInput = {
      fullName: resume.fullName,
      profession: resume.profession,
      email: resume.email,
      city: resume.city,
      country: resume.country
    }
    navigate('/displayResume', {
      state: {
        resumeDetails: resumeInput,
        workExperience: resume.workExperience,
        education: resume.education,
        imgResume: ""
      }
    });
  }

  return (
    <>
      <div className="h-16 bg-[#07142B] text-white w-full flex justify-between items-center">
        <h2 className='ms-4'>{userConnected}</h2>
        <button className='bg-[#FFC85E] hover:bg-[#07142B] h-12 px-4 rounded text-sm me-2' onClick={signOutBtn}>Sign Out</button>
      </div>
      <div className='min-h-screen flex justify-center w-full'>
        <div className='container min-h-screen'>
          <h1 className='text-5xl mt-12 text-center'>Resume Builder</h1>
          <div className='h-96 mt-8 shadow-2xl relative'>
            {resumeList.map((resume) => {
              return <button onClick={() => {displayResumeBtn(resume)}} key={resume.id} className='w-full h-8 opacity-75 hover:opacity-100 bg-[#07142B] text-white mb-0.5'>
                <p className=''>{resume.resumeName}</p>
              </button>
            })}
            <button className='bg-[#FFC85E] hover:bg-[#07142B] hover:text-white px-2 py-1 text-[#07142B] rounded text-lg absolute bottom-5 right-5 shadow-xl font-semibold' onClick={createResumeBtnHandle}>Create Resume</button>
          </div>
        </div>
      </div>
    </>
  );
}
