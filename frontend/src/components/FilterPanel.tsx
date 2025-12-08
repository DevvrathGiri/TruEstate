import MultiSelectDropdown from "./MultiSelectDropdown";

export type Filters = {
  regions: string[];
  genders: string[];
  categories: string[];
  tags: string[];
  paymentMethods: string[];
  ageRange: string[];
  dateRange: string[];
};

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
  allRegions?: string[];
  allGenders?: string[];
  allCategories?: string[];
  allTags?: string[];
  allPayments?: string[];
  allAgeRanges?: string[];
  allDateRanges?: string[];
};

export default function FilterPanel({
  value,
  onChange,
  allRegions = ["North", "South", "East", "West"],
  allGenders = ["Male", "Female"],
  allCategories = ["Electronics", "Beauty", "Clothing"],
  allTags = ["wireless", "organic", "fashion"],
  allPayments = ["cash", "card", "upi"],
  allAgeRanges = ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
  allDateRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year"],
}: Props) {
  const update = (patch: Partial<Filters>) => {
    onChange({ ...value, ...patch });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Customer Region */}
      <MultiSelectDropdown
        label="Customer Region"
        options={allRegions}
        selected={value.regions}
        onChange={(s) => update({ regions: s })}
        placeholder=""
      />

      {/* Gender */}
      <MultiSelectDropdown
        label="Gender"
        options={allGenders}
        selected={value.genders}
        onChange={(s) => update({ genders: s })}
        placeholder=""
      />

      {/* Age Range */}
      <MultiSelectDropdown
        label="Age Range"
        options={allAgeRanges}
        selected={value.ageRange}
        onChange={(s) => update({ ageRange: s })}
        placeholder=""
      />

      {/* Product Category */}
      <MultiSelectDropdown
        label="Product Category"
        options={allCategories}
        selected={value.categories}
        onChange={(s) => update({ categories: s })}
        placeholder=""
      />

      {/* Tags */}
      <MultiSelectDropdown
        label="Tags"
        options={allTags}
        selected={value.tags}
        onChange={(s) => update({ tags: s })}
        placeholder=""
      />

      {/* Payment Method */}
      <MultiSelectDropdown
        label="Payment Method"
        options={allPayments}
        selected={value.paymentMethods}
        onChange={(s) => update({ paymentMethods: s })}
        placeholder=""
      />

      {/* Date Range */}
      <MultiSelectDropdown
        label="Date"
        options={allDateRanges}
        selected={value.dateRange}
        onChange={(s) => update({ dateRange: s })}
        placeholder=""
      />
    </div>
  );
}
