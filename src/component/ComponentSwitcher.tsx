import React, { HTMLAttributes } from "react";

interface ComponentSwitcherProps {
  switch: number;
  overlayClassName?: HTMLAttributes<HTMLElement>["className"];

  children: JSX.Element[];
}

export default function ComponentSwitcher(props: ComponentSwitcherProps) {
  // console.log(props.children[props.switch]);

  return (
    <div className={" absolute z-10 " + props.overlayClassName}>
      {props.children[props.switch - 1]}
    </div>
  );
}
