import React, { useState, useEffect } from 'react';
import ExperienceItem from '../experienceItem/ExperienceItem'

export default function ExperienceList({ nameIns, addExperienceList }) {

    const [experienceListComp, setExperienceListComp] = useState([]);
    const [experienceList, setExperienceList] = useState([]);

    const updateExperienceList = (objExperience) => {
        setExperienceList((prevExperienceList) => [...prevExperienceList, objExperience]);
    }

    useEffect(() => {
        addExperienceList(experienceList);
      }, [experienceList]);

    const addWorkExperienceBtn = (e) => {
        e.preventDefault();
        setExperienceListComp((prevList) => [...prevList, { id: prevList.length + 1 }]);
    }

    return (
        <div>
            <button className="font-extrabold text-xs mt-4" onClick={addWorkExperienceBtn}>+ Add Experience</button>
            {experienceListComp.map((item) => {
                return <ExperienceItem nameIns={nameIns} key={item.id} saveItem={updateExperienceList}/>
            })}
        </div>
    )
}
