
import { useEffect, useRef, useState } from "react";
import Split from "react-split";

type ResizablePanelsProps = {
  leftPanel: React.ReactNode;
  rightTopPanel: React.ReactNode;
  rightBottomPanel: React.ReactNode;
  defaultSizes?: [number, number];
  defaultVerticalSizes?: [number, number];
};

export default function ResizablePanels({
  leftPanel,
  rightTopPanel,
  rightBottomPanel,
  defaultSizes = [35, 65],
  defaultVerticalSizes = [70, 30],
}: ResizablePanelsProps) {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure Split is only rendered on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={container} className="h-full w-full">
      <Split
        className="flex h-full w-full"
        direction="horizontal"
        sizes={defaultSizes}
        minSize={200}
        gutterSize={4}
      >
        <div className="resizable-panel h-full bg-background">
          {leftPanel}
        </div>
        <div className="resizable-panel h-full">
          <Split
            className="flex flex-col h-full"
            direction="vertical"
            sizes={defaultVerticalSizes}
            minSize={100}
            gutterSize={4}
          >
            <div className="resizable-panel h-full bg-editor-background">
              {rightTopPanel}
            </div>
            <div className="resizable-panel h-full">
              {rightBottomPanel}
            </div>
          </Split>
        </div>
      </Split>
    </div>
  );
}
