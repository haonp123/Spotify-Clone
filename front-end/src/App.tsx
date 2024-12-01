import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/404/NotFoundPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
