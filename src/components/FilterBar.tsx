type Props = {
  filter: string;
  setFilter: (v: string) => void;
};

export default function FilterBar({ filter, setFilter }: Props) {
  const tabs = ["all", "active", "completed"];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setFilter(t)}
          className={`px-4 py-2 rounded-lg text-sm ${
            filter === t
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
