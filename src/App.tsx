import React, { useRef } from "react";
// import { InteractiveVideo } from "./component";
import { InteractiveVideo } from "react-interactive-video";

export default function App() {
  const checkpoints = [3, 6, 9];

  const IVRef = useRef<any>(null);

  return (
    <div>
      <InteractiveVideo
        src="./video/output.mp4"
        checkpoints={checkpoints}
        videoClassName=""
        videoPausedClassName=""
        overlayClassName="w-full h-full"
        ref={IVRef}
      >
        <ComponentOne
          onSubmit={() => {
            IVRef.current.play();
          }}
        />
        <ComponentTwo />
        <ComponentThree />
      </InteractiveVideo>
    </div>
  );
}

function ComponentOne({ onSubmit }: any) {
  return (
    <div className="bg-pink-100 p-4 h-full">
      <p>One</p>
      <button
        className="px-6 py-2 bg-pink-300 text-pink-600 hover:shadow-md hover:shadow-pink-200"
        onClick={() => {
          onSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
}

function ComponentTwo() {
  return <div className="bg-blue-100 m-4 p-4">Two</div>;
}

function ComponentThree() {
  return <div className="bg-green-100 text-2xl p-4">Three</div>;
}
