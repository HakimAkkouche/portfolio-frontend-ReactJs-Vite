import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import AuthProvider from './services/AuthProvider';
import ProtectedRoute from './services/ProtectedRoute';
import PortfolioDetails from './pages/public/PortfolioDetails/PortfolioDetails';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import EditPersonalInfo from './pages/admin/EditPersonalInfo/EditPersonalInfo';
import Login from './pages/public/Login/Login';
import Header from './components/HeaderHome/Header';
import Portfolio from './pages/public/Portfolio/Portfolio';
import Home from './pages/public/Home/Home';
import AddProject from './pages/admin/AddProject/AddProject';
import Footer from './components/Footer/Footer';
import Header2 from './components/Header2/Header2';
import EditMentionsLegales from './pages/admin/EditMentionsLegales/EditMentionsLegales';
import MentionsLegales from './pages/public/MentionsLegales/MentionsLegales';
import AboutMe from './pages/public/AboutMe/AboutMe';
import EditAboutMe from './pages/admin/EditAboutMe/AboutMe';

const App = () => (
    <div className="App">
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Route principale */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <Home />
                                <Portfolio />
                                <Footer />
                            </>
                        }
                    />
                    {/* Route pour les détails d'un portfolio */}
                    <Route 
                        path="/portfolio/:id" 
                        element={
                            <>
                                <Header2 />
                                <PortfolioDetails />
                                <Footer />
                            </>
                        } 
                    />
                    <Route 
                        path="/mentions-legales" 
                        element={
                            <>
                                <Header2 />
                                <MentionsLegales />
                                <Footer />
                            </>
                        } 
                    />
                    <Route 
                        path="/about-me" 
                        element={
                            <>
                                <Header2 />
                                <AboutMe />
                                <Footer />
                            </>
                        } 
                    />
                    <Route path="/login" element={<Login />} />

                    {/* Routes protégées */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/edit-personal-info" 
                        element={
                            <ProtectedRoute>
                                <EditPersonalInfo />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route 
                        path="/edit-about-me" 
                        element={
                            <ProtectedRoute>
                                <EditAboutMe />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/edit-mentions-legales" 
                        element={
                            <ProtectedRoute>
                                <EditMentionsLegales />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                        path="/add-project" 
                        element={
                            <ProtectedRoute>
                                <AddProject />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route 
                    path="/edit-project/:id" 
                    element={
                        <ProtectedRoute>
                            <AddProject />
                            <Footer />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<div>Page non trouvée</div>}/>
                </Routes>
            </Router>
        </AuthProvider>
    </div>
);


export default App;
