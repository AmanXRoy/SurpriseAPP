import './style.css'
import { gameConfig } from './config.js'

const app = document.querySelector('#app');
let currentStepIndex = 0;

// Initialize
function init() {
  renderStep(currentStepIndex);
}

function renderStep(index) {
  const step = gameConfig.steps[index];
  const isLastStep = index === gameConfig.steps.length - 1;

  // Create Card
  const card = document.createElement('div');
  card.className = 'game-card';

  // Content Container
  const content = document.createElement('div');
  content.className = 'step-content';

  // Icon
  if (step.icon) {
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.textContent = step.icon;
    content.appendChild(icon);
  }

  // Instruction / Title
  const title = document.createElement('h2');
  title.textContent = step.instruction;
  content.appendChild(title);

  // Interaction Area
  const interactionArea = document.createElement('div');
  interactionArea.className = 'interaction-area';
  interactionArea.style.width = '100%';
  interactionArea.style.display = 'flex';
  interactionArea.style.flexDirection = 'column';
  interactionArea.style.alignItems = 'center';

  // Render specific interaction
  renderInteraction(step, interactionArea, () => {
    // On Complete
    revealMessage(content, step, isLastStep);
  });

  content.appendChild(interactionArea);
  card.appendChild(content);

  // Progress Dots
  const dots = document.createElement('div');
  dots.className = 'progress-dots';
  gameConfig.steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `dot ${i === index ? 'active' : ''} ${i < index ? 'completed' : ''}`;
    dots.appendChild(dot);
  });
  card.appendChild(dots);

  // Clear and Append
  app.innerHTML = '';
  app.appendChild(card);
}

function renderInteraction(step, container, onComplete) {
  switch (step.type) {
    case 'click':
    case 'reveal':
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = step.buttonText || 'Continue';
      btn.onclick = () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(onComplete, 200);
      };
      container.appendChild(btn);
      break;

    case 'slider':
      const sliderContainer = document.createElement('div');
      sliderContainer.className = 'slider-container';
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = 0;
      slider.max = 100;
      slider.value = 0;

      slider.oninput = (e) => {
        if (e.target.value > 90) {
          slider.disabled = true;
          onComplete();
        }
      };
      sliderContainer.appendChild(slider);
      container.appendChild(sliderContainer);
      break;

    case 'hover':
      const hoverTarget = document.createElement('div');
      hoverTarget.className = 'hover-target';
      hoverTarget.innerHTML = '<span>✨</span>';

      let hoverTimer;
      const startHover = () => {
        hoverTarget.innerHTML = '<span>💖</span>';
        hoverTarget.classList.add('active'); // Add active class for CSS effects
        hoverTimer = setTimeout(onComplete, 1500); // 1.5s hold
      };
      const endHover = () => {
        hoverTarget.innerHTML = '<span>✨</span>';
        hoverTarget.classList.remove('active');
        clearTimeout(hoverTimer);
      };

      hoverTarget.onmouseenter = startHover;
      hoverTarget.onmouseleave = endHover;

      // Touch support
      hoverTarget.ontouchstart = (e) => {
        e.preventDefault(); // Prevent scrolling while holding
        startHover();
      };
      hoverTarget.ontouchend = endHover;

      container.appendChild(hoverTarget);
      break;

    case 'choice':
      const grid = document.createElement('div');
      grid.className = 'choices-grid';
      step.choices.forEach(choice => {
        const choiceBtn = document.createElement('div');
        choiceBtn.className = 'choice-card';
        choiceBtn.innerHTML = `<div style="font-size: 1.5rem">${choice.icon}</div><div style="font-size: 0.8rem">${choice.text}</div>`;
        choiceBtn.onclick = () => onComplete();
        grid.appendChild(choiceBtn);
      });
      container.appendChild(grid);
      break;

    case 'timer':
      const timerDisplay = document.createElement('div');
      timerDisplay.className = 'timer-display';
      container.appendChild(timerDisplay);

      let timeLeft = step.duration / 1000;
      timerDisplay.textContent = timeLeft;

      const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft > 0 ? timeLeft : '❤️';
        if (timeLeft <= 0) {
          clearInterval(interval);
          onComplete();
        }
      }, 1000);
      break;
  }
}

function revealMessage(contentContainer, step, isLastStep) {
  // Clear interaction area
  const interactionArea = contentContainer.querySelector('.interaction-area');
  if (interactionArea) {
    interactionArea.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => interactionArea.remove(), 300);
  }

  // Update Title to be less prominent or remove
  const title = contentContainer.querySelector('h2');
  if (title) title.style.display = 'none';

  // Show Message
  setTimeout(() => {
    const message = document.createElement('div');
    message.className = 'message-reveal';

    // Replace {playerName} with actual name if present
    let msgText = step.message;
    if (gameConfig.playerName) {
      msgText = msgText.replace(/{playerName}/g, gameConfig.playerName);
    }

    // Handle newlines
    message.innerHTML = msgText.replace(/\n/g, '<br>');
    contentContainer.appendChild(message);

    // Add Next/Restart Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';
    nextBtn.style.marginTop = '2rem';
    nextBtn.textContent = isLastStep ? 'Restart' : 'Next';
    nextBtn.onclick = () => {
      if (isLastStep) {
        currentStepIndex = 0;
      } else {
        currentStepIndex++;
      }
      renderStep(currentStepIndex);
    };
    contentContainer.appendChild(nextBtn);

  }, 300);
}

init();
