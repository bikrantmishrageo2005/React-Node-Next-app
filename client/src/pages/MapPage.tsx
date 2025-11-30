import IndiaMap from "@/components/map/IndiaMap";

export default function MapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-orbitron font-bold text-white uppercase">
        Global <span className="text-neon-cyan">Surveillance</span>
      </h1>
      <IndiaMap />
    </div>
  );
}
