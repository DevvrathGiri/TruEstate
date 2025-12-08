import MultiSelectDropdown from "./MultiSelectDropdown";

export type Filters = {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  ageMin: number | null;
  ageMax: number | null;
  dateFrom: string | null;
  dateTo: string | null;
};

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
  allRegions?: string[];
  allGenders?: string[];
  allCategories?: string[];
  allTags?: string[];
  allPayments?: string[];
};

export default function FilterPanel({
  value,
  onChange,
  allRegions = ["North", "South", "East", "West"],
  allGenders = ["Male", "Female"],
  allCategories = ["Electronics", "Beauty", "Clothing"],
  allTags = ["wireless", "organic", "fashion"],
  allPayments = ["cash", "card", "upi"],
}: Props) {
  const update = (patch: Partial<Filters>) => {
    let next = { ...value, ...patch };

    // Auto-swap incorrect age range
    if (
      next.ageMin !== null &&
      next.ageMax !== null &&
      next.ageMin > next.ageMax
    ) {
      next = { ...next, ageMin: next.ageMax, ageMax: next.ageMin };
    }

    onChange(next);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Customer Region */}
      <MultiSelectDropdown
        label="Customer Region"
        options={allRegions}
        selected={value.regions}
        onChange={(s) => update({ regions: s })}
        placeholder="All"
      />

      {/* Gender */}
      <MultiSelectDropdown
        label="Gender"
        options={allGenders}
        selected={value.genders}
        onChange={(s) => update({ genders: s })}
        placeholder="All"
      />

      {/* Age Range */}
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5">
        <span className="text-sm text-gray-700">Age</span>

        <input
          type="number"
          min={0}
          placeholder="Min"
          value={value.ageMin ?? ""}
          onChange={(e) =>
            update({
              ageMin: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="w-14 px-2 py-0.5 rounded border border-gray-300 bg-white text-sm"
        />

        <span className="text-gray-500">-</span>

        <input
          type="number"
          min={0}
          placeholder="Max"
          value={value.ageMax ?? ""}
          onChange={(e) =>
            update({
              ageMax: e.target.value === "" ? null : Number(e.target.value),
            })
          }
          className="w-14 px-2 py-0.5 rounded border border-gray-300 bg-white text-sm"
        />
      </div>

      {/* Product Category */}
      <MultiSelectDropdown
        label="Product Category"
        options={allCategories}
        selected={value.categories}
        onChange={(s) => update({ categories: s })}
        placeholder="All"
      />

      {/* Tags */}
      <MultiSelectDropdown
        label="Tags"
        options={allTags}
        selected={value.tags}
        onChange={(s) => update({ tags: s })}
        placeholder="All"
      />

      {/* Payment Method */}
      <MultiSelectDropdown
        label="Payment Method"
        options={allPayments}
        selected={value.paymentMethods}
        onChange={(s) => update({ paymentMethods: s })}
        placeholder="All"
      />

      {/* Date Range */}
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-md px-3 py-1.5">
        <span className="text-sm text-gray-700">Date</span>

        <input
          type="date"
          value={value.dateFrom ?? ""}
          onChange={(e) => update({ dateFrom: e.target.value || null })}
          className="px-2 py-0.5 rounded border border-gray-300 bg-white text-sm"
        />

        <span className="text-gray-500">-</span>

        <input
          type="date"
          value={value.dateTo ?? ""}
          onChange={(e) => update({ dateTo: e.target.value || null })}
          className="px-2 py-0.5 rounded border border-gray-300 bg-white text-sm"
        />
      </div>
    </div>
  );
}
