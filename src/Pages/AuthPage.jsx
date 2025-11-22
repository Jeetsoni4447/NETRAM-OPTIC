import React, { useState } from 'react';
import Login from '../Comps/Login';
import Register from '../Comps/Register';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 transition-all duration-300">
            <div className="w-full max-w-md p-6">
                {isLogin ? (
                    <>
                        <Login onLogin={(user) => console.log('Logged in:', user)} />
                        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
                            Don’t have an account?{' '}
                            <button onClick={toggleForm} className="text-blue-600 dark:text-blue-400 hover:underline">
                                Register
                            </button>
                        </p>
                    </>
                ) : (
                    <>
                        <Register onRegister={(user) => console.log('Registered:', user)} />
                        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
                            Already have an account?{' '}
                            <button onClick={toggleForm} className="text-blue-600 dark:text-blue-400 hover:underline">
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
