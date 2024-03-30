import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef, ButtonHTMLAttributes } from "react";

import { Icon } from "@shared/ui";

import "./styles.scss";

gsap.registerPlugin(useGSAP);

type ButtonProps = {
	onButtonClick: () => void;
	displayIcon?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ onButtonClick, displayIcon = false, children, ...props }) => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const refreshIconRef = useRef<SVGSVGElement>(null);

	const animateButton = (scale: number, backgroundColor: string) => {
		gsap.to(buttonRef.current, {
			scale,
			ease: "power2",
			duration: 0.25,
			backgroundColor
		});
	};

	const animateRefreshIcon = () => {
		gsap.to(refreshIconRef.current, {
			rotate: "+=360",
			repeat: -1,
			duration: 1,
			ease: "none"
		});
	};

	const stopRefreshIconAnimation = () => {
		gsap.killTweensOf(refreshIconRef.current);
	};

	useGSAP(
		(_, contextSafe) => {
			if (!buttonRef.current || !contextSafe) return;

			const handleButtonMouseEnter = contextSafe(() => {
				animateButton(1.1, "hsl(332, 51%, 28%)");
				animateRefreshIcon();
			});

			const handleButtonMouseLeave = contextSafe(() => {
				animateButton(1, "hsl(332, 51%, 32%)");
				stopRefreshIconAnimation();
			});

			const handleButtonTouchStart = contextSafe(() => {
				animateButton(0.9, "hsl(332, 51%, 28%)");
			});

			const handleButtonTouchEnd = contextSafe(() => {
				animateButton(1.1, "hsl(332, 51%, 28%)");
			});

			const handleButtonMouseDown = contextSafe(() => {
				animateButton(0.9, "hsl(332, 51%, 28%)");
			});

			const handleButtonMouseUp = contextSafe(() => {
				animateButton(1.1, "hsl(332, 51%, 28%)");
			});

			buttonRef.current.addEventListener("mouseenter", handleButtonMouseEnter);
			buttonRef.current.addEventListener("mouseleave", handleButtonMouseLeave);
			buttonRef.current.addEventListener("touchstart", handleButtonTouchStart);
			buttonRef.current.addEventListener("touchend", handleButtonTouchEnd);
			buttonRef.current.addEventListener("mousedown", handleButtonMouseDown);
			buttonRef.current.addEventListener("mouseup", handleButtonMouseUp);

			return () => {
				buttonRef.current!.removeEventListener("mouseenter", handleButtonMouseEnter);
				buttonRef.current!.removeEventListener("mouseleave", handleButtonMouseLeave);
				buttonRef.current!.removeEventListener("touchstart", handleButtonTouchStart);
				buttonRef.current!.removeEventListener("touchend", handleButtonTouchEnd);
				buttonRef.current!.removeEventListener("mousedown", handleButtonMouseDown);
				buttonRef.current!.removeEventListener("mouseup", handleButtonMouseUp);
			};
		},
		{ scope: buttonRef }
	);

	const RefreshIcon = Icon["RefreshCw"];

	return (
		<button onClick={onButtonClick} className={"button"} type={"button"} ref={buttonRef} {...props}>
			<div className={"button__container"}>
				{children}
				{displayIcon && <RefreshIcon className={"button__refresh-icon"} ref={refreshIconRef} />}
			</div>
		</button>
	);
};

export { Button };
