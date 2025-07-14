import { useState, useEffect } from 'react';
import { utils, read } from 'xlsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import DUKModal from './DUKModal';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [counter, setCounter] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(null);
  const [firstPercentage, setFirstPercentage] = useState(null);
  const [secondPercentage, setSecondPercentage] = useState(null);
  const [thirdPercentage, setThirdPercentage] = useState(null);
  const [fourthPercentage, setFourthPercentage] = useState(null);
  const [fifthPercentage, setFifthPercentage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const response = await fetch('/AFAST.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = read(arrayBuffer, { type: 'array' });
      const sheetName = 'Predicted Categoria Finale';
      const sheet = workbook.Sheets[sheetName];
      const data = utils.sheet_to_json(sheet);

      const classes = [
        'Credito',
        'Canali',
        'Finanza',
        'Pagamenti',
        'Risk & Document management',
      ];

      const filteredQuestions = data.filter((question) => {
        const className = question.PredictedCategory;
        return classes.includes(className);
      });

      const classQuestions = {};
      classes.forEach((className) => {
        classQuestions[className] = filteredQuestions.filter((question) => {
          return question.PredictedCategory === className;
        }
        );
      });

      const shuffledQuestions = [];
      Object.keys(classQuestions).forEach((className) => {
        const classQuestionsArray = classQuestions[className];
        const shuffledClassQuestions = shuffleArray(classQuestionsArray);
        shuffledQuestions.push(...shuffledClassQuestions.slice(0, 8)); 
      });
      const finalShuffledQuestions = shuffleArray(shuffledQuestions);
      setQuestions(finalShuffledQuestions || []);
    };

    loadQuestions();
    setStartTime(new Date().toISOString().replace('T', ' ').replace('Z', ''))
    setTime(new Date().getTime());
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



  useEffect(() => {
    if (userAnswer === questions[currentQuestion]?.RispostaCorretta) {
      if (questions[currentQuestion]?.PredictedCategory === 'Credito') {
        setFirstPercentage(firstPercentage + 1);
      } else if (questions[currentQuestion]?.PredictedCategory === 'Canali') {
        setSecondPercentage(secondPercentage + 1);
      } else if (questions[currentQuestion]?.PredictedCategory === 'Finanza') {
        setThirdPercentage(thirdPercentage + 1);
      } else if (questions[currentQuestion]?.PredictedCategory === 'Pagamenti') {
        setFourthPercentage(fourthPercentage + 1);
      } else if (questions[currentQuestion]?.PredictedCategory === 'Risk & Document management') {
        setFifthPercentage(fifthPercentage + 1);
      }
    }
  }, [userAnswer]);

  const handleNextQuestion = async () => {
    setShowExplanation(false);
    setUserAnswer(null);

    const payload_answer = {
      enterprise_id: localStorage.getItem('loginId'),
      domanda: questions[currentQuestion]?.Domanda,
      risposta: userAnswer,
      categoria_predizione: questions[currentQuestion]?.PredictedCategory,
      ok_ko: questions[currentQuestion]?.RispostaCorretta === userAnswer ? 'OK' : 'KO',
    }
    try {
      const response = await fetch('https://afast-backend.vercel.app/save-answers', {
      // const response = await fetch('http://localhost:8000/save-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload_answer),
      });
    } catch (error) {
      navigate('/error');
      console.error('Error saving results:', error);
    }

    if (currentQuestion + 1 === 40) {
      const payload = {
        enterprise_id: localStorage.getItem('loginId'),
        score: score,
        start_time: startTime,
        end_time: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        duration_in_sec: (new Date().getTime() - time) / 1000,
        first_percentage: ((firstPercentage / 8) * 100),
        second_percentage: ((secondPercentage / 8) * 100),
        third_percentage: ((thirdPercentage / 8) * 100),
        fourth_percentage: ((fourthPercentage / 8) * 100),
        fifth_percentage: ((fifthPercentage / 8) * 100),
      };

      setFirstPercentage((firstPercentage / 8) * 100);
      setSecondPercentage((fourthPercentage / 8) * 100);
      setThirdPercentage((thirdPercentage / 8) * 100);
      setFourthPercentage((secondPercentage / 8) * 100);
      setFifthPercentage((fifthPercentage / 8) * 100);

      try {
        const response = await fetch('https://afast-backend.vercel.app/save-result', {
        // const response = await fetch('http://localhost:8000/save-result', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          navigate('/assessment-complete');
        } else {
          navigate('/error');
          console.error('Error saving results:', response.status);
        }
      } catch (error) {
        navigate('/error');
        console.error('Error saving results:', error);
      }
    }

    if(counter <= 40) {
      setCurrentQuestion(currentQuestion + 1);
      setCounter(counter +1 )
    }
  };



  return (
    <>
      <header className="header-area header-sticky">
        <div className="container-left">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <div className='logo'>
                  <h1>AFAST</h1>
                </div>
                <div>
                  <h1 style={{ color: 'white' }}>ASSESSMENT FUNCTIONAL GAP</h1>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="main-banner" id="top">
        <div className="container">

          {questions.length > 0 && counter <= 40 && (
            <div>
              <div style={{ minWidth: '1000px' }}>

                <h2 className="mb-5">{questions[currentQuestion]?.Domanda}</h2>
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
              <p className='score mt-5'> <b>Score:  {score} / {counter}</b></p>
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