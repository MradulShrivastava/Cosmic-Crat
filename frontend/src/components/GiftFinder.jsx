export function GiftFinder({ answers, setAnswers, result, onSubmit, onOpenResult }) {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <form className="cosmic-card p-4 p-lg-5" onSubmit={onSubmit}>
          <h2 className="serif mb-3">Find The Right Gift Box</h2>
          <p className="text-secondary mb-4">
            Keep this simple for phase 1: guide shoppers toward the right fixed product instead of building a custom build-your-own flow.
          </p>

          <SelectField
            label="What is the occasion?"
            value={answers.occasion}
            options={["Rakhi", "Birthday", "Self Care", "Just A Surprise"]}
            onChange={(value) => setAnswers((current) => ({ ...current, occasion: value }))}
          />

          <SelectField
            label="What style fits the recipient?"
            value={answers.style}
            options={["Bold", "Soft", "Elegant", "Playful"]}
            onChange={(value) => setAnswers((current) => ({ ...current, style: value }))}
          />

          <SelectField
            label="Do you want zodiac-based gifting?"
            value={answers.zodiac}
            options={["Yes", "No"]}
            onChange={(value) => setAnswers((current) => ({ ...current, zodiac: value }))}
          />

          <button className="btn cosmic-gold-btn rounded-pill px-4 mt-2">Show Recommendation</button>

          {result ? (
            <div className="quiz-result mt-4">
              <div className="small text-uppercase text-secondary mb-2">Recommended Box</div>
              <h3 className="serif h4 mb-2">{result.name}</h3>
              <p className="text-secondary mb-3">{result.summary}</p>
              <button className="btn btn-outline-light rounded-pill px-4" type="button" onClick={() => onOpenResult(result)}>
                View Product
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="mb-4">
      <label className="form-label text-secondary">{label}</label>
      <select className="form-select cosmic-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
