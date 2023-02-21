import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

type Props = {
  data: cytoscape.ElementDefinition[];
};

export default function Cytoscape(props: Props) {
  const cytoscapeContainerRef = useRef<HTMLDivElement>(null);
  const cytoscapeRef = useRef<cytoscape.Core>();

  useEffect(() => {
    if (cytoscapeContainerRef.current) {
      const cytoscapeInstance = cytoscape({
        container: cytoscapeContainerRef.current,
        elements: props.data,
      });
      cytoscapeRef.current = cytoscapeInstance;
    }
  }, [cytoscapeContainerRef.current]);

  return <div className="h-full" ref={cytoscapeContainerRef} />;
}
