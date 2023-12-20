import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/users';
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
    const { signInEmailPassword, signInGoogle, userConnected, getResumeByUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [signInInput, setSignInInput] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSignInInput({ ...signInInput, [name]: value });
    }

    const signInBtn = async () => {
        try {
            await signInEmailPassword(signInInput.email, signInInput.password);
        } catch (err) {
            console.log(err);
        }
    }

    const signInGoogleBtn = async () => {
        try {
            await signInGoogle();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (userConnected) {
            navigate('/home ');
        }
    }, [userConnected])


    const toSignUpBtn = () => {
        navigate('/signUp');
    }

    return (
        <div className='bg-[#07142B] min-h-screen flex items-center justify-center'>
            <div className="flex flex-col items-center justify-center w-11/12 md:w-5/12 h-96 bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <div className="flex flex-col space-y-4 sm:w-full max-w-xs">
                    <input
                        className="border border-gray-400 px-4 py-2 rounded-md"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={changeHandler}
                    />
                    <input
                        className="border border-gray-400 px-4 py-2 rounded-md"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={changeHandler}
                    />
                    <button
                        className="bg-[#FFC85E] text-white px-4 py-2 rounded-md hover:bg-[#07142B]"
                        onClick={signInBtn}
                    >
                        Sign In
                    </button>
                    <button
                        className="bg-white px-4 py-2 border border-black rounded-md hover:bg-[#07142B] hover:border-[#07142B] hover:text-white flex justify-center" onClick={signInGoogleBtn}>
                        <div className='flex items-center justify-evenly w-9/12'>Sign In With Google <FaGoogle /></div>
                    </button>
                    <p className='text-sm text-center'>New user? <button onClick={toSignUpBtn} className='text-blue-500'>Sign Up</button></p>
                </div>
            </div>
        </div>
    )
}
