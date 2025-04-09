import React, { useState } from "react";

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
  const [currentOutcome, setCurrentOutcome] = useState("");

  const handleRatingChange = (outcome, value) => {
    setRatings((prev) => ({ ...prev, [outcome]: value }));
  };

  const handleSubmitRatings = () => {
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
    const toRate = [currentOutcome, ...related];
    return (
      <>
        <h2>Since you selected <strong>{currentOutcome}</strong>, please rate it and its related outcomes:</h2>
        {toRate.map((outcome) => (
          <div key={outcome} style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "6px" }}>{outcome}:</p>
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} style={{ marginRight: "10px" }}>
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
        <button onClick={handleSubmitRatings} style={buttonStyle}>Next</button>
      </>
    );
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#fff"
  };

  const cardStyle = {
    backgroundColor: "rgba(0,0,0,0.7)",
    maxWidth: "600px",
    margin: "auto",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)"
  };

  const buttonStyle = {
    backgroundColor: "#4caf50",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {step === 0 && (
          <>
            <h1>🌿 Welcome to Nature Counter Survey</h1>
            <p>Hope you had a beautiful time in nature!</p>
            <button onClick={() => setStep(1)} style={buttonStyle}>Start Survey</button>
          </>
        )}

        {step === 1 && (
          <>
            <h2>What’s your name?</h2>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={() => setStep(2)} disabled={!name} style={buttonStyle}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>What’s your email?</h2>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
            <button onClick={() => setStep(4)} disabled={!email} style={buttonStyle}>Next</button>
          </>
        )}

        {step === 3 && renderRatings()}

      {step === 4 && (
  <>
    <h2>Select a Health Outcome to Rate</h2>
    {allOutcomes.map((outcome) => {
      const isDisabled = selectedOutcomes.includes(outcome) || selectedOutcomes.length >= 3;
      return (
        <button
          key={outcome}
          onClick={() => handleSelectOutcome(outcome)}
          disabled={isDisabled}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            backgroundColor: isDisabled ? "#888" : "#4caf50",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: isDisabled ? "not-allowed" : "pointer"
          }}
        >
          {outcome}
        </button>
      );
    })}

    {/* Submit option */}
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {selectedOutcomes.length > 0 && (
        <button
          onClick={() => setStep(5)}
          style={{
            backgroundColor: "#2196f3",
            padding: "10px 20px",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Submit Survey
        </button>
      )}
    </div>
  </>
)}

       {step === 5 && (
  <>
    <h2>🎉 Thank you for your response, {name}!</h2>
    <p>We appreciate your time and reflection 🌿</p>
  </>
)}

      </div>
    </div>
  );
}

export default App;
