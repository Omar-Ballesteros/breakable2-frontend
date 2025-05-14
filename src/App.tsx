import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CallbackPage from "./pages/CallbackPage";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ArtistDetail from "./pages/ArtistDetail";
import AlbumDetail from "./pages/AlbumDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/callback" element={<CallbackPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/artist/:id"
        element={
          <ProtectedRoute>
            <ArtistDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/album/:id"
        element={
          <ProtectedRoute>
            <AlbumDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
