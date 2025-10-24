console.log("script.js connected!");

// Keep track of the user's answers
const userAnswers = {};

const questionBlocks = document.querySelectorAll('.question-block');

questionBlocks.forEach((block, index) => {
  // Use data-question if present, otherwise fall back to the block id or generated id
  const questionId = block.getAttribute('data-question') || block.id || `q${index + 1}`;
  const buttons = block.querySelectorAll('.answer-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove selected from other buttons in this block and add to the clicked one
      buttons.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');

      // Store the answer
      const answer = button.getAttribute('data-answer');
      userAnswers[questionId] = answer;
      console.log(`Question ${questionId} selected answer: ${answer}`);
      console.log('All user answers:', userAnswers);
    });
  });
});

// Show result button handler
const showResultBtn = document.getElementById('show-result');
if (showResultBtn) {
  showResultBtn.addEventListener('click', () => {
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');

    const answers = Object.values(userAnswers);
    if (answers.length === 0) {
      resultText.textContent = 'Please answer at least one question.';
      resultContainer.style.display = 'block';
      return;
    }

    // Tally answers and pick the most frequent
    const counts = {};
    answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
    const winner = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);

    // Map answer keys to seasons / descriptions
    const map = {
      'A': 'Spring',
      'B': 'Summer',
      'C': 'Autumn',
      'D': 'Winter'
    };

    const descriptions = {
      'A': 'You love new beginnings, growth, and fresh energy — you are Spring.',
      'B': 'You are warm, energetic, and love bright days — you are Summer.',
      'C': 'You are reflective, colorful, and grounded — you are Autumn.',
      'D': 'You are calm, cozy, and introspective — you are Winter.'
    };

    const season = map[winner] || 'Unknown';
    resultText.innerHTML = `<strong>${season}</strong><br>${descriptions[winner] || ''}`;
    resultContainer.style.display = 'block';
  });
}
