import { useState, useEffect } from 'react';
import { utils, read } from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import DUKModal from './DUKModal';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState(null);


  useEffect(() => {
    const loadQuestions = async () => {
      const response = await fetch('/AFAST.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(sheet);
      const shuffledQuestions = shuffleArray(data);
      setQuestions(shuffledQuestions);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    const storedLoginId = localStorage.getItem('loginId');
    if (storedLoginId) {
      setLoginId(storedLoginId);
    }
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].RispostaCorretta;
    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setUserAnswer(answer);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setUserAnswer(null);
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion + 1 === 10) {
      const saveData = async () => {
        if (loginId && score) {
          const csvContent = `${loginId},${score}\n`;
          const csvBlob = new Blob([csvContent], { type: 'text/csv' });
          const csvFile = new File([csvBlob], 'quiz_results.csv');
          // Save the file to the user's device
          const link = document.createElement('a');
          link.href = URL.createObjectURL(csvFile);
          link.download = 'quiz_results.csv';
          link.click();
        }
      };
      saveData();
      navigate('/assessment-complete');
    }
  };

  return (
    <>
      <header className="header-area header-sticky">
        <div className="container-left">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <p className='logo'>
                  <h1>AFAST</h1>
                </p>
                <p>
                  <h1 style={{ color: 'white' }}>ASSESSMENT FUNCTIONAL GAP</h1>
                </p>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div class="main-banner" id="top">
        <div className="container">

          {questions.length > 0 && (
            <div>
              <div style={{ minWidth: '1000px' }}>

                <h2 className="mb-5">{questions[currentQuestion].Domanda}</h2>
                <ul>
                  {questions[currentQuestion].RispostaA && (
                    <li>
                      <button
                        className={userAnswer === questions[currentQuestion].RispostaA && userAnswer === questions[currentQuestion].RispostaCorretta ? "correct" : userAnswer === questions[currentQuestion].RispostaA ? "incorrect" : userAnswer !== null && userAnswer !== questions[currentQuestion].RispostaCorretta && questions[currentQuestion].RispostaA === questions[currentQuestion].RispostaCorretta ? "correct" : ""}
                        onClick={() => handleAnswer(questions[currentQuestion].RispostaA)}
                        disabled={userAnswer !== null}
                      >
                        {questions[currentQuestion].RispostaA}
                      </button>
                    </li>
                  )}
                  {questions[currentQuestion].RispostaB && (
                    <li>
                      <button
                        className={userAnswer === questions[currentQuestion].RispostaB && userAnswer === questions[currentQuestion].RispostaCorretta ? "correct" : userAnswer === questions[currentQuestion].RispostaB ? "incorrect" : userAnswer !== null && userAnswer !== questions[currentQuestion].RispostaCorretta && questions[currentQuestion].RispostaB === questions[currentQuestion].RispostaCorretta ? "correct" : ""}
                        onClick={() => handleAnswer(questions[currentQuestion].RispostaB)}
                        disabled={userAnswer !== null}
                      >
                        {questions[currentQuestion].RispostaB}
                      </button>
                    </li>
                  )}
                  {questions[currentQuestion].RispostaC && (
                    <li>
                      <button
                        className={userAnswer === questions[currentQuestion].RispostaC && userAnswer === questions[currentQuestion].RispostaCorretta ? "correct" : userAnswer === questions[currentQuestion].RispostaC ? "incorrect" : userAnswer !== null && userAnswer !== questions[currentQuestion].RispostaCorretta && questions[currentQuestion].RispostaC === questions[currentQuestion].RispostaCorretta ? "correct" : ""}
                        onClick={() => handleAnswer(questions[currentQuestion].RispostaC)}
                        disabled={userAnswer !== null}
                      >
                        {questions[currentQuestion].RispostaC}
                      </button>
                    </li>
                  )}
                  {questions[currentQuestion].RispostaD && (
                    <li>
                      <button
                        className={userAnswer === questions[currentQuestion].RispostaD && userAnswer === questions[currentQuestion].RispostaCorretta ? "correct" : userAnswer === questions[currentQuestion].RispostaD ? "incorrect" : userAnswer !== null && userAnswer !== questions[currentQuestion].RispostaCorretta && questions[currentQuestion].RispostaD === questions[currentQuestion].RispostaCorretta ? "correct" : ""}
                        onClick={() => handleAnswer(questions[currentQuestion].RispostaD)}
                        disabled={userAnswer !== null}
                      >
                        {questions[currentQuestion].RispostaD}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
              <p className='score mt-5'> <b>Score:  {score}</b></p>

            </div>
          )}

        </div>
      </div>
      <DUKModal isOpen={showExplanation} onClose={() => setShowExplanation(false)}>
        <p className="duk">{questions[currentQuestion]?.DUK}</p>
        <button onClick={handleNextQuestion}>Next Question</button>
      </DUKModal>
    </>
  );
};

export default Quiz;