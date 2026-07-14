import SegmentedControl from "../ui/SegmentedControl";

const options = [
  { label: "5 km", value: 5 },
  { label: "10 km", value: 10 },
  { label: "20 km", value: 20 },
  { label: "50 km", value: 50 },
  { label: "100 km", value: 100 },
];

interface RadiusSelectorProps {
  value: number;
  onChange?: (value: number) => void;
}

export default function RadiusSelector({
  value,
  onChange,
}: RadiusSelectorProps) {
  return (
    <SegmentedControl
      value={value}
      options={options}
      onChange={onChange}
    />
  );
}