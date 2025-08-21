import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BookmarksPage from '../pages/BookmarksPage';
import JobDetailPage from '../pages/JobDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
      <Route path="/job/:id" element={<JobDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
