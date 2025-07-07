const Error = () => {

    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container-left">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <div className='logo'>
                                    <h1 href="/">AFAST</h1>
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
                    <h2 className='supporto'>Errore generico, contattare l'assistenza.</h2>
                </div>
            </div>
        </div>
    );
};

export default Error;