import React from "react";

const Button = ({
  btnName,
  icon,
  text,
  additionalClass,
  additionalComponent,
  onClick,
}) => {
  return (
    <div>
      {btnName === "fullscreen" ? (
        <button className={additionalClass} onClick={onClick}>
          {icon}
        </button>
      ) : btnName === "settings" || btnName==="layout" ? (
        <button className={additionalClass} onClick={onClick}>
          {icon}
          <h1 className="hidden lg:block">{text}</h1>
          {additionalComponent}
        </button>
      ) : (
        <button
          className="relative flex items-center justify-center gap-2 px-4 min-w-[50px] lg:min-h-[45px] min-h-[35px] bg-gray-600 rounded-md cursor-pointer active:bg-gray-500"
          onClick={onClick}
        >
          {icon}
          <h1 className="hidden lg:block">{text}</h1>
        </button>
      )}
    </div>
  );
};

export default Button;
