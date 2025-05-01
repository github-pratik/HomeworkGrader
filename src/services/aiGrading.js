export const getAIGradingSuggestions = async (submissionCode) => {
  // This is a mock implementation
  return {
    score: 85,
    feedback: 'Good implementation of React components',
    rubricScores: [
      { criterion: 'Component Structure', score: 18 },
      { criterion: 'Props Usage', score: 17 }
    ]
  };
}; 