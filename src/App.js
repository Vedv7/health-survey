import React, { useState, useEffect } from "react";

const allOutcomes = [
  "Adaptability", "Awareness", "Balance", "Breathing", "Calmness", "Cardiohealth",
  "Clarity", "Confidence", "Connection", "Creativity", "Curiosity", "Digestion",
  "Empathy", "Endurance", "Energy", "Esteem", "Expression", "Focus", "Happiness",
  "Hope", "Immunity", "Inspiration", "Longevity", "Memory", "Mindfulness", "Mood",
  "Patience", "Positivity", "Relaxation", "Resilience", "Sleep", "Social",
  "Strength", "Trust", "Wellbeing"
];

const outcomeDependencies = {
  Adaptability: ["Resilience", "Emotion"],
  Awareness: ["Focus", "Cognition"],
  Balance: ["Strength", "Calmness"],
  Breathing: ["Focus", "Energy"],
  Calmness: ["Vitality", "Resilience"],
  Cardiohealth: ["Endurance", "Strength"],
  Clarity: ["Focus", "Mindfulness"],
  Confidence: ["Selfhood", "Assertiveness"],
  Connection: ["Empathy", "Community"],
  Creativity: ["Imagination", "Positivity"],
  Curiosity: ["Awareness", "Engagement"],
  Digestion: ["Energy", "Immunity"],
  Empathy: ["Compassion", "Community"],
  Endurance: ["Circulation", "Strength"],
  Energy: ["Focus", "Motivation"],
  Esteem: ["Confidence", "Selfhood"],
  Expression: ["Confidence", "Resilience"],
  Focus: ["Adaptability", "Mindfulness"],
  Happiness: ["Positivity", "Wellbeing"],
  Hope: ["Optimism", "Resilience"],
  Immunity: ["Wellbeing", "Energy"],
  Inspiration: ["Creativity", "Positivity"],
  Longevity: ["Energy", "Immunity"],
  Memory: ["Focus", "Cognition"],
  Mindfulness: ["Calmness", "Awareness"],
  Mood: ["Positivity", "Wellbeing"],
  Patience: ["Calmness", "Endurance"],
  Positivity: ["Optimism", "Energy"],
  Relaxation: ["Calmness", "Focus"],
  Resilience: ["Emotion", "Direction"],
  Sleep: ["Energy", "Calmness"],
  Social: ["Emotion", "Wellbeing"],
  Strength: ["Endurance", "Cardiohealth"],
  Trust: ["Connection", "Wellbeing"],
  Wellbeing: ["Happiness", "Immunity"]
};

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedOutcomes, setSelectedOutcomes] = useState([]);
  const [ratings, setRatings] = useState({});
  const [ratedOutcomes, setRatedOutcomes] = useState([]);
  const [currentOutcome, setCurrentOutcome] = useState("");

  useEffect(() => {
    if (step === 5) {
      fetch("https://script.google.com/macros/s/AKfycbxFi1HEp7asqd_P4ATwCftX6HxRDlTIcBViVFbHjWqK16ieijOWzd8arwShO99jIsuiNw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          selectedOutcomes,
          ratings,
          dependencies: outcomeDependencies,
        }),
      })
        .then((res) => res.text())
        .then((result) => console.log("✅ Sent to Google Sheets:", result))
        .catch((err) => console.error("❌ Error submitting:", err));
    }
  }, [step]);

  const handleRatingChange = (outcome, value) => {
    setRatings((prev) => ({ ...prev, [outcome]: value }));
  };

  const handleSubmitRatings = () => {
    const newRated = [currentOutcome, ...(outcomeDependencies[currentOutcome] || [])];
    setRatedOutcomes([...new Set([...ratedOutcomes, ...newRated])]);
    if (selectedOutcomes.length < 3) {
      setStep(4);
    } else {
      setStep(5);
    }
  };

  const handleSelectOutcome = (outcome) => {
    if (selectedOutcomes.includes(outcome) || selectedOutcomes.length >= 3) return;
    setSelectedOutcomes([...selectedOutcomes, outcome]);
    setCurrentOutcome(outcome);
    setStep(3);
  };

  const renderRatings = () => {
    const related = outcomeDependencies[currentOutcome] || [];
    const toRate = [currentOutcome, ...related].filter(
      (outcome) => !ratedOutcomes.includes(outcome)
    );
    return (
      <div className="fade-in">
        <h2>
          Since you selected <strong>{currentOutcome}</strong>, please rate it and its related outcomes:
        </h2>
        {toRate.map((outcome) => (
          <div key={outcome} style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "20px", marginBottom: "6px" }}>{outcome}:</p>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} style={{ marginRight: "15px", fontSize: "18px" }}>
                <input
                  type="radio"
                  name={outcome}
                  value={num}
                  checked={ratings[outcome] === String(num)}
                  onChange={(e) => handleRatingChange(outcome, e.target.value)}
                />
                {num}
              </label>
            ))}
          </div>
        ))}
        <button className="button" onClick={handleSubmitRatings}>Next</button>
      </div>
    );
  };

  const remainingOutcomes = allOutcomes.filter(
    (outcome) => !selectedOutcomes.includes(outcome)
  );

  return (
    <div className="container">
      <div className="glass">
        {step === 0 && (
          <div className="fade-in">
            <h1>🌿 Welcome to Nature Counter Survey</h1>
            <p style={{ fontSize: "20px" }}>Hope you had a beautiful time in nature!</p>
            <button className="button" onClick={() => setStep(1)}>Start Survey</button>
          </div>
        )}

        {step === 1 && (
          <div className="fade-in">
            <h2>What's your name?</h2>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <button className="button" onClick={() => setStep(2)} disabled={!name}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2>What's your email?</h2>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <button className="button" onClick={() => setStep(4)} disabled={!email}>Next</button>
          </div>
        )}

        {step === 3 && renderRatings()}

        {step === 4 && (
          <div className="fade-in">
            <h2>Select a Health Outcome to Rate</h2>
            {remainingOutcomes.map((outcome) => {
              const isDisabled = selectedOutcomes.includes(outcome) || selectedOutcomes.length >= 3;
              return (
                <button
                  key={outcome}
                  onClick={() => handleSelectOutcome(outcome)}
                  disabled={isDisabled}
                  className={`button outcome ${isDisabled ? "disabled" : ""}`}
                >
                  {outcome}
                </button>
              );
            })}
            {selectedOutcomes.length > 0 && (
              <button className="button submit" onClick={() => setStep(5)}>Submit Survey</button>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="fade-in">
            <h2>🎉 Thank you for your response, {name}!</h2>
            <p style={{ fontSize: "18px" }}>Your input has been recorded 🙏</p>
          </div>
        )}
      </div>

      <style>{`
        .container {
          min-height: 100vh;
          background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          padding: 50px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
        }

        .glass {
          background: rgba(30, 30, 30, 0.7);
          color: #fff;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 650px;
          animation: fadeIn 0.5s ease;
        }

        .input {
          width: 100%;
          padding: 12px;
          font-size: 18px;
          margin: 20px 0;
          border-radius: 8px;
          border: none;
        }

        .button {
          background: linear-gradient(to right, #4caf50, #2196f3);
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 18px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.3s ease;
        }

        .button:hover {
          background: linear-gradient(to right, #2196f3, #4caf50);
        }

        .button.outcome {
          width: 100%;
          margin: 10px 0;
        }

        .button.disabled {
          background: #666 !important;
          cursor: not-allowed;
        }

        .button.submit {
          background: linear-gradient(to right, #ff9800, #f44336);
        }

        .fade-in {
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;
