import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExperienceList from '../components/experienceList/ExperienceList';
import UploadImage from '../components/uploadImage/UploadImage';


export default function InputResume() {

  //back to home page btn
  const navigate = useNavigate();
  const backHomeBtnHandle = () => {
    navigate('/home');
  }

  const [resumeInput, setResumeInput] = useState({
    fullName: '',
    profession: '',
    email: '',
    city: '',
    country: ''
  });
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [imgResume, setImgResume] = useState("https://thumb.silhouette-ac.com/t/44/44517f6efbda71b4f20a443febf8c0ba_w.jpeg");
  const [imgUpload, setImgUpload] = useState(null);

  // display resume page btn
  const createResumeBtnHandle = () => {
    navigate('/displayResume', {
      state: {
        resumeDetails: resumeInput,
        workExperience: workExperience,
        education: education,
        imgResume: imgResume,
        imgUpload: imgUpload
      }
    });
  }

  const addWorkExperienceList = (experienceList) => {
    setWorkExperience(experienceList);
  }

  const addEducationList = (experienceList) => {
    setEducation(experienceList);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setResumeInput({ ...resumeInput, [name]: value });
  }

  return (
    <div className='bg-[#07142B] min-h-screen flex justify-center'>
      <div className="container w-4/6 py-8">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <button className="bg-[#FFC85E] hover:bg-[#07142B] text-white py-2 px-4 rounded mb-4" onClick={backHomeBtnHandle}>
            Back
          </button>
          <h1 className="text-3xl font-bold mb-8 text-center">Create Resume</h1>
          <form>
            <div className='flex justify-between items-center'>
              <div className="flex flex-col w-11/12">
                <div className='mb-4 flex flex-col'>
                  <label className="text-sm font-semibold">Full Name:</label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    name="fullName"
                    type="text"
                    onChange={changeHandler}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className="text-sm font-semibold">Email:</label>
                  <input
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    name="email"
                    type="text"
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className=" w-3/6 h-full flex justify-end items-end mt-2">
                <UploadImage imgResume={imgResume} setImgResume={setImgResume} setImgUpload={setImgUpload}/>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold">Profession:</label>
              <input
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                name="profession"
                type="text"
                onChange={changeHandler}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div>
                <label className="text-sm font-semibold">City:</label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  name="city"
                  type="text"
                  onChange={changeHandler}
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Country:</label>
                <input
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  name="country"
                  type="text"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold">Work Experience:</label>
              <ExperienceList nameIns="Company" addExperienceList={addWorkExperienceList} />
            </div>

            <div className="mt-12">
              <label className="text-sm font-semibold">Education:</label>
              <ExperienceList nameIns="School" addExperienceList={addEducationList} />
            </div>

            <div className='w-full flex justify-center'>
              <button
                className="bg-[#FFC85E] hover:bg-[#07142B] text-white py-2 px-24 rounded mt-8"
                onClick={createResumeBtnHandle}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
