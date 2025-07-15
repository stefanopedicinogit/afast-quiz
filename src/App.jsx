import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Quiz from './Quiz';
import Error from './Error';
import Duplicato from './Duplicato';
import AssessmentComplete from './AssessmentComplete';
import Riepilogo from './Riepilogo';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/error" element={<Error />} />
        <Route path="/duplicato" element={<Duplicato />} />
        <Route path="/assessment-complete" element={<AssessmentComplete />} />
        <Route path="/riepilogo" element={<Riepilogo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;