import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ExperienceItem(props) {
    const { nameIns, saveItem } = props;
    const [experienceInput, setExperienceInput] = useState({
        from: '',
        to: '',
        nameExp: '',
        description: ''
    })
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [displaySave, setDisplaySave] = useState("block");

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setExperienceInput({ ...experienceInput, [name]: value });
    }

    const changeDateHandler = (name, date) => {
        setExperienceInput({ ...experienceInput, [name]: date.toString() });
    }

    const saveBtnHandler = (e) => {
        e.preventDefault();
        saveItem(experienceInput);
        setDisplaySave("none");
    }

    return (
        <div className="mt-8">
            <div className='flex justify-evenly'>
                <div className='ms-2'>
                    <h3 class="font-semibold">From: </h3>
                    <DatePicker
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            changeDateHandler("from", startDate);
                        }} />
                </div>

                <div className='ms-2'>
                    <h3 class="font-semibold">To: </h3>
                    <DatePicker
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date);
                            changeDateHandler("to", endDate);
                        }} />
                </div>
            </div>

            <div className='flex justify-evenly mt-8'>
                <div>
                    <h3 class="font-semibold">{nameIns} Name: </h3>
                    <input class="border border-gray-300 rounded-md" name='nameExp' type="text" onChange={changeHandler} />
                </div>

                <div>
                    <h3 class="font-semibold">Description: </h3>
                    <textarea class="border border-gray-300 rounded-md" name='description' type="text" onChange={changeHandler} />
                </div>
            </div>

            <div className='w-full flex justify-center font-extrabold mb-24'>
                <button style={{display: displaySave}} onClick={saveBtnHandler}>save</button>
            </div>
        </div>
    )
}
