console.log("script.js connected!");

// Store user's answers
const userAnswers = {};

// Get all question blocks
const questionBlocks = document.querySelectorAll('.question-block');

// Add click handlers to answer buttons
questionBlocks.forEach((block, index) => {
    const questionId = block.id || `question-${index + 1}`;
    const buttons = block.querySelectorAll('.answer-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'selected' class from all buttons in this question
            buttons.forEach(b => b.classList.remove('selected'));
            // Add 'selected' class to clicked button
            button.classList.add('selected');
            
            // Store the answer
            const answer = button.getAttribute('data-answer');
            userAnswers[questionId] = answer;
        });
    });
});

// Handle showing results
const showResultBtn = document.getElementById('show-result');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');

showResultBtn.addEventListener('click', () => {
    // Check if user has answered any questions
    if (Object.keys(userAnswers).length === 0) {
        resultText.innerHTML = '<div class="alert alert-warning">Please answer at least one question!</div>';
        resultContainer.style.display = 'block';
        return;
    }

    // Count answers
    const answerCounts = {
        'A': 0, // Spring
        'B': 0, // Summer
        'C': 0, // Fall
        'D': 0  // Winter
    };

    // Tally up the answers
    Object.values(userAnswers).forEach(answer => {
        answerCounts[answer]++;
    });

    // Find the season with the most answers
    let maxCount = 0;
    let resultSeason = '';
    
    Object.entries(answerCounts).forEach(([season, count]) => {
        if (count > maxCount) {
            maxCount = count;
            resultSeason = season;
        }
    });

    // Define the season descriptions
    const seasonResults = {
        'A': {
            season: 'Spring',
            description: 'You are Spring! 🌸 Like the season of renewal, you bring fresh energy and optimism wherever you go. You love new beginnings and growth, finding joy in the simple beauty of life. Your personality blooms with creativity and inspiration, just like the first flowers of spring.',
            characteristics: ['Optimistic', 'Creative', 'Energetic', 'Growth-oriented']
        },
        'B': {
            season: 'Summer',
            description: 'You are Summer! ☀️ Warm, bright, and full of life, you radiate positive energy to those around you. Like a perfect summer day, you bring warmth and light to every situation. Your vibrant personality and enthusiasm make you naturally magnetic.',
            characteristics: ['Vibrant', 'Outgoing', 'Adventurous', 'Enthusiastic']
        },
        'C': {
            season: 'Autumn',
            description: 'You are Autumn! 🍁 Thoughtful and warm, you appreciate life\'s changes and find beauty in transformation. Like the colorful falling leaves, you have many layers to your personality. You\'re grounded yet creative, practical yet artistic.',
            characteristics: ['Reflective', 'Artistic', 'Grounded', 'Thoughtful']
        },
        'D': {
            season: 'Winter',
            description: 'You are Winter! ❄️ Cool, calm, and introspective, you have a quiet strength that others admire. Like a peaceful winter landscape, you bring serenity and clarity to those around you. Your depth and wisdom make you a trusted confidant.',
            characteristics: ['Calm', 'Introspective', 'Peaceful', 'Wise']
        }
    };

    // Get the result details
    const result = seasonResults[resultSeason];
    
    // Create the result HTML
    const resultHTML = `
        <h2 class="text-center mb-4">${result.season}</h2>
        <p class="lead">${result.description}</p>
        <div class="mt-4">
            <h4>Key Characteristics:</h4>
            <ul class="list-group">
                ${result.characteristics.map(trait => 
                    `<li class="list-group-item">${trait}</li>`
                ).join('')}
            </ul>
        </div>
    `;

    // Display the result
    resultText.innerHTML = resultHTML;
    resultContainer.style.display = 'block';
    
    // Scroll to the result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
});
