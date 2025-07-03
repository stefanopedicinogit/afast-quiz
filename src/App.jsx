import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Quiz from './Quiz';
import AssessmentComplete from './AssessmentComplete';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/assessment-complete" element={<AssessmentComplete />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;