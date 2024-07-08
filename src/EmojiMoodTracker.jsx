import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const emojis = ['😄', '😊', '😐', '😕', '😢'];

const EmojiMoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    const savedMoods = localStorage.getItem('moodHistory');
    if (savedMoods) {
      setMoodHistory(JSON.parse(savedMoods));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleMoodSelect = (mood) => {
    setCurrentMood(mood);
    setMoodHistory([...moodHistory, { mood, timestamp: new Date().toISOString() }]);
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 'No data yet';
    const sum = moodHistory.reduce((acc, { mood }) => acc + emojis.indexOf(mood), 0);
    const average = sum / moodHistory.length;
    return emojis[Math.round(average)];
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Emoji Mood Tracker
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        {emojis.map((emoji) => (
          <Button
            key={emoji}
            onClick={() => handleMoodSelect(emoji)}
            sx={{ fontSize: '2rem', mx: 1 }}
          >
            {emoji}
          </Button>
        ))}
      </Box>
      <Typography variant="h6" align="center" gutterBottom>
        Current Mood: {currentMood || 'Not set'}
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Average Mood: {getAverageMood()}
      </Typography>
      <Typography variant="h6" align="center">
        Mood History:
      </Typography>
      <Box maxHeight={200} overflow="auto">
        {moodHistory.map(({ mood, timestamp }, index) => (
          <Typography key={index} align="center">
            {mood} - {new Date(timestamp).toLocaleString()}
          </Typography>
        ))}
      </Box>
    </Container>
  );
};

export default EmojiMoodTracker;