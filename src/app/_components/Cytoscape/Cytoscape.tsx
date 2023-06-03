'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

type Props = {
  data: cytoscape.ElementDefinition[];
};

export default function Cytoscape(props: Props) {
  const cytoscapeContainerRef = useRef(null);

  useEffect(() => {
    if (cytoscapeContainerRef?.current) {
      cytoscape({
        container: cytoscapeContainerRef.current,
        elements: props.data,
      });
    }
  }, []);

  return <div className="h-full" ref={cytoscapeContainerRef} />;
}
