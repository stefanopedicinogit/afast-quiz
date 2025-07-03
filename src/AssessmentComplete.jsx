import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentComplete = () => {
    const [id, setId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        localStorage.setItem('loginId', id);
        navigate('/quiz');
    };

    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container-left">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <p className='logo'>
                                    <h1>AFAST</h1>
                                </p>
                                <p>
                                    <h1 style={{ color: 'white' }}>LOGIN</h1>
                                </p>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div class="main-banner" id="top">
                <div className="container">
                    <h2 className='supporto'>Grazie per il tuo supporto</h2>
                </div>
            </div>
        </div>
    );
};

export default AssessmentComplete;