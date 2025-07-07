import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [enterprise_id, setEnterpriseId] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://afast-backend.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ enterprise_id }),
        });

        if (response.ok) {
            localStorage.setItem('loginId', enterprise_id);
            navigate('/quiz');
        } else {
            setError('ID already found!');
            navigate('/duplicato');
        }
    };

    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container-left">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <div className='logo'>
                                    <h1>AFAST</h1>
                                </div>
                                <div>
                                    <h1 style={{ color: 'white' }}>LOGIN</h1>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div className="main-banner" id="top">
                <div className="container">
                    <form onSubmit={handleLogin}>
                        <h2 className="mb-5">Enter your Enterprise ID:</h2>
                        {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> */}
                        <input
                            type="text"
                            value={enterprise_id}
                            onChange={(e) => setEnterpriseId(e.target.value)}
                            style={{
                                backgroundColor: "#fff",
                                border: "none",
                                borderRadius: "50px",
                                padding: "20px 40px",
                                fontSize: "1em",
                                fontWeight: "bold",
                                cursor: 'text',
                                marginBottom: "20px",
                            }}
                        />
                        <br />
                        <button type="submit">Login</button>
                        {/* </div> */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;