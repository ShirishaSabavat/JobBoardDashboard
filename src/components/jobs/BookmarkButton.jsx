import React from 'react';
import { IconButton, Tooltip, Badge } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '../../features/bookmarks/bookmarksSlice';
import { selectIsBookmarked, selectBookmarkCount } from '../../features/bookmarks/bookmarksSlice';

const BookmarkButton = ({ job, showBadge = false, size = 'medium', color = 'primary' }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector(state => selectIsBookmarked(state, job?.id));
  const bookmarkCount = useSelector(selectBookmarkCount);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (job) {
      dispatch(toggleBookmark(job));
    }
  };

  const button = (
    <IconButton
      onClick={handleToggle}
      color={color}
      size={size}
      disabled={!job}
    >
      {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  );

  if (showBadge) {
    return (
      <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
        <Badge badgeContent={bookmarkCount} color="secondary">
          {button}
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
      {button}
    </Tooltip>
  );
};

export default BookmarkButton;
