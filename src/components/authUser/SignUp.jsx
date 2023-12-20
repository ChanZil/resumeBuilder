import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/users';


export default function SignUp() {
    const { signUpEmailPassword } = useContext(UserContext);
    const navigate = useNavigate();

    const [signInInput, setSignInInput] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setSignInInput({ ...signInInput, [name]: value });
    }

    const signUpBtn = async () => {
        try {
            signUpEmailPassword(signInInput.email, signInInput.password);
            //check
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const toSignInBtn = () => {
        navigate('/');
    }

    return (
        <div className='bg-[#07142B] min-h-screen flex items-center justify-center'>
            <div className="flex flex-col items-center justify-center w-11/12 md:w-5/12 h-96 bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <div className="flex flex-col space-y-4 md:w-full max-w-xs">
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
                        onClick={signUpBtn}
                    >
                        Sign Up
                    </button>
                    <p className='text-sm text-center'>Already have an Account? <button onClick={toSignInBtn} className='text-blue-500'>Sign In</button></p>
                </div>
            </div>
        </div>
    )
}
