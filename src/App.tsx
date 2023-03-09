import { Container, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';

import { Home } from './pages/Home';
import { NewRegister } from "./pages/NewProject";
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';

import { ToastContainer } from 'react-toastify';
import { Footer } from './components/Footer';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column justify-content-between min-height-100vh">
        <Header />
        <Container className="content-pages my-4">
          <ToastContainer />
          <Row>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/novo-projeto" element={<NewRegister />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/projeto/:id" element={<Project />} />
            </Routes>
          </Row>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;