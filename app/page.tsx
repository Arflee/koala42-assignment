import HierarchyTable from "@/components/hierarchyTable";
import sampleData from "../data/example-data.json";
import { Item } from "@/components/types";


export default function Home() {
  
  const data = sampleData as Item[];

  return (
    <main>
      <div style={{ padding: 20 }}>
      <HierarchyTable data={data} />
    </div>
    </main>
  );
}
