export function FilterPanel({ filters, options, onChange }) {
  return (
    <aside className="cosmic-card p-4 h-100">
      <h3 className="serif h4 mb-2">Filters</h3>
      <p className="text-secondary small mb-4">Keep the catalog easy to scan for launch buyers.</p>

      <SelectField label="Collection" value={filters.collection} options={options.collections} onChange={(value) => onChange("collection", value)} />
      <SelectField label="Gift Type" value={filters.type} options={options.types} onChange={(value) => onChange("type", value)} />
      <SelectField label="Occasion" value={filters.tag} options={options.tags} onChange={(value) => onChange("tag", value)} />
      <SelectField label="Price Range" value={filters.price} options={options.prices} onChange={(value) => onChange("price", value)} />
    </aside>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="mb-3">
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
