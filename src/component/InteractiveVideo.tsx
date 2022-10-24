import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ComponentSwitcher from "./ComponentSwitcher";
import "./styles.css";

type InteractiveVideoProps = {
  src: string;
  checkpoints: number[];
  videoClassName?: HTMLAttributes<HTMLElement>["className"];
  videoPausedClassName?: HTMLAttributes<HTMLElement>["className"];
  overlayClassName?: HTMLAttributes<HTMLElement>["className"];

  children: JSX.Element[];
};

const InteractiveVideoComponent = function (
  {
    src,
    checkpoints,
    videoClassName,
    videoPausedClassName,
    overlayClassName,
    children,
  }: InteractiveVideoProps,
  ref: any
) {
  const _checkpoints = useMemo(() => [...checkpoints], [checkpoints]);

  const [stopIndex, setStopIndex] = useState(0);

  const [paused, setPaused] = useState(false);

  const playerRef = useRef<null | HTMLVideoElement | any>(null);

  const onPlay = useCallback(() => {
    playerRef.current.play();
    setPaused(false);
  }, [setPaused]);

  const onPause = useCallback(() => {
    playerRef.current.pause();
    setPaused(true);
  }, [setPaused]);

  function onTimeUpdate() {
    if (playerRef.current.currentTime > _checkpoints[stopIndex]) {
      setStopIndex((prev) => prev + 1);
      playerRef.current.pause();
      setPaused(true);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      play: onPlay,
      pause: onPause,
    }),
    []
  );

  return (
    <div className="relative h-full w-full">
      {paused && (
        <ComponentSwitcher
          switch={stopIndex}
          overlayClassName={overlayClassName}
        >
          {children}
        </ComponentSwitcher>
      )}
      <video
        ref={playerRef}
        className={
          " z-0 " + videoClassName + " " + (paused && videoPausedClassName)
        }
        src={src}
        controls
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
      ></video>
    </div>
  );
};

export const InteractiveVideo = forwardRef(InteractiveVideoComponent);
